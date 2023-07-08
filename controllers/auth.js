const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");
// const temporaryData = [
//   {
//     name: "Shaam",
//     email: "shaam12@gmail.com",
//     password: "shaam12",
//   },
//   {
//     name: "Harsh",
//     email: "Harsh12@gmail.com",
//     password: "shaam12",
//   },
//   {
//     name: "Romil",
//     email: "Romil12@gmail.com",
//     password: "shaam12",
//   },
// ];

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, " ", email, " ", password);
  //   Check if the user already exists
  // const isValid = temporaryData.findIndex((ele) => ele.email === email);

  client.query(`SELECT * FROM users where email='${email}'`).then((data) => {
    const isValid = data.rows;
    console.log(isValid);
    if (isValid.length > 0) {
      return res.status(400).json({
        error: "user already exists",
      });
    }
    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({
          error: "Internal server error",
        });
      }
      // Generate token
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET_KEY
      );
      const user = {
        name,
        email,
        password: hash,
      };

      client
        .query(
          `INSERT INTO users ( name,email,password) VALUES ('${user.name}', '${user.email}', '${user.password}')`
        )
        .then((data) => {
          // IF THE USER IS SUCCESSFULLY SAVD IN OUR DB WE GENERATE TOKEN FOR THE USER TO SEND BACK TO THE BROWSER//
          console.log(data.rows);
          return res.status(200).json({
            mesaage: "User added sucessfully to database",
            token: token,
          });
        })
        .catch((err) => {
          // IF AN ERROR OCCUR WHILE SVINF THE USER TO THE DATABASE WE SEND THE DATABASE ERROR RESPONSE//
          res.status(500).json({
            error: "Database error occurred",
          });
          console.log(err);
        });
    });
  });
};

exports.signIn = (req, res) => {
  // complete signup
  const { email, password } = req.body;

  client.query(`SELECT * FROM users WHERE email='${email}';`).then((data) => {
    userData = data.rows;
    if (userData.length === 0) {
      res.status(400).json({
        error: "User does not exists, signup instead!",
      });
    } else {
      bcrypt.compare(password, userData[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "server error",
          });
        }
        if (result === true) {
          const token = jwt.sign({ email }, process.env.SECRET_KEY);
          return res.status(200).json({
            message: "user signed in successfully",
            token,
          });
        } else {
          return res.status(500).json({
            message: "incorrect password",
          });
        }
      });
    }
  });
};
