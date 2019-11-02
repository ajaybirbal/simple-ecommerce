//Session checking middleware 

module.exports = function(req,res,next){
    if (req.session.userId) {
        next();
    } else {
        res.send("User needs to logged in to access this page!");
    }
}