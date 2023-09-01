import {Modal, Card } from 'react-bootstrap';
import FolderImage from '../../assets/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function DetailView({show, onHide}) {
    const closeModalDetailView = () => {
        onHide();
    };
    return (
        <Modal show={show} onHide={closeModalDetailView}>
                <Modal.Header closeButton>
                <Modal.Title>Restaurants name
                <div style={{display:'flex'}}>
                    <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                    <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                    <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                    <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                    <div style={{ opacity: 0.5, }}><FontAwesomeIcon icon={faStar}/></div>
                </div>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Card style={{ width: '100%', height: '100%', margin: 'auto', border:'0px solid black'}}>
                    <div style={{ backgroundImage: `url(${FolderImage.SeaFood1})`,width: '100%', height: '300px',backgroundSize: 'cover', margin:'auto'}}></div>
                    <Card.Body>
                        <Card.Title>Seafood</Card.Title>
                        <div style={{display:'flex'}}>
                            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                            <div style={{ opacity: 1, }}><FontAwesomeIcon icon={faStar}/></div>
                            <div style={{ opacity: 0.5, }}><FontAwesomeIcon icon={faStar}/></div>
                        </div>
                        <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quam enim dolor velit reiciendis in sapiente animi harum doloremque mollitia, culpa alias, molestiae, magni veritatis hic sunt temporibus impedit itaque?
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
    );
}

export default DetailView