import express from "express";
import login from "../controller/loginController.js";
import createAccount from "../controller/createAccountController.js";
import privateUser from "../controller/privateUserController.js";
import validateToken from "../controller/validateToken.js";

const Router = express.Router();

Router.post("/login", login);
Router.post("/register", createAccount);
Router.get("/user/:id", validateToken, privateUser);

export { Router };
