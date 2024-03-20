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
        database: 'cambalaches',
        user: 'root',
        password: '',
        port: 8080
    }
)

app.listen(PUERTO, () => {
    console.log(`servidor corriendo con estilo en el puerto: ${PUERTO}`)
})

conexion.connect(error => {
    if (error) throw error 
    console.log('conexion estilosa a la base de datos');
})

app.get('/', (req, res)=> {
    res.send('API')
})

app.get('/administrador', (req, res)=> {
    const query = 'SELECT * FROM administrador'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`NO HAY SISTEMA`)
        }
    })
})

app.get('/administrador/:id',(req, res) =>{
    const { id } = req.params

    const query = `SELECT * FROM usuarios WHERE tdoc_admin	=${id}`
    conexion.query(query, (error, resultado)=> {
        if(error) return console.error(error.message)

        if(resultado > 0) {
            res.json(resultado)
        } else {
            res.json(`NO HAY SISTEMA CON ESE ID`)
        }
    })
})

app.post('/administrador/agregar', (req, res)=>{
    const administrador = {
        tdoc_admin: req.body.tdoc_admin, 
        id_admin: req.body.id_admin
    }

    const query = `INSERT INTO administrador SET ?`
    conexion.query(query, administrador, (error, resultado)=> {
        if(error) return console.error(error.message)

        res.json(`YA HAY SISTEMA CON EL USUARIO`)

    })
})

app.put('/administrador/actualizar/:id', (req, res) => {
    const { id } = req.params
    const { tdoc_admin, id_admin } = req.body

    const query = `UPDATE administrador SET tdoc_admin='${tdoc_admin}', id_admin='${id_admin}' WHERE tdoc_admin='${id}'`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json(`se actualizo el administrador correctamente`)
    })
})

app.delete('/administrador/borrar/:id', (req, res) =>{
    const { id } = req.params

    const query = `DELETE FROM administrador WHERE id_admin=${id}`
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`se elimino el administrador correctamente`)
    })
})