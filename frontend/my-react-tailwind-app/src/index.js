import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import CardList from './components/CardList.jsx';
import CardList2 from './components/CardList2.jsx';


const router= createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<LoginScreen/>}/>
        
        <Route  path='/register' element={<RegisterScreen/>}/>

        <Route path='/home' element={<HomeScreen/>}>
            <Route index={true} path='' element={<CardList/>}/>
            <Route  path='courses' element={<CardList2/>}/>

        </Route> 
        
        
      </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
