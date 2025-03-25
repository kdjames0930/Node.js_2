const TodoTask = require("../models/todoTask")

var moment = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

/*
[Model].find(filter, [options], [callback])
filter: {} 모든 데이터
options: {sort: {date: -1}} date를 기준으로 내림차순으로
callback: function(err, tasks{}) {} tasks로 받아와 res.render로 todo 페이지를 보여줌
*/.
// 이렇게 작성하면 외부에서 controller.(메소드) 이렇게 사용 가능함
exports.get = function(req, res) {
    console.log("-----------TODO-----------")
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.render("todo", {todoTasks: tasks})
    })
}

exports.write = async function(req, res) {
    try{
        const todotask = new TodoTask({
            content: req.body.content,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        await todoTask.save() // db에 저장
        console.log("====Success! Saved new todo task====")
        console.table([{id: todoTask._id, content: todotask.content, date: todoTask.date}])
        res.redirect("/todo") // localhost:3000/todo로 귀환
    }catch(err) {
        console.err("====Fail! Save Todo Task====")
        res.ridirect("/todo")
    }
}

exports.edit = function(req, res) {
    const id = req.params.id
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.render("todo-edit", {todoTasks: tasks, idTask: id})
    })
}

exports.update = function(req, res) {
    const id = req.params.id
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err){
            console.log("====Failed updating todo task!====")
            console.error(err)
        }
        console.log("====Success! Updated TodoTask====")
        console.log("id: " + id + "\changed content: " +req.body.content)
        res.redirect("/todo")
    })
}

exports.remove = function(req, res) {
    const id = req.params.id
    TodoTask.findByIdAndRemove(id, err=> {
        if(err) {
            console.log("====Failed removing TodoTask====")
            console.error(err)
        }
        console.log("====Successfully Removed TodoTask====")
        console.log("id:: " + id)
        res.redirect("/todo")
    })
}