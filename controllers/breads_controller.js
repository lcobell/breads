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
breads.get("/:id/edit", (req, res) => {
  Bread.findById(req.params.id).then((foundBread) => {
    console.log(foundBread);
    res.render("edit", {
      bread: foundBread,
    });
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
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});
// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;
