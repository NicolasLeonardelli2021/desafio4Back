const express = require("express")
const {Router} = express;
const app = express()
const PORT = 8080;
app.use(express.json());                    
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

let productos = [];

let routerProductos = new Router();

routerProductos.get("/", (req,res,next) =>{
    res.json(productos);
})

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

routerProductos.post("/",(req, res,next)=>{
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

    res.json(productos)
})

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

app.use("/api/productos",routerProductos);

app.listen(PORT, ()=>{
    console.log(`estamos escuchando en esta url: http://localhost:${PORT}`)
})