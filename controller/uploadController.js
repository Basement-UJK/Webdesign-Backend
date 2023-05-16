const AWS = require('aws-sdk')
const uuid = require('uuid')
const { StatusCodes } = require('http-status-codes')
const s3 = new AWS.S3({
    signatureVersion: 'v4',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: 'eu-west-2'
})

const getURL = async (req, res) => {

    const key = `${uuid.v1()}.jpeg`

    const url = await s3.getSignedUrl('putObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ContentType: 'image/jpeg',
        Key: key,
        Expires: 60
    })

    res.status(StatusCodes.OK).json({ key: url, name: key })

}

const uploadImage = (buffer, image_name) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Body: buffer,
            Key: image_name
        }
        s3.putObject(params, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })


    })
}


module.exports = {
    getURL,
    uploadImage
}