import { React, useState } from 'react'
import { Button, Card, ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCircle } from '@fortawesome/free-solid-svg-icons';
import FolderImage from '../../assets/image';
import DetaiView from '../detailView/detailView'
 
function Sectipon() {
  const [modalDetaiView, setModalDetaiView] = useState(false);
    const openModalDetaiView = () => {
        console.log("saya") 
        setModalDetaiView(true); 
        }
  return (
    <Card style={{ width: '400px', height: '450px'}}>
      <div style={{ backgroundImage: `url(${FolderImage.SeaFood1})`,width: '400px', height: '300px',backgroundSize: 'cover',}}></div>
      <Card.Body>
        <Card.Title>Restaurants 1</Card.Title>
        <div style={{display:'flex'}}>
            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
            <div style={{ opacity: 0.5, }}><FontAwesomeIcon icon={faStar}/></div>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', margin: '10px 0px'}}> 
            <div style={{display:'flex'}}>
                <ListGroup.Item>Seafood</ListGroup.Item>
                <ListGroup.Item>-$$$$</ListGroup.Item>
            </div>
            <ListGroup.Item><FontAwesomeIcon icon={faCircle} style={{color:'green'}}/> OPEN NOW</ListGroup.Item>
        </div>
        <Button variant="primary" style={{ width: '100%'}} onClick={openModalDetaiView}>LEARN MORE</Button>
      </Card.Body> 

      <DetaiView show={modalDetaiView} onHide={()=> setModalDetaiView(false)}/>
    </Card>
  );
}

export default Sectipon; 