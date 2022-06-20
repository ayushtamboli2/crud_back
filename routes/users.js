var express = require('express');
var router = express.Router();
var db = require('../dbConnection');

// Get API
router.get('/data', function (req, res, next) {
  db.query('select * from login_master', (err, results) => {
    if (err) {
      console.log(err, "Error")
    } else if (results) {
      res.send({
        success: true,
        data: results
      })
    } else {
      console.log("No data found")
    }
  })
});

//Delete API by Id
router.delete('/delete/:id', function(req,res,next){
  db.query('DELETE FROM login_master WHERE id =?',[req.params.id], (err, results)=>{
    if(err){
      console.log(err)
      res.send({
        success: false,
        data: err
      })
    }else if(results.affectedRows){
      res.send({
        success: true,
        data: results.affectedRows
      })
    }else{
      res.send({
        success: false,
        data: "No data found!"
      })
    }
  })
})

//Post API
router.post('/post', function(req, res, next){
  db.query('INSERT INTO login_master (name,email,password) VALUES (?,?,?)',
  [req.body.name, req.body.email, req.body.password],(err,results)=>{
    if(err){
      res.send({
        success: false,
        data: err
      })
    }else if(results.affectedRows){
      res.send({
        success: true,
        data: results
      })
    }else{
      res.send({
        success:false,
        data: "data not submited"
      })
    }
  })
})


//Get API by Id
router.get('/get/:id', function(req,res,next){
  db.query('SELECT * FROM login_master WHERE id=?',[req.params.id],(err, results)=>{
    if(err){
      res.send({
        success:false,
        data: err
      })
    }else if(results){
      res.send({
        success:true,
        data: results
      })
    }else{
      res.send({
        success:false,
        data: "Something went wrong"
      })
    }
  })
})

// Update API
router.put('/update/:id', function(req,res,next){
  db.query('UPDATE login_master SET name=?, email=?, PASSWORD =? WHERE id=?',[req.body.name, req.body.email,req.body.password, req.params.id],(err,results)=>{
    if(err){
      res.send({
        success: false,
        data: err
      })
    }else if(results){
      res.send({
        success: true,
        data: results
      })
    }else{
      res.send({
        success: false,
        data: "Something went wrong"
      })
    }
  })
})


//How to use async await (Example)
router.get('/async', function (req, res, next) {
  async function myFunction() {
   let dataPromise= new Promise((resolve,reject)=>{
     setTimeout(()=>{
      resolve("b")
     },1000);
   })
   console.log("a")
   let x = await dataPromise;
   console.log(x)
   console.log("c")

  }
  myFunction().then(
    function (value) { console.log("success"); },
    function (error) { console.log("Failiure"); }
  );
});

module.exports = router;
