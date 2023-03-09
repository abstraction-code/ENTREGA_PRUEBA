const express = require("express");

const viewController = require("../controllers/view.controller");
const userController = require("../controllers/user.controller");
const { Auth } = require("../controllers/auth.midelware");

const router = express.Router();

router.get("/", viewController.getHome); //INDEX
router.get("/login",Auth, viewController.getLogin); //LOGIN
router.post("/login", userController.loginUser);



router.get("/register", viewController.getRegister);
router.post("/register", userController.postUser);
router.post("/logout", userController.logout);


router.get("/addPost", Auth, viewController.getFormPost);
router.post("/addPost",Auth, userController.addPost);
router.get("/post/:id", viewController.getPostById);
router.post("/addComment", Auth, userController.addComment);
router.post('/post/:id/like', Auth, userController.getLikes)










module.exports = router;