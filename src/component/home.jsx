import { React, useState } from 'react'
import FilterNavigation from './page/main/filterNavigation.jsx'
import Section from './page/main/section.jsx'
import DetaiView from './page/detailView/detailView.jsx'

function Home(){
    const [modalDetaiView, setModalDetaiView] = useState(false);
    const openModalDetaiView = () => {
        console.log("saya") 
        setModalDetaiView(true); 
        }

    return(
        <div>
            <h1>Restauran</h1>
            <h5 style={{fontWeight: '100', width:'700px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, eum officia rem facilis velit architecto nisi cumque accusamus, illum necessitatibus voluptate veritatis ex mollitia deleniti magnam minima est sapiente voluptas!</h5>
            <FilterNavigation/>
            <Section/>

            <div style={{display:'flex', justifyContent:'center', margin: '100px auto' , padding: '10px 300px', fontWeight:'bold'}} onClick={openModalDetaiView}>LOAD MORE</div>

            <DetaiView show={modalDetaiView} onHide={()=> setModalDetaiView(false)}/>
        </div>
    )
}

export default Home