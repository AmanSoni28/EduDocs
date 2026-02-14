import { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPdf, deletePdf, getAllPdfs, getCurrentUserUploads, searchPdfs, updatePdf } from "../controllers/pdf.controller.js";

const pdfRouter = Router();

// POST /api/pdfs - upload a pdf with metadata
pdfRouter.post("/upload", isAuth, upload.single("fileUrl"), createPdf);
pdfRouter.get("/getallpdfs", getAllPdfs);
pdfRouter.get("/search", isAuth, searchPdfs);
pdfRouter.get("/my-uploads", isAuth, getCurrentUserUploads);
pdfRouter.patch("/update/:id", isAuth, upload.single("fileUrl"), updatePdf);
pdfRouter.delete("/delete/:id", isAuth, deletePdf);

export default pdfRouter;