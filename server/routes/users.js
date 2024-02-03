import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
/** this is used for read the information only */
router.get("/:id", verifyToken, getUser);//for user only
router.get("/:id/friends", verifyToken, getUserFriends);//for the friend list

//UPDATE
router.patch("/:id/:friends", verifyToken, addRemoveFriend); // this is used for add and remove the friend

export default router;
