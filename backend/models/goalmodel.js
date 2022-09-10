//CREATING SCHEMA OF THE DATA COMING FROM FRONTEND

const mongoose = require("mongoose");
//SO W EHAVE ONLY ONE ENTRY WE WILL ENTER GOAL FROM FRONTEND THAT WILL BE INTEXT FORM
const goalSchema = mongoose.Schema(
  {
    //Now we want to make sure that we know which user make the goal
    user: {
      type: mongoose.Schema.Types.ObjectId, //what are we saying that we want this type to e object Id00.........
      required: true,
      ref: "User", //Giving the reference that from where the object id above is coming which is user model
    },
    text: {
      type: String,
      required: [true, "Please add Goals"],
    },
  },
  {
    timestamps: true,
  }
);
//exporting as a moongoose model model
module.exports = mongoose.model("Goal", goalSchema); //'Goal' is a model name
