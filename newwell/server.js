const express = require('express');
const mongoose = require('mongoose');


const app = express();

// Body parser middleware
app.use(express.json({ extended:false}));

// DB Config
const db = 'mongodb://localhost:27017/newwell';
 

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  
const port = process.env.PORT || 5000;
// default route
app.get('/',(req,res)=>{
    res.json({msg:"server route works"});
})

// import route
app.use('/artists', require('./routes/artists'));

app.listen(port, () => console.log(`Server running on port ${port}`));
