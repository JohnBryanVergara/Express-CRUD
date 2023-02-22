import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

//Middleware
app.use(express.json());

//POST - CREATE
app.post("/register", async (req, res) => {
    const { title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
        },
    });

    res.json({ post });
});

//GET - READ
app.get("/material", async (req, res) => {
    const materials = await prisma.post.findMany();
    res.json({ materials });
});

//PUT - UPDATE
app.put("/update/:id", async (req, res) => {
    const { id, title, published } = req.body;

    const updatePosts = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            published,
        },
    });
    res.json({ updatePosts });
});

//DELETE - DELETE
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.body;

    const delUser = await prisma.post.delete({
        where: {
            id,
        },
    });
    res.json({ delUser });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
