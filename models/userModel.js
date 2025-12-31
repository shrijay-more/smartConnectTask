import { poolPromise, sql } from "../config/db.js";

export const createUser = async (name, email) => {
  const pool = await poolPromise;
  return pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("email", sql.NVarChar, email).query(`
      INSERT INTO Users (name, email)
      VALUES (@name, @email)
    `);
};

export const getAllUsers = async () => {
  const pool = await poolPromise;
  return pool.request().query("SELECT * FROM Users");
};

export const getUserById = async (id) => {
  const pool = await poolPromise;
  return pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Users WHERE id = @id");
};

export const updateUser = async (id, name, email) => {
  const pool = await poolPromise;
  return pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("email", sql.NVarChar, email).query(`
      UPDATE Users
      SET name = @name, email = @email
      WHERE id = @id
    `);
};

export const deleteUser = async (id) => {
  const pool = await poolPromise;
  return pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Users WHERE id = @id");
};
