import mongose from 'mongoose';


const Schema = mongose.Schema;


const productSchema = new Schema({
    name:     {type: String},
    category: {type: String},
    value:    {type: Number},
    date:     {type: Date, default: Date.now},
    picture:  {type: String}
});

productSchema.methods.setPicture = function setPicture(filename, type){
    const host = process.env.APP_HOST;

    this.picture = `${host}public/${filename}.${type}`;
}



const product = mongose.model('Products', productSchema);

export default product;