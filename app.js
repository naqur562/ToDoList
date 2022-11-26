const express = require("express")
const bodyParser = require("body-parser")
const { render } = require("ejs")
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/todoDB")

const todoTodaySchema = new mongoose.Schema({
    name: String
})

const todoWorkSchema = new mongoose.Schema({
    name: String
})

const todayTask = mongoose.model("TodayTask", todoTodaySchema)
const workTask = mongoose.model("WorkTask", todoWorkSchema)

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')


// Get Today List
app.get("/", function(req, res){

    var day = date.getDate()

    todayTask.find(function(err, todayItems){
        res.render('list', {listTitle: day, items: todayItems})
    })


})


// Get Work List

app.get("/work", function(req, res){
    workTask.find(function(err, workItems){
        res.render('list', {listTitle: "Work", items: workItems})
    })
})

// Add Task

app.post("/", function(req, res){

    var item = req.body.newItem
    var listType = req.body.list

    if (listType == "Work"){
        const task = new workTask({
            name: item
        })
        task.save()
        res.redirect("/work")
    } else {
        const task = new todayTask({
            name: item
        })
        task.save()
        res.redirect("/")
    }

})


app.listen(3000, function(){
    console.log("Server open on port 3000")
})