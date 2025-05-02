const User = require('./user');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const middle = require('./middleware/auth');

const connectDB = require('./configDB');
connectDB();

console.log(process.env.MONGO_URI);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    try{
        const data = {
        username: req.body.username,
        password: req.body.password,
    };
    const exitsUser = await User.findOne({ username: data.username });
    if (exitsUser) {
        return res.status(400).send('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const userData = new User({
        username: data.username,
        password: data.password,
    });
    await userData.save();
    console.log('User saved:', userData);
    res.redirect('/');
} catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Internal Server Error');
   }   
    
});
app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });
        if (!user) 
            return res.status(400).send('user not found');
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        
        console.log('Refresh token generated:', refreshToken);
        console.log('Token generated:', token);
        
        res.cookie('token', token, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        console.log('User logged in:', user);
        res.redirect('/home');
    } catch (error) {
        console.error('Error logging in:', error);
    }
    
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.get('/home', middle, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid);

        res.render('home', {
            user,
            EntityId: user.EntityId
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});
const temperatures = [];
app.post('/api/saveTemperature', express.json(), async (req, res) => {
    try {
        temperature = req.body.temperature;
        timestamp = new Date().toISOString();
        temperatures.push({ temperature, timestamp });
        res.status(200).json({ message: 'Template saved successfully', temperature });

    } catch (error) {
        console.error('Error saving template:', error);
        res.status(500).json({ message: 'Error saving template' });
    }
});

app.get('/widget', middle, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid);

        const temperature = req.query.temperature;
        const accessToken = req.query.accessToken;
        res.render('widget', {
            user,
            EntityId: user.EntityId,
            temperature: temperature !== null ? temperature : undefined,
            temperatures,
            accessToken
        });
    }catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/add-Temperature', async (req, res) => {
    
    const  temperature = req.body.temperature;
    const timestamp = new Date().toISOString();
    const newTemperature = { temperature, timestamp };

    temperatures.push(newTemperature);
    res.status(200).json({ message: 'Temperature added successfully', temperature: newTemperature });
});


const port =5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

