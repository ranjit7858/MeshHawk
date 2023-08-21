import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace 'YOUR_FASTAPI_URL' with the actual URL of your FastAPI backend
    const apiUrl = 'http://127.0.0.1:8000/signup';

    axios
      .post(apiUrl , formData)
      .then((response) => {
        // Handle success, e.g., show a success message or redirect
        console.log('Sign up successful:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Sign up failed:', error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;