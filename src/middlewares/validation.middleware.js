import { body, validationResult } from "express-validator";

const  validateRequest = async (req, res, next)=>{
    console.log(req.body)

    // seturp rules for validation
    const rules=[
        body('name').notEmpty().withMessage('name is rquired'),
        body('price').isFloat({gt:0}).withMessage(
            'Price should be a positive value'
        ), 
        body('imageUrl').custom((value, {req})=>{
          if(!req.file){
            throw new Error('Images is Required')
          }
          return true

        }),

    ];

    // 2. run those rules


  await  Promise.all(rules.map(rule=>rule.run(req)));

  // 3. check if there are any errors after running the rules

  var validationErrors = validationResult(req)
  console.log(validationErrors)

  //4. if errors, return the errror message

      if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
          errorMessage: validationErrors.array()[0].msg,
        });
      }
      next();

}

export default validateRequest










/*


      // validate data
      const { name, price, imageUrl } = req.body;
      let errors = [];
      if (!name || name.trim() == '') {
        errors.push('Name is required');
      }
      if (!price || parseFloat(price) < 1) {
        errors.push(
          'Price must be a positive value'
        );
      }
      try {
        const validUrl = new URL(imageUrl);
      } catch (err) {
        errors.push('URL is invalid');
      }
  */