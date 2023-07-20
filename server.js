const http = require("http");
const PORT = 3000;
const productController = require("./controllers/product.controller");
const errorHandler = require("./controllers/erorrHandler.controller");


const server = http.createServer((req, res) => {
    if(req.url == "/api/products" && req.method == "GET"){
        productController.getProductController(req,res);
    }
    else if(req.url.match(/\/api\/products\/[0-9+]/) && req.method == "GET"){
        productController.getById(req,res);
    }
    else if(req.url == "/api/create" && req.method == "POST"){
        productController.create(req, res);
    }
    else if(req.url.match(/\/api\/products\/[0-9+]/) && req.method == "PUT"){
        productController.update(req,res);
    }
    else{
        errorHandler.notFound(res);
    }
   
});
server.listen(PORT, ()=>{
    console.log(`server run on port: ${PORT} http://localhost:${PORT}`);
});

