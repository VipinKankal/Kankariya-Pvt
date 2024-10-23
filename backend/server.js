const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to the file name
    }
});
const upload = multer({ storage });

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kankariya_database'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Define the route for customer data submission
app.post('/customer', upload.fields([{ name: 'aadhar' }, { name: 'pan' }, { name: 'voterId' }]), (req, res) => {
    const {
        name,
        mobile,
        email,
        address,
        date_birth,
        customer_type,
        model,
        variant,
        color,
        tentative_date,
        preferred_date,
        request_date,
        ex_showroom_price,
        booking_amount,
        rm_name,
        srm_name,
        exchange,
        finance,
        accessories,
        coating,
        auto_card,
        extended_warranty,
        registration_fees,
        ccp,
        insurance,
    } = req.body;

    // Access uploaded files
    const financedocuments = {
        aadhar: req.files['aadhar'] ? req.files['aadhar'][0].path : null,
        pan: req.files['pan'] ? req.files['pan'][0].path : null,
        voterId: req.files['voterId'] ? req.files['voterId'][0].path : null,
    };

    const sql = `INSERT INTO customers (name, mobile, email, address, date_birth, customer_type, model, variant, color, tentative_date, preferred_date, request_date, ex_showroom_price, booking_amount, rm_name, srm_name, exchange, finance, accessories, coating, auto_card, extended_warranty, registration_fees, ccp, insurance, financedocuments) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        name,
        mobile,
        email,
        address,
        date_birth,
        customer_type,
        model,
        variant,
        color,
        tentative_date,
        preferred_date,
        request_date,
        ex_showroom_price,
        booking_amount,
        rm_name,
        srm_name,
        exchange,
        finance,
        accessories,
        coating,
        auto_card,
        extended_warranty,
        registration_fees,
        ccp,
        insurance,
        JSON.stringify(financedocuments) // Ensure to stringify JSON data
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting customer:', err);
            return res.status(500).json({ message: 'Error inserting customer' });
        }
        res.status(201).json({ message: 'Customer added successfully', customerId: result.insertId });
    });
});

// Start the server
const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
