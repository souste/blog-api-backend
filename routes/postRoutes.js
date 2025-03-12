const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createNewPost);

module.exports = router;
