const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const {body,validationResult} = require('express-validator');

const sanitize = (req, res, next) => {            //on desinfecte les champs du formulaire

    const error = validationResult(req);
    if(!error.isEmpty()) {                  
        return res.status(400).json({error})  
    }
    next();     
};

router.post("/signup",[                //route pour enregistrer l'user dans l'API
body('email').isEmail(),
body('password').isLength({min:6})
],sanitize,
 userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/",  userCtrl.getAllUsers);
router.put("/:id",   userCtrl.updateUserProfile);
router.get("/:id",  userCtrl.getUserProfile);
router.delete("/:id",  userCtrl.deleteUserProfile);

module.exports = router;