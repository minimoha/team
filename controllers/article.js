const { Pool } = require("pg");
const jwt = require('jsonwebtoken');


const connectionString =
    "postgres://apzfgirgwbiqux:97b7c75a1b47598bf01ad73a2c32a89117cd72cda6d36fe13528fd2b997dfad7@ec2-54-243-49-82.compute-1.amazonaws.com:5432/d3gu8nqn8pulh2";
//   "postgresql://muhammed:password12@localhost:5432/teamwork";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

exports.createArticle = (req, res) => {
    const title = req.body.title
    const article = req.body.article

    const userId = 2;

    const text = `INSERT INTO articles (title, article, authorid) VALUES($1, $2, $3) RETURNING *`
    const values = [title, article, userId];

    pool.connect((err, client, done) => {
        console.log('about')
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

exports.deleteArticle = (req, res, next) => {
    const _id = req.params.articleId;
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }
        const text = `DELETE FROM articles WHERE id = ${_id}`
        client.query(text, (error, result) => {
          done();
          if (error) {
            return res.status(404).json({error});
          } else {
          return res.status(200).json({
            status: 'Success',
            data: {
                "message": "Article successfully deleted"
            }
          })
        }
        });
    });
};

exports.createArticleComment = (req, res) => {
    const _id = req.params.articleId
    
    const comment = req.body.comment

    const text = `INSERT INTO articlecomment(comment, articleid) VALUES($1, $2) RETURNING *`
    const values = [comment, _id]

    const query = `SELECT a.title, a.article, c.comment, c.created
                    FROM articlecomment c
                    INNER JOIN articles a ON c.articleid = a.id`
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
                            articleTitle: result.rows[0].title,
                            article: result.rows[0].article,
                            comment: result.rows[0].comment
                        }
                    })
                }
            });
        });
    });
};

exports.getAllArticles = (req, res) => {
    
    const text = `SELECT * FROM articles ORDER BY created`

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

exports.getOneArticle = (req, res) => {
    const _id = req.params.articleId;

    const text = `SELECT * FROM articles WHERE id = ${_id}`

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