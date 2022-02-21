var db = require('../config/connection')
var collections = require('../config/collections');
const { log } = require('handlebars');
var objectId = require('mongodb').ObjectId;
const { response } = require('express');

module.exports={

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let admin = await db.get().collection(collections.ADMIN_COLLECTIONS).findOne({ Email: adminData.Email })
            if (admin) {
                bcrypt.compare(userData.Password, admin.Password).then((status) => {
                    if (status) {
                        console.log('Login success')
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('Login failed');
                        resolve({ status: false })
                    }
                })
            } else {
                console.log('Login Failed');
                resolve({ status: false })
            }
        })
    },

    addProduct:(product,callback)=>{
        console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data.insertedId)
        })
    },
    getAllProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collections.PRODUCT_COLLECTIONS).find().toArray()
            resolve(products)
        })

    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTIONS).deleteOne({_id:objectId(prodId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTIONS).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTIONS)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}