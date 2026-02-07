import express, { type Request } from "express";
import {
  wishlistController,
  contactController,
  contactUpload,
} from "../controllers/mailController.ts";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

// Create an Express Router instance
const routes = express.Router();

routes.post("/wishlist", wishlistController);
routes.post("/contact", contactUpload, contactController);

export default routes;
