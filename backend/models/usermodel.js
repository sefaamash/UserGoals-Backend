//first we make api of goals that user create update delete fetch
//second we make user svchema of its login and signup that in which form data is oming and also autntetcating the user
//we will secure our API that we make of goals by adding JWT authentication
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
