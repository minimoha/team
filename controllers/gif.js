const { Pool } = require("pg");
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
  const title = req.body.title

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

  const text = `INSERT INTO gifs(title, url) VALUES($1, $2) RETURNING *`;
  const values = [title, u.url];

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
            gifId: result.rows[0].id,
            message: "GIF image successfully posted",
            createdOn: result.rows[0].created,
            title: result.rows[0].title,
            imageUrl: result.rows[0].url
            
          }
        });
      }
    });
  });
};

exports.deleteGif = (req, res) => {
    const _id = req.params.gifId;

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        const text = `DELETE FROM gifs WHERE id = ${_id}`
        client.query(text, (error, result) => {
          done();
          if (error) {
              console.log(error)
            return res.status(404).json({error});
          } else {
          return res.status(200).json({
            status: 'Success',
            data: {
                "message": "Gif post successfully deleted"
            }
          })
        }
        });
    });
};

exports.createGifComment = (req, res) => {
    const _id = req.params.gifId
    
    const comment = req.body.comment

    const text = `INSERT INTO gifcomment(comment, gifid) VALUES($1, $2) RETURNING *`
    const values = [comment, _id]
    
    const query = `SELECT a.title, a.url, c.comment, c.created
                    FROM gifcomment c
                    INNER JOIN gifs a ON c.gifid = a.id`
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        client.query(text, values, () => {
            client.query(query, (error, result) => {      
                done();
                if (error) {
                    console.log(error)
                return res.status(400).json({error});
                } else {
                    return res.status(202).send({
                        status: 'success',
                        data: {
                            message: "Comment successfully created",
                            createdOn: result.rows[0].created,
                            gifTitle: result.rows[0].title,
                            comment: result.rows[0].comment
                        }
                    })
                }
            });
        });
    });
};

exports.getOneGif = (req, res) => {
    
    const _id = req.params.gifId;

    const text = `SELECT * FROM gifs WHERE id = ${_id}`

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        client.query(text, (error, result) => {
        
          done();
          if (error) {
            console.log(error)
            return res.status(404).json({error});
          } else {
          return res.status(200).json({
            status: 'success', 
            data: result.rows
          })
        }
        });
    });
};