// Imports the Google Cloud client library
// const { Storage } = require("@google-cloud/storage");
// const storageId = secret.googleStorageId;
const secret = require("../../secret/secret");
const model = require("../models");
const fs = require("fs");
const iconv = require("iconv-lite");
const { v4 } = require("uuid");
const baseDirLoc = "storage";
const { sequelize } = require("../models");

try {
  fs.mkdirSync(baseDirLoc);
} catch (err) {}

//
//
//

const FileService = {
  // https://codechacha.com/ko/javascript-enum/
  // status.CLASSES.description => return val;

  status: Object.freeze({
    CLASSES: Symbol("classes"),
    SUBJECTS: Symbol("subjects"),
    SUBMIT: Symbol("submit"),
    PUBLIC: Symbol("public"),
  }),

  //
  //
  //

  getDownloadFilename: function (header, filename) {
    if (header.includes("MSIE") || header.includes("Trident")) {
      return encodeURIComponent(filename).replace(/\\+/gi, "%20");
      // } else if (header.includes("Chrome")) {
      //   return filename;
      // } else if (header.includes("Opera")) {
      //   return filename;
      // } else if (header.includes("Firefox")) {
      //   return filename;
    } else if (header.includes("Safari")) {
      // TODO: 사파리에서 한글파일명 깨짐
      return iconv.decode(iconv.encode(filename, "UTF-8"), "ISO-8859-1");
    }
    return filename;
  },

  download: async (uuid, header, streamDestination) => {
    // https://whichmean.tistory.com/6
    // 1. DB에서 해당 uuid로 파일 검색
    // 2. 검색 결과에서 fid 값 도출
    // 3. mimetype 적용

    try {
      // 1. DB에서 해당 uuid로 파일 검색
      const resultRaw = await model.file.findOne({
        where: { uuid },
      });
      if (resultRaw == null || resultRaw == undefined) {
        throw new Error("Cannot find file");
      }
      const result = resultRaw.dataValues;

      // 2. 검색 결과에서 fid 값 도출
      const fid = `${baseDirLoc}/${result.fid}`;
      const mimeType = result.type;
      const filename = FileService.getDownloadFilename(header, result.name); // result.name;

      // 3. mimetype 적용
      // 파일이 존재 확인
      if (fs.existsSync(fid)) {
        streamDestination.setHeader("Content-type", mimeType);

        // 다운로드 될 파일명 설정 -> 이 헤더 설정 시, 무조건 바로 다운로드됨
        streamDestination.setHeader(
          "Content-disposition",
          "attachment; filename=" + filename
        );

        let filestream = fs.createReadStream(fid);
        filestream.pipe(streamDestination, { end: true });

        return;
      } else {
        throw new Error("Cannot find file");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  upload: async (idx, file, paramStatus) => {
    // 1. 파일 메타데이터 생성 / 파일 저장 & URL 경로 설정
    // 2. 파일 uuid, 주소 uuid 생성
    // 3. 파일 업로드
    // 4. 파일 DB 등록
    // 5. 해당 파일 링크 DB 등록

    let fileResult;
    let linkResult;

    try {
      // 파일 메타데이터 생성 / 파일 저장 & URL 경로 설정
      const filename = file.name;
      const mimetype = file.mimetype;
      const filesize = file.size;

      // 2. 파일 uuid, 주소 uuid 생성
      const uuid = v4().replaceAll("-", "");
      const fid = v4().replaceAll("-", "");
      if (uuid === fid) throw new Error("uuid generate error");

      // 3. 파일 업로드
      await file.mv(`${baseDirLoc}/${fid}`);

      // 4. 파일 DB 등록
      fileResult = await model.file.create({
        uuid: uuid,
        fid: fid,
        name: filename,
        size: filesize,
        type: mimetype,
        is_public: paramStatus === FileService.status.PUBLIC,
      });
      fileResult = fileResult.dataValues;

      console.log(idx);

      // 5. 해당 파일 링크 DB 등록
      switch (paramStatus) {
        case FileService.status.CLASSES:
          linkResult = await model.classes_file_link.create({
            classes_idx: idx,
            file_idx: fileResult.idx,
          });
          break;
        case FileService.status.SUBJECTS:
          linkResult = await model.subjects_file_link.create({
            subjects_idx: idx,
            file_idx: fileResult.idx,
          });
          break;
        case FileService.status.SUBMIT:
          linkResult = await model.submit_file_link.create({
            submit_idx: idx,
            file_idx: fileResult.idx,
          });
          break;
      }
      if (linkResult != undefined && linkResult != null) {
        linkResult = linkResult.dataValues;
      }

      return {
        name: filename,
        size: filesize,
        type: mimetype,
        link: `${secret.development.host}/api/file/${uuid}`,
      };
    } catch (err) {
      if (fileResult === undefined || fileResult === null) {
        throw new Error(`file sql error:: ${err}`);
      }
      if (linkResult === undefined || linkResult === null) {
        // file 롤백
        await model.file.destroy({ where: { idx: fileResult.idx } });
        fs.rmSync(`${baseDirLoc}/${fileResult.fid}`);

        throw new Error(`link sql error:: ${err}`);
      }
      throw new Error(err);
    }
  },

  //
  //
  //

  delete: async (idx) => {
    // 1. 해당하는 인덱스의 파일 링크 삭제
    // 2. 파일 삭제
    // 3. 실제 파일 삭제

    try {
      const qClasses = `SELECT b.classes_idx, b.file_idx FROM file AS a INNER JOIN classes_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}`;
      const qSubjects = `SELECT b.subjects_idx, b.file_idx FROM file AS a INNER JOIN subjects_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}`;
      const qSubmit = `SELECT b.submit_idx, b.file_idx FROM file AS a INNER JOIN submit_file_link AS b ON a.idx = b.file_idx WHERE a.idx = ${idx}`;

      const [rClasses, _1] = await sequelize.query(qClasses);
      const [rSubjects, _2] = await sequelize.query(qSubjects);
      const [rSubmit, _3] = await sequelize.query(qSubmit);

      // // 1. 해당하는 인덱스의 파일 링크 삭제
      if (rClasses.length !== 0) {
        // classes_file_link
        for (item of rClasses) {
          await model.classes_file_link.destroy({
            where: { classes_idx: item.classes_idx, file_idx: idx },
          });
        }
      }
      if (rSubjects.length !== 0) {
        // subjects_file_link
        for (item of rSubjects) {
          await model.subjects_file_link.destroy({
            where: { subjects_idx: item.subjects_idx, file_idx: idx },
          });
        }
      }
      if (rSubmit.length !== 0) {
        // submit_file_link
        for (item of rSubmit) {
          await model.submit_file_link.destroy({
            where: { submit_idx: item.submit_idx, file_idx: idx },
          });
        }
      }

      // 2. 파일 삭제
      const fileResult = await model.file.findOne({
        where: { idx: idx },
      });
      const result = await model.file.destroy({
        where: { idx: idx },
      });

      // 3. 실제 파일 삭제
      fs.rmSync(`${baseDirLoc}/${fileResult.dataValues.fid}`);

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = FileService;
