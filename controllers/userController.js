exports.userProfile = async (req, res) => {
    console.log(req.user);
    res.status(200).json({data: req.user});
}