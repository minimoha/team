const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/article");

router.post("/articles", articleCtrl.createArticle);
router.put("/articles/:articleId", articleCtrl.editArticle);
router.delete("/articles/:articleId", articleCtrl.deleteArticle);
router.post("/articles/:articleId/comment", articleCtrl.createArticleComment);
router.get("/feed", articleCtrl.getAllArticles)
router.get("/articles/:articleId", articleCtrl.getOneArticle);

module.exports = router;