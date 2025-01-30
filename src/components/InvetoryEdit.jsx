import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditarInventario = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate(); // Para redirigir después de guardar
  const [formData, setFormData] = useState({
    producto: "",
    lote: "",
    cantidad: "",
    estado: "",
  });
  const [loading, setLoading] = useState(true); // Mostrar un indicador de carga

  // Cargar los datos del inventario
  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/inventarios/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los datos del inventario.");
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false); // Ocultar el indicador de carga
      } catch (error) {
        console.error("Error al cargar los datos del inventario:", error);
        alert("No se pudo cargar el inventario.");
        navigate("/inventarios"); // Redirigir al listado en caso de error
      }
    };

    fetchInventario();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/inventarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el inventario.");
      }

      alert("Inventario actualizado con éxito.");
      navigate("/inventarios");
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      alert("Error al actualizar el inventario.");
    }
  };

  if (loading) {
    return <p>Cargando datos del inventario...</p>; // Indicador de carga
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Editar Inventario</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Producto:
          <input
            type="text"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Lote:
          <input
            type="text"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Estado:
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Seleccione</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </label>
        <button type="submit" style={styles.submitButton}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#7a232e",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitButton: {
    backgroundColor: "#7a232e",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default EditarInventario;
