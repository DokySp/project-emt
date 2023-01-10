var express = require("express");
var router = express.Router();

var FileController = require("../controllers/file.controller");
const auth = require("../utils/auth");

router.get("/:uuid/", auth.checkToken, FileController.download);
/**
 * @swagger
 * paths:
 *   /api/file/{uuid}/:
 *      get:
 *          tags:
 *          - file
 *          summary: 파일 다운로드
 *          operationId: download
 *
 *          description: '<font color="grey"><b>checkToken</b></font><br><br>파일 다운로드<br>권한: <b>TOKEN</b><br>public인 경우 권한 필요 없음'
 *
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: uuid
 *                in: path
 *                description: 'uuid'
 *                required: true
 *                schema:
 *                  type: string
 *
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

router.put("/:flag", auth.checkSelf, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/file/img:
 *      put:
 *          tags:
 *          - file
 *          summary: 이미지 파일(프로필 등) 업로드
 *          operationId: uploadFileGlobal
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>파일 업로드<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
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
 *
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 *              400:
 *                  description: fail
 *                  content: {}
 */

// router.put("/classes", auth.check, FileController.upload);
router.put("/:flag", auth.checkLev1, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/file/classes:
 *      put:
 *          tags:
 *          - file
 *          summary: 강의 첨부 파일 업로드
 *          operationId: uploadFileClasses
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>파일 업로드<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '수업 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *              - name: loc
 *                in: query
 *                description: '저장할 폴더 위치 (동작안함)'
 *                required: false
 *                default: ''
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

router.put("/:flag", auth.checkLev1, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/file/subjects:
 *      put:
 *          tags:
 *          - file
 *          summary: 과제 첨부 파일 업로드
 *          operationId: uploadFileSubjects
 *
 *          description: '<font color="orange"><b>checkLev1</b></font><br><br>파일 업로드<br>권한: <b>LOGIN</b>'
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
 *              - name: loc
 *                in: query
 *                description: '저장할 폴더 위치 (동작안함)'
 *                required: false
 *                default: ''
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

router.put("/:flag", auth.checkLev2, FileController.upload);
/**
 * @swagger
 * paths:
 *   /api/file/submit:
 *      put:
 *          tags:
 *          - file
 *          summary: 과제 제출 첨부 파일 업로드
 *          operationId: uploadFileSubmit
 *
 *          description: '<font color="green"><b>checkLev2</b></font><br><br>파일 업로드<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '제출 과제 IDX'
 *                required: true
 *                schema:
 *                  type: integer
 *                  format: int64
 *              - name: loc
 *                in: query
 *                description: '저장할 폴더 위치 (동작안함)'
 *                required: false
 *                default: ''
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

// TODO: 권한 개선 필요
router.delete("/", auth.checkSelf, FileController.delete);
/**
 * @swagger
 * paths:
 *   /api/file:
 *      delete:
 *          tags:
 *          - file
 *          summary: 파일 삭제 (해당 링크도 함께 삭제)
 *          operationId: deleteFile
 *
 *          description: '<font color="blue"><b>checkSelf</b></font><br><br>파일 삭제<br>권한: <b>LOGIN</b>'
 *          security:
 *           - Auth: []
 *
 *          parameters:
 *              - name: idx
 *                in: query
 *                description: '삭제할 파일 IDX'
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: successful operation
 *                  content: {}
 */

//
//
//

/**
 * @swagger
 * components:
 *   schemas:
 *      File:
 *          type: object
 *          properties:
 *              idx:
 *                  type: integer
 *              uuid:
 *                  type: string
 *                  length: 32
 *              name:
 *                  type: string
 *              size:
 *                  type: integer
 *              type:
 *                  type: string
 *              is_public:
 *                  type: boolean
 *          xml:
 *              name: File
 */

module.exports = router;
