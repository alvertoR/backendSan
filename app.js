import dotenv  from 'dotenv';
import express from 'express';
import morgan  from 'morgan';
import cors    from 'cors';
import path    from 'path';
import mongose from 'mongoose';

dotenv.config();

//Import rutes
import routesProduct from './routes/product';
import routerUser    from './routes/user';

const app = express();

//DB connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_ATLAS}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser:    true,
    useCreateIndex:     true,
    useUnifiedTopology: true
};

mongose.connect(uri, options)
.then(() =>{
    console.log(`We're in DB`),
    err => {
        console.log(err);
    }
});


//Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/public', express.static(`${__dirname}/storage/imgs`));
app.use('/omarSan/product', routesProduct);
app.use('/omarSan/user', routerUser)

//Server
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log(`We're in: port ${app.get('puerto')}`);
});