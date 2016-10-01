var glob = require('glob');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs-extra');
var async = require('async');

// wav in orig dir to mp4 in dest dir
glob("D:/Wave Files/**/*.wav", (err, files) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  async.eachSeries(files, function iteratee(file, callback) {
    var name = file.split('/').pop();
    var dir = file.split('/').slice(0,-1).join('/');
    var dest = dir.replace('Wave Files', 'MP4s');
    fs.ensureDir(dest, (err) => {
      if(err) {
        console.log(`ensure error: ${err}`);
        callback(err);
      }
    });
    console.log(`working on ${dest}/${name.replace('.wav', '.m4a')}`);
    exec(`ffmpeg -i "${file}" -y -f mp4 -b:a 384k "${dest}/${name.replace('.wav', '.m4a')}"`, (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${error}`);
          callback(err);
        }
        callback();
      });
  });
})

// copy all album art to dest dir
glob("D:/Wave Files/**/*.jpg", (err, files) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  async.eachSeries(files, function iteratee(file, callback) {
      console.log(`working on ${file.replace('Wave Files', 'MP4s')}`)
      fs.copy(file, file.replace('Wave Files', 'MP4s'), function (err) {
        if(err) {
          console.log(`ensure error: ${err}`);
          callback(err);
        }
        callback();
      });
  });
})

// count wav files in original dir
glob("D:/Wave Files/**/*.wav", (err, files) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`${files.length} wav files`);
});

// count m4a files in dest dir
glob("D:/MP4s/**/*.m4a", (err, files) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`${files.length} m4a files`);
});
