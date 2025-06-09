const UserRepository = require('../repository/user-repository');
const { JWT_KEY }=require('../config/serverConfig');
const jwt = require('jsonwebtoken');


class UserService {
    constructor(){
         this.userRepository=new UserRepository;
    }

async create(data){
    try {
        const user=await this.userRepository.create(data)
        return user;
    } catch (error) {
        console.log("somthing went wrong in service layer");
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
   
}
module.exports=UserService;