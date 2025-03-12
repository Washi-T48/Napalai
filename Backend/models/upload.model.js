import multer from "multer"

const forgottenImageUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/forgotten/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const forgottenVideoUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/forgotten/videos');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const forgottenReturnUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/forgotten/returns');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const violenceImageUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/violence/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const violenceVideoUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/violence/videos');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const profilePictureUploader = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'protected/profiles');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const forgottenImageUpload = multer({ storage: forgottenImageUploader });
const forgottenVideoUpload = multer({ storage: forgottenVideoUploader });
const forgottenReturnUpload = multer({ storage: forgottenReturnUploader });
const violenceImageUpload = multer({ storage: violenceImageUploader });
const violenceVideoUpload = multer({ storage: violenceVideoUploader });

export {
    forgottenImageUpload,
    forgottenVideoUpload,
    forgottenReturnUpload,
    violenceImageUpload,
    violenceVideoUpload
};