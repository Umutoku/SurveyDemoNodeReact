import userRoute from './routes/userRoute.js';
import surveyRoute from './routes/surveyRoute.js';
import responseRoute from './routes/responseRoute.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import verifyJWT from './middlewares/verifyJWT.js';
import corsOptions from './config/corsOptions.js';
import { checkUser } from './middlewares/authMiddleware.js';

const app = express();

const port = process.env.port 
let dbcon= process.env.cloudmongodb_con

mongoose.connect(dbcon,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var con =  mongoose.connection;

if(!con) console.log("Error connecting db");
else{
    console.log("Db connected successfully");
}

// built-in middleware to handle urlencoded form data
app.use(cookieParser()); //cookie'leri okumak için
app.use(express.static('public')); //statik dosyalar için
app.use(express.json()); //body-parser yerine
app.use(express.urlencoded({ extended: true })); //body-parser yerine
app.use(cors(corsOptions)); //cors


// routes
app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, () => console.log(`Server running on port ${port}`));
//app.use('*', checkUser); //her istekten önce çalışır
app.use('/users', userRoute);
app.use('/surveys',surveyRoute);
app.use('/responses',responseRoute);

export default app;


//app.use(verifyJWT);//bu satırdan sonra hepsi jwt ile korunur
//app.use('/employees', require('./routes/api/employees'));
