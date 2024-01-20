const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Key = require("../models/key");

exports.createKey = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const key = new Key({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  key.save().then(createdKey => {
    res.status(201).json({
      message: "Key added successfully",
      key: {
        ...createdKey,
        id: createdKey._id
      }
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Creating a key failed!"
      });
    });
}

exports.updateKey = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const key = new Key({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Key.updateOne({ _id: req.params.id, creator: req.userData.userId }, key).then(result => {
    if (result.matchedCount > 0)  {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  })
    .catch(error => {
      res.status(500).json({message: "Couldn't update post."})
    });
}

exports.getKeys = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const keyQuery = Key.find();
  let fetchedKeys;
  if (pageSize && currentPage) {
    keyQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  keyQuery
    .then(documents => {
      fetchedKeys = documents;
      return Key.estimatedDocumentCount();
    })
    .then(count => {
      res.status(200).json({
        message: "Keys fetched successfully!",
        keys: fetchedKeys,
        maxKeys: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching keys failed"
      });
    });
}

exports.getKey = (req, res, next) => {
  Key.findById(req.params.id).then(key => {
    if (key) {
      res.status(200).json(key);
    } else {
      res.status(404).json({ message: "Key not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching keys failed"
    });
  });
}

exports.deleteKey = (req, res, next) => {
  Key.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.deletedCount > 0)  {
      res.status(200).json({ message: "Delete successful!" });
    } else {
      res.status(401).json({message: "Not Authorized!"});
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching keys failed"
      });
    });
}
