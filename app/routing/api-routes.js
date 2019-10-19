// var path = require('path');

//Link route to data sources
var friends = require("../data/friends");


//Making the route
module.exports = function (app) {

    //API GET request  when user visits a link
    app.get("/api/friends", function (_req, res) {
        res.json(friends);
    });

    //API POST Request - when user submits a data back via jSON
    app.post("/api/friends", function (req, res) {

        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        //Take results from user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        // variable that calculate diff between user's scores and scores of others in database
        var totalDifference;

        // loop thru all friends posibilities in database
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            // loop thru scores of each friend
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                //we calculate teh difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }
            //If the sum of diff is less than the diff of the current "best Match"
            if (totalDifference <= bestMatch.friendDifference) {

                //reset the bestMatch to be the new friend
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriendScore.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        
        //save user's data to database
        friends.push(userData);

        //Return a JSON with user's bestMatch -- to be used by the html in the enxt page
        res.json(bestMatch);

    });
};
