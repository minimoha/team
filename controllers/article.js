const { Pool } = require("pg");
require("dotenv").config();

const connectionString =
  "postgresql://muhammed:password12@localhost:5432/teamwork";
const pool = new Pool({
  connectionString: connectionString
});

exports.createArticle = (req, res) => {
    const title = req.body.title
    const article = req.body.article

    const text = `INSERT INTO articles (title, article) VALUES($1, $2) RETURNING *`
    const values = [title, article];

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }

        client.query(text, values, (error, result) => {
            done();
            if (error) {
                console.log(error)
            return res.status(400).json({error});
            } else {

                return res.status(202).send({
                    status: 'success',
                    data: {
                        message: "Article successfully posted",
                        articleId: result.rows[0].id,
                        createdOn: result.rows[0].created,
                        title: result.rows[0].title,
                        
                    }
                })
            }
        });
    });
};

exports.getOneArticle = () => {
    
    const text = `SELECT * FROM articles ORDER BY createdOn`

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        client.query(text, (error, result) => {
        console.log(text)
            done();
            if (error) {
            return res.status(404).json({error});
            } else {
            return res.status(200).json({
            status: 'Success', 
            data: {
                id: result.rows[0].id,
                createdOn: result.rows.createdOn,
                password: result.rows[0].password,
                imgurl: result.rows[0].imgurl
            }
            })
        }
        });
    });
};

exports.editArticle = (req, res) => {
    const _id = req.params.articleId;
    
    const title = req.body.title
    const article = req.body.article

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        
        const text = `UPDATE articles SET title = $1, article = $2 WHERE id = ${_id} RETURNING *`
        const values = [title, article]

        client.query(text, values, (error, result) => {
          done();
          if (error) {
              console.log(error)
            return res.status(404).json({error});
          } else {
          return res.status(200).json({
            status: 'Success', 
            data: {
                message: "Article successfully updated",
                title: result.rows[0].title,
                article: result.rows[0].article                
            }
          })
        }
        });
    });
};