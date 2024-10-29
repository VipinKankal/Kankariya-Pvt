const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// MySQL database connection using connection pooling
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'kankariya_database',
  connectionLimit:100
 
});

// Function to create tables if they don't exist
async function createTables() {
  let connection;
  try {
    connection = await db.promise().getConnection(); // Use promise-based getConnection
    console.log('Successfully obtained a connection from the pool.');

    // Create customers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mobile VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        date_birth DATE NOT NULL,
        tentative_date DATE NOT NULL,
        preferred_date DATE NOT NULL,
        request_date DATE NOT NULL,
        customer_type VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        variant VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        ex_showroom_price DECIMAL(10, 2) NOT NULL,
        booking_amount DECIMAL(10, 2) NOT NULL,
        rm_name VARCHAR(255) NOT NULL,
        srm_name VARCHAR(255) NOT NULL,
        exchange ENUM('yes', 'no') DEFAULT NULL,
        finance ENUM('yes', 'no') DEFAULT NULL,
        accessories ENUM('yes', 'no') DEFAULT NULL,
        coating ENUM('yes', 'no') DEFAULT NULL,
        auto_card ENUM('yes', 'no') DEFAULT NULL,
        extended_warranty ENUM('yes', 'no') DEFAULT NULL,
        registration_fees ENUM('yes', 'no') DEFAULT NULL,
        ccp ENUM('yes', 'no') DEFAULT NULL,
        insurance ENUM('yes', 'no') DEFAULT NULL,
        rto_tax ENUM('yes', 'no') DEFAULT NULL,
        fast_tag ENUM('yes', 'no') DEFAULT NULL
 
      )
    `);

    // Create financeUserDocuments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS financeUserDocuments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        aadhar_path VARCHAR(255) NOT NULL,
        pan_path VARCHAR(255) NOT NULL,
        voterId_path VARCHAR(255) NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES customers(id) ON DELETE CASCADE
      )
    `);
    console.log('Tables created successfully or already exist.');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    if (connection) connection.release(); // Ensure the connection is released back to the pool
  }
}

db.getConnection(async (err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected...');
  await createTables(); // Call to create tables
  connection.release();
});



// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    // Create uploads directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
const upload = multer({ storage });

// Define the endpoint to upload PDF files and insert customer data
app.post('/customers', upload.fields([
  { name: 'aadhar' },
  { name: 'pan' },
  { name: 'voterId' }
]), async (req, res) => {
  // Destructure customer data from request body
  const {
    name, email, mobile, address, date_birth, tentative_date, preferred_date, request_date,
    customer_type, model, variant, color, ex_showroom_price, booking_amount, rm_name, srm_name,
    exchange, finance, accessories, coating, auto_card, extended_warranty, registration_fees,
    ccp, insurance ,rto_tax ,fast_tag
  } = req.body;

  // Validate required fields
  if (!name || !email || !mobile || !address || !date_birth || !tentative_date || !preferred_date || 
      !request_date || !customer_type || !model || !variant || !color || !ex_showroom_price || 
      !booking_amount || !rm_name || !srm_name || !rto_tax || !fast_tag) {
    return res.status(400).send('All fields are required except Aadhar, PAN, and Voter ID.');
  }

  // Prepare SQL statements for inserting data
  const insertCustomerSQL = `
    INSERT INTO customers 
    (name, email, mobile, address, date_birth, tentative_date, preferred_date, request_date,
     customer_type, model, variant, color, ex_showroom_price, booking_amount, rm_name, srm_name,
     exchange, finance, accessories, coating, auto_card, extended_warranty, registration_fees, 
     ccp, insurance ,rto_tax ,fast_tag)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const customerValues = [
    name, email, mobile, address, date_birth, tentative_date, preferred_date, request_date,
    customer_type, model, variant, color, ex_showroom_price, booking_amount, rm_name, srm_name,
    exchange || null, finance || null, accessories || null, coating || null, 
    auto_card || null, extended_warranty || null, registration_fees || null, ccp || null, 
    insurance || null , rto_tax || null, fast_tag || null 
  ];

  try {
    // Connect to the database and insert customer data
    const connection = await db.promise().getConnection();
    const [customerResult] = await connection.query(insertCustomerSQL, customerValues);

    // Retrieve the newly inserted customer ID
    const userId = customerResult.insertId;

    // Define file paths for uploaded documents (optional)
    const aadharPath = req.files.aadhar ? path.join('uploads', req.files.aadhar[0].filename) : null;
    const panPath = req.files.pan ? path.join('uploads', req.files.pan[0].filename) : null;
    const voterIdPath = req.files.voterId ? path.join('uploads', req.files.voterId[0].filename) : null;

    // Only insert finance documents if files were uploaded
    if (aadharPath || panPath || voterIdPath) {
      const insertFinanceDocsSQL = `
        INSERT INTO financeUserDocuments (aadhar_path, pan_path, voterId_path, user_id)
        VALUES (?, ?, ?, ?)
      `;
      const financeDocValues = [aadharPath, panPath, voterIdPath, userId];
      await connection.query(insertFinanceDocsSQL, financeDocValues);
    }

    res.status(201).send('Customer and finance documents added successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data.');
  }
});


// Fetch all customers with document paths
app.get('/customers', async (req, res) => {
    try {
      const connection = await db.promise().getConnection();
  
      const [customers] = await connection.query(`
        SELECT c.*, f.aadhar_path, f.pan_path, f.voterId_path
        FROM customers c
        LEFT JOIN financeUserDocuments f ON c.id = f.user_id
      `);
  
      res.status(200).json(customers);
      connection.release();
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).send('Error fetching customer data.');
    }
});

// API endpoint to delete customer and associated finance documents by customer ID
app.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
      const connection = await db.promise().getConnection();

      // Check if the customer exists
      const [customer] = await connection.query('SELECT * FROM customers WHERE id = ?', [customerId]);
      if (customer.length === 0) {
          connection.release();
          return res.status(404).send('Customer not found.');
      }

      // Fetch the associated finance documents
      const [existingDocs] = await connection.query('SELECT * FROM financeUserDocuments WHERE user_id = ?', [customerId]);
      
      // Delete the associated finance documents (because of ON DELETE CASCADE in the foreign key)
      await connection.query('DELETE FROM financeUserDocuments WHERE user_id = ?', [customerId]);

      // Define paths to the documents
      const pathsToDelete = existingDocs.map(doc => [
          doc.aadhar_path,
          doc.pan_path,
          doc.voterId_path,
      ]).flat().filter(path => path); // Flatten and filter out any null paths

      // Delete associated files from the file system
      pathsToDelete.forEach(async (filePath) => {
          try {
              const fullPath = path.join(__dirname, filePath);
              if (fs.existsSync(fullPath)) {
                  await fs.promises.unlink(fullPath); // Use promises for async file deletion
              }
          } catch (fileError) {
              console.error('Error deleting file:', fileError); // Log any file deletion errors
          }
      });

      // Delete the customer
      await connection.query('DELETE FROM customers WHERE id = ?', [customerId]);

      res.status(200).send('Customer and associated documents deleted successfully.');
  } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Error deleting customer.');
  }  
});

app.get('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  console.log('Fetching customer with ID:', customerId); // Debug log

  try {
    const connection = await db.promise().getConnection();
    const [customer] = await connection.query(`
      SELECT c.*, f.aadhar_path, f.pan_path, f.voterId_path
      FROM customers c
      LEFT JOIN financeUserDocuments f ON c.id = f.user_id
      WHERE c.id = ?
    `, [customerId]);

    console.log('Customer data fetched:', customer); // Debug log

    if (customer.length === 0) {
      return res.status(404).send('Customer not found.');
    }

    res.status(200).json(customer[0]);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).send('Error fetching customer data.');
  }
});

// Endpoint to update an existing customer and their documents
app.put('/customers/:id', upload.fields([
  { name: 'aadhar' },
  { name: 'pan' },
  { name: 'voterId' }
]), async (req, res) => {
  const customerId = req.params.id;
  const {
      name, email, mobile, address, date_birth, tentative_date, preferred_date, request_date,
      customer_type, model, variant, color, ex_showroom_price, booking_amount, rm_name, srm_name,
      exchange, finance, accessories, coating, auto_card, extended_warranty, registration_fees,
      ccp, insurance ,rto_tax ,fast_tag
  } = req.body;

  if (!name || !email || !mobile || !address || !date_birth || !tentative_date || !preferred_date ||
      !request_date || !customer_type || !model || !variant || !color || !ex_showroom_price ||
      !booking_amount || !rm_name || !srm_name || !rto_tax || !fast_tag ) {
      return res.status(400).send('All required fields must be provided.');
  }

  const connection = await db.promise().getConnection();

  try {
      await connection.beginTransaction();

      const [existingDocs] = await connection.query(
          'SELECT * FROM financeUserDocuments WHERE user_id = ?', [customerId]
      );
      const currentDocs = existingDocs.length > 0 ? existingDocs[0] : null;

      const getFilePath = (file, currentPath) => file ? path.join('uploads', file[0].filename) : currentPath;
      const aadharPath = getFilePath(req.files.aadhar, currentDocs?.aadhar_path);
      const panPath = getFilePath(req.files.pan, currentDocs?.pan_path);
      const voterIdPath = getFilePath(req.files.voterId, currentDocs?.voterId_path);

      const updateCustomerSQL = `
          UPDATE customers 
          SET name = ?, email = ?, mobile = ?, address = ?, date_birth = ?, tentative_date = ?, 
              preferred_date = ?, request_date = ?, customer_type = ?, model = ?, variant = ?, 
              color = ?, ex_showroom_price = ?, booking_amount = ?, rm_name = ?, srm_name = ?, 
              exchange = ?, finance = ?, accessories = ?, coating = ?, auto_card = ?, 
              extended_warranty = ?, registration_fees = ?, ccp = ?, insurance = ? ,rto_tax = ?,fast_tag = ?
          WHERE id = ?
      `;

      const customerValues = [
          name, email, mobile, address, date_birth, tentative_date, preferred_date, request_date,
          customer_type, model, variant, color, ex_showroom_price, booking_amount, rm_name, srm_name,
          exchange || null, finance || null, accessories || null, coating || null, 
          auto_card || null, extended_warranty || null, registration_fees || null, ccp || null, 
          insurance || null, customerId , rto_tax || null, fast_tag || null, customerId
      ];

      await connection.query(updateCustomerSQL, customerValues);

      const updateDocsSQL = currentDocs
          ? `UPDATE financeUserDocuments SET aadhar_path = ?, pan_path = ?, voterId_path = ? WHERE user_id = ?`
          : `INSERT INTO financeUserDocuments (user_id, aadhar_path, pan_path, voterId_path) VALUES (?, ?, ?, ?)`;
          
      const docValues = currentDocs ? [aadharPath, panPath, voterIdPath, customerId] : [customerId, aadharPath, panPath, voterIdPath];
      await connection.query(updateDocsSQL, docValues);

      // Delete previous files after successful update
      const deleteOldFile = (filePath) => {
          if (filePath && fs.existsSync(path.join(__dirname, filePath))) {
              fs.unlinkSync(path.join(__dirname, filePath));
          }
      };
      
      if (req.files.aadhar) deleteOldFile(currentDocs?.aadhar_path);
      if (req.files.pan) deleteOldFile(currentDocs?.pan_path);
      if (req.files.voterId) deleteOldFile(currentDocs?.voterId_path);

      await connection.commit();

      res.status(200).send('Customer and finance documents updated successfully.');
  } catch (error) {
      await connection.rollback();
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data.');
  } finally {
      connection.release();
  }
});



 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
