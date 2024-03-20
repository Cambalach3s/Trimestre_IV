app.get('/vendedor', (req,res) => {
    const query = 'SELECT * FROM vendedor'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json(`No hay registros mi pez`)
        }
    })
})

app.get('/vendedor/:id', (req,res) => {
    const { id } = req.params

    const query = `SELECT * FROM vendedor WHERE id_vendedor=${id}`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json('No hay registros mi pez su id nisiquiera existe')
        }
    })
})

app.post('/vendedor/agregar', (req,res) => {
    const vendedor = {
        tdoc_vendedor: req.body.tdoc_vendedor,
        id_vendedor: req.body.id_vendedor,
       
    }
    const query = `INSERT INTO vendedor SET ?`
    conexion.query(query, vendedor, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se insertó correctamente los datos')
    })
})

app.put('/vendedor/actualizar/:id', (req,res) => {
    const { id } = req.params
    const {tdoc_vendedor} = req.body

    const query = `UPDATE vendedor SET tdoc_vendedor='${tdoc_vendedor} WHERE id_vendedor = '${id}'`;
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        res.json('Se actualizó con exito el vendedor')
    })        
})
app.delete('/vendedor/borrar/:id',(req,res) => {
    const {id} = req.params

    const query = `DELETE FROM vendedor WHERE id_vendedor=${id}`
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        res.json(`Se elimino correctamente su usuario mi pez`)
    })
})