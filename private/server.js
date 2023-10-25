const express = require('express');
const app = express();
const cors = require('cors');
const userSchema = require('./schema/user.schema');
const sendMail = require('./helpers/sendMail');
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'https://geoform.vercel.app', // Replace with the actual origin you want to allow
    methods: 'GET,HEAD,POST,',
    // credentials: true, // Set this to true if you want to allow cookies to be sent across domains
};

app.use(express.json());
// app.use(cors(corsOptions))
app.use(cors())

require("./database/database")("users");

// POST USERS  ENDPOINT
app.post('/post-user', async (req, res) => {
    const { name, email, contact, address, location } = req.body;
    const emailExist = await userSchema.findOne({ email: email });

    if (emailExist) return res.status(400).json({ message: "Email already exist" });
    const user = new userSchema({
        ...req.body
    });
    const saveUser = await user.save();
    if (saveUser) {
        const mailBody = `<h1>Hello,</h1>
        <p>Thank you for registering with us. Bellow is out terms and conditions</p>
        <a href="https://sassty.vercel.app/static/media/_PUPs%20Terms.8a1ad854c36e0ec00c21.pdf" download="_PUPs Terms.pdf">Terms and conditions</a>
        `
        sendMail(email, mailBody)
        res.json({ message: "User saved successfully" });
    }
});


// GET USERS  ENDPOINT
app.get('/get-users', async (req, res) => {
    const users = await userSchema.find()
    res.json({ data: users });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});