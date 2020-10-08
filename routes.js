const express = require("express");
const router = express.Router();
const passport = require("passport");
const articleController = require("./controllers/articleController");
const authorController = require("./controllers/authorController");
const commentController = require("./controllers/commentController");

router.get("/", articleController.show);
router.get("/articulo/:id", articleController.showOne);
router.get("/admin", articleController.showInAdmin);
router.get("/articulo/eliminar/:id", articleController.destroy);
router.post("/articulo/crear", articleController.store);
router.post("/articulo/modificar", articleController.modify);
router.post("/articulo/:id", commentController.store);
router.post("/autor/crear", authorController.store);
router.get("/api/articulos", articleController.showInApi);

module.exports = router;
