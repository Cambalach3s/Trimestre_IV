const express = require ('express')
const mysql = require ('mysql')
const bodyParser = require ('body-parser')

const app = express()

app.use(function(req,res, next){
    res.setHeader ('Access-Control-allow-Origin', '*')
    res.setHeader ('Access-Control-allow-Methods', '*')
    next()
})

app.use(bodyParser.json())

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
    console.log(`Servidor corriendo rapido: ${PUERTO}`)
})

conexion.connect(error => {
    if (error) throw error
    console.log('Conexion exitosa a la base de datos');
})

app.get('/', (req,res)=> {
    res.send('API')
})

app.get('/usuarios', (req,res) => {
    const query = 'SELECT * FROM usuarios'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json(`No hay registros mi pez`)
        }
    })
})

app.get('/usuarios/:id', (req,res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuarios WHERE id_usuario=${id}`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json('No hay registros mi pez su id nisiquiera existe')
        }
    })
})

app.post('/usuarios/agregar', (req,res) => {
    const usuarios = {
        pk_fk_tdoc: req.body.pk_fk_tdoc,
        id_usuario: req.body.id_usuario,
        nom_persona: req.body.nom_persona,
        nom2_persona: req.body.nom2_persona,
        apell_persona: req.body.apell_persona,
        apell2_persona: req.body.apell2_persona,
        direccion_persona: req.body.direccion_persona,
        telefono: req.body.telefono,
        email: req.body.email,
        contrasena: req.body.contrasena
    }
    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuarios, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se insertó correctamente los datos')
    })
})

app.put('/usuarios/actualizar/:id', (req,res) => {
    const { id } = req.params
    const {pk_fk_tdoc, nom_persona, nom2_persona, apell_persona, apell2_persona, direccion_persona, telefono, email, contrasena} = req.body

    const query = `UPDATE usuarios SET pk_fk_tdoc='${pk_fk_tdoc}', nom_persona='${nom_persona}', nom2_persona='${nom2_persona}', apell_persona='${apell_persona}', apell2_persona='${apell2_persona}', direccion_persona='${direccion_persona}', telefono='${telefono}', email='${email}', contrasena='${contrasena}' WHERE id_usuario = '${id}'`;
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        res.json('Se actualizó con exito el usuario')
    })        
})
app.delete('/usuarios/borrar/:id',(req,res) => {
    const {id} = req.params

    const query = `DELETE FROM usuarios WHERE id_usuario=${id}`
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        res.json(`Se elimino correctamente su usuario mi pez`)
    })
})

//----------------Usuarios_has_rol----------------------------------------------------


app.get('/usuario_has_roles', (req,res) => {
    const query = 'SELECT * FROM usuario_has_roles'
    conexion.query (query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json(`No hay registros mi pez`)
        }
    })
})

app.get('/usuario_has_roles/:id', (req,res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuario_has_roles WHERE usuario_id=${id}`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        }else{
            res.json('No hay registros mi pez su id nisiquiera existe')
        }
    })
})

app.post('/usuario_has_roles/agregar', (req,res) => {
    const usuario_has_roles = {
        usuario_tdoc: req.body.usuario_tdoc,
        usuario_id: req.body.usuario_id,
        usuario_rol: req.body.usuario_rol
    }
    const query = `INSERT INTO usuario_has_roles SET ?`
    conexion.query(query, usuario_has_roles, (error, resultado) => {
        if(error) return console.error(error.message)

        res.json('Se insertó correctamente los datos')
    })
})

app.put('/usuario_has_roles/actualizar/:id', (req,res) => {
    const { id } = req.params
    const {usuario_tdoc,usuario_rol} = req.body

    const query = `UPDATE usuario_has_roles SET usuario_tdoc'${usuario_tdoc}',usuario_rol= '${usuario_rol}' WHERE usuario_id='${id}'`
    conexion.query(query, (error,resultado)=>{
        if(error) return console.error(error.message)

        res.json('Se actualizó con exito el usuario_has_rol')
    })        
})
app.delete('/usuario_has_roles/borrar/:id',(req,res) => {
    const {id} = req.params

    const query = `DELETE FROM usuario_has_roles WHERE usuario_id=${id}`
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        res.json(`Se elimino correctamente su usuario mi pez`)
    })
})
//------------------ Vendedor--------------------------------------//


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
