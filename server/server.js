import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

//Alow multiple origins
// Convert comma-separated string to array
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];


//Middleware config
//सर्वर को यह डेटा string के रूप में मिलता है, क्योंकि HTTP protocol में body के contents हमेशा text होते हैं।
//जब आप JSON भेजते हो ({ "name": "Rahul" }), वह text (string) format में आता है।
//इसके लिए, express.json() middleware का उपयोग किया जाता है, जो इस string को JavaScript object में parse करता है।
//Express या किसी भी backend framework को यह string parse करके एक JavaScript object में बदलने की जरूरत होती है ताकि उस data को easily access किया जा सके।
app.use(express.json());   
app.use(express.urlencoded({ extended: true })); 

//बिना इसे parse किए, cookies के string रूप में होने के कारण उन्हें handle करना मुश्किल हो सकता है। cookie-parser इसे आसानी से एक object में बदल देता है।
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
});
