const router = require("express").Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { formatDate } = require('../helpers/hbs');

router.get('/',(req,res)=>{
    res.render('home');
});


router.post('/create',async(req,res)=>{
   const { firstName,lastName,email,age,address,currentBalance } = req.body;

    
    try{

        const newUser =new User({
            firstName,
            lastName,
            email,
            age,
            address,
            currentBalance
        });
        await newUser.save();
        console.log("User created");
        res.send({msg:'user created'});
    }
    catch(err){
        console.log(err);
    }
});

router.get('/allusers',async(req,res)=>{
    try{
        const users = await User.find();
        res.render('allusers',{users});
    }
    catch(err){
        console.log(err);
        res.status(400).send({msg:"error occured"});
    }

});

router.get('/user/:id',async(req,res)=>{
    try{
        const customer = await User.findById(req.params.id);
        res.render('profile',{customer});
    }
    catch(err){
        console.log(err);
        res.status(404).send({msg:"Invalid User"});
    }

});

router.get('/transfer/:id',async(req,res)=>{
    const uid = req.params.id;
    const users = await User.find({
        _id:{$ne:uid}
    });

    const customer = await User.findById(uid);

    res.render('transfer',{users,customer});
});

router.put('/payment/:id',async(req,res)=>{
    const { senderUserName,senderId,receiveremail,receivedamount,receiver } = req.body;
    
    try{
        const user1 = await User.findById(req.params.id);
        const user2 = await User.findOne({email:receiveremail});

        if(user2.firstName === receiver && user2.email === receiveremail){
            if(user1.currentBalance >= receivedamount && user1.currentBalance >=0 ){
                const newTransaction =new  Transaction({
                    senderName : senderUserName,
                    receiverName : receiver,
                    receiverEmail : receiveremail,
                    transferAmount : receivedamount,
                    sender : senderId
                });

                await newTransaction.save();

                const sendername = await User.findOneAndUpdate(
                    {_id:req.params.id},
                    {currentBalance:user1.currentBalance-parseInt(receivedamount)},
                    {new:true}
                    );

                const reciver = await User.findOneAndUpdate(
                    {email:receiveremail},
                    {currentBalance:user2.currentBalance + parseInt(receivedamount)},
                    {new:true}
                    );
            
                res.redirect('/allusers');
            }
            else{
                res.status(400).send({msg:"CurrentBalance is low then you enteered"});
            }
        }
        else{
            res.status(400).send({msg:"No User founded this firstName or email address"});
        }
        }
    catch(err){
        console.log(err);
    }
    
});

router.get('/transactions/:id',async(req,res)=>{
    try{
        const transactions = await Transaction.find({sender:req.params.id});
        res.render('transactions',{transactions,formatDate});
    }
    catch(err){
        console.log(err);
        res.status(400).send({msg:"something went wrong"})
    }
});


module.exports = router;