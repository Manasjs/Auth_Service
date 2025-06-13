const {User,Role}=require("../models/index");

class UserRepository{

    async create(data){
        try {
            const user =await User.create(data);
            return user;
        } catch (error) {
            console.log("somthing went wrong in repository level");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("somthing went wrong in repository level");
            throw error;
        }
    }

    async getbyId(userId){
        try {
           const user =await User.findByPk(userId,{
            attribute:['email','id']
           });
           return user;
        } catch (error) {
           console.log("somthing went wrong in repository level");
           throw error; 
        }

    }

    async getByEmail(userEmail){
        try {
            const user=await User.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;
        } catch (error) {
           console.log("somthing went wrong in repository layer");
           throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user=await User.findByPk(userId);
            const AdminRole=await Role.findOne({
                where:{
                    name:'ADMIN'
                }
                
            });
            return user.hasRole(AdminRole);
            
        } catch (error) {
           console.log("somthing went wrong in repository layer");
           throw error; 
        }
    }

    

}

module.exports=UserRepository;