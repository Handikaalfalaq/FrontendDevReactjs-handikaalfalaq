import {React, useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from 'axios';
import { API_URL } from '../../config/config.jsx'
import Swal from 'sweetalert2';
import { useMutation } from 'react-query';

function ModalTambahRestaurant({show, onHide}) {
    const [formTambahRestaurant, setFormTambahRestaurant] = useState({
        namaRestaurant: '',
        ratingRestaurant: '',
        jenisMakanan: '',
        jamBuka: '',
        jamTutup: '',
      });

    const handleChange = (e) => {
        setFormTambahRestaurant({
            ...formTambahRestaurant,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault(); 
            const formData = {
                namaRestaurant: formTambahRestaurant.namaRestaurant,
                jenisMakanan: formTambahRestaurant.jenisMakanan,
                daftarMenu : [],
                ratingRestaurant: formTambahRestaurant.ratingRestaurant,
                status : {
                    jamBuka: formTambahRestaurant.jamBuka,
                    jamTutup: formTambahRestaurant.jamTutup
                }
            } 
            
        
            await axios.post(API_URL + "restaurants", formData); 
            onHide();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil Register',
                showConfirmButton: false,
                timer: 3000
            });

            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } catch (error) {
          console.log('kirim datanya error', error);
        }
      });
      
    
    return (
        <Modal show={show} onHide={onHide} backdrop="static" >
        <Modal.Header className="headerModalNewRestaurant" closeButton>
          <Modal.Title >New Restaurant</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Nama Restaurant</Form.Label>
                <Form.Control className="controlModalNewRestaurant" name="namaRestaurant" onChange={handleChange} type="text"  placeholder="contoh: Pempek Ilir"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Rating Restaurant</Form.Label>
                <Form.Control className="controlModalNewRestaurant" name="ratingRestaurant" onChange={handleChange} type="number" placeholder="bintang 1 - 5" min="1" max="5" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jenis Makanan</Form.Label>
                <Form.Control className="controlModalNewRestaurant" name="jenisMakanan" onChange={handleChange} type="text" placeholder="contoh: Indonesia"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jam Buka</Form.Label>
                <Form.Control className="controlModalNewRestaurant" name="jamBuka" onChange={handleChange} type="time" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jam Tutup</Form.Label>
                <Form.Control className="controlModalNewRestaurant" name="jamTutup" onChange={handleChange} type="time" required/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" type="submit" >Tambah Restaurant Baru</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default ModalTambahRestaurant
