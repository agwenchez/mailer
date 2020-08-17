const express = require('express');
const router = express.Router();


const { default: Axios } = require('axios');
const Messages = require('../models/Pre-msg');
require('dotenv').config();
const API_KEY = process.env.API_KEY;


// console.log("MY_CREDENTIALS:" +process.env.API_KEY);

// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//         auth: {
//             api_key: `${API_KEY}`
//         }
//     })
// );

// default route
router.get('/', (req, res) => res.json({
    msg: 'Mailer route Works'
}));



// sending SMS to multiple numbers
router.post('/sendsms', (req, res) => {
    const {  phone_number } = req.body;

    

    Axios.get('http://localhost:3000/artists/artists').then( response=>{

        const data = response.data;
        console.log(data);
        
        const phone_numbers = data.map (item => item.phone_number);
        console.log(phone_numbers);

        const found = phone_numbers.find( element => element === phone_number);
        console.log(found);
        
        // const found = sender.find(element => element === email);

        if(!found){
            return res.status(400).json({
                msg: "Kindly provide a phone number of a valid user"
            })
        }else{

        const options = {
			username: 'newwell',
			apiKey: '178240322ea893efbad0f94377898da276eae886d191ed58e554c3893a1ccc47'
		};

		// initialize africastalking gateway
		const africastalking = require('africastalking')(options);

		// sms object of africastalking package
		const sms = africastalking.SMS;

		// sending parameters
		const sending_options = {
			to: phone_numbers,
			message: 'Some test message to see if this works fine'
		};

		// send sms
		sms.send(sending_options)
			.then(response => {
				console.log(response);
				res.send(response);
			})
			.catch(error => {
				console.log(error);
				res.send(error);
			});

        }


        }).catch(err => res.status(500).send('an error occured'))

});


module.exports = router;