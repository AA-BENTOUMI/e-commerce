const express = require("express");
const router = express.Router()
const Oreder = require("../models/Order");


// ***new order function****
router.post('/addorder',async(req,res)=>{
    try {
        const addcommande = new Oreder({
            orderNumber:req.body.orderNumber,
            name:req.body.name,
            adress:req.body.adress,
            gouvernerat:req.body.gouvernerat,
            codePostal:req.body.codePostal,
            email:req.body.email,
            phone:req.body.phone,
            status:req.body.status,
            date:new Date,
            id_product:req.body.id_product,
          });
          let result =  await addcommande.save()
          res.status(200).send({ msg: "commande passé avec succés" ,result});
    } catch (error) {
        res.status(400).send({ errors: [{ msg: "échec commande", error }] });   
    }
})



module.exports=router