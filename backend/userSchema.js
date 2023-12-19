// userModel.js
const mongoose = require('mongoose');
const  bcrypt= require('bcryptjs');



const courseSchema = new mongoose.Schema({
    courseName: {
      type: String,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Simple email validation
        return /\S+@\S+\.\S+/.test(v);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  age: {
    type: Number,
  },
  coursesEnrolled: [courseSchema],
});



userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
       next()
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
})


//compare password during login

userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
};



const User = mongoose.model('User', userSchema);

module.exports = User;
