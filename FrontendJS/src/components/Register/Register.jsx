import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import './register.css';
import api from '../../utils/apiHelper';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifreyi MD5 ile özetle //backendde de istenir ise kütüphane ve kodlar var
    const hashedPassword = md5(formData.password);

    try {
      const response = await api.post('/users/register', {
        ...formData,
        password: hashedPassword, // MD5 ile özetlenmiş şifre
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-div container">
      <form noValidate onSubmit={handleSubmit} className="form_container">
        <div className="logo_container" />
        <div className="title_container">
          <p className="title">REGISTER</p>
        </div>
        <div className="inputGroup">
          <input
            value={formData.username}
            onChange={handleChange}
            title=""
            name='username'
            type="text"
            required
          />
          <label>Full Name</label>
        </div>
        <div className="inputGroup">
          <input
            value={formData.email}
            onChange={handleChange}
            title=""
            name='email'
            type="text"
            required
          />
          <label>E-Mail</label>
        </div>
        <div className="inputGroup">
          <input
            title=""
            type={showPassword ? "text" : "password"}
            required
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password.length > 0 && (
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={
                showPassword
                  ? "eyes-icon-slash fas fa-light fa-eye-slash"
                  : "eyes-icon fas fa-light fa-eye animate__animated animate__fadeIn"
              }
            ></i>
          )}
          <label htmlFor="name">Password</label>
        </div>
        <button type="submit" className="sign-up_btn">
          <span>Sign Up</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
