import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        // id varlığını kontrol etmek için decodedToken.userId kullanıyoruz, daha sonra local'e ekliyoruz
        const user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          // burada ileri gitmesini sağlıyoruz. yoksa login sayfasına yönlendiriyoruz
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: 'Not authorized',
    });
  }
};

// const authenticateToken = (req, res, next) => {
//   // Token, 'Authorization' header'dan alınır.
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // 'Bearer TOKEN' formatı

//   if (token == null) return res.sendStatus(401); // Eğer token yoksa, yetkisiz istek

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // Eğer token geçersizse, erişim yasak
//     req.user = user; // Doğrulanmış kullanıcı bilgisi request objesine eklenir
//     next(); // Middleware zincirindeki bir sonraki fonksiyona geçilir
//   });
// };


export { authenticateToken, checkUser };
