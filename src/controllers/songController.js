// src/controllers/songController.js
import * as songModel from '../models/songModel.js';

// ========== CREATE ==========
// POST /api/songs
export const createSong = async (req, res) => {
    try {
        const { title, artist, album } = req.body;

        // Validação
        if (!title || !artist) {
            return res.status(400).json({
                error: 'Título e artista são obrigatórios'
            });
        }

        // Cria a música usando o model
        const newSong = await songModel.create({
            title,
            artist,
            album: album || null,
            likes: 0
        });

        res.status(201).json({
            message: 'Música criada com sucesso',
            data: newSong
        });

    } catch (error) {
        console.error('Erro ao criar música:', error);
        res.status(500).json({
            error: 'Erro ao criar música'
        });
    }
};

// ========== READ ALL ==========
// GET /api/songs
export const getAllSongs = async (req, res) => {
    try {
        const songs = await songModel.findAll();

        res.status(200).json({
            message: 'Músicas encontradas',
            data: songs,
            total: songs.length
        });

    } catch (error) {
        console.error('Erro ao buscar músicas:', error);
        res.status(500).json({
            error: 'Erro ao buscar músicas'
        });
    }
};

// ========== READ ONE ==========
// GET /api/songs/:id
export const getSongById = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await songModel.findById(id);

        if (!song) {
            return res.status(404).json({
                error: 'Música não encontrada'
            });
        }

        res.status(200).json({
            message: 'Música encontrada',
            data: song
        });

    } catch (error) {
        console.error('Erro ao buscar música:', error);
        res.status(500).json({
            error: 'Erro ao buscar música'
        });
    }
};

// ========== UPDATE ==========
// PUT /api/songs/:id
export const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, album, likes } = req.body;

        // Verifica se a música existe
        const songExists = await songModel.exists(id);

        if (!songExists) {
            return res.status(404).json({
                error: 'Música não encontrada'
            });
        }

        // Prepara dados para atualização
        const updateData = {};
        if (title) updateData.title = title;
        if (artist) updateData.artist = artist;
        if (album !== undefined) updateData.album = album;
        if (likes !== undefined) updateData.likes = likes;

        // Atualiza a música
        const updatedSong = await songModel.update(id, updateData);

        res.status(200).json({
            message: 'Música atualizada com sucesso',
            data: updatedSong
        });

    } catch (error) {
        console.error('Erro ao atualizar música:', error);
        res.status(500).json({
            error: 'Erro ao atualizar música'
        });
    }
};

// ========== DELETE ==========
// DELETE /api/songs/:id
export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se a música existe
        const songExists = await songModel.exists(id);

        if (!songExists) {
            return res.status(404).json({
                error: 'Música não encontrada'
            });
        }

        // Deleta a música
        await songModel.remove(id);

        res.status(200).json({
            message: 'Música deletada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao deletar música:', error);
        res.status(500).json({
            error: 'Erro ao deletar música'
        });
    }
};