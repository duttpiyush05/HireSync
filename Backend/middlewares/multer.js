const multer = require("multer");
const path = require("path");

const createUpload = (folder, allowedMimeTypes, maxSize) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `../uploads/${folder}`));
        },

        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, `${Date.now()}-${file.fieldname}${ext}`);
        },
    });

    const fileFilter = (req, file, cb) => {

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }

    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        },
    });
};

const uploadProposal = createUpload("proposals", [
    "application/pdf",
], 10*1024*1024);

const uploadProfilePic = createUpload("profilePics", [
    "image/png",
    "image/jpeg",
],5*1024*1024);

module.exports = {
    uploadProposal,
    uploadProfilePic,
};