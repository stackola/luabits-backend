const express = require("express");
const app = express();
const port = 3000;
const { exec } = require("child_process");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  let fn = uuidv1();
  console.log(req.params, req.body, req.query);
  fs.writeFile("./lua/" + fn + ".lua", req.body.source, function(err) {
    if (err) {
      res.send({ status: "error" });
      return console.log(err);
    }

    console.log("The file was saved!");
    exec("moonshine distil ./lua/" + fn + ".lua", (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
        res.send({ status: "error", code: err, out: stdout, err: stderr });
        return;
      }

      var obj = JSON.parse(fs.readFileSync(fn + ".lua.json", "utf8"));
      fs.unlinkSync(fn + ".lua.json");
      fs.unlinkSync("./lua/" + fn + ".lua");
      // the *entire* stdout and stderr (buffered)
      console.log(obj);
      res.json({ status: "ok", bytecode: obj });
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
