const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { default: Axios } = require('axios');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
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
        name,
        email,
        header,
        message
    } = req.body;

    

    Axios.get('https://newwellmusic.com/api/artist/').then( response=>{

        const data = response.data.results;
        console.log(data);

        const found = data.filter( mail =>mail.email=== email);
        console.log(found);
        
        // const found = sender.find(element => element === email);

        if(!found){
            return res.status(400).json({
                msg: "Kindly provide an email of a valid user"
            })
        }else{
            return res.status(200).json(found);

            // res.status(200).send(
            //     transporter.sendMail({
            //         to: found,
            //         from: 'agwenchez254@bcydn.org',
            //         subject:`${header}`,
            //         html:` <p>Dear ${name},
            //                 ${message}</p>`
            //     })
            //    )
        }

       
   
     

    }); 

});


module.exports = router;