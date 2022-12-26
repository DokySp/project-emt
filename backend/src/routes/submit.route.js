var express = require("express");
var router = express.Router();

var SubmitController = require("../controllers/submit.controller");
const auth = require("../utils/auth");

// TODO: 권한 개선
router.get("/", auth.checkSelf, SubmitController.get);
/**
 * @swagger
 * paths:
 *   /api/submit:
 *      get:
 *          tags:
 *          - submit
 *          summary: 과제 조회
 *          operationId: getSubmit
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>과제 조회'
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
 *                                  $ref: '#/components/schemas/SubmitGet'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.post("/", auth.checkLev2, SubmitController.create);
/**
 * @swagger
 * paths:
 *   /api/submit:
 *      post:
 *          tags:
 *          - submit
 *          summary: 과제 생성
 *          operationId: createSubmit
 *
 *          description: '<font color="green"><b>checkLev2</b></font><br><br>과제 생성'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: '생성할 과제 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Submit'
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
 *                                  $ref: '#/components/schemas/Submit'
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.patch("/", auth.checkSelf, SubmitController.update);
/**
 * @swagger
 * paths:
 *   /api/submit:
 *      patch:
 *          tags:
 *          - submit
 *          summary: 과제 수정
 *          operationId: updateSubmit
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>과제 수정'
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
 *                          $ref: '#/components/schemas/Submit'
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

// TODO: 개선 필요
router.delete("/", auth.checkSelf, SubmitController.delete);
/**
 * @swagger
 * paths:
 *   /api/submit:
 *      delete:
 *          tags:
 *          - submit
 *          summary: 과제 삭제
 *          operationId: deleteSubmit
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>과제 삭제'
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
 *      Submit:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              subjects_idx:
 *                  type: integer
 *              user_idx:
 *                  type: integer
 *              report:
 *                  type: string
 *                  length: 5000
 *              status:
 *                  type: integer
 *                  format: int32
 *              comments:
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
 *          xml:
 *              name: Submit
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      SubmitGet:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              subjects_idx:
 *                  type: integer
 *              user_idx:
 *                  type: integer
 *              report:
 *                  type: string
 *                  length: 5000
 *              status:
 *                  type: integer
 *                  format: int32
 *              comments:
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
 *              files:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/File'
 *          xml:
 *              name: SubmitGet
 */

module.exports = router;
