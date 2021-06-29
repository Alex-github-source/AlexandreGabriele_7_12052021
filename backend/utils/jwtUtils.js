const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET='RANDOM_TOKEN_SECRET';
module.exports={
   generateToken:function(user){

    return jwt.sign(
                { userId: user.id,
                  isAdmin:user.isAdmin},            //token pour l'authentification
                JWT_SIGN_SECRET,
                { expiresIn : '1h'})
   } ,

   parseAuthorization:function(authorization){
       return (authorization !=null) ? authorization.replace('Bearer','') : null;
   },
   getUserId:function(authorization){
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
       
   
}
