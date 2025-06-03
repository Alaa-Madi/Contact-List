const express = require("express");
const router = express.Router();
const contactModel = require("../models/contactModel");

// GET all contacts
router.get("/", (req, res) => {
  res.json(contactModel.findAll());
});

// GET one contact
router.get("/:id", (req, res) => {
  const contact = contactModel.findById(Number(req.params.id));
  if (!contact) return res.status(404).json({ error: "Not found" });
  res.json(contact);
});

// POST create
router.post("/", (req, res) => {
  const newContact = { ...req.body, id: Date.now() };
  const created = contactModel.create(newContact);
  res.status(201).json(created);
});

// PUT update
router.put("/:id", (req, res) => {
  const updated = contactModel.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

// DELETE
router.delete("/:id", (req, res) => {
  contactModel.remove(Number(req.params.id));
  res.json({ message: "Deleted" });
});

module.exports = router;
