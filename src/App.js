import React from 'react'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Orders from "./pages/Orders.jsx"
import Profile from "./pages/Profile.jsx"
import Earnings from "./pages/Earnings.jsx"
import "./css/body.css"
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ViewShopperOrder from './pages/ViewShopperOrder.jsx'
import RejectedOrders from './pages/RejectedOrders.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/earnings" element={<Earnings/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/rejectedOrders" element={<RejectedOrders/>}/>
        <Route path="/viewShopperOrders" element={<ViewShopperOrder/>}/>
    </Routes>
    </div>
  )
}

export default App