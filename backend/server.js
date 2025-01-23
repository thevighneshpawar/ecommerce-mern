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
app.use(cors())


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