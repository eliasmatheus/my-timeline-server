import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (req, res) => {
    await req.jwtVerify();
  });

  app.get("/memories", async (req, res) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: req.user.sub,
      },
      orderBy: {
        date: "desc",
      },
    });

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
        date: memory.date,
      };
    });
  });

  app.get("/memories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (!memory.isPublic && memory.userId !== req.user.sub) {
      return res.status(401).send();
    }

    return memory;
  });

  app.post("/memories", async (req, res) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      date: z.date(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic, date } = bodySchema.parse(req.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        date,
        userId: req.user.sub,
      },
    });

    return memory;
  });

  app.put("/memories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      date: z.coerce.date(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic, date } = bodySchema.parse(req.body);

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== req.user.sub) {
      return res.status(401).send();
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
        date,
      },
    });

    return memory;
  });

  app.delete("/memories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== req.user.sub) {
      return res.status(401).send();
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    });
  });
}
