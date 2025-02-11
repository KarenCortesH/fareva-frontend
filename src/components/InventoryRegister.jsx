import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir

const RegistroInventario = () => {
  const navigate = useNavigate(); // Hook para manejar la navegaci�n

  const [formData, setFormData] = useState({
    producto: "",
    lote: "",
    cantidad: "",
    estado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud POST a la API del backend
      const response = await fetch("http://localhost:5000/api/inventarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el registro.");
      }

      alert("Registro guardado con �xito.");
      navigate("/inventarios"); // Redirigir al listado de inventarios
    } catch (error) {
      console.error("Error al guardar el registro:", error);
      alert("Ocurri� un error al guardar el registro.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registrar Nuevo Inventario</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Producto:
          <input
            type="text"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            style={styles.input}
            placeholder="Ingrese el producto"
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
            placeholder="Ingrese el lote"
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
            placeholder="Ingrese la cantidad"
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
          Guardar Registro
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
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    textAlign: "center",
    color: "#7a232e",
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "1rem",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#388E3C",
  },
};

export default RegistroInventario;
