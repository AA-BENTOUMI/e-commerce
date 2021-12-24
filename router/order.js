const express = require("express");
const Order = require("../models/Order");
const router = express.Router()
const Oreder = require("../models/Order");
const { orderValidation, validation} = require("../middlewares/orderValidation");

// ***new order function****
router.post('/addorder',orderValidation(), validation,async(req,res)=>{
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
// get all orders
router.get('/getorders',async(req,res)=>{
    try {
      const allorders=await Order.find()
      res.status(200).send(allorders)
    } catch (error) {
      res.send({errors:[{msg:"error fetch all orders"}]})
    }
  })
// get one order
router.get('/oneorder/:id',async(req,res)=>{
    try {
        let result=await Oreder.findById( { _id: req.params.id },);
         res.status(200).send({ msg: "successfully" ,result});
      } catch (error) {
        res.status(400).send({ errors: [{ msg: "order not found", error }] });
      }
})
//******update oreder*******/
router.put('/updateorder/:id',async(req,res)=>{
    try {
        let result=await Order.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ msg: "order is updated", result });
    } catch (error) {
        res.status(400).send({errors:[{msg:"failed update"}]})
    }
});
//******delete order****** */
router.delete('/deleteorder/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        // find romm with  id and deleted
        await Order.deleteOne({ _id: id });
        res.send({ msg: "order is deleted " });
      } catch (error) {
        res.status(400).send({ msg: "failed delete", error });
      }
})

module.exports=router