import { Request,Response,NextFunction } from 'express';
// const express = require("express");
import express from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router();
router.use(express.json());

router.post("/add" , async (req: Request,res: Response,next: NextFunction) => {
    // add a check if a user is already registered!!
    const {firstName , LastName , email , password} = req.body;
    const user = await prisma.user.create({
        data: {
            firstName,
            LastName,
            email,
            password,
        },
    });
    console.log(user);
    res.send("User Added Successfully");
})

router.get("/all" , async (req: Request,res: Response,next: NextFunction) => {
    const user = await prisma.user.findMany();
    console.log(user);
    res.send(user);
})

router.delete("/delete/:id" , async (req: Request,res: Response,next: NextFunction) => {
    const user = await prisma.user.delete({
        where :{id: parseInt(req.params.id)},
    });
    console.log(user);
    res.send("User Deleted Successfully");
})

router.put("/update/:id" , async (req: Request,res: Response,next: NextFunction) => {
    const {firstName , LastName , email , password} = req.body;
    const user = await prisma.user.update({
        where :{
            id : parseInt(req.params.id)
        },
        data : {
            firstName,
            LastName,
            email,
            password,
        },
    });
    console.log(user);
    res.send("User Updated Successfully");
})

export default router;