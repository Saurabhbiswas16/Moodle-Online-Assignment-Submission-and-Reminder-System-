const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
var multer = require("multer");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "1080543563883-bvhmmvk2isbrka97nbv9pekfhermmorn.apps.googleusercontent.com";
const CLIENT_SECRET = "CJOROmeC0gKbUKx-I3TbVwts";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//049RpLoRPlzn-CgYIARAAGAQSNwF-L9Ir17LIg1vVk45xZuq_KZlCQAYGiCDAu9gT2j5vu3BbirNSnNl7m5cFiPJi5jE6wtS5DwA";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const filePath = path.join(__dirname, "googledrive.js");

const upload = multer();
router.post("/createfile", upload.single("file"), async (req, res) => {
  var file = req.file;
  console.log("buffer to string ->");
  uploadfile(file, req, res);
});

router.post("/getviewlink", async (req, res) => {
  var id = req.body.id;
  generatePublicUrl(id, res);
});
async function uploadfile(file, req, res) {
  console.log("in upload file fun ");
  const response = await drive.files.create({
    requestBody: {
      name: file.originalName,
    },
    media: {
      body: file.stream,
    },
  });

  //   generatePublicUrl();
  res.send({ id: response.data.id });
}

async function deleteFile(id) {
  try {
    const response = await drive.files.delete({
      fileId: id,
    });
    // console.log(response.data, response.status);
  } catch (error) {
    // console.log(error.message);
  }
}

async function generatePublicUrl(id, res) {
  try {
    const fileId = id;
    console.log(fileId);
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
    res.send({ webViewLink: result.data.webViewLink });
    console.log("after res");
  } catch (error) {
    // console.log("error in getting file url");
  }
}

module.exports = router;
