exports.userProfile = async (req, res) => {
    res.status(200).json({data: req.user});
}

exports.logout = async (req, res) => {
    res.status(200).json({message: "logout successfully"});
}