
const express = require('express');



const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
  });
  
  router.post("/api/users",  (req, res) => {
    let name = req.body.username
  
    User.findOne({username: name}, function(err, data){
      if (err) return console.log(err)
  
      if (data == null){
        let newUser = User({
          username: name
        })
  
        newUser.save((err, data) => {
          if (err) return console.log(err)
  
          res.json(data)
        })
      }else{
        res.json("Username already taken")
      }
    })
  })
  
  router.get("/api/users", async (req, res) => {
    users = await User.find({});
    res.json(users)
  });
  
  router.post('/api/users/:_id/exercises', (req, res) => {
      var date = (req.body.date ? (req.body.date) : (new Date()))
      
      User.findById(req.params._id, (err, user) => {
          if(err) return res.send(err)
  
          if (user==null) return res.send("UserId not found")
  
  
          const e = new Exercise({
          userId: user["_id"],
          date : moment(date).format("ddd MMM DD YYYY"),
          duration : req.body.duration,
          description : req.body.description
          
      })
          e.save((err, exercise) => {
              if(err) return console.log(err)
  
              let new_object = {}
              new_object["_id"] = user["_id"]
              new_object["username"] = user["username"]
  
              new_object ["date"] = moment(date).format("ddd MMM DD YYYY")
              new_object ["duration"] = parseInt(req.body.duration),
              new_object ["description"] = req.body.description
  
              res.json(new_object)
          })
      })
  })
  
  router.get("/api/users/:_id/logs", (req, res) => {
    from_date = req.query.from 
    to_date = req.query.to 
    limit_res = req.query.limit
    userId = req.params._id
  
  
    User.findById(req.params._id, (err, user) => {
          if(err) return res.send(err)
  
          if (user==null) return res.send("UserId not found") 
  
          let exercises = Exercise.find({userId: user["_id"]})
          if(from_date != undefined && to_date != undefined){
  
            from_split = from_date.split("-")
            to_split = to_date.split("-")
  
            exercises = Exercise.find({userId: user["_id"], date: {
                $gte: moment(from_date).toDate(),
                $lt: moment(to_date).toDate()
            }})
          }
  
  
          if (limit_res != undefined){
            exercises.limit(parseInt(limit_res))
          }
  
          exercises.select({
            userId: 0, _id: 0
          })
  
          exercises.exec((err, docs) => {
            if (err) return console.log(err)
  
             let new_object = {}
              new_object["_id"] = user["_id"]
              new_object["username"] = user["username"]
              new_object["log"] = docs
              new_object["count"] = docs.length
  
              
  
            res.json(new_object)
          })
  
    })
  })


  module.exports = router