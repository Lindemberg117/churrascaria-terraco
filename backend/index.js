import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cardapioRouter from './routes/cardapio.js';
import { dbPromise } from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/HTML', express.static(path.join(__dirname, '../public/html')));

// Rotas da API
app.use('/api/cardapio', cardapioRouter);

// Rotas para páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/sobre.html'));
});

app.get('/cardapio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cardapio.html'));
});

app.get('/eventos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/eventos.html'));
});

app.get('/contatos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/contatos.html'));
});

// Rota de fallback para páginas não encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/html/404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});