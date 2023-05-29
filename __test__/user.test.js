const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const { User, Todo } = require("../models");
const { generateToken } = require("../helpers/jwt");

let validToken;

const user = {
  user_name: "julian",
  email: "drax@mail.com",
  password: "12345",
};

beforeAll((done) => {
  User.create(user)
    .then((result) => {
      validToken = generateToken({
        id: result.id,
        email: result.email,
      });

      const todoTest = [
        {
          list: "makan",
          description: "makan 4 sehat 5 sempurna",
          UserId: result.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          list: "workout",
          description: "situp push up running",
          UserId: result.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      return Todo.bulkCreate(todoTest);
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      return Todo.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Test User", () => {
  test("GET /user", (done) => {
    request(app)
      .get("/user")
      .set("access_token", validToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("POST /login", (done) => {
    request(app)
      .post("/login")
      .send(user)
      .expect(200)
      .expect((res) => {
        res.body.access_token;
        console.log(res.body.access_token);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /user/myList", (done) => {
    request(app)
      .get("/user/myList")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        console.log(body.data);
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
