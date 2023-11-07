const Quiz = require('../models/quiz');

exports.create = async (req, res) => {
    const reqBody = req.body;
    // console.log(reqBody);
    try {
        const quiz = await Quiz({
            question: reqBody.question,
            options: reqBody.options,
        })
        quiz.save();
        res.status(200).json({message: "Success"});
    } catch (error) {
        res.status(400).json({message: "Error"});
    }
}

exports.delete = async (req, res) => {
    const reqBody = req.body;
    const id = req.params.id;
    try {
        const quiz = await Quiz.deleteOne({id: id});
        res.status(200).json({message: "Success"});
    } catch (error) {
        res.status(400).json({message: "Error"});
    }
}