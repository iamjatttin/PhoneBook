var express = require('express');
var router = express.Router();
//connection urls
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phonebook');
//schemass
var contactSchema = mongoose.Schema({
  name: String,
  contact: Number,
  email:String,
  address:String
});
var addressSchema = mongoose.Schema({
  name: String,
  contact: Number,
  email:String,
  city:String,
  zipcode:String,
  street:String
});
//creating user model :: This model will be used for every crud operations
var contact = mongoose.model("contact", contactSchema);
var address = mongoose.model("address", addressSchema);
//connection operation routes
router.get('/',(req, res) => {
contact.find((err, docs) => {
  if (!err) {
      res.render("index", {
          result: docs
      });
  } else {
      console.log('Failed to retrieve the Contact List: ' + err);
  }
});

  });
  router.get('/getAllContact',(req, res) => {
    contact.find((err, result) => {
      if (!err) {
          res.send({result: result});
      } else {
          console.log('Failed to retrieve the Contact List: ' + err);
      }
    });
    
      });
      // Address Post Route
      router.post('/addAddress', function(req, res){
        var Address = req.body; //Get the parsed information
        // res.send(personInfo)
           var newAddress = new address({
            name: Address.name,
            contact: Address.contact,
            email: Address.email,
            city: Address.city,
            zipcode: Address.zipcode,
            street: Address.street
              
           });
           newAddress.save(function(err, Person){
            if(err) throw err
              if(err){
                 res.send("error in save")
              }
              else{
                res.redirect("/")
              }
           });
        
     });     
    //  Contact post Route
router.post('/', function(req, res){
    var personInfo = req.body; //Get the parsed information
    // res.send(personInfo)
    
       var newPerson = new contact({
          name: personInfo.name,
         contact: personInfo.contact,
          email: personInfo.email,
        address: personInfo.address
       });
       newPerson.save(function(err, Person){
        if(err) throw err
          if(err)
             res.send("error in save")
          else
             res.redirect("/")
       });
    
 });
 router.get("/delete/:id",function(req,res){
   contact.remove({_id: req.params.id},function(err){
    if(err) res.json(err);
    res.redirect("/")
  });
})
module.exports = router;