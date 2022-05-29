require("dotenv").config();  //load all the enviroment varialbes on the serve
const express = require("express"),
    router = express.Router(),
    axios = require('axios');


//get movies from api and render as html using ejs template management    

router.get("/", function(req, res){ // render the landing page html file
    res.render("landing"); 
});

router.get("/movies", function (req, res) { //render all the popular movies from the TMDB Movies API
    let movies;

    function loadMovie(err, allMovies) {

        axios.get(process.env.POPULAR_MOVIES) //fecthing data though axios from the api
            .then(response => {             
                res.render("movies/popular", { movies: response.data.results }); // saving all the result that come as a JSON to an array ot be rendered as html
            })
            .catch(error => {
                console.log(error);
            });
    }

    loadMovie();
});

router.get("/top-rate", function (req, res) {
    let movies;

    function loadMovie(err, allMovies) {

        axios.get(process.env.TOP_RATED) 
            .then(response => {             
                res.render("movies/toprated", { movies: response.data.results });// saving all the result that come as a JSON to an array ot be rendered as html
            })
            .catch(error => {
                console.log(error);
            });
    }

    loadMovie();
});

router.get("/upcoming", function (req, res) {
    let movies;

    function loadMovie(err, allMovies) {

        axios.get(process.env.UPCOMIMG)
            .then(response => {             
                res.render("movies/upcoming", { movies: response.data.results });// saving all the result that come as a JSON to an array ot be rendered as html
            })
            .catch(error => {
                console.log(error);
            });
    }

    loadMovie();
});

module.exports = router;