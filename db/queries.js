import pool from "./pool.js";

export async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

export async function addMessage(name, message) {
    await pool.query("INSERT INTO messages (username, added, message) VALUES ($1, NOW(), $2)", [name, message]);
}

export async function findMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [id]);
    return rows[0]; // Rows is an array, needs to access the actual item inside it
}