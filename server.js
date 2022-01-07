const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin: true, credentials: true}));

app.post('/send_mail', cors(), async(req,res)=>{
    let {data} = req.body;

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'arktest414@gmail.com',
            pass: 'opazigota',
        }
    
    })

    await transport.sendMail({
        from: 'arktest414@gmail.com',
        to: 'arktest414@gmail.com',
        subject: 'test email',
        text: data,
    })
})

app.listen(PORT, ()=>{
    console.log('Server is listening on port ' + PORT)
})