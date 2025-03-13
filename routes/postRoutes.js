const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createNewPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.get("/:postId/comments", commentController.getAllCommentsByPost);
router.get("/:postId/comments/:id", commentController.getCommentByPost);
router.post("/:postId/comments", commentController.createNewCommentByPost);
router.patch("/:postId/comments/:id", commentController.updateCommentByPost);

module.exports = router;
