const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config();
const connectDB = require('./db');
const path = require('path')
const productController = require('./controllers/productController')  
const userController = require('./controllers/userController')  
const rolesController = require('./controllers/rolesController')
const auth = require('./middleware/auth');
const paymentController = require('./controllers/paymentController')
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-ecommerce-app-project7399.onrender.com", "https://google.com"]
}))

app.get("/", (req, res) => {
    res.send("Home page");
})

app.post('/add-product', auth.checkToken, productController.addProduct)
app.get('/get-products', productController.getProducts)
app.post('/edit-products', auth.checkToken,productController.editProducts)
app.get('/get-product/:id', auth.checkToken,productController.getProductById)
app.post('/delete-products', auth.checkToken,productController.deleteProducts)

app.post('/signup', userController.signUp)
app.post('/login', userController.login)
app.post('/add-to-cart', userController.addToCart)
app.post('/get-user-cart', userController.getCart)
app.post('/delete-cart', userController.deleteCart)

app.post('/add-role', rolesController.addRole)
app.post('/delete-role', auth.checkToken, rolesController.deleteRole)

app.post('/orders', paymentController.orders)
app.post('/verify', paymentController.verfiy)


const startSever = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error) {
        console.log(error);
    }
};

startSever();