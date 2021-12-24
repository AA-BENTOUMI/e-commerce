const { check, validationResult } = require('express-validator');

exports.orderValidation=()=>[
    check('name','Ajouter un nom').not().isEmpty(),
    check('adress','Ajouter votre adresse').not().isEmpty(),
    check('gouvernerat','Choisissez un gouvernorat').not().isEmpty(),
    check('codePostal','Ajouter un code Postal').notEmpty().isNumeric().isLength({ max: 4 }),
    check('email','Ajouter un e-mail').not().isEmpty().isEmail(),
    check('phone','Ajouter un numéro de téléphone').notEmpty().isNumeric().isLength({ max: 8 }),

]
exports.validation=(req,res,next)=>{
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });    
}
next()
}