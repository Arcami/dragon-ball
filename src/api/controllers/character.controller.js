const Character = require("../models/character.model");

const getCharacters = async (req, res) => {
  let pag = parseInt(req.query.pag) || 1; // Default to page 1 if not provided
  let limit = parseInt(req.query.limit) || 20; // Default to limit 20 if not provided

  // Ensure limit is within range
  limit = limit > 20 ? 20 : limit < 1 ? 1 : limit;

  const numCharacters = await Character.countDocuments();
  const numPage = Math.ceil(numCharacters / limit);

  // Ensure page is within range
  pag = Math.max(1, Math.min(pag, numPage));

  const allCharacters = await Character.find()
    .skip((pag - 1) * limit)
    .limit(limit);

  // Construct base URL dynamically from the request
  const baseUrl = `${req.protocol}://${req.get("host")}${
    req.baseUrl
  }/characters/`;

  res.json({
    characters_retrieved: allCharacters.length,
    prevPage: pag > 1 ? `${baseUrl}?pag=${pag - 1}&limit=${limit}` : null,
    page: pag,
    page_limit: limit,
    nextPage: pag < numPage ? `${baseUrl}?pag=${pag + 1}&limit=${limit}` : null,
    data: allCharacters,
  });
};

const getCharacterById = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id);
  res.json(character);
};

module.exports = { getCharacters, getCharacterById };
