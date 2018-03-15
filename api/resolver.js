const uuidv4 = require("uuid/v4");
const fs = require("fs");

module.exports = function(req, res) {
  const data = JSON.parse(req.body.params);
  if (!data) {
    res.status(400 /* Bad params */).send("Invalid params");
    return;
  }

  const fileName = `${uuidv4()}.png`;
  const base64 = data.src.replace("data:image/png;base64,", "");

  // TODO: Store the file in a proper place
  fs.writeFile(
    `public/img/${fileName}`,
    data.src.replace("data:image/png;base64,", ""),
    "base64",
    function(err) {
      if (err) {
        console.log(err);
      }

      const html = `<img style="max-width:100%;" src="https://localhost:8910/img/${fileName}" />`;
      res.json({
        body: html
        // Add raw:true if you're returning content that you want the user to be able to edit
      });
    }
  );
};
