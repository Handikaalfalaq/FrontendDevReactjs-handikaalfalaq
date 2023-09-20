import { React, useState, useContext}  from "react";
import { Modal, Button, Form} from "react-bootstrap";
import { useMutation } from 'react-query';
import { API_URL } from '../../config/config.jsx'
import Swal from 'sweetalert2';
import axios from 'axios'
import { DataContext } from '../../context.jsx';

function ModalTambahMenu({show, onHide, id}) {
    const {dataJson} = useContext(DataContext);
    const detailRestaurant = dataJson.filter(item => item.id === id); 
    const [formTambahMenu, setFormTambahMenu] = useState({
        namaMenu: '',
        harga: '',
        ratingMenu: '', 
        imageMenu: '', 
        informasiMenu: '', 
      });

    const handleChange = (e) => {
        setFormTambahMenu({
            ...formTambahMenu,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault(); 
            const formData = { 
                namaMenu: formTambahMenu.namaMenu,  
                harga: formTambahMenu.harga,  
                ratingMenu: formTambahMenu.ratingMenu,
                imageMenu: formTambahMenu.imageMenu.replace(/\s+/g, ''),
                informasiMenu: formTambahMenu.informasiMenu,    
            }
            console.log("formData", formData);

            const request = await axios.get(API_URL + "restaurants/" + detailRestaurant[0].id ); 
            request.data.daftarMenu.push(formData)

            await axios.patch(API_URL + "restaurants/" + detailRestaurant[0].id, request.data );  

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

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} >
        <Modal.Header className="headerModalNewMenu" closeButton>
          <Modal.Title >New Menu</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Nama Menu</Form.Label>
                <Form.Control className="controlModalNewMenu" name="namaMenu" type="text" onChange={handleChange} placeholder="contoh: Pempek Lenjer"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Harga Makanan</Form.Label>
                <Form.Control className="controlModalNewMenu" name="harga" type="text" onChange={handleChange} placeholder="contoh: 150000"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Rating Menu</Form.Label>
                <Form.Control className="controlModalNewMenu" name="ratingMenu" type="number" onChange={handleChange} placeholder="bintang 1 - 5" min="1" max="5" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Nama image</Form.Label>
                <Form.Control className="controlModalNewMenu" name="imageMenu" type="text" onChange={handleChange} placeholder="contoh: pempek" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Informasi Menu</Form.Label>
                <Form.Control className="controlModalNewMenu" name="informasiMenu" as="textarea" rows={4} onChange={handleChange} placeholder="Masukkan informasi menu..."  required/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" type="submit" >Tambah Menu Baru</Button>
            </Modal.Footer>
        </Form> 
      </Modal>
    )
}

export default ModalTambahMenu
