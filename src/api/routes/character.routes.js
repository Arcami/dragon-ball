const express = require("express");
const router = express.Router();
const {
  getCharacters,
  getCharacterById,
  updateCharacterById,
} = require("../controllers/character.controller");

router.get("/characters", getCharacters);
router.get("/characters/:id", getCharacterById);
router.put("/characters/modify/:id", updateCharacterById);

module.exports = router;
