const express = require('express');
const { saveGameData, getGameHistory } = require('../controllers/memoryController'); // importar a função
const router = express.Router();

// Rota para salvar dados
router.post('/save', saveGameData);

// Rota para buscar histórico
router.post('/history', getGameHistory);

module.exports = router;
