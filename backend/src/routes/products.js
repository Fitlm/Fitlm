// routes/products.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");
const { Readable } = require("stream");
const { ObjectId } = mongoose.Types;

const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.once("open", () => {
  console.log("MongoDB connection established.");
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/image", auth, upload.single("file"), (req, res) => {
  const fileBuffer = req.file.buffer;
  const filename =
    crypto.randomBytes(16).toString("hex") +
    path.extname(req.file.originalname);

  const readableFileStream = new Readable();
  readableFileStream.push(fileBuffer);
  readableFileStream.push(null);

  const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  const uploadStream = bucket.openUploadStream(filename);

  readableFileStream.pipe(uploadStream);

  uploadStream.on("finish", () => {
    console.log("Image uploaded successfully:", uploadStream.id);
    return res.json({ fileId: uploadStream.id });
  });

  uploadStream.on("error", (err) => {
    console.error("Image upload error:", err);
    return res.status(500).send(err);
  });
});

router.get("/image/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid image ID format" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });

    const downloadStream = bucket.openDownloadStream(
      new ObjectId(req.params.id)
    );

    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });

    downloadStream.on("error", (err) => {
      console.error("Image download error:", err);
      res.status(404).send({ message: "Cannot find image with that id" });
    });

    downloadStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send({ message: "Error retrieving image" });
  }
});

router.get("/product/:id", async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id;

  if (type === "array") {
    let ids = productIds.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  try {
    const product = await Product.find({ _id: { $in: productIds } }).populate(
      "writer"
    );
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const term = req.query.searchTerm;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.query.filters[key][0],
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }

  if (term) {
    findArgs["$text"] = { $search: term };
  }

  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    console.log("Product created successfully:", product);
    return res.sendStatus(201);
  } catch (error) {
    console.error("Product creation error:", error);
    next(error);
  }
});

module.exports = router;
