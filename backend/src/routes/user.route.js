var express = require("express");
var router = express.Router();

var UserController = require("../controllers/user.controller");
const auth = require("../utils/auth");

router.get("/", UserController.getUser);
/**
 * @swagger
 * paths:
 *   /api/user:
 *      get:
 *          tags:
 *          - user
 *          summary: 사용자 조회
 *          operationId: getUser
 *
 *          description: '사용자 조회'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '사용자 IDX'
 *                required: false
 *                schema:
 *                  type: integer
 *                  format: int64
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.post("/", UserController.createUser);
/**
 * @swagger
 * paths:
 *   /api/user:
 *      post:
 *          tags:
 *          - user
 *          summary: 사용자 생성
 *          operationId: createUser
 *
 *          description: '사용자 생성'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '사용자 IDX'
 *                required: false
 *                schema:
 *                  type: integer
 *                  format: int64
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.patch("/", UserController.updateUser);
/**
 * @swagger
 * paths:
 *   /api/user:
 *      patch:
 *          tags:
 *          - user
 *          summary: 사용자 수정
 *          operationId: updateUser
 *
 *          description: '사용자 수정'
 *
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '사용자 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *
 *          requestBody:
 *              description: '수정할 내용의 사용자 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *              required: true
 *
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.delete("/", UserController.deleteUser);
/**
 * @swagger
 * paths:
 *   /api/user:
 *      delete:
 *          tags:
 *          - user
 *          summary: 사용자 삭제
 *          operationId: deleteUser
 *
 *          description: '사용자 삭제'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '사용자 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

//
//
//

router.post("/course", UserController.createCourseUserLink);
/**
 * @swagger
 * paths:
 *   /api/user/course:
 *      post:
 *          tags:
 *          - user
 *          summary: 사용자에게 강좌 추가하기
 *          operationId: createCourseUserLink
 *
 *          description: '사용자에게 강좌 추가하기'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: user_idx
 *                in: query
 *                description: '사용자 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *              - name: course_idx
 *                in: query
 *                description: '강좌 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.delete("/course", UserController.deleteCourseUserLink);
/**
 * @swagger
 * paths:
 *   /api/user/course:
 *      delete:
 *          tags:
 *          - user
 *          summary: 사용자에게 강좌 제거하기
 *          operationId: deleteCourseUserLink
 *
 *          description: '사용자에게 강좌 제거하기'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '링크 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              email:
 *                  type: string
 *                  length: 100
 *              pw:
 *                  type: string
 *                  length: 350
 *              img:
 *                  type: string
 *                  length: 1000
 *              issued_at:
 *                  type: date
 *              created:
 *                  type: date
 *              level:
 *                  type: integer
 *
 *          xml:
 *              name: User
 */

module.exports = router;
