import { React} from 'react'
import FilterNavigation from './page/main/filterNavigation.jsx'
import Section from './page/main/section.jsx'

function Home(){

    return(
        <div>
            <h1>Restauran</h1>
            <h5 style={{fontWeight: '100', width:'700px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, eum officia rem facilis velit architecto nisi cumque accusamus, illum necessitatibus voluptate veritatis ex mollitia deleniti magnam minima est sapiente voluptas!</h5>
            <FilterNavigation/>
            <Section/>

            <button style={{display:'flex', justifyContent:'center', margin: '100px auto' , padding: '10px 300px', fontWeight:'bold'}} >LOAD MORE</button>
        </div>
    )
}

export default Home