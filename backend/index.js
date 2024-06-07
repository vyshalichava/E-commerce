const port = 4000;
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://chavavyshali3102:e0DIbgTxs9vFz4dA@cluster0.bcvjopf.mongodb.net');

app.get("/",(req, res)=>{
    res.send("Express app is running")

})


const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
    }     
})

const upload = multer({storage: storage})

app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type: Boolean,
        default: true
    }
})

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if (products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log('saved')
    res.json({
        success:true,
        name:req.body.name
    })
}
)

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name
    })
})


app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched")
    res.send(products);
}
)

//creating schema for user prducts
const Users = mongoose.model('Users',{
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type:String
    },
    cartData:{
        type: Object
    },
    date:{
        type: Date,
        default: Date.now
    }
})

//creating end point for registering user
app.post('/signup',async(req, res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false, errors:"existing user found"})
    }
    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token})

})

//creating end point for users login
app.post('/login',async(req, res)=>{
    let user = await Users.findOne({email:req.body.email})
    if (user){
        const passCompare = req.body.password === user.password
        if (passCompare){
            const data = {
                user:{
                id:user.id
            }}
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"incorrect password"})
        }
    }
    else{
        res.json({success:false,errors:"wrong email id"})
    }
})

//creating end point for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collections fetched")
    res.send(newcollection)
})

app.listen(port,(error)=>{
    if (!error){
        console.log('server running on port: '+port)
    }
    else{
        console.log("error: "+error)
    }
})