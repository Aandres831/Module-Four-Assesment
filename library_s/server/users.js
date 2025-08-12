import { Router } from "express";
import { pool } from "./conexion_db.js";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// GET user by id
router.get("/user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// CREATE user
router.post("/", async (req, res) => {
    try {
        const { user_id, name, identification, address, cellphonne_number, email } = req.body;
        const sql = `INSERT INTO users (user_id, name, identification, address, cellphonne_number, email) VALUES (?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [user_id, name, identification, address, cellphonne_number, email]);
        res.status(201).json({ mensaje: "User Creating..., Succes Create" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// UPDATE user
router.put("/user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, identification, address, cellphonne_number, email } = req.body;
        const sql = `UPDATE users SET name = ?, identification = ?, address = ?, cellphonne_number = ?, email = ? WHERE user_id = ?`;
        const [result] = await pool.query(sql, [name, identification, address, cellphonne_number, email, user_id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "user not found" });
        res.json({ mensaje: "User Udapted" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// DELETE user
router.delete("/user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [user_id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "user not found" });
        res.json({ mensaje: "User Delete" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

export default router;