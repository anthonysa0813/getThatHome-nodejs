const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  email: {
    type: String,
    required: [true, "the email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "the phone is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "the password is required"],
    minlength: 6,
  },
  role: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
    required: false,
  },
});

schema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", schema);
