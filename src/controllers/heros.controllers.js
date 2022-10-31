import { pool } from "../db.js";

export const getHeros = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from herosvenezuela;");
    res.json(rows);
  } catch {
    res.status(500).json("Algo ha salido mal");
  }
};

export const getOneHeros = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "select * from herosvenezuela where id = (?);",
      [req.params.id]
    );

    if (rows.length == 0) {
      res.status(404).json({
        message: "Heros no Available",
      });
    }

    res.json(rows[0]);
  } catch {
    res.status(500).json("Algo ha salido mal");
  }
};

export const pushHeros = async (req, res) => {
  try {
    const { name, power, type } = req.body;
    const [rows] = await pool.query(
      "insert into herosvenezuela (name, power, type) values (?, ?, ?)",
      [name, power, type]
    );
    res.send({ id: rows.insertId, name: name, power: power, type: type });
  } catch {
    res.status(500).json("Algo ha salido mal");
  }
};

export const patchHeros = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, power, type } = req.body;

    const [result] = await pool.query(
      "update herosvenezuela set name = ifnull(?, name), power= ifnull(?, power), type= ifnull(?, type) where id = ?",
      [name, power, type, id]
    );
    if (result.affectedRows <= 0) {
      res.json("Error al actualizar");
    } else {
      res.json("¡Actualizado!");
    }
  } catch {
    res.status(500).json("Algo ha salido mal");
  }
};

export const deleteHeros = async (req, res) => {
  try {
    const [result] = await pool.query(
      "delete from herosvenezuela where id = (?)",
      [req.params.id]
    );
    if (result.affectedRows <= 0) {
      res.status(404).json({
        mensaje: "Error al borrar Héroe",
      });
    } else {
      res.json({
        mensaje: "Borrado éxitoso",
      });
    }
  } catch {
    res.status(500).json("Algo ha salido mal");
  }
};
