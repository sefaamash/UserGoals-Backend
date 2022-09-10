const asyncHandler = require("express-async-handler"); //to handle async because when we interct with database we use async await trycatch
const Goal = require("../models/goalmodel");

const User = require("../models/usermodel");

//............................................GET...........................................
//@desc Get goals
// route GET /api/goals
//@acess Private after authentication
//Now in this api we are getting goals from the database
const getGoal = asyncHandler(async (req, res) => {
  //console.log(req.body);//sending data from frontend coming in body in xxx url encoded in postman
  /* if(!req.body.text){//agar body ma kuch nhi ha text toh
       res.status(400) // it will show 400 status error there should be data coming from frontend in body otherwise error
       throw new Error('please add a text field');}*/

  const goals = await Goal.find({ user: req.user.id }); //we use .find method of moongoose to get from dataabase, {user:req.user.id} is used to get goal only add by specific user not other users and because of middleware function private we

  res.status(200).json({ goals }); //sending response to frontend
});

//............................................POST...........................................
//@desc Set goals
// route POST /api/goals
//@acess Private after authentication
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    //agar body ma kuch nhi ha text toh
    res.status(400); // it will show 400 status error there should be data coming from frontend in body otherwise error
    throw new Error("please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal); //sending response to frontend
});

//............................................PUT...........................................
//@desc uPDATE goals
// route PUT /api/goals
//@acess Private after authentication
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  const user = await User.findById(req.user.id);
  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure that logged in user matches the goal of ythe user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  //Now updated goal
  const updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //this will update the goal if id matched also print updated goal and if its not there it will make new which we shown in 3rd para,meter
  res.status(200).json(updatedgoal); //sending response to frontend
});

//............................................delete...........................................
//@desc DELETE goals
// route DELETE /api/goals
//@acess Private after authentication
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure that logged in user matches the goal of ythe user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Goal.findOneAndRemove(req.params.id);
  res.status(200).json({ message: "Deleted" + req.params.id }); //sending response to frontend
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};

//i am using a sync so i can use await try catch to handle por we have a express library npm i express-async-handler
