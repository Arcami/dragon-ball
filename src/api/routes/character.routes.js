const express = require("express");
const router = express.Router();
const { getCharacters } = require("../controllers/character.controller");

router.get("/characters", getCharacters);

module.exports = router;
