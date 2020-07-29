const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// Body parser middleware
app.use(express.json({ extended:false}));

// DB Config
const db = 'mongodb://localhost:27017/email';



// serve static files
// app.use(express.static(path.join(__dirname,'public')));

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


  console.log("MY_CRED:"+process.env.API_KEY); 
  
const port = process.env.PORT || 5500;
app.use('/mailer',require('./routes/sendmail'))
app.use('/predefined_messages',require('./routes/messages'));

app.listen(port, () => console.log(`Server running on port ${port}`));
