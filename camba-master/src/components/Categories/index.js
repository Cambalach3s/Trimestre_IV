import React, { useEffect, useState } from 'react'
import FeatureCard from '../FeatureCard'

const Categorias = () => {
  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch('http://localhost:3001/productos/categorias')
      const data = await response.json()
      console.log(data, 'data')
      setCategorias(data)
    }
    fetchCategorias()
  }, [])

  if (categorias.length === 0) return <div>Loading.....</div>

  return (
      <FeatureCard cards={categorias}/>
  )
}

export default Categorias