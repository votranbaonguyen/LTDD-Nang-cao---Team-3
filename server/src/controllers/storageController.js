const { CustomError } = require('../utils/CustomError');
const { supabaseUrl, supabase } = require('../utils/supabase');

const uploadResource = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new CustomError('Please choose a file from your device!', 400));
        }

        const fileType = req.file.mimetype;
        const fileName = `${Date.now()}_${req.file.originalname}`
            .replace(/\s/g, '')
            .replaceAll('/', '');
        const filePath = `${supabaseUrl}/storage/v1/object/public/classroom/reference/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('classroom/reference')
            .upload(fileName, req.file.buffer, { contentType: fileType });

        if (uploadError) {
            return new CustomError('Error when upload file', 500);
        }

        res.status(201).send({
            status: 'ok',
            data: {
                filePath,
            },
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

//
module.exports = {
    uploadResource,
};
