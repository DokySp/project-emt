var express = require("express");
var router = express.Router();

var FileController = require("../controllers/file.controller");
const auth = require("../utils/auth");

router.put("/classes", auth.check, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/files/classes:
 *      put:
 *          tags:
 *          - file
 *          summary: 강의 첨부 파일 업로드
 *          operationId: uploadFile
 *
 *          description: '파일 업로드<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: loc
 *                in: query
 *                description: '저장할 폴더 위치'
 *                required: false
 *                schema:
 *                  type: string
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  properties:
 *                    # 'file' will be the field name in this multipart request
 *                    file:
 *                      type: string
 *                      format: binary
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.put("/subjects", auth.check, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/files/subjects:
 *      put:
 *          tags:
 *          - file
 *          summary: 과제 첨부 파일 업로드
 *          operationId: uploadFile
 *
 *          description: '파일 업로드<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: loc
 *                in: query
 *                description: '저장할 폴더 위치'
 *                required: false
 *                schema:
 *                  type: string
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  properties:
 *                    # 'file' will be the field name in this multipart request
 *                    file:
 *                      type: string
 *                      format: binary
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.delete("/", auth.check, FileController.delete);
/**
 * @swagger
 * paths:
 *   /api/files:
 *      delete:
 *          tags:
 *          - file
 *          summary: 파일 삭제 (해당 링크도 함께 삭제)
 *          operationId: deleteFile
 *
 *          description: '파일 삭제<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: id
 *                in: query
 *                description: '삭제할 파일 ID'
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 */

module.exports = router;
