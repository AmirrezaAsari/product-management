const {MongoClient} = require("mongodb");

class ConnectToMongo {
    #DB_URL = "mongodb://127.0.0.1:27017/product-management";
    #db = null;
    async #connect(){
        try {
            const client = new MongoClient(this.#DB_URL);
            let db = await client.db();
            return db;
        } catch (error) {
            console.log(error.message);
        }
    }

    async Get(){
        try {
            if(this.#db){
                console.log("connection already exists");
                return this.#db;
            }
            this.#db = await this.#connect();
            return this.#db;
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = ConnectToMongo;