//Session checking middleware 

module.exports = function(req,res,next){
    if (req.session.userId) {
        next();
    } else {
        res.render('./../views/error.pug', { error : "You need to be logged in!"})
    }
}