import { React, useState, useEffect}  from "react";
import { Modal, Button, Form} from "react-bootstrap";
import { useMutation } from 'react-query';
import { API_URL } from '../../config/config.jsx'
import Swal from 'sweetalert2';
import axios from 'axios' 

function ModalUpdateMenu({show, onHide, dataDetileView, idMenu}) {
    const [formTambahMenu, setFormTambahMenu] = useState({
        namaMenu: '',
        harga: '',
        ratingMenu: '', 
        imageMenu: '', 
        informasiMenu: '', 
    });
    // console.log("dataDetileView", dataDetileView.daftarMenu[idMenu])

    useEffect(() => {
        try {
        if(dataDetileView.daftarMenu[idMenu] !== undefined){
            const inDetileDaftarmenu = dataDetileView.daftarMenu[idMenu]
            setFormTambahMenu({
                namaMenu: inDetileDaftarmenu.namaMenu,
                harga: inDetileDaftarmenu.harga, 
                ratingMenu: inDetileDaftarmenu.ratingMenu, 
                imageMenu: inDetileDaftarmenu.imageMenu,
                informasiMenu: inDetileDaftarmenu.informasiMenu,
            })}
        } catch (error) {
            console.log("Error:", error)
        }
    }, [dataDetileView.daftarMenu, idMenu] );

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
            dataDetileView.daftarMenu[idMenu] = formData 

            await axios.patch(API_URL + "restaurants/" + dataDetileView.id, dataDetileView ); 

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
                <Form.Control className="controlModalNewMenu" name="namaMenu" type="text" value={formTambahMenu.namaMenu} onChange={handleChange} placeholder="contoh: Pempek Lenjer"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Harga Makanan</Form.Label>
                <Form.Control className="controlModalNewMenu" name="harga" type="text" value={formTambahMenu.harga} onChange={handleChange} placeholder="contoh: 150000"  required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Rating Menu</Form.Label>
                <Form.Control className="controlModalNewMenu" name="ratingMenu" type="number" value={formTambahMenu.ratingMenu} onChange={handleChange} placeholder="bintang 1 - 5" min="1" max="5" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Nama image</Form.Label>
                <Form.Control className="controlModalNewMenu" name="imageMenu" type="text" value={formTambahMenu.imageMenu} onChange={handleChange} placeholder="contoh: pempek" required/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="labelModalNewMenu">Informasi Menu</Form.Label>
                <Form.Control className="controlModalNewMenu" name="informasiMenu" as="textarea" rows={4} value={formTambahMenu.informasiMenu} onChange={handleChange} placeholder="Masukkan informasi menu..."  required/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" type="submit" >Update Menu</Button>
            </Modal.Footer>
        </Form> 
      </Modal>
    )
}

export default ModalUpdateMenu
