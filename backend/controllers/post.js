const db=require('../models');
const fs = require("fs");


exports.createPost =  async (req, res ) => {
    
         const {userId,message}=req.body
         let imageUrl;
    try {
        

        const user=await db.User.findOne({
            attributes: ["pseudo", "id"],
            where: { id: userId }})
        if(user !==null){
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get("host")}/upload/${
                  req.file.filename
                }`;
              } else {
                imageUrl = null;
              }
        const post = await db.Post.create({ 
            include: [
                {
                  model: db.User,
                  attributes: [ "id"],
                },
              ],
              message,
             UserId:user.id, 
             link:req.body.link,
             imageUrl:imageUrl
            });
                res.status(201).json({ post:post,postId:post.id, message:"Post ajouté ! " });
        }else{
            res.status(400).send({ error:"erreur serveur" });
        }
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
};

exports.getPosts = async (req,res) =>{
try {
    const posts = await db.Post.findAll({
        attributes: ["id", "message", "imageUrl", "createdAt"],
        order: [["createdAt", "DESC"]],
        include:[
            {
                model:db.User,
                attributes: ["pseudo", "id"],

            },
            {
                model:db.Comment,
                attributes: ["message", "pseudo", "UserId", "id"],
                order:[["createdAt","DESC"]],
                include: [
                    {
                        model: db.User,
                        attributes: [ "pseudo"],
                    },
                ],
            }]
        })
    return res.json(posts)
} catch (error) {
    console.log(error)
    res.status(500).json(error)
}       
};
exports.getPost = async (req,res) =>{
    try {
        const post = await db.Post.findOne({
            where:{ id:req.params.id },
            include:[db.User]})
        return res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }       
    };
exports.updatePost = async (req,res) =>{
        try {
            let newImageUrl;

            const post = await db.Post.findOne({
                where:{ id:req.params.id },
                include:[db.User]})

                if(post.id){
                    if (req.file) {
                        newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
                          req.file.filename
                        }`;
                        if (post.imageUrl) {
                          const filename = post.imageUrl.split("/upload")[1];
                          fs.unlink(`upload/${filename}`, (err) => {
                            if (err) console.log(err);
                            else {
                              console.log(`Deleted file: upload/${filename}`);
                            }
                          });
                        }
                    if(req.body.message){
                        post.message=req.body.message
                    }
                    if(req.body.link){
                        post.link=req.body.link
                    }
                    if(req.body.imageUrl){
                    post.imageUrl=newImageUrl;
                    }
                    const newPost= await post.save({fields:["message","link","imageUrl"]});
                    res.status(200).json({
                        post:newPost,
                        messageRetour:"Votre post a été mis à jour",
                    })
                }
                }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }       
        };
        exports.deletePost = async (req, res) => {
            try {
              const id = req.params.id;
              const post = await db.Post.findOne({ where: { id: id } });
              if (post.imageUrl) {
                const filename = post.imageUrl.split("/upload")[1];
                fs.unlink(`upload/${filename}`, () => {
                db.Post.destroy({ where: { id: id } }); // on supprime le post
                res.status(200).json({ messageRetour: "Post supprimé" });
            });} else {
                db.Post.destroy({ where: { id: post.id } }, { truncate: true });
                res.status(200).json({ message: "Post supprimé" });
              }
              
            } catch (error) {
              return res.status(500).send({ error: "Erreur serveur" });
            }
          }
        
    
    
     