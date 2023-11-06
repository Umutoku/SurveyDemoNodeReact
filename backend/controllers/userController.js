import User from '../models/userModel.js';
import * as tokenService from '../middlewares/tokenService.js';


const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.error('ERROR', error);

    let errors = {};
    // 11000 mongodb hatası aynısı var mı kontrol
    if (error.code === 11000) {
      errors.email = 'The email is already registered';
    } else if (error.name === 'ValidationError') {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
    }

    res.status(400).json(errors);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No such user exists',
      });
    }
    if (user && (password ,user.password)) {
      // token serviceden userid gömülü token yaratıyoruz
      const token = tokenService.createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // süresini ayarlıyoruz
        sameSite: 'Lax', // cookie'lerin sadece güvenli olmayan isteklerde gönderilmesini sağlıyoruz
      });
      res.status(200).json({ message: "Logged in successfully 😊 👌" , token});
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'There is no such user',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // cookie'yi siliyoruz
  res.redirect('/');
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
      link: 'users',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  createUser,
  loginUser,
  getAllUsers,
  logoutUser,
  deleteUser
};
