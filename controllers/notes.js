const client = require("../configs/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  console.log(req.email, heading, content);
  client
    .query(
      `INSERT INTO notes (email,heading,content) VALUES ('${req.email}', '${heading}' ,'${content}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Note added successfully",
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};
exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT* FROM notes WHERE email='${req.email}'`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.id,
          heading: note.heading,
          content: note.content,
        };
      });
      console.log(filteredData);

      res.status(200).json({
        message: "Note fetched successfully",
        data: filteredData,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.noteId;
  const { heading, content } = req.body;
  client
    .query(
      `UPDATE notes SET heading ='${heading}' , content='${content}' WHERE id='${noteId}'`
    )
    .then((data) => {
      return res.status(200).json({
        message: "Note udpated successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "DB error occurred",
      });
    });
};

exports.deleteNote = (req, res) => {
  const noteId = req.noteId;
  client
    .query(`DELETE FROM notes WHERE id='${noteId}'`)
    .then((data) => {
      return res.status(200).json({
        message: "Note deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "DB error occurred",
      });
    });
};
