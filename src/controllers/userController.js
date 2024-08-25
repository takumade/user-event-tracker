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
        res.json("Username already taken");
      }
    });
  }

  async getUsers(req, res) {
    let users = await User.find({});
    res.json(users);
  }

  async getUser(req, res) {
    let user = await User.findOne({ _id: req.params._id });
    res.json(user);
  }

  async editUser(req, res) {
    let user = await User.updateOne(
      { _id: req.params._id },
      { email: req.body.email },
      { new: true }
    );

    res.json(user);
  }
}

module.exports = UserController;
