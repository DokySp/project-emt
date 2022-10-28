// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");
const secret = require("../../secret/secret");
const storageId = secret.googleStorageId;

const fs = require("fs");
const temporaryLoc = "tmp";
try {
  fs.mkdirSync(temporaryLoc);
} catch (err) {}

const { v4 } = require("uuid");

// Creates a client
const storage = new Storage();

//
//
//

const FileService = {
  upload: async (file, path) => {
    const filename = `${v4()}_${file.name}`;
    const memetype = file.mimetype;
    const filesize = file.size;
    let dest = path;

    dest += filename;
    const localDest = `${temporaryLoc}/${filename}`;

    await file.mv(localDest);

    await storage.bucket(storageId).upload(localDest, {
      destination: dest,
    });

    fs.rmSync(localDest);

    return {
      filename: filename,
      memetype: memetype,
      filesize: filesize,
      link: `https://storage.googleapis.com/${storageId}/${dest}`,
    };
  },

  delete: async (id) => {
    const file = storage.bucket(storageId).file(id);
    await file.delete();
  },
};

module.exports = FileService;
