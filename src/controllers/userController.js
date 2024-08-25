const UserEvent = require("../models/userEventModel")
const User = require("../models/userModels")

class UserController {

    createUser(req, res){
        console.log("Req.body: ", req.body)
        let name = req.body.username
        let email = req.body.email
      
        User.findOne({username: name}, function(err, data){
          if (err) return console.log(err)
      
          if (data == null){
            let newUser = User({
              username: name,
              email: email
            })
      
            newUser.save((err, data) => {
              if (err) return console.log(err)
      
              res.json(data)
            })
          }else{
            res.json("Username already taken")
          }
        })
      }

      async getUsers(req, res){
        let users = await User.find({});
        res.json(users)
      }

      getUserEvents (req, res){
        var date = (req.body.date ? (req.body.date) : (new Date()))
        
        User.findById(req.params._id, (err, user) => {
            if(err) return res.send(err)
    
            if (user==null) return res.send("UserId not found")
    
    
            const e = new UserEvent({
            userId: user["_id"],
            date : moment(date).format("ddd MMM DD YYYY"),
            duration : req.body.duration,
            type : req.body.type,
            data : req.body.data,
            description : req.body.description
            
        })
            e.save((err, event) => {
                if(err) return console.log(err)
    
                let new_object = {}
                new_object["_id"] = user["_id"]
                new_object["username"] = user["username"]
                new_object["type"] = user["type"]
                new_object["data"] = user["data"]
    
                new_object ["date"] = moment(date).format("ddd MMM DD YYYY")
                new_object ["duration"] = parseInt(req.body.duration),
                new_object ["description"] = req.body.description
    
                res.json(new_object)
            })
        })
    }

    getUserLogs(req, res){
        let from_date = req.query.from 
        let to_date = req.query.to 
        let limit_res = req.query.limit
        let userId = req.params._id
      
      
        User.findById(req.params._id, (err, user) => {
              if(err) return res.send(err)
      
              if (user==null) return res.send("UserId not found") 
      
              let events = UserEvent.find({userId: user["_id"]})
              if(from_date != undefined && to_date != undefined){
      
                from_split = from_date.split("-")
                to_split = to_date.split("-")
      
                events = UserEvent.find({userId: user["_id"], date: {
                    $gte: moment(from_date).toDate(),
                    $lt: moment(to_date).toDate()
                }})
              }
      
      
              if (limit_res != undefined){
                events.limit(parseInt(limit_res))
              }
      
              events.select({
                userId: 0, _id: 0
              })
      
              events.exec((err, docs) => {
                if (err) return console.log(err)
      
                 let new_object = {}
                  new_object["_id"] = user["_id"]
                  new_object["username"] = user["username"]
                  new_object["log"] = docs
                  new_object["count"] = docs.length
      
                  
      
                res.json(new_object)
              })
      
        })
      }

}


module.exports = UserController