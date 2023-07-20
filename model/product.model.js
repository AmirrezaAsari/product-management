const products = require("./../data/products.json");
const fileSystem = require("fs");


async function find(){
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

async function findById(id){
    return new Promise((resolve, reject) => {
        resolve(products.find(product => product.id == id));
    })
}

async function create(product){
    return new Promise((resolve, reject) => {
        products.push(product);
        fileSystem.writeFile("./data/products.json", JSON.stringify(products), (err)=>{
            if(err) reject(err);
            else resolve({message:"Product Created Successfully!", data: product});
        });

    })
}

async function update(id, payLoad){
    return new Promise((resolve, reject) => {
        products.map(product =>{
            if(product.id == id){
                Object.assign(product, payLoad);
            }
            return product;
        })
        fileSystem.writeFile("./data/products.json", JSON.stringify(products), (err)=>{
            if(err) reject(err);
            else resolve({message:"Product Updated Successfully!"});
        });

    })
}

async function remove(id){
    return new Promise((resolve, reject) => {
        const newList = products.filter(product => product.id != id);
        fileSystem.writeFile("./data/products.json", JSON.stringify(newList), (err)=>{
            if(err) reject(err);
            else resolve({message:"Product Deleted Successfully!"});
        });
    })
}

const productModel = {
    find,
    findById,
    create,
    update,
    remove
};
module.exports = productModel;