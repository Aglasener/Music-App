const router = require("express").Router();
const usersController = require("../../controllers/UserController");

const passport = require("passport")

const playlistController = require("../../controllers/PlaylistController");


router.route("/")
    .get(usersController.findAll)
    // .post(usersController.validate, usersController.create)

router.post("/", function(req,res) {
    console.log("at api/users file " + JSON.stringify( req.body ))
    
        usersController.create(req,res)
    
})

router.route("/logout")
    .post(usersController.logout)

router.post("/login", function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
passport.authenticate('local'),
(req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
        username: req.user.username,
        _id: req.user._id
    };
    res.send(userInfo);
}
)

router.route("/profile")
    .get(usersController.loggedIn)

router.route("/:id")
    .get(usersController.findbyID)
    .post(playlistController.create)
    .delete(playlistController.remove)
    
router.route("/playlists/:id")
    .get(playlistController.findbyID)
    .put(playlistController.update)
    .delete(playlistController.removeSong)

router.route("/playlists/songs/:id")
    .put(playlistController.removeSong)

module.exports = router;