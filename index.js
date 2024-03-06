//require the express and start the server
const express = require("express");
const app = express();

//to use ejs set the path
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}));//to parse the data and add it using POST route
app.use(express.static(path.join(__dirname, "public")));//to use style.css

app.listen(8080, ()=>{
    console.log("port is listening at 8080");
})

//connect mongoDB with express
const mongoose = require("mongoose");
main().then(()=>console.log("connection successfull"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/OCS');
}

//Schema(cols)
const userSchema = new mongoose.Schema(
    {
        userid: {
            type:String,
            required:true, //same as not null in sql
            unique:true //works same as primary key in sql 
        },
        password_hash:{
            type:String,
            required:true
        },
        role:{
            type: String,
            required: true
        }
    }
);

//create Collection(or table)
const User = new mongoose.model("User", userSchema);

//to hash_password using md5 using crypto-js package
const crypto = require('crypto-js');
function hashPassword(password) {
    // Hash the password using MD5 algorithm
    const hashedPassword = crypto.MD5(password).toString();

    return hashedPassword;
}

//storing documents(or an entire row in sql ) in collection(or table) named User
// const userData = [
//     {userid:"admin_test", password_hash: hashPassword("password"), role:"admin"},
//     {userid:"basic_test_user", password_hash: hashPassword("password123"), role:"basic"},
//     {userid:"lakshya", password_hash: hashPassword("password"), role:"basic"},
//     {userid:"user1", password_hash: hashPassword("passwordabc"), role:"basic"},
//     {userid:"user2", password_hash: hashPassword("password"), role:"basic"},
// ]
// //insertMany returns a promise so, use a then-catch methid on it.
// User.insertMany(userData).then((res)=>console.log(res))
// .catch((err)=>{console.log(err)});

app.get("/",(req, res)=>{
    res.render("index.ejs");
});

//post route
app.post("/data", async (req,res)=>{
    let {userid, password} = req.body;
    // console.log(userid);
    // res.send({user});
    // const user = await User.findOne({ userid });
    // res.redirect(user);

    const user = await User.findOne({userid})
    if(!user || user.password_hash!=hashPassword(password)){
        return res.status(404).send("User not found");
    }

    if(userid=="admin_test"){
        const allUsers = await User.find();
        res.render("allUserDetail.ejs", {allUsers});
    }
    else{
        res.render("userDetail.ejs", {user});
    }
})

//for fetching again
app.post("/", (req,res)=>{
    res.redirect("/")
})



