# blog-api-backend

POSTS AND COMMENTS:

GET /posts - Get all Posts
GET /posts/:postId - Get Single Post By Id

GET /posts/:postId/comments - Get all Comments By Post
GET /posts/:postId/comments/:commentId - Get a Single Comment By Post

POST /posts - Create New Post
POST /posts/:postId/comments - Create New Comment By Post

PUT /posts/:postId - Update Single Post
PUT /posts/:postId/comments/:commentId - Update Single Comment By Post

DELETE /posts/:postId - Delete Single Post
-Need ON DELETE CASCADE, so all comments automatically removed
DELETE /posts/:postId/comments/:commentId - Delete Single Comment By Post
