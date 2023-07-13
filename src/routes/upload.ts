import { FastifyInstance } from "fastify";

import { UploadService } from "../services/UploadsService";

export async function uploadRoutes(app: FastifyInstance) {
  const uploadService = new UploadService();

  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    });

    if (!upload) {
      return reply.status(400).send();
    }

    const baseUrl = request.protocol.concat("://", request.hostname);
    const fileUrl = await uploadService.uploadCoverFile(upload, baseUrl);

    if (!fileUrl) {
      return reply.status(400).send();
    }

    return { fileUrl };
  });
}
