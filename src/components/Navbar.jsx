import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Asegúrate de que el logo esté en esta ruta

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.brandText}>Fareva App</h1>
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/inventarios" style={styles.link}>Inventarios</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/registro" style={styles.link}>Registrar Inventario</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7a232e', // Color del fondo
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center', // Alineación vertical del logo y texto
    gap: '10px', // Espaciado entre el logo y el texto
  },
  logo: {
    width: '50px', // Tamaño del logo
    height: '50px',
    objectFit: 'contain', // Asegura que el logo no se distorsione
  },
  brandText: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
    textTransform: 'uppercase', // Texto en mayúsculas
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px', // Espaciado entre los enlaces
    margin: 0,
    padding: 0,
  },
  navItem: {
    fontSize: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#a83f4b', // Más oscuro al pasar el mouse
  },
};

export default Navbar;
