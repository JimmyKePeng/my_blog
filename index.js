import express from "express"
// npm init -y
// npm i express
// npm i ejs

let posts = [
    {"title" : "happy", "post": "I'm so happy today!"},
    {"title" : "shrimp", "post": "I bought 12 shrimps and they arrived !"},
    {"title" : "exam", "post": "Exam was easy !"},
];
// let posts = {
//     ""
// };
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


let name = "Anonymous";

app.get("/", (req,res)=>{
    res.render("index.ejs",{name, posts});
})

app.post("/submit", (req,res)=>{
    name = req.body["name"];
    res.redirect("/");
})  


app.post("/deletePost", (req,res)=>{
    let index = req.body["index"];
     console.log(index);
    posts.splice(index,1);
    res.redirect("/");
})  

app.post("/newPost", (req,res)=>{
    let newPost = req.body["newPost"];
    let title = req.body["title"];
    posts.push({"title" : title, "post": newPost});
    res.render("index.ejs", {name, posts});
})  

app.get("/about", (req,res)=>{
    let postsSize = posts.length
    res.render("about.ejs", {postsSize});
})
app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
})

app.listen(port,()=>{
    console.log(`Running on ${port}.`)
})
