import {React, useState, useEffect } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from 'axios';
import { API_URL } from '../../config/config.jsx'
import Swal from 'sweetalert2';
import { useMutation } from 'react-query';

function ModalUpdateRestaurant({show, onHide, dataDetileView}) {
    const [formUpdateRestaurant, setFormUpdateRestaurant] = useState({
        namaRestaurant: '',
        ratingRestaurant: '',
        jenisMakanan: '',
        daftarMenu:'',
        jamBuka: '',
        jamTutup: '',
        id:'',
    });

    useEffect(() => {
        try {
        const inDataDetileView = dataDetileView
        setFormUpdateRestaurant({
            namaRestaurant: inDataDetileView.namaRestaurant,
            jenisMakanan: inDataDetileView.jenisMakanan,
            daftarMenu : inDataDetileView.daftarMenu,
            ratingRestaurant: inDataDetileView.ratingRestaurant, 
            jamBuka: inDataDetileView.status.jamBuka,
            jamTutup: inDataDetileView.status.jamTutup,
            id: inDataDetileView.id,
        })
        } catch (error) {
            console.log("Error:", error)
        }
    }, [dataDetileView] );

    const handleChange = (e) => {
        setFormUpdateRestaurant({
            ...formUpdateRestaurant,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault(); 
            const formData = {
                namaRestaurant: formUpdateRestaurant.namaRestaurant,
                jenisMakanan: formUpdateRestaurant.jenisMakanan,
                daftarMenu : formUpdateRestaurant.daftarMenu,
                ratingRestaurant: formUpdateRestaurant.ratingRestaurant, 
                status : {
                    jamBuka: formUpdateRestaurant.jamBuka,
                    jamTutup: formUpdateRestaurant.jamTutup
                },
                id : formUpdateRestaurant.id
            }
            await axios.patch(API_URL + "restaurants/" + formUpdateRestaurant.id, formData ); 
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
            }, 2000);
        } catch (error) {
          console.log('kirim datanya error', error);
        }
    });
      
    function formatTime(timeString) {
        return timeString.replace(/[\s:.]/g, ':');
    }
    
    return (
        <Modal show={show} onHide={onHide} backdrop="static" >
        <Modal.Header className="headerModalNewRestaurant" closeButton>
          <Modal.Title >New Restaurant</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Nama Restaurant</Form.Label>
                <Form.Control className="controlModalNewRestaurant" value={formUpdateRestaurant.namaRestaurant} name="namaRestaurant" onChange={handleChange} type="text"  placeholder="contoh: Pempek Ilir"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Rating Restaurant</Form.Label>
                <Form.Control className="controlModalNewRestaurant" value={formUpdateRestaurant.ratingRestaurant} name="ratingRestaurant" onChange={handleChange} type="number" placeholder="bintang 1 - 5" min="1" max="5" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jenis Makanan</Form.Label>
                <Form.Control className="controlModalNewRestaurant" value={formUpdateRestaurant.jenisMakanan} name="jenisMakanan" onChange={handleChange} type="text" placeholder="contoh: Indonesia"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jam Buka</Form.Label>
                <Form.Control className="controlModalNewRestaurant" value={formatTime(formUpdateRestaurant.jamBuka)} name="jamBuka" onChange={handleChange} type="time" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewRestaurant">Jam Tutup</Form.Label>
                <Form.Control className="controlModalNewRestaurant" value={formatTime(formUpdateRestaurant.jamTutup)} name="jamTutup" onChange={handleChange} type="time" required/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" type="submit" >Update Restaurant</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default ModalUpdateRestaurant
