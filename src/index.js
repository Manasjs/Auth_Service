const express = require('express');
const bodyparser=require('body-parser');

const { PORT }=require('./config/serverConfig');
const apiRoutes=require('./routes/index');
const db=require('./models/index');
const app = express();

const prepareAndStartServer =()=>{

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`server started on port:${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
        

        //const service=new UserService;
        // const newToken=service.createToken({email:'manas@admin.com',id:1})
        // console.log("new created token is",newToken);

        // const token= 'dummy jwt for testing'
        // const response =service.verifyToken(token);
        // console.log(response);

    });

}
prepareAndStartServer();