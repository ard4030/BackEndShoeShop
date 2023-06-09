const { AllRoutes } = require("./router/router");
const cookieParser = require('cookie-parser');
const cors = require("cors")
module.exports = class Application {
    #express = require("express");
    #app = this.#express();

    constructor(DB_URL,PORT){
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createRoutes()
        this.createServer(PORT)
        this.errorHandler()
    }
    configApplication(){
        const path = require("path");
        this.#app.use(cors({
            credentials: true,
            origin: ["http://localhost:3000","http://localhost:3001",
            "http://adminShop.novin-code.ir","https://adminShop.novin-code.ir",
            "https://novin-code.ir","https://novin-code.ir"],
        }));
        this.#app.use(this.#express.static(path.join(__dirname, "..")))
        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({extended : true}))   
        this.#app.use(cookieParser());   
        // this.#app.use((req, res, next) => {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        //     next();
        //   });
    }
    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Run > On  http://localhost:${PORT}`)
        })
    }
    configDatabase(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL, (error) => {
            if(error) throw error
            return console.log("Connect to DB successful...")
        })
    }
    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "صفحه یا ادرس مورد نظر یافت نشد"
            })
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";
            return res.status(200).json({
                status,
                success : false,
                message
            })
        })
    }
    createRoutes(){
        this.#app.get("/", (req, res, next) => {
            return res.json({
                message : "this is a new Express application"
            })
        })
        this.#app.use(AllRoutes)
        // this.#app.use((err, req, res, next) => {
        //     try {
        //     } catch (error) {
        //         next(error)
        //     }
        // })
    }
}