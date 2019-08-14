const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  country: {
    type: String
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        console.log("Error hashing password");
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});
userSchema.pre("findOneAndUpdate", function(next) {
  if (!this._update.password || this._update.password === undefined) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this._update.password, salt, (err, hash) => {
      this._update.password = hash;
      next();
    });
  });
});

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_KEY
  );
  return token;
};

userSchema.statics.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User doesnt exists");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
