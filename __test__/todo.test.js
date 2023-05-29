const request = require("supertest");
const app = require("../app");

const { User, Todo } = require("../models");
const { generateToken } = require("../helpers/jwt");

let validToken;

const user = {
  user_name: "julian",
  email: "drax@mail.com",
  password: "12345",
};

const todo = {
  list: "makan",
  description: "makan bakso 5 porsi saja",
  UserId: user.id,
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

describe("Test Todo", () => {
  test("GET /todo", (done) => {
    request(app)
      .get("/todo")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        // console.log(body.data);
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("GET /todo/:id", (done) => {
    request(app)
      .get(`/todo/1`)
      .set("access_token", validToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
        console.log(res);
      });
  });

  test("PUT /todo/:id", (done) => {
    request(app)
      .put("/todo/1")
      .set("access_token", validToken)
      .send(todo)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("DELETE /todo/:id", (done) => {
    request(app)
      .delete("/todo/2")
      .set("access_token", validToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("POST /todo", (done) => {
    request(app)
      .post("/todo")
      .set("access_token", validToken)
      .send(todo)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
