import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  subject: {
        type:String,
        required:true
    },
  className: {
        type:String,
        required:true
    },
  school: {
        type:String,
        required:true
    },
  fileUrl: {
        type:String
    },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{ timestamps: true });

export const Pdf = mongoose.model("Pdf", pdfSchema);