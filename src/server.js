// src/server.js
import express from 'express';
import songRoutes from './routes/songRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', songRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({
        message: 'API de Músicas funcionando! 🎵',
        version: '1.0.0'
    });
});

// Tratamento de rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});