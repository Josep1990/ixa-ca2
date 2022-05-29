const express    = require("express"),
      router     = express.Router(),
      passport   = require("passport"),
      User       = require("./../models/user");
      


//==============================================================================================
//                                  ROUTES
//==============================================================================================


//Show Router ---------Sign up form
router.get("/register", function(req, res){
    res.render("user/register");
});

//Create route --------- Sign up
router.post("/register", function(req, res){
   const newUser = new User ({ username: req.body.username, email: req.body.email});    
   
   User.register(newUser, req.body.password, function(err, user){
       if(err){           
            req.flash("error", err.message);
            return res.redirect("/register");
        }else{
           passport.authenticate("local")(req, res, function(){
               req.flash("success", "Welcome " + user.username);
               res.redirect("/index");
           });
       }
   });

});

//Show route ---------Login form
router.get("/login", function(req, res){
    res.render("user/login");
});

//Create route -------Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "back",
    failureFlash: true
}),function(rea, res){

});

//index route --------Logout
router.get("/logout", function(req, res, next){

    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged you out, Thank you for coming.");
        res.redirect("/");
      });  
   
});

module.exports = router;