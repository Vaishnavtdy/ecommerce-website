const { response } = require('express');
var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
    productHelpers.getAllProduct().then((products)=>{
      res.render('admin/view-products', { admin: true, products}); 
    })
  
});



router.get('/add-product', (req,res)=>{
  res.render('admin/add-products')
})
 router.post('/add-product', (req,res)=>{
   
   productHelpers.addProduct(req.body,(id)=>{
     let image = req.files.Image
     image.mv('./public/images/'+id+'.jpg',(err,done)=>{
       if(!err){
         res.render('admin/add-products')
       }else{
         console.log(err);
       }
     })

   })
 })
 router.get('/delete-product/:id',(req,res)=>{
   let prodId = req.params.id
   productHelpers.deleteProduct(prodId).then((response)=>{
     res.redirect('/admin/')
   })
 })
 router.get('/edit-product/:id',async(req,res)=>{
   let product = await productHelpers.getProductDetails(req.params.id)
   console.log(product)
   res.render('admin/edit-product',{product})
 })

 router.post('/edit-product/:id',(req,res)=>{
   productHelpers.updateProduct(req.params.id,req.body).then(()=>{
     let id=req.params.id
     res.redirect('/admin')
     if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/images/'+id+'.jpg')
     }
   })
 })

module.exports = router;
