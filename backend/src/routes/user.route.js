var express = require("express");
var router = express.Router();

var UserController = require("../controllers/user.controller");
const auth = require("../utils/auth");

router.get("/", UserController.get);
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
 *                              properties:
 *                                  result:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/User'
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

router.post("/", UserController.create);
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
 *          requestBody:
 *              description: '생성할 사용자 정보'
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
 *                              properties:
 *                                  result:
 *                                      $ref: '#/components/schemas/User'
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

router.patch("/", UserController.update);
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
 *                              properties:
 *                                  result:
 *                                      type: integer
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

router.delete("/", UserController.delete);
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: integer
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

//
//
//

//
//
//

// 강좌별 사용자 리스트 조회 (보류 -> 학생별 subjects 제출 관련 erd 생성 후 고민)

// 사용자가 속한 그룹 리스트 조회
// getDivision;

// 사용자-그룹 링크 생성
// createDivisionLink;

// 사용자-그룹 링크 삭제
// deleteDivisionLink;

//
//
//

//
//
//

// 사용자의 강좌 리스트 조회
router.get("/course", UserController.getCourses);
/**
 * @swagger
 * paths:
 *   /api/user/course:
 *      get:
 *          tags:
 *          - user
 *          summary: 사용자가 수강중인 강좌 조회
 *          operationId: getCourses
 *
 *          description: '사용자가 수강중인 강좌 조회<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *          security:
 *           - Auth: []
 *
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Course'
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

// 사용자-강좌 링크 생성
router.post("/course", UserController.createCourseUserLink);
/**
 * @swagger
 * paths:
 *   /api/user/course:
 *      post:
 *          tags:
 *          - user
 *          summary: 강좌 수강하기
 *          operationId: createCourseUserLink
 *
 *          description: '사용자에게 강좌 추가<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강좌 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/User'
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
 */

// 사용자-강좌 링크 삭제
router.delete("/course", UserController.deleteCourseUserLink);
/**
 * @swagger
 * paths:
 *   /api/user/course:
 *      delete:
 *          tags:
 *          - user
 *          summary: 강좌 수강 취소하기
 *          operationId: deleteCourseUserLink
 *
 *          description: '사용자에게 강좌 제거하기<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강좌 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: integer
 *                                  msg:
 *                                      type: string
 *              4XX:
 *                  description: fail
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: boolean
 *                                  msg:
 *                                      type: string
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
 *                  type: string
 *                  format: datetime
 *              created:
 *                  type: string
 *                  format: datetime
 *              level:
 *                  type: integer
 *
 *          xml:
 *              name: User
 */

module.exports = router;
