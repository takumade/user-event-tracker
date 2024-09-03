const UserEvent = require("../models/userEventModel");
const User = require("../models/userModels");

class UserController {
  createUser(req, res) {
    console.log("Req.body: ", req.body);
    let name = req.body.username;
    let email = req.body.email;

    User.findOne({ username: name }, function (err, data) {
      if (err) return console.log(err);

      if (data == null) {
        let newUser = User({
          username: name,
          email: email,
        });

        newUser.save((err, data) => {
          if (err) return console.log(err);

          res.json(data);
        });
      } else {
        // res.json("Username already taken");
        res.json(data);
      }
    });
  }

  async getUsers(req, res) {
    try{
      let users = await User.find({});
      res.status(200).json(users);
    }catch(err){
      res.status(500).json(err)
    }
  }

  async getUser(req, res) {
    try{
      let user = await User.findOne({ _id: req.params._id });
      res.status(200).json(user);
    }catch(err){
      res.status(500).json(err)
    }
  }

  async editUser(req, res) {
    try{
      await User.updateOne(
        { _id: req.params._id },
        { email: req.body.email },
        { new: true }
      );


      let user = await User.findOne({_id: req.params._id})

      res.status(200).json(user);
    }catch(err){
      res.status(500).json(err)
    }
  }
}

module.exports = UserController;
