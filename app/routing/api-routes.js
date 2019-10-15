var friends = require("friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        //Take results from user's survey POST and parse it
        var userData = req.body;
        var userScore = userData.scores;

        // variable that calculate diff between user's scores and scores of others in database
        var totalDifference = 0;

        // loop thru all friends posibilities in database
        for (var i = 0; 1 < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            // loop thru scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {

                //we calculate teh difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //If the sum of diff is less than the diff of the current "best Match"
                if (totalDifference <= bestMatch.friendDifference) {

                    //reset the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }

        }
        //save user's data to database
        friends.push(userData);

        //Return a JSON with user's bestMatch -- to be used by the html in the enxt page
        res.json(bestMatch);

    });
}
