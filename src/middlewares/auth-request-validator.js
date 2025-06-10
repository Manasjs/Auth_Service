const validateUserAuth = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:"somthing went wrong",
            err:"email or password is missing in the request"
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}