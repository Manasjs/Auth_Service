const UserRepository = require('../repository/user-repository');
const { JWT_KEY }=require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');
const ValidationError=require('../utils/validation-error');
const ClientError =require('../utils/client-error');


class UserService {
    constructor(){
         this.userRepository=new UserRepository;
    }

async create(data){
    try {
        const user=await this.userRepository.create(data)
        return user;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            throw error;
        }
        console.log("somthing went wrong in service layer"); 
        throw new AppErrors(
            'ServerError',
            'Somthing went wrong in service',
            'Logical Issue found',
            500
        )

    }
}

async signIn(email,plainPassword){
    try {
        //step1->fetch the user using email
        const user = await this.userRepository.getByEmail(email);
        //step2->compare incoming plain password with stores encrypted password
        const passwordMatch=this.checkPassword( plainPassword, user.password )
       //if password matches then create a token and send it to the user 
       if(!passwordMatch){
        console.log("password doesn't match");
        throw {error:"incorrect password"};
       }
       const newJWT = this.createToken({ id: user.id, email: user.email });
        return newJWT;
    } catch (error) {
       if(error.name == 'Attribute not found'){
         throw error;
       }
       console.log("somthing went wrong in the sign in process");
       throw error; 
    }
}

async isAuthenticated(token){
    try {
        const response=this.verifyToken(token);
        if(!response){
            throw {error:'invalid token'}
        }
        const user=this.userRepository.getbyId(response.id);
        if(!user){
            throw {error:'no user with this corresponding token exists'}
        }
        return user.id;
    } catch (error) {
       console.log("somthing went wrong in Auth process");
       throw error;  
    }
}

async destroy(userId){
    try {
        await this.userRepository.destroy(userId)
        return true;
    } catch (error) {
        console.log("somthing went wrong in service layer");
        throw error;
        
    }
}

createToken(user){
    try {
        const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'})
        return result;
    } catch (error) {
        console.log("somthing went wrong in token creation");
        throw error;
    }
}

verifyToken(token){
    try {
        const response=jwt.verify(token,JWT_KEY);
        return response;
    } catch (error) {
       console.log("somthing went wrong in token verification",error) ;
       throw error;
    }
}

checkPassword(userInputPlainPassword,encryptedPassword){
    try {
        return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
    } catch (error) {
       console.log("somthing went wrong in comparison password") ;
       throw error;
    }
}

isAdmin(userId){
    try {
        return this.userRepository.isAdmin(userId)
    } catch (error) {
         console.log("somthing went wrong in comparison password") ;
       throw error;
    }
}
   
}


module.exports=UserService;