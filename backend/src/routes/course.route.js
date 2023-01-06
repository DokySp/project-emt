var express = require("express");
var router = express.Router();

var CourseController = require("../controllers/course.controller");
const auth = require("../utils/auth");

// router.get(`${apiCoursePrefix}`, auth.check, CourseController.getCourse);
router.get("/", auth.checkSelf, CourseController.get);
/**
 * @swagger
 * paths:
 *   /api/course:
 *      get:
 *          tags:
 *          - course
 *          summary: 강좌 조회
 *          operationId: getCourse
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>강좌 조회'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강좌 IDX (미입력시 전체 조회) (페이징 미구현)'
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

router.post("/", auth.checkLev1, CourseController.create);
/**
 * @swagger
 * paths:
 *   /api/course:
 *      post:
 *          tags:
 *          - course
 *          summary: 강좌 생성
 *          operationId: createCourse
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강좌 생성'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: '생성할 강좌 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
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
 *                                      $ref: '#/components/schemas/Course'
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

router.patch("/", auth.checkLev1, CourseController.update);
/**
 * @swagger
 * paths:
 *   /api/course:
 *      patch:
 *          tags:
 *          - course
 *          summary: 강좌 수정
 *          operationId: updateCourse
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강좌 수정'
 *
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
 *                  format: int64
 *
 *          requestBody:
 *              description: '수정할 내용의 강좌 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
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

router.delete("/", auth.checkLev1, CourseController.delete);
/**
 * @swagger
 * paths:
 *   /api/course:
 *      delete:
 *          tags:
 *          - course
 *          summary: 강좌 삭제
 *          operationId: deleteCourse
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강좌 삭제'
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

router.get("/detail", auth.checkSelf, CourseController.getDetail);
/**
 * @swagger
 * paths:
 *   /api/course/detail:
 *      get:
 *          tags:
 *          - course
 *          summary: 강좌 수업 및 과제 목록 조회
 *          operationId: getCourseDetail
 *
 *          description: <font color="blue"><b>checkSelf</b></font><br><br>'강좌 수업 및 과제 목록 조회'
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
 *                  format: int64
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: application/json
 *                                      $ref: '#/components/schemas/CourseDetail'
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

// 강좌별 사용자 리스트 조회
router.get("/user", auth.checkLev1, CourseController.getUser);
/**
 * @swagger
 * paths:
 *   /api/course/user:
 *      get:
 *          tags:
 *          - course
 *          summary: 강좌 담당 강사 및 수강중인 학생 목록 조회
 *          operationId: getUser
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강좌 담당 강사 및 수강중인 학생 목록 조회'
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
 *                  format: int64
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  result:
 *                                      type: application/json
 *                                      $ref: '#/components/schemas/User'
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
 *      Course:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              img:
 *                  type: string
 *                  length: 1000
 *              name:
 *                  type: string
 *                  length: 100
 *
 *              sub:
 *                  type: string
 *                  length: 100
 *              explain:
 *                  type: string
 *                  length: 500
 *              created_by:
 *                  type: integer
 *
 *              is_enroll_granted:
 *                  type: boolean
 *              is_due_date_implicit:
 *                  type: boolean
 *              is_active:
 *                  type: boolean
 *          xml:
 *              name: Course
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      CourseDetail:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              img:
 *                  type: string
 *              name:
 *                  type: string
 *                  length: 32
 *
 *              sub_name:
 *                  type: string
 *                  length: 100
 *              description:
 *                  type: string
 *                  length: 500
 *              created_by:
 *                  type: integer
 *
 *              is_enroll_granted:
 *                  type: boolean
 *              is_due_date_implicit:
 *                  type: boolean
 *              is_active:
 *                  type: boolean
 *              started_date:
 *                  type: string
 *                  format: datetime
 *              classes:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Classes'
 *              subjects:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Subjects'
 *          xml:
 *              name: CourseDetail
 */

module.exports = router;
