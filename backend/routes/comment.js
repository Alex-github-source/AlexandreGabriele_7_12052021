const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

// Routes

router.post("/:id/comments", auth,commentCtrl.addComment);
router.get("/:id/comments", commentCtrl.getAllComments);
router.delete("/:PostId/comments/:id", commentCtrl.deleteComment);


module.exports = router;