const express    = require("express"),
      router     = express.Router(),
      Movies      = require("./../models/movie");
      middleware = require("./../middleware");


//----------------------------------------------------------------------------------
//                              SHOW route

router.get("/", middleware.isLoggedin,function(req, res){
    //find all the objects in the database 
    Movies.find({}, function(err, allMovies){
        if(err){ 
            req.flash("error", "Sorry we could not find it");
            console.log(err + "from get route");
        }else{ //movies is our variable on the index.ejs
                         
            res.render("index", {movies: allMovies});
        }
    });
    
});

//------------------------------------------------------------------------------------
//                       CREATE ROUTE
router.post("/", middleware.isLoggedin, function(req, res){
    const title       = req.body.title,
          poster_path = req.body.poster_path,
          overview    = req.body.overview,
    author = { //req.user contains the information about the current logged in user
        id: req.user._id,
        username: req.user.username,
        
    }
    console.log(`the title is: ${title}  image source: ${poster_path} and overview ${overview}`);    
    const newMovie = {title:title, poster_path: poster_path, overview: overview, author:author}; //object to be add to the database
    //add new task to the list and database
    Movies.create(newMovie, function(err, newMovies){
        if(err){
            req.flash("error", "Sorry, please try again");
            console.log(err + "error from post route");
            res.redirect("/index");
        }else{                
            res.redirect("/index");
        }
    });    
});

//-------------------------------------------------------------------------------------
//                      DELETE ROUTE
router.delete("/:id", middleware.isLoggedin, function(req, res){

    Movies.findByIdAndDelete(req.params.id, function(err, deletedMovie){
        if(err){
            req.flash("error", "Sorry, please try again");
            console.log(err + "error from delete route");
            res.redirect("/index");
        }else{
            req.flash("success", "Movie deleted");
            res.redirect("/index");
        }
    });
})

module.exports = router;