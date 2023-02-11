const fs = require("fs");
const AppError = require("../utils/AppError");
const { bannersService, attachmentService } = require("../services");
const { Banners } = require("../models");
const xtend = require("xtend");

exports.upload = async (req, res, next) => {
  console.log(req.file, " uploading>>>>>>>>>>>>>>>");

  return bannersService
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
  let uploads = await bannersService.getUploads(req.query);
  res.json(uploads);
};

exports.stream = async (req, res) => {
  console.log(req.params);
  let file = await bannersService.getStream(req.params.fileName);
  res.contentType(file.mimetype);
  file.stream.pipe(res);
};

exports.delete = async (req, res) => {
  console.log("starting to delete banner");
  let deleted = await Banners.findOne({ uuid: req.params.id });
  await attachmentService.deleteBanner(deleted.uuid);

  res.json(deleted);
};
