const bcrypt = require("bcrypt"); // chiffrement du password
const db = require("../models"); // mdèles de la bdd
const { Op } = require("sequelize");
const jwtUtils = require('../utils/jwtutils');
 //module pour l'authentificatiion


exports.signup = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (user !== null) {
      if (user.pseudo === req.body.pseudo) {
        return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        isAdmin: 0,
      });

      res.status(201).send({
        user: newUser,
       
        message: `Votre compte est bien créé ${newUser.pseudo} !`,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "email déjà utilisé"  });
  }
};

exports.login = async (req, res) => {

    db.User.findOne({ where: { email: req.body.email }})
    .then(user => {                                 
        if(!user){
            return res.status(401).json({ error : 'User non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)    //on compare le mot de passé rentré avec celui e la base de donnée
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'mauvais password'});
                }
            res.status(200).json({
                userId:user.id,
                user:user,
                token: jwtUtils.generateToken(user),
                isAdmin:user.isAdmin
             
            });
        }

        )
        .catch(error => res.status(500).json({error}))
}

)
.catch(error => res.status(500).json({ error}));
};
exports.getUserProfile =  async (req, res) => {
  // on trouve l'utilisateur et on renvoie l'objet user
  const id = req.params.id
  try {
    const user = await db.User.findOne({
      where: { id },
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
 
};
exports.getAllUsers = async (req, res) => {
  // on envoie tous les users sauf admin
  try {
    const users = await db.User.findAll({
      attributes: ["pseudo", "id" ,"email"],
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
exports.updateUserProfile = async (req, res) => {
  // modifier le profil
  const headerAuth=req.headers['authorization'];
  const userId=jwtUtils.getUserId(headerAuth)
    try {
        const user = await db.User.findOne({
            attributes:['id','pseudo','email','password'],
            where: { id: userId },
          });
          if(user.id){
              if(req.body.pseudo){
                  user.pseudo=req.body.pseudo;
              }
              if(req.body.email){
                  user.email=req.body.email;
              }
              if(req.body.password){
                  user.password=req.body.password;
              }
              const newUser= await user.save({fields:["pseudo","email","password"]});
              res.status(200).json({
                  user:newUser,
                  messageRetour:"Votre profil a été mis à jour",
              })
          }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
   

exports.deleteUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findOne({ where: { id: id } });
   
      db.User.destroy({ where: { id: id } }); // on supprime le compte
      res.status(200).json({ messageRetour: "utilisateur supprimé" });
    
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};