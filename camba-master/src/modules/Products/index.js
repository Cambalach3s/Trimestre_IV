import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import ProductosCard from '../../components/ProductCard'

const Productos = () => {
  const [productos, setProductos] = useState([])
  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('http://localhost:3001/productos')
      const data = await response.json()
      console.log(data)
      setProductos(data)
    }
    fetchProductos()
  }, [])

  return (
    <div>
      <Categories/>
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTOS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">TODOS LOS PRODUCTOS</h1>
      </div>
      {
        productos.length > 0 ?
        <ProductosCard productos={productos}/>
        :
        <div>Loading.....</div>
      }
    </div>
  )
}

export default Productos