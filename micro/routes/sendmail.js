const express = require('express');
const router = express.Router();
const Messages = require('../models/Pre-msg');


const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// const { default: Axios } = require('axios');

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

   return  res.status(200).send(
    transporter.sendMail({
        to: email,
        from: 'agwenchez254@bcydn.org',
        subject:`${header}`,
        html:` <p>Dear ${name},
                ${message}</p>`
    })
   )

});


module.exports = router;