const UserService=require('../services/user-service');

const userService=new UserService();

const create = async (req,res) => {
   try {
    const response=await userService.create({
       email:req.body.email,
       password:req.body.password
    });
    return res.status(201).json({
        success:true,
        message:"successfully created new user",
        data:response,
        err:{}
    })
    
   } catch (error) {
    console.log(error);
    return res.status(500).json({
       success:false,
       message:"somthing went wrong",
       data:{},
       err:error
    })
    
   }  
}

const signIn=async(req,res)=>{
   try {
      const response = await userService.signIn (req.body.email, req.body.password)
      return res.status(200).json({
         success:true,
         data:response,
         err:{},
         message:"successfully signed in"
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
       success:false,
       message:"somthing went wrong",
       data:{},
       err:error
    })
   }
}

const isAuthenticated=async(req,res)=>{
   try {
      const token = req.headers['x-access-token'];
      const response=await userService.isAuthenticated(token);
      return res.status(200).json({
         success:true,
         message:"user is authenticated and token is valid",
         err:{},
         data:response 
      })
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
       success:false,
       message:"somthing went wrong",
       data:{},
       err:error
    })
   }
}

const isAdmin = async(req,res)=>{
      try {
         const response = await userService.isAdmin (req.body.id)
      return res.status(200).json({
         success:true,
         data:response,
         err:{},
         message:"successfully fetched wheather user is admin or not"
      });
      
      } catch (error) {
        console.log(error);
      return res.status(500).json({
       success:false,
       message:"somthing went wrong",
       data:{},
       err:error
      }) ;
   }
}
module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin

}