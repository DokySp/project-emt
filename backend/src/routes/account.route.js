var express = require("express");
var router = express.Router();

var AccountController = require("../controllers/account.controller");
const auth = require("../utils/auth");

router.post("/signin", AccountController.login);
/**
 * @swagger
 * paths:
 *   /api/eid/signin:
 *      post:
 *          tags:
 *          - account
 *          summary: 로그인
 *          operationId: login
 *          requestBody:
 *              description: 사용자 정보 전송
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ea:
 *                                  type: string
 *                              pk:
 *                                  type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          result:
 *                            type: string
 *                            description: JWT Token
 *                          msg:
 *                            type: string
 *                            description: system message
 *
 *              400:
 *                  description: 토큰 인증 실패
 *                  content: {}
 */

// router.post(`${apiAccountPrefix}/logout`, AccountController.logout);
// /**
//  * @swagger
//  * paths:
//  *   /api/eid/signout:
//  *      post:
//  *          tags:
//  *          - account
//  *          summary: 로그아웃 (refresh token)
//  *          operationId: logout
//  *          responses:
//  *              default:
//  *                  description: successful operation
//  *                  content: {}
//  */

router.patch("/pk", auth.checkSelf, AccountController.updatePassword);
/**
 * @swagger
 * paths:
 *   /api/eid/pk:
 *      patch:
 *          tags:
 *          - account
 *          summary: 비밀번호 변경
 *          operationId: updatePassword
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>비밀번호 변경'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: 사용자 정보 전송
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              pk:
 *                                  type: string
 *          responses:
 *              default:
 *                  description: successful operation
 *                  content: {}
 */

router.patch("/level", auth.checkSelf, AccountController.updateLevel);
/**
 * @swagger
 * paths:
 *   /api/eid/level:
 *      patch:
 *          tags:
 *          - account
 *          summary: 구분 변경
 *          operationId: updateLevel
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>구분 변경<br>0: Admin<br>1: 선생님<br>2: 학생)'
 *          security:
 *           - Auth: []
 *
 *          requestBody:
 *              description: 사용자 정보 전송
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              level:
 *                                  type: integer
 *          responses:
 *              default:
 *                  description: successful operation
 *                  content: {}
 */

module.exports = router;
