import fs from "fs";
import { resolve } from "node:path";

class UploadService {
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
