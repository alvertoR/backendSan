import userModel from '../models/user';
import bcrypt    from 'bcrypt';

const salt = 10;

const controller = {
    addUser: async function(req, res){

        const body = {
            name: req.body.name
        }

        body.password = bcrypt.hashSync(req.body.password, salt);

        try{

            const newUserDB = await userModel.create(body);

            if(newUserDB){
                return res.status(200).json({
                    message:'User created',
                    data: newUserDB
                });
            }

        }catch(error){
            return res.status(500).json({
                message:'Error server',
                data: error
            });
        }

    },
    loginUser: async function(req, res){
        const nameUser = req.body.name;
        const passUser = req.body.password;

        const userExist = await userModel.findOne({ name: nameUser });

        if(userExist){

            if(bcrypt.compareSync(passUser, userExist.password)){
                
                try{

                    return res.status(200).json({
                        message:'User find',
                        data:true
                    })

                }catch(error){
                    return res.status(500).json({
                        message:'Error server',
                        data: false,
                        error
                    });
                }

            }else{
                return res.status(200).json({
                    message:"Password incorrect",
                    data: false
                });
            }

        }else{
            return res.status(200).json({
                message:"User don't exist",
                data: false
            });
        }

    }
};

export default controller;