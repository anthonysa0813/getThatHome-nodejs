const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

async function uploadFile(file) {
  const stream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "hola.png",
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  const result = await client.send(command);
  console.log(result);
}

module.exports = uploadFile;
