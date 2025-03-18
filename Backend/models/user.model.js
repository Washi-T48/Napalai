import pool from "../config/db.js";

const createUser = async (user) => {
    const { username, fullname, password } = user;
    const result = await pool.query('INSERT INTO "user" (username, fullname, password) VALUES ($1, $2, $3) RETURNING *', [username, fullname, password]);
    return result.rows;
};

const newUser = async (user) => {
    const { username, password } = user;
    const result = await pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    return result.rows;
};

const registerUser = async (user) => {
    const { username, password } = user;
    const result = await pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING username', [username, password]);
    return result.rows;
};

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM "user"');
    return result.rows;
};

const getUserByID = async (id) => {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0];
};

const getUserDetails = async (id) => {
    const result = await pool.query('SELECT username, fullname, email, picture FROM "user" WHERE id = $1', [id]);
    return result.rows[0];
};

const getUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
    return result.rows;
};

const changeUsername = async (id, username) => {
    const result = await pool.query('UPDATE "user" SET username = $2 WHERE id = $1 RETURNING username', [id, username]);
    return result.rows[0];
};

const changePassword = async (id, password) => {
    const result = await pool.query('UPDATE "user" SET password = $2 WHERE id = $1 RETURNING username', [id, password]);
    return result.rows[0];
};

const changeFullname = async (id, fullname) => {
    const result = await pool.query('UPDATE "user" SET fullname = $2 WHERE id = $1 RETURNING fullname', [id, fullname]);
    return result.rows[0];
};

const changeEmail = async (id, email) => {
    const result = await pool.query('UPDATE "user" SET email = $2 WHERE id = $1 RETURNING email', [id, email]);
    return result.rows[0];
};

const updateProfilePicture = async (id, path) => {
    const result = await pool.query('UPDATE "user" SET picture = $2 WHERE id = $1 RETURNING picture', [id, path]);
    return result.rows[0];
};

export {
    createUser,
    newUser,
    registerUser,
    getAllUsers,
    getUserByID,
    getUserDetails,
    getUserByUsername,
    changeUsername,
    changePassword,
    changeFullname,
    changeEmail,
    updateProfilePicture,
};