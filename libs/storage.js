import multer from 'multer';

const storage = multer.diskStorage({

    destination: function(req, file, cd){
        cd(null, './storage/imgs');
    },

    filename: function(req, file, cd){
        cd(null, `${file.fieldname}-${Date.now()}`);
    }
});

const upload = multer({ storage });

export default upload;