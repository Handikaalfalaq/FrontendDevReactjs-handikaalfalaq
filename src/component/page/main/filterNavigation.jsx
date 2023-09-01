import React from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function FilterNavigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{margin: '20px 0px' }}>
      <Container fluid>
        <Navbar.Brand href="#">Filter By</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Status" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Open Now</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Closed</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Price" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">&lt; 50.000</NavDropdown.Item>
              <NavDropdown.Item href="#action4">50.000 - 200.000</NavDropdown.Item>
              <NavDropdown.Item href="#action4">200.000 - 300.000</NavDropdown.Item>
              <NavDropdown.Item href="#action4">300.000 - 400.000</NavDropdown.Item>
              <NavDropdown.Item href="#action4">400.000 - 500.000</NavDropdown.Item>
              <NavDropdown.Item href="#action4">&gt;500.000</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Restaurant1</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Restaurant2</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Restaurant3</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Restaurant4</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Restaurant5</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Restaurant6</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Button>Clear All</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterNavigation;