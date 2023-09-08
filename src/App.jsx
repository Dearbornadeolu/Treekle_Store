import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TreekleStore from './TreekleStore'
import ProductDetail from './comp/ProductDetail'
import SearchResults from './comp/SearchResults'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TreekleStore />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/products/search" element={<SearchResults />} />
    </Routes>
  )
}

export default App
