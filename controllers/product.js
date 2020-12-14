import modelProduct from '../models/product';
import fs           from 'fs';

var controller = {
    addProduct: async(req, res) => {
        const {
            name,
            value,
            category
        } = req.body;

        const product = modelProduct({
            name,
            value,
            category
        });

        console.log('hiii');

        if(req.file){
            console.log('Si hay archivos');
            const { path, filename, mimetype } = req.file;

            const splitFile = mimetype.split('/');
            const typeFile  = splitFile[1];

            fs.renameSync(path, path + '.' + typeFile);

            
            product.setPicture(filename, typeFile);            
        }

        
        try{
            console.log('Entre al try');
            const newProduct = await product.save();

            if(newProduct){
                return res.status(200).json({
                    message:'Product created',
                    data: newProduct,
                    state: true
                });
            }

        }catch(error){
            return res.status(500).json({
                message:'Error server',
                data: {}
            });
        }
    
    },

    getProducts: async(req, res) => {
        try{
            const productsDB = await modelProduct.find();

            if(productsDB != ''){
                return res.status(200).json({
                    data: productsDB
                });
            }

            return res.status(200).json({
                menssage: "currently you don't have products",
                data:{}
            });


        }catch(error){
            return res.status(500).json({
                message:'Error server',
                data: {}
            });
        }
    },

    getProduct: async(req, res) => {
        const product = req.params.id;

        try{
            const productDB = await modelProduct.findById({ _id: product });

            if(productDB){
                return res.status(200).json({
                    data: productDB
                });
            }

        }catch(error){
            return res.status(500).json({
                message:'Error server',
                data: {},
                error
            });
        }

    },

    updateProduct: async(req, res) => {
        
        const idProduct = req.params.id;
        
        const newValues = {
            name:     req.body.name,
            value:    req.body.value,
            category: req.body.category
        }
        
        try{
            const updateProductDB = await modelProduct.findByIdAndUpdate(idProduct, newValues,{new: true});

            if(updateProductDB){
                return res.status(200).json({
                    data: updateProductDB,
                    state: true
                });
            }else{
                return res.status(400).json({
                    message: "Something is wronf",
                    state: false
                });
            }

        }catch(error){
            return res.status(500).json({
                message:'Error server',
                data: {},
                error
            });
        }

    }
}

export default controller;