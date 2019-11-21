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