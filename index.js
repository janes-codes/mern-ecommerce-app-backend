const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const productController = require('./controllers/productController')  
const userController = require('./controllers/userController')  
const rolesController = require('./controllers/rolesController')
const auth = require('./middleware/auth')
const db = require('./db')
const paymentController = require('./controllers/paymentController')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-ecommerce-app.onrender.com", "https://google.com"]
}))

app.get("/products", (req, res) => {
    const data = [
        {
            title: "Painting",
            price: 499,
            image: "./public/assets/shopimg1.jpg",
            imgDesc: "The Ancient Standing Stones, original oil painting on a cold pressed paper 36 x 26",
            seller: "seller1"
        },
        {
            title: "Sketch",
            price: 350,
            img: "./public/assets/shopimg2.jpg",
            imgDesc: "Female sitting devastated, medium ink, black and white, original inked sketch on a canvas 36 x 66",
            seller: "seller2"

        },
        {
            title: "Painting",
            price: 650,
            image: "./public/assets/shopimg3.jpg",
            imgDesc: "The baby's Dream, medium water color, colored, original water color on a acrylic pad 36 x 66",
            seller: "seller3"
        },
        {
            title: "Painting",
            Price: 700,
            image: "./public/assets/shopimg4.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller4"
        },
        {
            title: "Painting",
            price: 1000,
            image: "./public/assets/shopimg5.jpg",
            imgDesc: "History painting of a Castle, medium Fresco paint, colored, original Fresco painting on a canvas 36 x 66",
            seller: "seller5"
        },
        {
            title: "Sketch",
            price: 350,
            image: "./public/assets/shopimg6.jpg",
            imgDesc: "Side profile sketch of women, medium inking, black and white with green background, original inked sketch on a Bristol paper 36 x 66",
            seller: 'seller6'
        },
        {
            title: "Painting",
            price: 850,
            image: "./public/assets/shopimg7.jpg",
            imgDesc: "Realistic art with oil paint, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: 'seller7'
        },
        {
            title: "Painting",
            price: 2000,
            image: "./public/assets/shopimg8.jpg",
            imgDesc: "Realistic art with accurate attention to detail, medium Fresco paint, colored, original Fresco painting on a acrylic pad 36 x 66",
            seller: 'seller8'
        },
        {
            title: "Painting",
            price: 1500,
            image: "./public/assets/shopimg9.jpg",
            imgDesc: "Historic art of mandaneness, medium Fresco paint, colored, original Fresco painting on a canvas 36 x 66",
            seller: "seller9"
        },
        {

            title: "Painting",
            price: 1500,
            image: "./public/assets/shopimg11.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller11"
        },
        {
            title: "Sketch",
            price: 1500,
            image: "./public/assets/shopimg13.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller13"
        },
        {
            title: "Sketch",
            price: 1500,
            image: "./public/assets/shopimg14.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller14.jpg"
        },
        {
            title: "Sketch",
            price: 1500,
            image: "./public/assets/shopimg15.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller15"
        },
        {
            title: "Painting",
            price: 1500,
            image: "./public/assets/shopimg16.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller16"
        },
        {
            title: "Painting",
            price: 1500,
            image: "./public/assets/shopimg17.jpg",
            imgDesc: "The Reflection of Solitude, medium oil paint, colored, original oil painting on a canvas 36 x 66",
            seller: "seller17"
        },
    ]

    res.send({code: 200, message: 'Fetch product success.', data: data})
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

app.listen(3001, () => {
    console.log("listening on port", 3001)
})