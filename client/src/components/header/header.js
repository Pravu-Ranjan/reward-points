import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FcRating } from "react-icons/fc";
function Header() {
  return (
    <Navbar expand="lg" className="text-center" bg='light'>
      <Container className='justify-content-center p-3' fluid>
      <Navbar.Brand href="#home">Reward Point<FcRating size={40}/></Navbar.Brand>
      </Container>
      </Navbar>
  )
}

export default Header