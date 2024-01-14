const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     req.myName="Bijay";
//     //console.log('middleware 1 called');
//     next();
// });
// //middleware 2
// app.use(function(req,res,next){
//     console.log('My name from mw2',req.myName);
//     //console.log('middleware 2 called');
//     next(); 
// })
var contactList = [
    {
        name:"Bijay",
        phone:"7829574362"
    },
    {
        name:"amod",
        phone:"7070953996"
    }
]
app.get('/',function(req,res){
    // console.log('from the get route controller',req.myName);
    return res.render('home',{title:"Contact List",
    contact_list : contactList
});
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });
    contactList.push(req.body);
    return res.redirect('back');
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone);
    // console.log(req);
    // return res.redirect('/practice');
});
app.get('/practice',function(req,res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
})
// app.get('/',function(req,res){//here in the place of get we can also used put, post , delete , patch
//     console.log(__dirname);
//     res.send('Cool,it is running! or is it?');
// });



app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("Yup! My Express Server is running on Port",port);
});