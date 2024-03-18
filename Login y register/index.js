const express = require('express')
const mysql = require ('mysql')
const bodyparser = require('body-parser')

const app = express()

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', '*')
    next()
})

app.use(bodyparser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host: 'localhost',
        database: 'formulario hv',
        user: 'root',
        password: '',
        port: 8080
    }
)

app.listen(PUERTO, () => {
    console.log(`servidor corriendo rapido en el puerto:, ${PUERTO}`)
})

conexion.connect(error => {
    if (error) throw error 
    console.log('conexion exitosa a la base de datos');
})

app.get('/', (req,res)=> {
    res.send('API')
})

app.get('/usuarios', (req,res) => {
    const query = 'SELECT * FROM usuarios'
    conexion.query(query,(error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado > 0) {
            res.json(resultado)
        }else{
            res.json(`No hay registros mi pez`)
        }
    })
})

app.get('/usuarios/:id_u', (req,res) => {
    const { id_u } = req.params

    const query = `SELECT * FROM usuarios WHERE id_u=${id_u}`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        if (resultado > 0) {
            res.json(resultado)
        }else{
            res.json('No hay registros mi pez su id ni existe')
        }
    })
})

app.post('/usuarios/agregar', (req,res) => {
    const usuarios = {
        nombre_usuario: req.body.nombre_usuario,
        correo: req.body.correo,
        password: req.body.password
    }
    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuarios, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se insertó correctamente los datos')
    })
})

app.put('/usuarios/actualizar/:id_u', (req,res) => {
    const { id_u } = req.params
    const {nombre_usuario,correo,password} = req.body

    const query = `UDATE usuarios SET nombre_usuario='${nombre_usuario}',correo= '${correo}',password'${password}' WHERE id_u'${id_u}'`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        res.json('Se actualizó con exito el usuario')
    })        
})
app.delete('/usurios/borrar/:id_u',(req,res) => {
    const {id_u} = req.params

    const query = `DELETE FROM usuarios WHERE id_usuarios=${id_u}`
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        res.json(`Se elimino correctamente su usuario mi pez`)
    })
})