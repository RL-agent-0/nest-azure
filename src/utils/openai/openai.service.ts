import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
@Injectable()
export class OpenaiService {
    private numberOfWords = 100;
    private openai;
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async createCompletion() {
        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write me a blog about a random topic in a json format with these fields: 
            title, description, content, createdAt and author which is an imaginary author name,
             where the length of the content is ${this.numberOfWords} words or more`,
            temperature: 0.7,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return completion?.data.choices?.[0]?.text;
    }
    async generateImage(title: string) {
        const imageTypes = ['digital art', 'by Leonardo davinci', 'Oil painting ', 'Unreal futuristic'];
        const randomIndex = Math.floor(Math.random() * imageTypes.length);
        const randomString = imageTypes[randomIndex];
        const response = await this.openai.createImage({
            prompt: title ? title : "Cool random picture, " + randomString,
            n: 1,
            size: "512x512",
        })
        return response.data.data[0].url;
    }
}