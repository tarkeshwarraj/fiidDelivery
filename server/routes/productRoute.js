import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, ChangeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller, addProduct);
productRouter.post('/list', productList);
productRouter.post('/list', productById);
productRouter.post('/list', authSeller, ChangeStock);



export default productRouter();