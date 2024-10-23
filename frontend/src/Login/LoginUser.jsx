import React, { useState } from 'react';

function LoginUser({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add error state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login validation (replace with real validation logic)
    if (username === 'admin' && password === 'password') {
      onLogin(true);
      setError('');   
    } else {
      setError('Invalid credentials');  
    }
  };

  return (
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login" style={{ backgroundImage: "url('../images/layout_img/login_image.jpg')" }}>
              <div className="center">
                <img width="210" src="images/logo1.png" alt="Logo" />
              </div>
            </div>
            <div className="login_form">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <div className="field">
                    <label className="label_field">Email Address</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label className="label_field">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <div className="field">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" /> Remember Me
                    </label>
                    <a className="forgot" href="#">Forgotten Password?</a>
                  </div>
                  <div className="field margin_0">
                    <button type="submit" className="main_bt">Sign In</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
