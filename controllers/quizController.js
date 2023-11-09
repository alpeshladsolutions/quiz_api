const Quiz = require('../models/quiz');

exports.list = async (req, res) => {
    // const list = await Quiz.find({},{question:1, 'options._id': 1, 'options.option': 1});
    const list = await Quiz.find({},{question:1}).select({'options._id': 1, 'options.option': 1});
    res.status(200).json({data: list})
}

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

exports.startQuiz = async (req, res) => {
    const allQuestion = await Quiz.aggregate([
        {
          $sample: { size: 5 } // You want to get random docs
        },
        {
          $project: {
            question: 1,
            'options.option': 1, // Include field1 in the results
            'options._id': 1 // Include field2 in the results
          }
        }
      ], (err, result) => {
        if (err) {
          console.error(err);
          res.status(400).json({message: 'Error'})
        }else{
            // res.status(200).json({data: result})
        }
      });
      res.status(200).json({data: allQuestion})
}