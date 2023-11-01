const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const checkUser = await User.findOne({email: email});
        if(checkUser){
            res.status(400).json({message: "Email already exists"});
        }else{
            const user = new User(
                {name, email, password: hashedPassword}
            );
            await user.save();
            res.status(201).json({
                message: 'User saved successfully'
            });
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, profilePic, ...others} = user._doc;
            res.json({ data: others,message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}