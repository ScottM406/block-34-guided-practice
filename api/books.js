const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (book) {
      res.json(book);
    } else {
      next({ status: 404, message: `No book with ID ${id} exists.`});
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  if(!title) {
    return next({
      status: 400,
      message: "You must provide a title!",
    });
  }

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) }});
    if (!book) {
      return next({
        status: 404,
        message: `No book with ID ${id} exists`
      });
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: { title },
    });
    res.json(updatedBook);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next({
      status: 400,
      message: "You must provide a title for the new book entry.",
    });
  }
  try {
    const book = await prisma.book.create({ data: { title }});
    res.status(201).json(book);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) }});
    if (!book) {
      return next({
        status: 404,
        message: `No book with ID ${id} exists.`,
      });
    }

    await prisma.book.delete({ where: { id: Number(id) }});
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});