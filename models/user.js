import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name:     { type: String },
    password: { type: String }
});

const user = mongoose.model('Users', userSchema);

export default user;