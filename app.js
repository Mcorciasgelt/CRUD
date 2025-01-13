const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

app.post("/usuarios", (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;

    if (!nombre || !edad || !lugarProcedencia) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre : req.body.nombre,
        edad : req.body.edad,
        lugarProcedencia : req.body.lugarProcedencia
    };

    usuarios.push(nuevoUsuario);
    res.redirect("/usuarios")
});


app.get("/usuarios/:nombre", (req, res) => {
    const nombre  = req.params.nombre;

    const usuario = usuarios.find(u => u.nombre === nombre);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})