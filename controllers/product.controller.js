const { parse } = require("picomatch");
const productModel = require("../model/product.model");

async function getProductController(req, res) {
    try {
        const products = await productModel.find();
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(products));
        res.end();
    } catch (error) {
        console.log(error);
    }
}
async function getById(req, res){
    try {
        const id = req.url.split("/")[3];
        const product = await productModel.findById(id);
        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify({message: "Not Found"}));
            res.end();
        }
        else{
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify(product));
            res.end();
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

async function create(req, res){
    try {
        let body = '';
        req.on("data", (chunk)=>{
            body += chunk.toString();
        })
        req.on("end", async()=>{
            const product = ({id:Date.now(),...JSON.parse(body)});
            const result = await productModel.create(product);
            res.writeHead(201, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        })
    }
    catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: "Internal Server Error" }));
        res.end();
    }
}

async function update(req, res){
    try {
        let body = '';
        req.on("data", (chunk)=>{
            body += chunk.toString();
        })
        req.on("end", async()=>{
            const id = req.url.split("/")[3];
            const parsedBody = {...JSON.parse(body)};
            const product = await productModel.findById(id);
            if(!product){
                res.writeHead(404, {'Content-Type' : 'application/json'});
                res.write(JSON.stringify({message: "Product Not Found!"}));
                res.end();
            }else{
                const result = await productModel.update(id, parsedBody);
                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.write(JSON.stringify(result));
                res.end();
            }
            
        })
    }
    catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: "Internal Server Error" }));
        res.end();
    }
}

async function remove(req, res){
    try {
        const id = req.url.split("/")[3];
        const product = await productModel.findById(id);
        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify({message: "Not Found"}));
            res.end();
        }
        else{
            const result = await productModel.remove(id);
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

const productController = {
    getProductController,
    getById,
    create,
    update,
    remove
}

module.exports = productController;