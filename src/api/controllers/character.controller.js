const Character = require("../models/character.model");

const getCharacters = async (req, res) => {
  let pag = parseInt(req.query.pag);
  let limit = parseInt(req.query.limit);
  const numCharacters = await Character.countDocuments();

  limit = !isNaN(limit) ? limit : 1;
  limit = limit > 20 || limit < 1 ? 20 : limit;
  let numPage = Math.ceil(numCharacters / limit);
  if (pag > numPage) {
    pag = numPage;
  }
  if (pag < 1) {
    pag = 1;
  }

  pag = !isNaN(pag) ? pag : 1;

  const allCharacters = await Character.find()
    .skip((pag - 1) * limit)
    .limit(limit);
  res.json({
    characters_retrieved: allCharacters.length,
    prevPage:
      pag > 1
        ? `http://localhost:3000/characters?pag=${pag - 1}&limit=${limit}`
        : null,
    page: pag,
    page_limit: limit,
    nextPage:
      pag < numPage
        ? `http://localhost:3000/characters?pag=${pag + 1}&limit=${limit}`
        : null,
    data: allCharacters,
  });
};

module.exports = { getCharacters };
