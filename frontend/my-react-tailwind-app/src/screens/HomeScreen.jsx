import React from 'react'
import NavBar from '../components/NavBar.jsx'
// import NaviBar from '../components/NaviBar.jsx'
// import Card from '../components/Card.jsx'
// import CardList from '../components/CardList.jsx'
import { Outlet } from 'react-router-dom';

const HomeScreen = () => {

    // const user=JSON.parse(localStorage.getItem('user'))

  return (
    <>
    <div class="flex flex-col">
        
          <NavBar/>
     
  
         <Outlet/>
 
       
  
    </div>
  
    </>
  )
    
}

export default HomeScreen