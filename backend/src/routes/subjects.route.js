var express = require("express");
var router = express.Router();

var SubjectsController = require("../controllers/subjects.controller");
const auth = require("../utils/auth");

router.get("/", SubjectsController.get);
/**
 * @swagger
 * paths:
 *   /api/subjects:
 *      get:
 *          tags:
 *          - subjects
 *          summary: 과제 조회
 *          operationId: getSubjects
 *
 *          description: '과제 조회'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '과제 IDX'
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
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Subjects'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.post("/", SubjectsController.create);
/**
 * @swagger
 * paths:
 *   /api/subjects:
 *      post:
 *          tags:
 *          - subjects
 *          summary: 과제 생성
 *          operationId: createSubjects
 *
 *          description: '과제 생성'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: '생성할 과제 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Subjects'
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
 *                                  $ref: '#/components/schemas/Subjects'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.patch("/", SubjectsController.update);
/**
 * @swagger
 * paths:
 *   /api/subjects:
 *      patch:
 *          tags:
 *          - subjects
 *          summary: 과제 수정
 *          operationId: updateSubjects
 *
 *          description: '과제 수정'
 *
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '과제 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *
 *          requestBody:
 *              description: '수정할 내용의 과제 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Subjects'
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

router.delete("/", SubjectsController.delete);
/**
 * @swagger
 * paths:
 *   /api/subjects:
 *      delete:
 *          tags:
 *          - subjects
 *          summary: 과제 삭제
 *          operationId: deleteSubjects
 *
 *          description: '과제 삭제'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '과제 IDX'
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

/**
 * @swagger
 * components:
 *   schemas:
 *      Subjects:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              course_idx:
 *                  type: integer
 *              vimeo_url:
 *                  type: string
 *                  length: 1000
 *              name:
 *                  type: string
 *                  length: 100
 *              content:
 *                  type: string
 *                  length: 5000
 *              report:
 *                  type: string
 *                  length: 5000
 *              status:
 *                  type: integer
 *                  format: int32
 *              comment:
 *                  type: string
 *                  length: 5000
 *              score:
 *                  type: integer
 *                  format: int32
 *              last_submitted_time:
 *                  type: string
 *                  format: datetime
 *              last_return_time:
 *                  type: string
 *                  format: datetime
 *              due_date:
 *                  type: string
 *                  format: datetime
 *          xml:
 *              name: Subjects
 */

module.exports = router;
