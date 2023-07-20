const http = require("http");
const PORT = 3000;
const productController = require("./controllers/product.controller");
const errorHandler = require("./controllers/erorrHandler.controller");


const server = http.createServer((req, res) => {
    const apiRoute = "api";
    const productsRoute = `/${apiRoute}/products`;
    const singleProduct = /\/api\/products\/[0-9+]/;
    const {url, method} = req;

    if(url == productsRoute && method == "GET"){
        productController.getProductController(req,res);
    }
    else if(url.match(singleProduct) && method == "GET"){
        productController.getById(req,res);
    }
    else if(url == productsRoute && method == "POST"){
        productController.create(req, res);
    }
    else if(url.match(singleProduct) && method == "PUT"){
        productController.update(req,res);
    }
    else if(url.match(singleProduct) && method == "DELETE"){
        productController.remove(req,res);
    }
    else{
        errorHandler.notFound(res);
    }
   
});
server.listen(PORT, ()=>{
    console.log(`server run on port: ${PORT} http://localhost:${PORT}`);
});

