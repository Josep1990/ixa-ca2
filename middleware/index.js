const middlewareObj = {};
 
//======================================================================================

middlewareObj.isLoggedin = function(req, res, next){ //checks if user is logged in before save or delete any movie
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please, Login");
    res.redirect("/login");
}


module.exports = middlewareObj;