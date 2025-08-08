import {
    Router
} from "express";
import {
    dbPromise
} from "../database/db.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const db = await dbPromise;
        const itens = await db.all("SELECT * FROM cardapio");
        res.json(itens);
    } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
        res.status(500).json({
            error: "Erro ao buscar cardápio"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const db = await dbPromise;
        const item = await db.get("SELECT * FROM cardapio WHERE id = ?", req.params.id);
        if (!item) return res.status(404).json({
            error: "Item não encontrado"
        });
        res.json(item);
    } catch (error) {
        console.error("Erro ao buscar item:", error);
        res.status(500).json({
            error: "Erro ao buscar item"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            nome,
            descricao,
            preco,
            img
        } = req.body;
        if (!nome || !descricao || !preco || !img) {
            return res.status(400).json({
                error: "Dados incompletos"
            });
        }


        const db = await dbPromise;
        const result = await db.run(
            "INSERT INTO cardapio (nome, descricao, preco, img) VALUES (?, ?, ?, ?)",
            [nome, descricao, preco, img]
        );

        const novoItem = await db.get("SELECT * FROM cardapio WHERE id = ?", result.lastID);
        res.status(201).json(novoItem);
    } catch (error) {
        console.error("Erro ao cadastrar item:", error);
        res.status(500).json({
            error: "Erro ao cadastrar item"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            nome,
            descricao,
            preco,
            img
        } = req.body;

        text
        const db = await dbPromise;
        await db.run(
            "UPDATE cardapio SET nome = ?, descricao = ?, preco = ?, img = ? WHERE id = ?",
            [nome, descricao, preco, img, id]
        );

        const itemAtualizado = await db.get("SELECT * FROM cardapio WHERE id = ?", id);
        res.json(itemAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar item:", error);
        res.status(500).json({
            error: "Erro ao atualizar item"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const db = await dbPromise;
        await db.run("DELETE FROM cardapio WHERE id = ?", id);
        res.status(204).end();
    } catch (error) {
        console.error("Erro ao remover item:", error);
        res.status(500).json({
            error: "Erro ao remover item"
        });
    }
});

export default router;