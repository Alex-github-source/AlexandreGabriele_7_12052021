const db = require('../models');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models/index.js');







exports.addComment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    try {


        const user = await db.User.findOne({
            attributes: ["pseudo", "id"],
            where: { id: userId }
        })
        if (user !== null) {
            const comment = await db.Comment.create({
                pseudo: user.pseudo,
                message: req.body.message,
                UserId: user.id,
                PostId: req.params.id
            });
            res.status(201).json({ comment: comment, commentId: comment.id, pseudo: comment.pseudo, message: "Commentaire ajouté ! " });
        } else {
            res.status(400).send({ error: "erreur serveur" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};

exports.getAllComments = async (req, res, next) => {

    try {
        const comments = await db.Comment.findAll({
            order: [["createdAt", "DESC"]]
        })
        return res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


exports.deleteComment = (req, res, next) => {


    db.Comment.destroy({
        where: {
            PostId: req.params.PostId,
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'Commentaires supprimés!' }))
        .catch(error => res.status(500).json(error))

};