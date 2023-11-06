import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apiHelper';
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

    try {
      const response = await api.post('/users/login', formData);
      const token = response.data.token;
      // Tokeni localStorage'da sakla
      localStorage.setItem('jwt', token);
      // localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/createsurvey'); // Kullanıcıyı profil sayfasına yönlendir
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="register-div container">
      <form noValidate onSubmit={handleSubmit} className="form_container">
        <div className="logo_container" />
        <div className="title_container">
          <p className="title">LOGIN</p>
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
          <span>Sign In</span>
        </button>
      </form>
    </div>
  );
}

export default Login;
