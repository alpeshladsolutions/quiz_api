const User = require('../models/user');
const fs = require('fs');

exports.userProfile = async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({data: {_id, name, email}});
}

exports.updateUserProfile = async (req, res) => {
    try{
        const userData = await User.findById(req.user.id);
        userData.name = req.body.name;
        await userData.save();
        res.status(200).json({message: "Success"});
    }catch(error){
        res.status(400).json({message: "Error"});
    }
}

exports.userProfilePhoto = async (req, res) => {
    const { path } = req.file;
    try {
        // await User.findById(req.user.id).update({profilePic: path}); // simple update
        const userData = await User.findById(req.user.id); // update with save method

        // Delete old profile photo
        if(userData.profilePic){
            fs.unlink(userData.profilePic, (err) => {
                if (err) {
                    console.log("File not found.");
                    // throw err;
                }else{
                    console.log("Old File deleted successfully.");
                }
            });
        }

        userData.profilePic = path;
        await userData.save();

        res.status(200).json({message: "Success"});
    } catch (error) {
        res.status(400).json({message: "Profile not update"});
    }
}

exports.logout = async (req, res) => {
    res.status(200).json({message: "logout successfully"});
}