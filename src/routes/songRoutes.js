// src/routes/songRoutes.js
import express from 'express';
import {
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong
} from '../controllers/songController.js';

const router = express.Router();

// CRUD completo
router.post('/songs', createSong);          // Criar música
router.get('/songs', getAllSongs);          // Listar todas
router.get('/songs/:id', getSongById);      // Buscar por ID
router.put('/songs/:id', updateSong);       // Atualizar
router.delete('/songs/:id', deleteSong);    // Deletar

export default router;