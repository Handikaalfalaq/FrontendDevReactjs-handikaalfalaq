import {React, useState, useEffect, useContext} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataContext } from '../../context';
 
function FilterNavigation({updateStatus, updatePrice, updateCategories}) {
  const {dataJson} = useContext(DataContext);
  const [status, setStatus] = useState('Status')
  const [price, setPrice] = useState('Price')
  const [categories, setCategories] = useState('Categories')
  const [newdataJson, setNewDataJson] = useState([])

  const ubahStatus = (status) => {
    setStatus(status)
    updateStatus(status)
  }

  const ubahPrice = (price) => {
    setPrice(price)
    updatePrice(price)
  }

  const ubahCategories = (categories) => {
    setCategories(categories)
    updateCategories(categories)
  }

  const clearAll = () => {
    setStatus('Status')
    setPrice('Price')
    setCategories('Categories')
    updateStatus('Status')
    updatePrice('Price')
    updateCategories('Categories')
  }

  useEffect(() => {
    const fetchData = async () => {
      setNewDataJson([]); 
      try {
        for (let i = 0; i < dataJson.length; i++) {
            setNewDataJson((prev) => [...prev, dataJson[i]]);
      }
    } catch (error) {
        console.log(error); 
      }
    };

    fetchData();
  }, [dataJson]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{margin: '20px 0px' }}>
      <Container fluid>
        <Navbar.Brand >Filter By</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse  id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ height: "auto" }} navbarScroll >
            <NavDropdown title={status} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => ubahStatus('Open Now')}>Open Now</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahStatus('Closed')}>Closed</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={price} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => ubahPrice('<50000')}>&lt;50.000</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahPrice('50000 - 100000')}>50.000 - 100.000</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahPrice('100000 - 200000')}>100.000 - 200.000</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahPrice('300000 - 400000')}>300.000 - 400.000</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahPrice('400000 - 500000')}>400.000 - 500.000</NavDropdown.Item>
              <NavDropdown.Item onClick={() => ubahPrice('>500000')}>&gt;500.000</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={categories} id="navbarScrollingDropdown">
            {newdataJson.map((data, index) => (
              !newdataJson.slice(0, index).some((prevData) => prevData.jenisMakanan === data.jenisMakanan) && (
                <NavDropdown.Item onClick={() => ubahCategories(data.jenisMakanan)} key={index}>
                  {data.jenisMakanan}
                </NavDropdown.Item>
              )
            ))}
            </NavDropdown>

          </Nav>

          <Form className="d-flex">
            <Button onClick={() => clearAll()}>Clear All</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterNavigation;