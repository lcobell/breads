const express = require("express");
const { isValidObjectId } = require("mongoose");
const breads = express.Router();
const Bread = require("../models/bread.js");
// INDEX

breads.get("/", (req, res) => {
  Bread.find().then((foundBreads) => {
    res.render("index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});
// NEW
breads.get("/new", (req, res) => {
  res.render("new");
});
// EDIT
breads.get("/:indexArray/edit", (req, res) => {
  res.render("edit", {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray,
  });
});

// SHOW - Avery helped here
breads.get("/:id", (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("Is it here");
  }
  Bread.findById(req.params.id).then((foundBread) => {
    res.render("show", {
      bread: foundBread,
    });
  });
});
// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});
// UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread[req.params.arrayIndex] = req.body;
  res.redirect(`/breads/${req.params.arrayIndex}`);
});
// DELETE
breads.delete("/:", (req, res) => {
  Bread.splice(req.params.indexArray, 1);
  res.status(303).redirect("/breads");
});

module.exports = breads;
