const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");

router.post("/signUp", signUp);
router.post("/signIn", signIn);

// signUp;
//Middleware
module.exports = router;

// localhost: 8000 / auth / signin;
// localhost: 8000 / auth / signup;
