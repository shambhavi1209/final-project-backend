exports.handleNoteIdParam = (req, res, next, id) => {
  //   console.log("This log is from handleNoteIdParam", id);
  req.noteId = id;
  next();
};
