const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

module.exports = router;
