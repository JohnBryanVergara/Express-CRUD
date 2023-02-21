import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    const { name, email } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    res.json({ user });
});

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
