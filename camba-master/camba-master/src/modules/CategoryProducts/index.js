import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductosCard from '../../components/ProductCard'

const CategoriasProductos = () => {
  const { name } = useParams()
  const [productos, setProductos] = useState([])
  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch(`http://localhost:3001/productos/categorias/${name}`)
      const data = await response.json()
      console.log(data)
      setProductos(data)
    }
    fetchProductos()
  }, [])

  if (productos.length === 0) return <div>Loading.....</div>

  return (
    <ProductosCard productos={productos} />
  )
}

export default CategoriasProductos