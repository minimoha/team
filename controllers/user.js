const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const connectionString =
  "postgresql://muhammed:password12@localhost:5432/teamwork";
const pool = new Pool({
  connectionString: connectionString
});


exports.createUser = (req, res) => {
//   const _id = req.params.id;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const jobRole = req.body.jobrole;
  const department = req.body.department;
  const address = req.body.address;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

    const text = `INSERT INTO users (firstname, lastname, email, 
                    password, jobrole, department, 
                    address) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  const values = [
    firstName,
    lastName,
    email,
    hash,
    jobRole,
    department,
    address
  ];

  pool.connect((err, client, done) => {
    if (err) {
      console.log("Can not connect to the DB" + err);
    } else {
      console.log("Successful connection");
    }

    client.query(text, values, (error, result) => {
      done();
      if (error) {
        return res.status(400).json({ error });
        
      } else {
        const token = jwt.sign(
          { userId: result.rows[0] },
          "RANDOM_TOKEN_SECRET",
          { expiresIn: "24h" }
        );

        return res.status(202).send({
          status: "success",
          data: {
            message: "User account successfully created",
            token: token,
            userId: result.rows[0].id,
            firstName: result.rows[0].firstname
          }
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
    const email = req.body.email
    const password = req.body.password


    const query = {
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email],
      }

    pool.connect((err, client, done) => {
        if (err) {
            console.log("Can not connect to the DB" + err);
        } else {
            console.log("Successful connection")
        }

        client.query(query, (error, result) => {
            done();
            if (error) {
                console.log(error);
            return res.status(400).json({error});
            }
            
            let passFromDb = bcrypt.compareSync(password, result.rows[0].password);
            
            const token = jwt.sign({userId: result.rows[0].id }, 'RANDOM_TOKEN_SECRET', 
                {expiresIn: '24h'});

            if(passFromDb) {
                return res.status(202).send({
                    status: 'Success', data: {
                    token: token,
                    userId: result.rows[0].id
                    }
                })
            }
            
        });
    });
};
