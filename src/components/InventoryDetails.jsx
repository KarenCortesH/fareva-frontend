import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchInventoryDetails } from "../services/api";

const InventoryDetails = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const loadInventoryDetails = async () => {
      try {
        const data = await fetchInventoryDetails(id);
        setInventory(data);
      } catch (error) {
        console.error("Error al cargar los detalles del inventario:", error);
      }
    };

    loadInventoryDetails();
  }, [id]);

  if (!inventory) {
    return <div style={styles.loading}>Cargando detalles del inventario...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Detalles del Inventario</h1>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{inventory.producto}</h2>
        <p style={styles.detail}>
          <strong>ID:</strong> {inventory.id}
        </p>
        <p style={styles.detail}>
          <strong>Lote:</strong> {inventory.lote}
        </p>
        <p style={styles.detail}>
          <strong>Cantidad:</strong> {inventory.cantidad}
        </p>
        <p style={styles.detail}>
          <strong>Estado:</strong>{" "}
          <span
            style={{
              ...styles.status,
              backgroundColor:
                inventory.estado === "activo" ? "#4CAF50" : "#F44336",
            }}
          >
            {inventory.estado.toUpperCase()}
          </span>
        </p>
        <p style={styles.detail}>
          <strong>Fecha de Registro:</strong>{" "}
          {new Date(inventory.fecha_registro).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#7a232e",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  detail: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  },
  status: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#7a232e",
    marginTop: "50px",
  },
};

export default InventoryDetails;
