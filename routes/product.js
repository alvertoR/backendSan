import productController from '../controllers/product';
import expres            from 'express';
import upload            from '../libs/storage';

var router = expres.Router();

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.post('/newProduct', upload.single('image'),productController.addProduct);
router.put('/updateProduct/:id', productController.updateProduct);

export default router;