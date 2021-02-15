const router = require("express").Router();
const User = require('../models/User');

router.get('/',(req,res)=>{
    res.render('home');
});
router.get('/create',(req,res)=>{
    console.log("create page");
})
router.post('/create',async(req,res)=>{
   const { firstName,lastName,email,age,address } = req.body;

    
    try{

        const newUser =new User({
            firstName,
            lastName,
            email,
            age,
            address
        });
        await newUser.save();
        console.log("User created");
        res.send({msg:'user created'});
    }
    catch(err){
        console.log(err);
    }
    //console.log(req.body);
});

router.get('/allusers',async(req,res)=>{
    try{
        const users = await User.find();
        res.render('allusers',{users});
        //res.status(200).send(users);
    }
    catch(err){
        console.log(err);
        res.status(400).send({msg:"error occured"});
    }

});

router.get('/transfer',async(req,res)=>{
    const users = await User.find();
    res.render('transfer',{users});
});

router.put('/payment/:id',async(req,res)=>{
    const { sender,receiveremail,receivedamount } = req.body;
    

    try{
        const user1 = await User.findById(req.params.id);
        const user2 = await User.findOne({email:receiveremail});

        if(user1.currentBalance >= receivedamount && user1.currentBalance >=0 ){

            const sendername = await User.findOneAndUpdate(
                {_id:req.params.id},
                {currentBalance:user1.currentBalance-parseInt(receivedamount)},
                {new:true}
                );
            //console.log(sendername);

            const reciver = await User.findOneAndUpdate(
                {email:receiveremail},
                {currentBalance:user2.currentBalance + parseInt(receivedamount)},
                {new:true}
                );
           
           // console.log(reciver);
            //console.log(user2.currentBalance);
            res.redirect('/allusers');
        }
        else{
            res.send({msg:"CurrentBalance is low then you enteered"});
        }
        }
    catch(err){
        console.log(err);
    }
    
    //res.redirect('/processpayment',{details});
});

//router.put('/processpayment',async(req,res)=>{
    
//});

module.exports = router;