const express = require("express")
const {Router} = express;
const app = express()
const PORT = 3000;

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.set("views", "./views/ejs");
app.set("view engine", "ejs");

let productos = [];

app.get("/", (req,res,next) =>{
    res.render("index", {productos});   
})

app.get("/productos", (req,res,next) =>{
    res.render("data", {productos});   
})

 
/*

routerProductos.get("/:id", (req,res,next)=>{
    let {id} = req.params;
    let encontrado = false;

        for(producto of productos){
            if(producto.id == id){
                encontrado=true
                res.json(producto)
            }
        }
        if(encontrado == false){
            res.json({
                "ERROR": "producto no encontrado"
            })
        }
})
*/
app.post("/",(req, res,next)=>{
    let id = productos.length + 1;
    let {titulo} = req.body;
    let {precio} = req.body;
    let {ruta} = req.body;

    productos.push({
        "id": id,
        "titulo": titulo,
        "precio": precio,
        "ruta": ruta
    })
    console.log(productos)
    res.redirect("/")
})
/*
routerProductos.put("/:id",(req,res,next)=>{
    const {id} = req.params;
    let encontrado = false;
    const {titulo} = req.body;
    const {precio} = req.body;
    const {ruta} = req.body;
    for(producto of productos){
        if(producto.id == id){
            encontrado=true
            producto.titulo = titulo;
            producto.precio = precio;
            producto.ruta = ruta
        }
    }
    if(encontrado == false){
        res.json({
            "ERROR": "producto no encontrado"
        })
    }else{
        res.json(productos)
    }  
})
*/
/*
routerProductos.delete("/:id",(req, res, next)=>{
    const {id} = req.params
    let encontrado = false;
    for(i =0; i< productos.length; i++){
        if(productos[i].id == id){
            encontrado=true
            productos.splice(i,1)
        }
    }
    if(encontrado == false){
        res.json({
            "ERROR": "producto no encontrado"
        })
    }else{
        res.json(productos)
    }  
})
*/

app.listen(PORT, ()=>{
    console.log(`estamos escuchando en esta url: http://localhost:${PORT}`)
})