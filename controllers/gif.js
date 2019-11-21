const { Pool } = require("pg");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectionString =
  "postgresql://muhammed:password12@localhost:5432/teamwork";
const pool = new Pool({
  connectionString: connectionString
});

cloudinary.config({
    cloud_name: 'tendointern',
    api_key: '573491582752581',
    api_secret: 'saTR24t-zWSSk-ibjc1qMu0pEHI'
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
});

exports.createGif = async (req, res) => {
  const file = req.files.url;
    console.log(file)
  if ( file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    return res.status(400).json({
      message: "Upload error, file must be gif"
    });
  }
  let u;
 
  await cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
        if (error) {
        console.log(error);
        return;
      }
      console.log(result);
    }).then(result => {
      u = result;
    }).catch(error => {
      console.log(error);
    });

  const text = `INSERT INTO gifs(title, url, createdat) VALUES($1, $2, $3) RETURNING *`;
  const values = ["firstname", u.url, u.created_at];

  pool.connect((err, client, done) => {
    if (err) {
      console.log("Can not connect to the DB" + err);
    } else {
      console.log("Successful connection");
    }

    client.query(text, values, (error, result) => {
      done();
      if (error) {
        console.log("error:", error);
        return res.status(400).json({ error });
      } else {
        return res.status(202).json({
          status: "success",
          data: {
            message: "User account successfully created",
            userId: result.rows[0].id,
            gifurl: result.rows[0].url,
            created: result.rows[0].created,
            create: result.rows[0].timestamp
            
          }
        });
      }
    });
  });
};
