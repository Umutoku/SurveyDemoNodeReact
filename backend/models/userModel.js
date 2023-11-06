import mongoose from 'mongoose';
import validator from 'validator';
import md5 from 'md5';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username area is required'],
      lowercase: true,
      validate: [validator.isAlphanumeric, 'Only Alphanumeric characters'],
    },
    email: {
      type: String,
      required: [true, 'Email area is required'],
      unique: true,
      validate: [validator.isEmail, 'Valid email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password area is required'],
      minLength: [4, 'At least 4 characters'],
    },
    surveys: [{
      type: Schema.Types.ObjectId,
      ref: 'Survey' // Survey modeline referans
    }],
  },
  // { // Mongoose tarafından oluşturulma ve güncelleme tarihlerini tutmak için
  //   timestamps: true,
  // }
);

// userSchema.pre('save', function (next) {
//   const user = this;
//   let hash = md5(user.password);
//   console.log(hash);
//     if(hash){
//         user.password = hash;
//         next();
//     }
// });

const User = mongoose.model('User', userSchema);

export default User;
