import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const InventoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);

  // Obtener los detalles del inventario
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/inventarios/${id}`);
        if (!response.ok) throw new Error("Error al obtener los detalles del inventario.");
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error al obtener el inventario:", error);
      }
    };

    fetchInventory();
  }, [id]);

  // Manejar eliminación del inventario
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este inventario?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/inventarios/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar el inventario.");
        alert("Inventario eliminado con éxito.");
        navigate("/inventarios"); // Redirigir al listado después de eliminar
      } catch (error) {
        console.error("Error al eliminar el inventario:", error);
        alert("Error al eliminar el inventario.");
      }
    }
  };

  // Verificar si el inventario no está disponible
  if (!inventory) {
    return <div>Cargando detalles del inventario...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Detalles del Inventario</h1>
      <p style={styles.detail}>
        <strong>Producto:</strong> {inventory.producto}
      </p>
      <p style={styles.detail}>
        <strong>Lote:</strong> {inventory.lote}
      </p>
      <p style={styles.detail}>
        <strong>Cantidad:</strong> {inventory.cantidad}
      </p>
      <p style={styles.detail}>
        <strong>Estado:</strong> {inventory.estado}
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.editButton} onClick={() => navigate(`/editar/${id}`)}>
          Editar
        </button>
        <button style={styles.deleteButton} onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#7a232e",
    marginBottom: "20px",
  },
  detail: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default InventoryDetails;
