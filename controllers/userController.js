import * as userModel from "../models/userModel.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: "Name and email are required" });

  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email format" });

  try {
    await userModel.createUser(name, email);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await userModel.getAllUsers();
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await userModel.getUserById(req.params.id);
    if (result.recordset.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: "Name and email required" });

  try {
    await userModel.updateUser(req.params.id, name, email);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
