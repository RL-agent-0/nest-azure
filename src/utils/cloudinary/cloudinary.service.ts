import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.v2.config({
            cloud_name: "dpvepjooy",
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }
    async uploadImage(imageURL: string, imgPublicId: string) {
        try {
            const imageCloudniaryURL = await cloudinary.v2.uploader.upload(imageURL, { public_id: imgPublicId })
            return imageCloudniaryURL.secure_url;
        }
        catch (error) {
            console.error(error)
            return error
        }
    }

}
