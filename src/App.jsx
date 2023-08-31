import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import TreekleStore from './assets/TreekleStore'
import ProductDetail from './comp/ProductDetail'

function App() {

  return (
    <Routes>
      <Route path='/' element={<TreekleStore/>}></Route>
      <Route path='product/:productId' element={<ProductDetail />} />
    </Routes>
  )
}

export default App
