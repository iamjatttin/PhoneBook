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

  // Update this route as per react and research

  router.get('/getAllContact', async (req, res) => {
      contact.find({}).then(function (result) {
        res.send({result: result});
        });
      
    });
    
    router.get("/api/delete/:id",function(req,res){
      contact.remove({_id: req.params.id},function(err){
       if(err) res.json(err);
       res.send({result: "success"});
     });
   })
   router.post('/api/add', function(req, res){
    var personInfo = req.body; //Get the parsed information
    // res.send(personInfo)
    console.log(personInfo)
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
             res.send({result: "success"})
       });
  });
  router.post('/api/edit',async function(req, res){
    var personInfo = req.body; //Get the parsed information
    // res.send(personInfo)
    console.log(personInfo._id)
    note = await contact.findByIdAndUpdate(personInfo._id, { $set: personInfo })
    res.json({result:"success" });

  });
   //connection operation routes
router.get('/', (req, res) => {
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