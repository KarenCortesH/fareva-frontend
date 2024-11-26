import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchInventories, deleteInventory } from "../services/api";

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const loadInventories = async () => {
      try {
        const data = await fetchInventories();
        setInventories(data);
      } catch (error) {
        console.error("Error al cargar inventarios:", error);
      }
    };

    loadInventories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      setInventories(inventories.filter((inv) => inv.id !== id));
      alert("Inventario eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar inventario:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Inventarios</h1>
      <div style={styles.buttonContainer}>
        <Link to="/registro" style={styles.addButton}>
          + Agregar Inventario
        </Link>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Lote</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td style={styles.td}>{inventory.id}</td>
              <td style={styles.td}>{inventory.producto}</td>
              <td style={styles.td}>{inventory.lote}</td>
              <td style={styles.td}>
                <Link to={`/inventarios/${inventory.id}`} style={styles.actionButton}>
                  Ver
                </Link>
                <Link to={`/editar/${inventory.id}`} style={styles.actionButton}>
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(inventory.id)}
                  style={{ ...styles.actionButton, backgroundColor: "#e74c3c" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    color: "#7a232e",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#7a232e",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  actionButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    padding: "5px 10px",
    marginRight: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default InventoryList;
