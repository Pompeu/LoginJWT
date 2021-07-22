"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const conn = require("../../config/conn");
const User = require("../../models/index").User;

describe("Auth api", () => {
  let user = { email: "itacir@hotmail.com", password: "552525" };
  let jwt = "";

  before(() => conn.connect().then(() => User.remove({})));

  describe("when create user", () => {
    it("create new user", (done) => {
      chai
        .request(app)
        .post("/api/v1/users")
        .send(user)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password).to.not.equal(user.password);
          user._id = res.body._id;
          done();
        });
    });
  });

  describe("when auth a user", () => {
    it("should be receve a JWT ", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth")
        .send(user)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body.token).to.match(/[a-zA-Z0-9]+/);
          jwt = res.body.token;
          done();
        });
    });
  });

  describe("when get a user without jwt", () => {
    it("should reject with 401 stats", (done) => {
      chai
        .request(app)
        .get(`/api/v1/users/${user._id}`)
        .send(user)
        .end((err, res) => {
          expect(err).to.exist;
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });

  describe("when get an user with JWT", () => {
    it("should be get an user", (done) => {
      chai
        .request(app)
        .get(`/api/v1/users/${user._id}`)
        .set("authorization", `Bearer ${jwt}`)
        .send(user)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.be.equal(200);
          expect(res.body.email).to.be.equal(user.email);
          expect(res.body.password).to.be.an("undefined");
          done();
        });
    });
  });

  describe("when try get an user with another jwt", () => {
    let anotherJwt;

    before(() => {
      const user = new User({ email: "jose@net.com", password: "1231234" });

      return user.jwtSign().then((jwt) => (anotherJwt = jwt));
    });

    it("should be reject when jwt not woner of user", (done) => {
      chai
        .request(app)
        .get(`/api/v1/users/${user._id}`)
        .set("authorization", `Bearer ${anotherJwt}`)
        .send(user)
        .end((err, res) => {
          expect(err).to.exist;
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
});
