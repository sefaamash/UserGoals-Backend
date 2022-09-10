const express=require('express');
const router=express.Router();
const {getGoal,setGoal,updateGoal,deleteGoal}=require('../Controoler/goalController');
const { protect } = require('../middleware/authmiddleware')
//..................................method 1 to write ................................
//Fetching goals
router.get('/', protect,getGoal
)

//Posting goals
router.post('/', protect, setGoal)

//update goals put request needs id to update
router.put('/:id', protect,  updateGoal)

//delete goals delete request also needs id
router.delete('/:id', protect, deleteGoal)

// ........................METHOD 2 to write(sort syntax)..........................

/*get and post use same route so we use both at same line together
router.route('/').get(getGoal).post(setGoal);
PUT and DELETE same route so we use both at same line together
router.route('/:id').delete(deleteGoal).put(updateGoal);*/

module.exports=router;