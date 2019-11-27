const app = require('./app')
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);


describe("Server!", () => {
  it("welcomes user to the api", done => {
    chai
      .request(app)
      .get("/api/v1/feed")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("adds 2 numbers", done => {
    chai
      .request(app)
      .post("/api/v1/articles")
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("adds 2 number", done => {
    chai
      .request(app)
      .put("/api/v1/articles/2")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Success");
        done();
      });
  });

  it("adds 2 number", done => {
    chai
      .request(app)
      .delete("/api/v1/articles/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Success");
        done();
      });
  });

  it("adds 2 number", done => {
    chai
      .request(app)
      .post("/api/v1//articles/2/comment")
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("adds 2 numbers", done => {
    chai
      .request(app)
      .get("/api/v1/articles/2")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("adds 2 number", done => {
    chai
      .request(app)
      .delete("/api/v1/gifs/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Success");
        done();
      });
  });

  it("adds 2 number", done => {
    chai
      .request(app)
      .post("/api/v1//gifs/2/comment")
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("adds 2 numbers", done => {
    chai
      .request(app)
      .get("/api/v1/gifs/2")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
      });
  });


});