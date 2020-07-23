const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// const { default: Axios } = require('axios');
const Messages = require('../models/Pre-msg');
const API_KEY = process.env.API_KEY;

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: `${API_KEY}`
        }
    })
);

// default route
router.get('/', (req, res) => res.json({
    msg: 'Mailer route Works'
}));



// sending mail
router.post('/sendmail', (req, res) => {
    const {
        header,
        name,
        email,
       
        // message
    } = req.body;

    

    // Axios.get('http://localhost:5000/artists/artists').then( response=>{

    //     const data = response.data;
    //     console.log(data);
        
    //     const sender = data.map (item => item.email);
    //     console.log(sender);

    //     const found = sender.find( element => element === email);
    //     console.log(found);
        
    //     // const found = sender.find(element => element === email);

    //     if(!found){
    //         return res.status(400).json({
    //             msg: "Kindly provide an email of a valid user"
    //         })
    //     }else{


        Messages.findOne({name:header}).then( result =>{

            console.log(result);
            // res.status(200).send(result);
            return res.status(200).send(
                transporter.sendMail({
                    to: email,
                    from: 'agwenchez254@bcydn.org',
                    subject:`${result.name}`,
                    html:` <p>Dear ${name},
                            ${result.message}</p>`
                })
               )
        })




        
        

       
   
     

 

});


module.exports = router;