const router = require('express').Router();
// const controller = require('../../controllers/api/blog');
// const recommender = require("recommender")
// const userModel=require("../../models/User")


//fix by https://github.com/imabp ----------------------------------------
const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocuments: 100
});
//we are using content based recommender.
// -------------------------------------------------------------------------------------

//find user using userId
// let userId=req.query; 
// let user=userModel.findById(userId);
let user={
    postsLiked:"politcal science",
    interests:"english",
    comments:"hindi is really interesting",
    skills:"Politics"
};

//users->likes, interests, comments, skills
let query = `${user.postsLiked} ${user.interests} ${user.comments} ${user.skills}`
console.log(query)

let course1='science';
let course2='engineering';
let course3='english';
let course4='Mathematics';
let course5 = 'accounts';

//new posts and new courses
let documents = [
    `${course1}`,
    `${course2}`,
    `${course3}`,
    `${course4}`,
    `${course5}`
];
console.log(documents)
//fix by https://github.com/imabp ----------------------------------------
recommender.train(documents);
// -------------------------------------------------------------


let sortedDocs='';


//fix by https://github.com/imabp ----------------------------------------
const sortedDocs = recommender.getSimilarDocuments(query, 0, 10);
console.log(sortedDocs);
// ----------------------------------------------------------------------


//send sortedDocs to Controller blog.js for displaying
// router.get('/blogs', controller.blog);



module.exports = router;