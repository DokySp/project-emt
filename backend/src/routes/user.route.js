var express = require("express");
var router = express.Router();

var UserController = require("../controllers/user.controller");
const auth = require("../utils/auth");

// TODO: 개선 필요 (idx 삭제?)
router.get("/", auth.checkSelf, UserController.get);
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
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자 조회'
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

router.patch("/", auth.checkSelf, UserController.update);
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
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자 수정<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *
 *          security:
 *           - Auth: []
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

router.delete("/", auth.checkLev0, UserController.delete);
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
 *          description: '<font color="red"><b>checkLev0</b></font><br><br>사용자 삭제'
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

// 사용자가 속한 그룹 리스트 조회
router.get("/division", auth.checkSelf, UserController.getDivision);
/**
 * @swagger
 * paths:
 *   /api/user/division:
 *      get:
 *          tags:
 *          - user
 *          summary: 사용자가 속한 그룹 조회
 *          operationId: getDivision
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자가 속한 그룹 조회<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
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
 *                                          $ref: '#/components/schemas/Division'
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

// 사용자-그룹 링크 생성
router.post("/division", auth.checkSelf, UserController.createDivisionLink);
/**
 * @swagger
 * paths:
 *   /api/user/division:
 *      post:
 *          tags:
 *          - user
 *          summary: 사용자에게 그룹 추가
 *          operationId: createDivisionLink
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자에게 그룹 추가<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '그룹 IDX'
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
 *                                          $ref: '#/components/schemas/UserDivisionLink'
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

// 사용자-그룹 링크 삭제
router.delete("/division", auth.checkSelf, UserController.deleteDivisionLink);
/**
 * @swagger
 * paths:
 *   /api/user/division:
 *      delete:
 *          tags:
 *          - user
 *          summary: 그룹에서 삭제하기
 *          operationId: deleteDivisionLink
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>그룹에서 삭제하기<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '그룹 IDX'
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

//
//
//

//
//
//

// 사용자의 강좌 리스트 조회
router.get("/course", auth.checkSelf, UserController.getCourses);
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
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자가 수강중인 강좌 조회<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
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
router.post("/course", auth.checkSelf, UserController.createCourseUserLink);
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
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자에게 강좌 추가<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
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
 *                                          $ref: '#/components/schemas/CourseUserLink'
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
router.delete("/course", auth.checkSelf, UserController.deleteCourseUserLink);
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
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>사용자에게 강좌 제거하기<br>- 사용자 정보는 로그인 세션 기반으로 알아냄'
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

//
//
//

//
//
//

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
 *              last_name:
 *                  type: string
 *                  length: 15
 *              first_name:
 *                  type: string
 *                  length: 20
 *              nickname:
 *                  type: string
 *                  length: 20
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
 *              is_active:
 *                  type: boolean
 *
 *          xml:
 *              name: User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      CourseUserLink:
 *          type: object
 *          properties:
 *              course_idx:
 *                  type: integer
 *              user_idx:
 *                  type: integer
 *              started_date:
 *                  type: string
 *                  format: datetime
 *
 *          xml:
 *              name: CourseUserLink
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      UserDivisionLink:
 *          type: object
 *          properties:
 *              course_idx:
 *                  type: integer
 *              user_idx:
 *                  type: integer
 *              started_date:
 *                  type: string
 *                  format: datetime
 *
 *          xml:
 *              name: UserDivisionLink
 */

module.exports = router;
