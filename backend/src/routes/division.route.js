var express = require("express");
var router = express.Router();

var DivisionController = require("../controllers/division.controller");
const auth = require("../utils/auth");

router.get("/", auth.checkSelf, DivisionController.get);
/**
 * @swagger
 * paths:
 *   /api/division:
 *      get:
 *          tags:
 *          - division
 *          summary: 그룹 조회
 *          operationId: getDivision
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>그룹 조회'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '그룹 IDX (미입력시 전체 조회) (페이징 미구현)'
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

router.post("/", auth.checkLev1, DivisionController.create);
/**
 * @swagger
 * paths:
 *   /api/division:
 *      post:
 *          tags:
 *          - division
 *          summary: 그룹 생성
 *          operationId: createDivision
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>그룹 생성'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: '생성할 그룹 데이터'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Division'
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
 *                                      $ref: '#/components/schemas/Division'
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

router.delete("/", auth.checkLev0, DivisionController.delete);
/**
 * @swagger
 * paths:
 *   /api/division:
 *      delete:
 *          tags:
 *          - division
 *          summary: 그룹 삭제
 *          operationId: deleteDivision
 *
 *          description: '<font color="red"><b>checkLev0</b></font><br><br>그룹 삭제'
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
 *      Division:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              name:
 *                  type: string
 *                  length: 100
 *          xml:
 *              name: Division
 */

module.exports = router;
