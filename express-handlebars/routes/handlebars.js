const { Router } = require("express");
const router = Router();

const orm = require("../config/orm");

router.get("/", (req, res) => {
  orm.selectAll((err, burgers) => {
    if (err) {
      return res.status(501).json({
        message: "Not able to query the database",
      });
    }

    console.log("burgers: ", burgers);
    res.render("index");
  });
});

module.exports = router;
