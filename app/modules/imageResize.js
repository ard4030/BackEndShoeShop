const sharp = require('sharp')
const fs = require('fs')

exports.ImageResize= async (req, res, next) => {
    if (req.file) {
        const file = req.file
        const output = file.destination + '/' + 'modified-' + file.filename
        const resized = await sharp(file.path)
            .resize(500, 500)
            .toFile(output)
        // .png({ quality: 90 })
        // .jpeg({quality: 50})

        if (resized) {
            fs.unlink(req.file.path, () => { })    
            req.body.image = output.substring(0)
        } else {
            req.flash('errors', 'خطا در ویرایش تصویر')
            return res.redirect(req.headers['referer'])
        }
    }
    next()
}