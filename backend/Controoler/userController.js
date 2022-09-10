const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); //to handle exception we can use builtin express async handler instead of try catch
const User = require("../models/usermodel");

//............................................REGISTER user...........................................
//@desc POST user
// route POST /api/USERS this route will register
//@acess Public
//Now in this api we are posting/registering user to database
const registerUser = asyncHandler(async (req, res) => {
  //this will work if user left any one of the field empty then this will work
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Now checking if user exsist in database before or not if not then register otherwise not
  const userExists = await User.findOne({ email: email }); //we will await here until we check if user available already or not through email then register
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }
  //Hashing the password
  const salt = await bcrypt.genSalt(10); //A salt is added to make a password hash output unique even for users adopting common passwords
  const hashedpassowrd = await bcrypt.hash(password, salt);
  //Creating USER
  const user = await User.create({
    name,
    email,
    password: hashedpassowrd,
  });
  if (user) {
    //if user created
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//............................................LOGIN user...........................................
//@desc POST Authenticate a user
// route POST /api/USERS/login this route will logged in registered user
//@acess Public
//Now in this api we are posting/logging user and tracing it from database that if it is registered in database if so ythen login otherwise not.
const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //THIS IS THE PASSOWRD THAT USER WILL ENTER FROM FRONTEND AND EMAIL ALSO

  //Check for user email
  const user = await User.findOne({ email });
  //Check User Password
  if (user && (await bcrypt.compare(password, user.password))) {
    //Now we compare the password typed by user and and original password which is not hashed one if its match then proceed
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//............................................Fetching logged user...........................................
//@desc GET user DATA
// route GET /api/USERS/me   this route will fetch user details
//@acess Privatenj
//This api is actually getting the user which is register+loggedin
const getMe = asyncHandler(async (req, res) => {
  const { _id } = await findById(req.user._id);

  res.status(200).json({
    id: _id,
    name,
    emaiL,
  });
});

//GENERATE JWT
//JWT?
/*JWT is used to securely gain access and communicate with different things, by using a key to encrypt the object but also to make sure that no one can manually 
make and send these objects without the secret key.*/

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  logInUser,
  getMe,
};
