const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
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
app.get('/', async function(req, res) {
    try {
        const contacts = await Contact.find({}).exec();
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error in fetching contacts from db', err);
        return res.status(500).send('Internal Server Error');
    }
});

// app.get('/',function(req,res){
//     // console.log('from the get route controller',req.myName);
//     Contact.find({name: "New"},function(err,contacts){
//         if(err){
//            console.log('Error in fetching contacts from db');
//            return;
//         }
//         return res.render('home',{
//             title:"Contact List",
//             contact_list : contacts
//     });
// });
// });

app.post('/create-contact',function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('**********', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.log("Error in creating a contact:", err);
        return res.redirect('back');
    });
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body);
    //db code
    // Contact.create({
    //     name:req.body.name,
    //     phone:req.body.phone
    // },function(err,newContact){
    //     if(err){
    //         console.log("error in creating a contact:");
    //         return;
    //     }
    //         console.log('**********',newContact);
    //         return res.redirect('back');
    // });
    // return res.redirect('back');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // console.log(req);
    // return res.redirect('/practice');
});
//for deleting the contact
app.get('/delete-contact', function(req, res) {
    console.log(req.query);

    // get the id from the query in the URL
    let id = req.query.id;

    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id)
        .then(result => {
            console.log('Contact deleted successfully:', result);
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error in deleting contact from the database:', err);
            res.status(500).send('Internal Server Error');
        });
});

// app.get('/delete-contact',function(req,res){
//     console.log(req.query);
//     //get the id from the query in the url
//     let id = req.query.id;
//     // find the contact in the database using id and delete
//     Contact.findByIdAndDelete(id,function(err){
//         if(err){
//             console.log('error in deleting an object from database');
//             return;
//         }
//         return res.redirect('back');
//     });
//     // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
//     // if(contactIndex != -1){
//     //     contactList.splice(contactIndex,1);
//     // }
// });
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