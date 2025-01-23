import express from'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'

// App config

const app = express()
const port = process.env.PORT || 4000
connectDB();

// MIDDLEWARES

app.use(express.json())
const corsOptions = {
    origin: 'https://ecommerce-frontend-jet-one.vercel.app' || 'https://ecommerce-mern-iota-opal.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));


//api Endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order/',orderRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
    
})
