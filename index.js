import express from "express"
// npm init -y
// npm i express
// npm i ejs
let posts = [
    "I'm so happy today!",
    "I bought 12 shrimps and they arrived !",
    "Exam was easy !",
];
for(let i = 0; i < 100; i++){
    posts.push("I'm so happy today!");
}
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
    posts.push(req.body["newPost"]);
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
