const express = require('express');
const router = express.Router();
const artist = require('../models/Artists');
// const { delete } = require('../../micro/routes/sendmail');


// default route
router.get('/',(req,res)=>{
    res.json({msg:"Artist route works"});
})

// get all artists
router.get('/artists', (req,res)=>{
    artist.find().then(user=>{ res.status(200).json(user)})
    .catch(err =>{
        if(err){
            throw(err);
        }
    });
})


// find a single artist by mail
router.get('/artist', (req,res)=>{
    const  {email}=req.body;

    artist.findOne({email}).then( user =>{
        if(!user){
            return res.status(400).json({
                msg: "Kindly provide an email of a valid user"
            })
        }else{
            res.status(200).json(user);
        }
    }).catch(err => console.log(err));
})

// create an artist
router.post('/create-artist', (req, res) => {
    const {
        name,
        email,
        phone_number
      
    } = req.body;

    artist.findOne({
        email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email already exists"
            })
        } else {
            // create new artist
            const newArtist = new artist({
                name,
                email,
                phone_number
            })
            newArtist.save()
                .then(
                    user => {
                        res.status(200).json(user);
                        console.log(user);
                    })
                .catch(err => console.log(err));


        }

    })

})



// delete artist by ID
router.delete('/delete/:id', (req, res)=>{
    artist.findById(req.params.id).then( result => {
        result.remove().then( ()=>res.send('deleted successfully'));
    }).catch(err => res.status(404).json({sucees:false}));
})


module.exports=router;