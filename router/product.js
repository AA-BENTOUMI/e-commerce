const express = require("express");
const router = express.Router()
const Product = require("../models/Product");
const multer  = require('multer')
const path =require("path");
var cloudinary = require('cloudinary').v2;
// ********upload product image********//
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
// ********upload rooom image********//
const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './uploads/')
  //   },
  //  filename: function(req, file, cb){
  //   cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  // }
});
// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
})

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
const cloudinaryImageUploadMethod = async file => {
  return new Promise(resolve => {
      cloudinary.uploader.upload( file , {
        folder: 'samples',
        use_filename: true
       },(err, res) => {
        if (err) return res.status(500).send("upload image error")
          console.log( res.secure_url )
          resolve({
            res: res.secure_url
          }) 
        }
      ) 
  })
}
router.post('/addproduct',upload.array('images', 3 ),async(req,res)=>{
  console.log(req.files)
    try {
        if(req.files == undefined){
        res.status(400).send({errors:[{msg:"put a picture"}]})
      }
      
      else{ 
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethod(path)
          urls.push(newPath)
        }
        
        const newProduct = new Product({
          productName:req.body.productName,
          categorie:req.body.categorie,
          price:req.body.price,
          description:req.body.description,
          images: urls.map( url => url.res ),
        });
      if (urls) { await newProduct.save()}
    res.send({msg:"product is created successfully",product:newProduct})}
    } catch (error) {
           res.send({errors:[{msg:"failed upload"}]}) 
    }
    
});

  

module.exports=router