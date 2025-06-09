const express = require('express');
const bodyparser=require('body-parser');

const { PORT }=require('./config/serverConfig');
const apiRoutes=require('./routes/index');
//const userRepository=require('./repository/user-repository');
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt');
const app = express();

const prepareAndStartServer =()=>{

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`server started on port:${PORT}`);
        // const incomingpassword='123456';
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);
        //  const Repo=new userRepository();
        //  const response=await Repo.getbyId(2);
        //  console.log(response);

    });

}
prepareAndStartServer();