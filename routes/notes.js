const express = require("express");
const {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { handleNoteIdParam } = require("../middlewares/notesMiddlewares");
const router = express.Router();
router.param("noteId", handleNoteIdParam);

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes);
router.put("/update/:noteId", verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);

// Middleware
module.exports = router;

// localhost:8000/note/add //
// localhost:8000/note/update/:noteID //
// localhost:8000/note/delete/:noteId
// localhost:8000/note/getallnotes
