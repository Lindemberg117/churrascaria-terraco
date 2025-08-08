import {
    open
} from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = open({
    filename: './cardapio.db',
    driver: sqlite3.Database
});

async function criarTabela() {
    try {
        const db = await dbPromise;
        await db.exec(`
CREATE TABLE IF NOT EXISTS cardapio (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
descricao TEXT NOT NULL,
preco REAL NOT NULL,
img TEXT NOT NULL
);

    `);
        console.log('Tabelas criadas/verificadas.');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
        throw error;
    }
}

criarTabela().catch(err => console.error('Falha na inicialização do banco:', err));

export {
    dbPromise
};