const mongoose = require('mongoose');
const View = mongoose.model('view');
var app, upload, conn, Grid;
var updateAll;
let gfs;

isEmpty = (obj) => {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
    return true;
}

exports.get = (app, upload, conn, Grid) => {
  this.app = app;
  this.upload = upload;
  this.conn = conn;
  this.Grid = Grid;

  updateAll = this.upload.fields([
    {name: 'threeFile', maxcount:1},
    {name: 'threeThumbnail', maxcount:1},
    {name: 'skybox', maxcount:1}]);

  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
  });

};

exports.getFiles = (req, res) => {
  gfs.files.find().toArray( (err, files) => {
    if(!files || files.length === 0 ) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    return res.json(files);
  });
};

exports.getFile = (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {

      if(!file || file.length === 0 ) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }

      if(file.contentType === 'image/jpeg' || 'image/png'){
          var readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
      }else{
        res.status(404).json({
          err: 'Not proper mimetype'
        });
      }
  });
};

exports.getViews = (req, res) => {
  View.find({},
    (err, view) => {
      if(err)
        res.send(err);
      res.json(view);
      console.log('View(s) successfully read');
  });
};

exports.addView = (req, res) => {

  const newView = new View({
    threeFile: req.files.threeFile[0].filename,
    threeThumbnail: req.files.threeThumbnail[0].filename,
    skybox: {file: req.files.skybox[0].filename},
    enableLight: req.body.enableLight,
    enableMaterials: req.body.enableMaterials,
    enableShaders: req.body.enableShaders,
    enableMeasurement: req.body.enableMeasurement,
    enableUnits: req.body.enableUnits
  });

  newView.save(
    (err, view) => {
      if (err)
        res.send(err);
      res.json(view);
      console.log('View successfully added');
  });

};


exports.getView = (req, res) => {
  View.findOne(
    {_id: req.params.id},
    (err, view) => {
      if (err)
        res.send(err);
      res.json(view);
      console.log('View successfully read');
  });
};


exports.updateView = (req, res) => {

  var threeFileBool, threeThumbnailBool, skyboxFileBool = false ;

  updateAll(req, res, (err) => {
    if(err){
      return console.log({update:'something happened'});
    }

    //console.log({body : req.body});
    //console.log({files : req.files});

    if(isEmpty(req.files)){
      //console.log({isEmpty: 'true'});
      //console.log({reqBody : req.body});

      new Promise( (resolve, reject) => {

        const newView = new View({
          _id: req.params.id,
          threeFile: req.body.threeFile,
          threeThumbnail: req.body.threeThumbnail,
          skybox: {file: req.body.skybox},
          enableLight: req.body.enableLight,
          enableMaterials: req.body.enableMaterials,
          enableShaders: req.body.enableShaders,
          enableMeasurement: req.body.enableMeasurement,
          enableUnits: req.body.enableUnits
        });

        resolve(newView);

      }).then( newView => {
        View.findOneAndUpdate(
          {_id: req.params.id},
          newView,
          {new: true},
          (err, view) => {
            if (err)
              res.send(err);
            res.json(view);
            console.log({upadte:'View successfully updated'});
        });
      });

    }else{
      //console.log({isEmpty: 'false'});

      new Promise( (resolve, reject) => {

        View.findOne(
          {_id: req.params.id},
          (err, view) => {
            if (err)
              reject(console.log({err: 'View could not be found'}));

            if(!isEmpty(req.files.threeFile)){
              threeFileBool = true;
              gfs.exist({ filename: view.threeFile }, (err, found) =>{
                if (err)
                  reject(console.log({exsists : 'File does not exsist'}));

                if (found!==req.body.threeFile){
                  gfs.remove({ filename: view.threeFile}, (err) => {
                    if(err)
                      reject(console.log({delete : `delete of ${view.threeFile} - failed`}));
                  });
                }

              });
            }

            if(!isEmpty(req.files.threeThumbnail)){
              threeThumbnailBool = true;
              gfs.exist({ filename: view.threeThumbnail }, (err, found) =>{
                if (err)
                  reject(console.log({exsists : 'File does not exsist'}));

                if (found!==req.body.threeThumbnail){
                  gfs.remove({ filename: view.threeThumbnail}, (err) => {
                    if(err)
                      reject(console.log({delete : `delete of ${view.threeThumbnail} - failed`}));
                  });
                }
              });
            }

            if(!isEmpty(req.files.skybox)){
              skyboxFileBool = true;
              gfs.exist({ filename: view.skybox.file }, (err, found) =>{
                if (err)
                  reject(console.log({exsists : 'File does not exsist'}));

                if (found!==req.body.skybox){
                  gfs.remove({ filename: view.skybox.file}, (err) => {
                    if(err)
                      reject(console.log({delete : `delete of ${view.skybox.file} - failed`}));
                  });
                }
              });
            }


            resolve(console.log({upadte:'all good'}));

          }).then( () => {

            const newView = new View({
              _id: req.params.id,
              threeFile: threeFileBool ? req.files.threeFile[0].filename : req.body.threeFile,
              threeThumbnail: threeThumbnailBool ? req.files.threeThumbnail[0].filename : req.body.threeThumbnail,
              skybox: {file: skyboxFileBool ? req.files.skybox[0].filename : req.body.skybox},
              enableLight: req.body.enableLight,
              enableMaterials: req.body.enableMaterials,
              enableShaders: req.body.enableShaders,
              enableMeasurement: req.body.enableMeasurement,
              enableUnits: req.body.enableUnits
            });

            //console.log(newView);

            View.findOneAndUpdate(
              {_id: req.params.id},
              newView,
              {new: true},
              (err, view) => {
                if (err)
                  res.send(err);
                res.json(view);
                console.log({update: 'View successfully updated'});
            })
          });
        });
    }

  });

};

exports.deleteFile = (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if(!file || file.length === 0){
        return res.status(404).json({
          err: 'No file to remove'
        });
      }

      if(file.contentType === 'image/jpeg' || 'image/png'){
        gfs.remove({ _id: file._id}, (err) => {
          if(err){
            return res.send({delete : `delete of ${file.filename} - failed`});
          }else{
            console.log('File successfully deleted');
            return res.send({delete : `delete of ${file.filename} - success`});
          }
        });
      }else{
        res.status(404).json({
          err: 'Not proper mimetype'
        });
      }
  });
};

exports.deleteView = (req, res) => {


  View.findOne(
    {_id: req.params.id},
    (err, view) => {
      if (err)
        console.log({err: 'View could not be found'});

      gfs.exist({ filename: view.threeFile }, (err, found) =>{
        if (err)
          return console.log({exsists : 'File does not exsist'});
        found ?
          gfs.remove({ filename: view.threeFile}, (err) => {
            if(err)
              return console.log({delete : `delete of ${view.threeFile} - failed`});
          })
          : console.log('File does not exsist');
      });

      gfs.exist({ filename: view.threeThumbnail }, (err, found) =>{
        if (err)
          return console.log({exsists : 'File does not exsist'});
        found ?
          gfs.remove({ filename: view.threeThumbnail}, (err) => {
            if(err)
              return console.log({delete : `delete of ${view.threeThumbnail} - failed`});
          })
          : console.log('File does not exsist');
      });

      gfs.exist({ filename: view.skybox.file }, (err, found) =>{
        if (err)
          return console.log({exsists : 'File does not exsist'});
        found ?
          gfs.remove({ filename: view.skybox.file }, (err) => {
            if(err)
              return console.log({delete : `delete of ${view.skybox.file} - failed`});
          })
          : console.log('File does not exsist');
      });

      View.remove(
        {_id: req.params.id},
        (err, view) => {
          if (err)
            res.send(err);
          console.log('View successfully deleted');
          res.json({success: 'View successfully deleted'});
        });
  });
};
