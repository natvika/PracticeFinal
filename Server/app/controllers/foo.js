var express = require("express"),
  router = express.Router(),
  Foo = mongoose.model("Foo"),
  asyncHandler = require("express-async-handler")

module.exports = function (app, config) {

  app.use("/api", router);

  router.get("/foo", asyncHandler(async (req, res) => {
    console.log("Get all foos");
    let query = Foo.find();
    query.sort(req.query.order);
    await query.exec().then(result => {
      res.status(200).json(result);
    });
  })
  );

  router.get("/foo/:id", asyncHandler(async (req, res) => {
    console.log("Get foo %s", req.params.id);
    await Foo.findById(req.params.id).then(result => {
      res.status(200).json(result);
    });
  })
  );

  router.post("/foo", asyncHandler(async (req, res) => {
    console.log("Create foo");
    var foo = new Foo(req.body);
    await foo.save().then(result => {
      res.status(201).json(result);
    });
  })
  );

  router.put("/foo", asyncHandler(async (req, res) => {
    console.log("Updating foo");
    await Foo.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true
    }).then(result => {
      res.status(200).json(result);
    });
  })
  );


  router.delete("/foo/:id", asyncHandler(async (req, res) => {
    console.log("Deleting foo %s", req.params.id);
    await Foo.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    });
  })
  );
};
