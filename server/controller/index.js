const fs = require("fs");

exports.find = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  fs.readFile("dataSet.json", "utf8", (err, data) => {
    if (err) {
      res.status(404).send({
        message: "file not found",
        error: err,
        errorMsg: err.message,
      });
    }
    try {
        const record = JSON.parse(data).length
      const jsonData = JSON.parse(data).slice(startIndex,endIndex);
      
      const total = jsonData.length
      res.status(200).send({
        data: jsonData,
        total:total,
        record:record,
        message: "got your data",
        error:false
      });
    } catch (err) {
      res.status(404).send({
        message: "cannot get the reward",
        error:true,
        errorMsg: err.message,
      });
    }
  });
};
