const db = require("../models/index");
const User = db.users;
const passport = require('passport');
const Op = db.Sequelize.OP;
const Event = db.events

// Register a new user
exports.create = (req, res) => {

    if (!req.body.username) {
        res.status(400).send({ message: "Username cannot be empty!" });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ message: "Password cannot be empty!" });
        return;
    }

    const users = {
        username: req.body.username,
        password: req.body.password
    };

    User.create(users)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred when registering a User"
            });
        });
};


exports.findAll = (req, res) => {
    const userid = req.query.id;
    const condition = userid ? {id: {[Op.like]: `%${userid}%`}} : null;

    User.findAll({ where: condition })
        .then(data => {

            res.send(data);
            console.log(data)

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


 //Log in
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   User.findOne({
       where:{username: username}
   }).then(user =>{
       if(!user)
           return res.status(400).send({
               message:"Incorrect Username"
           })
       if(user.password == password)
       {

           return res.status(200).send(
               {id: user.id,access:user.status}
           )}
       else
           {
           return res.status(400).send({
               message: "Incorrect Password"
           })
       }
   }).catch(err => {
       res.status(400).send({
           message: err.message
       })
   })
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};
// Delete by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
