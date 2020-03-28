const router = require('express').Router();
// const controller = require('../../controllers/api/blog');
// const recommender = require("recommender")
// const userModel=require("../../models/User")

//fix my github.com/imabp
const reccomender=require('ger');





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
    `${course1}`,9
    `${course2}`,
    `${course3}`,
    `${course4}`,
    `${course5}`
];
console.log(documents)

let sortedDocs='';
recommender.tfidf(query, documents, (sortedDocs) => {
    console.log(sortedDocs);
});

//send sortedDocs to Controller blog.js for displaying
// router.get('/blogs', controller.blog);

module.exports = router;