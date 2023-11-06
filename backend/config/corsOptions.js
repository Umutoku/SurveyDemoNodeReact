import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}
// allowedOrigins sayfasından kontrol yapıyor, credentials: true sayesinde cookie'lerin gönderilmesini sağlıyoruz.
export default corsOptions;