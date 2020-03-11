const router = require('express').Router();

const createError = require('http-errors');
const createController = require('../createController');
const User = require('../../models/User');
const authValidator = require('../../validators/auth');
const jwt = require('../../utils/jwt');

//email
const nodemailer = require('nodemailer');

const { USER_NOT_FOUND, INCORRECT_PASSWORD } = require('../../utils/constants');

const controller = require('../../controllers/api/users');

router.post('/login', controller.login);
router.post('/register', controller.register);

router.post(
  '/login',
  createController(
    async (req, res) => {
      const { username, password } = res.locals.inputBody;

      const user = await User.findOne({ username });
      if (!user)
        throw new createError(404, USER_NOT_FOUND, {
          errors: {
            username: USER_NOT_FOUND,
          },
        });
      const isMatch = await user.checkPassword(password);
      if (isMatch) {
        const token = await jwt.sign(user);
        res.status(200).json({
          token,
        });
      } else {
        throw new createError(401, INCORRECT_PASSWORD, {
          errors: { password: INCORRECT_PASSWORD },
        });
      }
    },
    {
      validation: {
        throwError: true,
        asObject: true,
        validators: [authValidator.login],
      },
      inputs: ['username', 'password'],
    },
  ),
);

router.post(
  '/register',
  createController(
    async (req, res) => {
      const body = res.locals.inputBody;

      if (body.birth) {
        body.birth = new Date(body.birth);
      }



      if (await User.findOne({ username: body.username })) {
        throw new createError(409, 'This username aleady exists.', {
          errors: {
            username: `Username '${body.username}' is already taken.'`,
          },
        });
      }

    
      if (await User.findOne({ email: body.email })) {
        throw new createError(409, 'This email aleady exists.', {
          errors: {
            email: `Email '${body.email}' is already taken.'`,
          },
        });
      }


      // sending email

       const output = `
       <!doctype html>
        <html lang="en">
          <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

          <style>
              .container {
                
                  background-color: #eee;
                  
                  font-family: Arial, Helvetica, sans-serif;
                  padding: 20px;
              }
          </style>

            
          </head>
          <body>
            <div class="container">
                <h3>Howdy ${body.username}!</h3>
                <p>Thanks for signing up at BlogMan. Hope you have fun exploring the courses and blogs here.</p>
                <p>Keep learning, keep coding :)</p>

                <div class="footer">
                  
                    <p>Regards, <br>Team BlogMan</p>
                </div>
            </div>

          
          
          </body>
        </html>`;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //'smtp.ethereal.email',
        port: 587,//587
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'projectblogman@gmail.com', // generated ethereal user
            pass: 'girlscript2020'//account.pass 
        },
        tls:{
            rejectUnauthorized: false
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'BlogMan', // sender address
        to: `${body.email}`, // list of receivers
        subject: 'Welcome to BlogMan!', // Subject line
      
        html: output // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      
      });


      // creating a new user
      const newUser = new User(body);

      await newUser.save();

      const token = await jwt.sign(newUser);

      res.status(201).json({
        user: newUser,
        token,
      });
    },
    {
      validation: {
        throwError: true,
        asObject: true,
        validators: [authValidator.register],
      },
      inputs: ['name', 'username', ['password', 'hash'], 'email', 'birth'],
    },
  ),
);




module.exports = router;
