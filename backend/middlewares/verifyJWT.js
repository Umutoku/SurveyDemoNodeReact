import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();

 //burada token'ı kontrol ediyoruz ve eğer token varsa, token içindeki username'i req.user'a atıyoruz 
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Authorization header'ını alıyoruz
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer <token>
    const token = authHeader.split(' ')[1]; // boşluktan sonrasını alıyoruz
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403); //giriş engellendi, jetonda sorun var
        req.user = decoded.username; // decoded içindeki username'i req.user'a atıyoruz
        next();
    });
    
}

export default verifyJWT;