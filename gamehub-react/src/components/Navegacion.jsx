import React from 'react';
// Importamos solo lo que necesitamos, directamente desde su archivo fuente
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">GameHub Store</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;