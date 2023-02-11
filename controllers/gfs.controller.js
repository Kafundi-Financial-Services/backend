const fs = require("fs");
const AppError = require("../utils/AppError");
const { gfsService } = require("../services");
const xtend = require("xtend");

exports.upload = async (req, res, next) => {
  return gfsService
    .upload(req.file, req.body)
    .then((metadata) => {
      fs.unlinkSync(req.file.path);

      if (req.query.middleware) {
        req.body = xtend(metadata, req.body);
        return next();
      }

      return res.json(metadata);
    })
    .catch((e) => {
      next(new AppError("Failed to upload to gfs!"));
    });
};

exports.uploads = async (req, res) => {
  let uploads = await gfsService.getUploads(req.query);
  res.json(uploads);
};

exports.stream = async (req, res) => {
  console.log(req.params);
  let file = await gfsService.getStream(req.params.fileName);
  res.contentType(file.mimetype);
  file.stream.pipe(res);
};

exports.delete = async (req, res) => {
  let deleted = await gfsService.delete(req.params.id);
  res.json(deleted);
};
