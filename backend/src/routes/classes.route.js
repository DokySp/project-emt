var express = require("express");
var router = express.Router();

var ClassesController = require("../controllers/classes.controller");
const auth = require("../utils/auth");

router.get("/", auth.checkSelf, ClassesController.get);
/**
 * @swagger
 * paths:
 *   /api/classes:
 *      get:
 *          tags:
 *          - classes
 *          summary: 강의 조회
 *          operationId: getClasses
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>강의 조회'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강의 IDX'
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
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/ClassesGet'
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

router.post("/", auth.checkLev1, ClassesController.create);
/**
 * @swagger
 * paths:
 *   /api/classes:
 *      post:
 *          tags:
 *          - classes
 *          summary: 강의 생성
 *          operationId: createClasses
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강의 생성'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: '생성할 강의 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Classes'
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
 *                                      $ref: '#/components/schemas/Classes'
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

router.patch("/", auth.checkLev1, ClassesController.update);
/**
 * @swagger
 * paths:
 *   /api/classes:
 *      patch:
 *          tags:
 *          - classes
 *          summary: 강의 수정
 *          operationId: updateClasses
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강의 수정'
 *
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강의 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *
 *          requestBody:
 *              description: '수정할 내용의 강의 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Classes'
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

router.delete("/", auth.checkLev1, ClassesController.delete);
/**
 * @swagger
 * paths:
 *   /api/classes:
 *      delete:
 *          tags:
 *          - classes
 *          summary: 강의 삭제
 *          operationId: deleteClasses
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>강의 삭제'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '강의 IDX'
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
 *      Classes:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              course_idx:
 *                  type: integer
 *
 *              section_idx:
 *                  type: integer
 *              order_idx:
 *                  type: integer
 *
 *              vimeo_url:
 *                  type: string
 *                  length: 1000
 *              name:
 *                  type: string
 *                  length: 100
 *              content:
 *                  type: string
 *                  length: 5000
 *              watch_time:
 *                  type: string
 *                  format: datetime
 *              due_date:
 *                  type: string
 *                  format: datetime
 *          xml:
 *              name: Classes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      ClassesGet:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              course_idx:
 *                  type: integer
 *
 *              section_idx:
 *                  type: integer
 *              order_idx:
 *                  type: integer
 *
 *              vimeo_url:
 *                  type: string
 *                  length: 1000
 *              name:
 *                  type: string
 *                  length: 100
 *              content:
 *                  type: string
 *                  length: 5000
 *              watch_time:
 *                  type: string
 *                  format: datetime
 *              due_date:
 *                  type: string
 *                  format: datetime
 *              files:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/File'
 *          xml:
 *              name: ClassesGet
 */

module.exports = router;
