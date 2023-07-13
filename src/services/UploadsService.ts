import fs from "fs";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { promisify } from "node:util";
import { MultipartFile } from "@fastify/multipart";
const pump = promisify(pipeline);

class UploadService {
  async uploadCoverFile(upload: MultipartFile, baseUrl: string) {
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

    if (!isValidFileFormat) {
      return null;
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);

    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads", fileName)
    );

    await pump(upload.file, writeStream);

    const fileUrl = new URL(`/uploads/${fileName}`, baseUrl).toString();

    return fileUrl;
  }

  deleteCoverUrlFile(coverUrl: string | undefined) {
    if (!coverUrl) return;

    const fullUrl = new URL(coverUrl);
    const fileName = fullUrl.pathname.split("/").pop();

    if (!fileName) return;

    fs.unlink(resolve(__dirname, "../../uploads", fileName), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

export { UploadService };
