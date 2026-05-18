const express = require("express");
const { getAllNotes, createNote, updateNote, deleteNote, getNodeById } = require("../controllers/notesController.js");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id",getNodeById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id",deleteNote);

module.exports = router;
