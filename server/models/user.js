const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 100,
      index: { unique: true },
    },
    password: { type: String, require: true, minlength: 8, maxlength: 50 },
    address1: {
      type: String,
      maxlength: 255,
    },
    address2: {
      type: String,
      maxlength: 255,
    },
    city: {
      type: String,
      maxlength: 100,
    },
    province: {
      type: String,
      maxlength: 100,
    },
    postalCode: {
      type: String,
      maxlength: 50,
    },
    phoneNo: {
      type: String,
      maxlength: 50,
    },
    userRoles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRoles",
      require: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("Users", schema);

module.export = User;
