app.get('/categorias', (req, res)=> {
    const query = 'SELECT * FROM categorias'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No existe esa categoria`)
        }
    })
})

app.get('/categorias/:id',(req, res) =>{
    const { id } = req.params

    const query = `SELECT * FROM categorias WHERE id_categorias=${id}`
    conexion.query(query, (error, resultado)=> {
        if(error) return console.error(error.message)

        if(resultado > 0) {
            res.json(resultado)
        } else {
            res.json(`no existe una categoria con ese id`)
        }
    })
})

app.post('/categorias/agregar', (req, res)=>{
    const categorias = {
        cod_categoria: req.body.cod_categoria, 
        nom_categoria: req.body.nom_categoria,
        estado_tprod: req.body.estado_tprod
    }

    const query = `INSERT INTO categorias SET ?`
    conexion.query(query, categorias, (error, resultado)=> {
        if(error) return console.error(error.message)

        res.json(`ya existe esa categoria mano pilas`)

    })
})

app.put('/categorias/actualizar/:id', (req, res) => {
    const { id } = req.params
    const { cod_categoria, nom_categoria, estado_tprod } = req.body

    const query = `UPDATE categorias SET cod_categoria='${cod_categoria}, nom_categoria='${nom_categoria}, estado_tprod='${estado_tprod} WHERE id_categorias='${id}'`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json(`se actualizo la categoria correctamente`)
    })
})

app.delete('/categoria/borrar/:id', (req, res) =>{
    const { id } = req.params

    const query = `DELETE FROM categorias WHERE id_categorias=${id}`
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`se elimino la categoria correctamente`)
    })
})

app.get('/categorias', (req,res) => {
    const query = 'SELECT * FROM categorias'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json(`No hay categorias`)
        }
    })
})
