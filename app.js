const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeItems = [];
const workItems = [];

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("index", {
    listTitle: day,
    itemsArr: homeItems,
  });
});

app.get("/work", function (req, res) {
  res.render("index", {
    listTitle: "Work List",
    itemsArr: workItems,
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  // Prevent empty items
  if (item !== "") {
    if (req.body.itemType === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      homeItems.push(item);
      res.redirect("/");
    }
  }
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
