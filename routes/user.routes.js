const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const userModel=require('../model/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.get('/register',(req,res)=>{
    res.render('register');
});
router.post('/register',
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array(),
                massage: 'Invalid Data'
             });
        }
        
        const {name,email,password}=req.body;
        const hashpassword= await bcrypt.hash(password,10);
        const newUser= await userModel.create({name,email,password:hashpassword});
        res.json(newUser)


});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',async (req,res)=>{
    body('email').trim().isEmail().withMessage('Invalid email address');
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Invalid Data' });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ 
        userID: user._id ,
        email:user.email,
        username:user.username
    }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.send("logged in");
});



module.exports = router;
