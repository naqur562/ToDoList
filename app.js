const express = require("express")
const bodyParser = require("body-parser")
const { render } = require("ejs")
const date = require(__dirname + "/date.js")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

var todayItems = []
var workItems = []

// Get Today List
app.get("/", function(req, res){
    var day = date.getDate()
    res.render('list', {listTitle: day, items: todayItems})
})


// Get Work List

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work", items: workItems})
})

// Add Task

app.post("/", function(req, res){

    var item = req.body.newItem
    var listType = req.body.list

    if (listType == "Work"){
        workItems.push(item)
        res.redirect("/work")
    } else {
        todayItems.push(item)
        res.redirect("/")
    }

})


app.listen(3000, function(){
    console.log("Server open on port 3000")
})