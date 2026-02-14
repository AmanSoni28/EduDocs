import { Pdf } from "../models/pdf.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import { v2 as cloudinary } from "cloudinary";

const createPdf = async (req, res) => {
  try {
    const { subject, className, school } = req.body;

    if (!subject || !className || !school) {
      return res.status(400).json({ message: "All metadata fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // multer stores file info on req.file
    const fileUrl = await uploadOnCloudinary(req.file.path);

    if (!fileUrl) {
      return res.status(500).json({ message: "Failed to upload file to cloud storage" });
    }

    const pdf = await Pdf.create({
      subject,
      className,
      school,
      fileUrl,
      uploadedBy: req.userId,
    });

     // Clear cache after upload
    await redis.flushall();


    const populatedPdf = await pdf.populate("uploadedBy", "name email role");

    return res.status(201).json({ pdf: populatedPdf, message: "PDF uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Create PDF error: ${error} `});
  }
};

const searchPdfs = async (req, res) => {
  try {
    const { subject, className, school } = req.query;

    // Unique cache key
    const cacheKey = `pdfs:${subject || ""}:${className || ""}:${school || ""}`;

    // 1. Check cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({
        source: "cache",
        pdfs: cached,
      });
    }

    // Dynamic filter object
    const filter = {};

    if (subject) {
      filter.subject = { $regex: subject, $options: "i" }; // case-insensitive
    }

    if (className) {
      filter.className = { $regex: className, $options: "i" };
    }

    if (school) {
      filter.school = { $regex: school, $options: "i" };
    }

    const pdfs = await Pdf.find(filter)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    // 3. Save in Redis (10 minutes)
    await redis.set(cacheKey, pdfs, { ex: 600 });

    return res.status(200).json({
      count: pdfs.length,
      pdfs,
      message: "Search results fetched successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: `Search error: ${error.message}`,
    });
  }
};

const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find()
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json(pdfs);

  } catch (error) {
    console.error("Get PDFs Error:", error);
    return res.status(500).json({
      message: "Server error while fetching PDFs"
    });
  }
};


// Get PDFs uploaded by current user
const getCurrentUserUploads = async (req, res) => {
  try {
    const userId = req.userId; 

    const myPdfs = await Pdf.find({ uploadedBy: userId })
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json( myPdfs );
  } catch (error) {
    return res.status(500).json({
      message: `Get my uploads error: ${error.message}`,
    });
  }
};


const updatePdf = async (req, res) => {
  try {
    const pdfId = req.params.id;
    const userId = req.userId;

    const { subject, className, school } = req.body;

    // 1. Find PDF
    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // 2. Check ownership (security)
    if (pdf.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized to edit this PDF",
      });
    }

    // 3. Update metadata
    if (subject) pdf.subject = subject;
    if (className) pdf.className = className;
    if (school) pdf.school = school;

    // 4. If new file uploaded
    if (req.file) {
      // Delete old file from Cloudinary
      if (pdf.fileUrl) {
        const publicId = pdf.fileUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // EduDocs/filename

        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      }

      // Upload new file
      const newFileUrl = await uploadOnCloudinary(req.file.path);

      if (!newFileUrl) {
        return res.status(500).json({
          message: "Failed to upload new PDF",
        });
      }

      pdf.fileUrl = newFileUrl;
    }

    await pdf.save();

    // 5. Clear Redis cache
    await redis.flushall();

    const updatedPdf = await pdf.populate("uploadedBy", "name email");

    return res.status(200).json({
      message: "PDF updated successfully",
      pdf: updatedPdf,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Update PDF error: ${error.message}`,
    });
  }
};


const deletePdf = async (req, res) => {
  try {
    const pdfId = req.params.id;
    const userId = req.userId;

    // 1. Find PDF
    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // 2. Ownership check
    if (pdf.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized to delete this PDF",
      });
    }

    // 3. Delete from Cloudinary
    if (pdf.fileUrl) {
      // Extract public_id
      const publicId = pdf.fileUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0]; // EduDocs/filename

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    // 4. Delete from MongoDB
    await Pdf.findByIdAndDelete(pdfId);

    // 5. Clear Redis cache
    await redis.flushall();

    return res.status(200).json({
      message: "PDF deleted successfully",
      deletedId: pdfId,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Delete PDF error: ${error.message}`,
    });
  }
};

export { createPdf, getAllPdfs, searchPdfs, getCurrentUserUploads, updatePdf, deletePdf };



//redis code is added to createPdf and searchPdfs to clear cache after upload and to check cache before searching. 
