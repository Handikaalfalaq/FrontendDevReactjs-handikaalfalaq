import { React, useState } from 'react'
import FilterNavigation from './page/main/filterNavigation.jsx'
import Section from './page/main/section.jsx'
import './assets/style.css'

function Home(){
    const [status, setStatus] = useState('Status');
    const [price, setPrice] = useState('Price');
    const [categories, setCategories] = useState('Categories');
    
    const updateStatus = (newStatus) => {
        setStatus(newStatus);
      };
    const updatePrice = (newPrice) => {
        setPrice(newPrice);
      };

    const updateCategories = (newCategories) => {
        setCategories(newCategories);
      };


    return( 
        <div>
            <h1 className='titleHome'>Restaurant Web</h1>
            <h5 className='informasiHome'>Selamat datang di situs web kami, Nikmati pengalaman kuliner yang tak terlupakan dengan hidangan lezat dari berbagai restoran pilihan kami.
            <p>Saatnya menjelajahi berbagai kuliner dari berbagai restoran yang telah kami pilihkan khusus untuk Anda.</p></h5>
            <FilterNavigation updateStatus={updateStatus} updatePrice={updatePrice} updateCategories={updateCategories}/>
            <Section status={status} price={price} categories={categories} />
        </div>
    )
}

export default Home