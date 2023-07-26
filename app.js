const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRoute= require('./routes/authRoutes');
const authMiddlewares= require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs')

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
// const dbURI = 'mongodb+srv://purvilpatel1234:1234@cluster0.h1jl7ko.mongodb.net/userDatabase';
const uri= 'mongodb+srv://purvilpatel1234:1234@cluster0.h1jl7ko.mongodb.net/userDatabase'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000,()=>{console.log("Surver is running..")}))
  .catch((err) => console.log(err));
 
// routes
app.get('*',authMiddlewares.checkUser);
app.get('/',(req,res)=>{res.render('home')});
app.get('/smoothies',  authMiddlewares.requireAuth  ,(req,res)=>{res.render('smoothies')});
app.use(authRoute);



// app.listen(Process.env.PORT, (req,res)=>{
//     console.log("server running")
// })
