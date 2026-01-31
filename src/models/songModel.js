// src/models/songModel.js
import prisma from '../utils/prismaClient.js';

// Criar música
export const create = async (songData) => {
    return await prisma.song.create({
        data: songData
    });
};

// Buscar todas as músicas
export const findAll = async () => {
    return await prisma.song.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};

// Buscar música por ID
export const findById = async (id) => {
    return await prisma.song.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            lists: true
        }
    });
};

// Atualizar música
export const update = async (id, songData) => {
    return await prisma.song.update({
        where: {
            id: parseInt(id)
        },
        data: songData
    });
};

// Deletar música
export const remove = async (id) => {
    return await prisma.song.delete({
        where: {
            id: parseInt(id)
        }
    });
};

// Verificar se música existe
export const exists = async (id) => {
    const song = await prisma.song.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return !!song;
};