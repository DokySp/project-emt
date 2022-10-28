const assert = require("assert");
const app = require("../app");
const request = require("supertest");
const should = require("should");

// References
// https://velog.io/@wimes/node.js-REST-API-서버-만들기-5.-TDD-5hk418e6xu
// https://afrobambacar.github.io/2018/10/code-coverage-with-jest.html

const prefix = "/";

describe("Test index", () => {
  describe(`GET: ${prefix}`, () => {
    it("홈 화면", (done) => {
      request(app)
        .get(`${prefix}`)
        .expect(200, () => {
          done();
        });
    });
  });

  // describe("GET: /api/reservation/currtotal", () => {
  //   it("Give all number of reservation of specific classroom", (done) => {
  //     request(app)
  //       .get(`/api/reservation/currtotal?bd=IT%EB%8C%80%ED%95%99&crn=304`)
  //       .end((err, res) => {
  //         if (err) throw err;
  //         assert(Object.keys(res.body).includes("success"));
  //         res.body.success.should.be.an.instanceOf(Object);
  //         done();
  //       });
  //   });

  //   it("Handle wrong query", () => {
  //     request(app).get(`/api/reservation/currtotal?bd=00&crn=00`).expect(400);
  //   });

  //   it("Handle query missing (bd)", () => {
  //     request(app).get(`/api/reservation/currtotal?bd=&crn=00`).expect(400);
  //   });

  //   it("Handle query missing (crn)", () => {
  //     request(app).get(`/api/reservation/currtotal?bd=00&crn=`).expect(400);
  //   });

  //   it("Handle query missing (all)", () => {
  //     request(app).get(`/api/reservation/currtotal`).expect(400);
  //   });
  // });
});
