const express =require('express');
let app = express();
const fileUpload = require('express-fileupload');
let Photo = require('../models/photo');

app.use(fileUpload());

app.post('/photos', (req, res) => {
  let img = req.body.img;
  let photo = new Photo({
    img
  });

  photo.save((err, photoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!photoDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      photo: photoDB
    });
  });
});

app.get('/photos', (req, res) => {
  Photo.find({})
    .exec((err, photos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        photos
      });
    });
});

app.get('/photo/:id', (req, res) => {
  let id = req.params.id;
  Photo.findById(id)
    .exec((err, photoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!photoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'The image does not exist'
          }
        });
      }

      res.json({
        ok: true,
        photoDB
      });
    });
});



app.delete('/photo/:id', (req, res) => {
  let id = req.params.id;

  Photo.findByIdAndDelete(id, (err, photoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!photoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The image does not exist'
        }
      });
    }

    res.json({
      ok: true,
      message: 'Image deleted'
    });
  });
});

module.exports = app;