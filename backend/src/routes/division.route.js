var express = require("express");
var router = express.Router();

var DivisionController = require("../controllers/division.controller");
const auth = require("../utils/auth");

router.get("/", DivisionController.get);
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
 *          description: '그룹 조회'
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

router.post("/", DivisionController.create);
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
 *          description: '그룹 생성'
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

router.delete("/", DivisionController.delete);
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
 *          description: '그룹 삭제'
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

//
//
//

// 수정 기능은 제작 X
// router.patch("/", DivisionController.update);
// /**
//  * @swagger
//  * paths:
//  *   /api/division:
//  *      patch:
//  *          tags:
//  *          - division
//  *          summary: 그룹 수정
//  *          operationId: updateDivision
//  *
//  *          description: '그룹 수정'
//  *
//  *          security:
//  *           - Auth: []
//  *
//  *          parameters:
//  *              - name: idx
//  *                in: query
//  *                description: '그룹 IDX'
//  *                required: true
//  *                schema:
//  *                  type: integer
//  *                  format: int64
//  *
//  *          requestBody:
//  *              description: '수정할 내용의 그룹 데이터'
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Division'
//  *              required: true
//  *
//  *          responses:
//  *              200:
//  *                  description: successful operation
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              properties:
//  *                                  result:
//  *                                      type: integer
//  *                                  msg:
//  *                                      type: string
//  *              4XX:
//  *                  description: fail
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              properties:
//  *                                  result:
//  *                                      type: boolean
//  *                                  msg:
//  *                                      type: string
//  */
