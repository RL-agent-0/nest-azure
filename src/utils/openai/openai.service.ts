import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
@Injectable()
export class OpenaiService {
    private numberOfWords = 100;
    private openai;
    private topics = [
        "Programming languages and software development",
        "Science and technology news",
        "Artificial intelligence and machine learning",
        "Cybersecurity and online privacy",
        "Gaming and eSports",
        "Virtual and augmented reality",
        "Internet of Things (IoT)",
        "Cryptocurrencies and blockchain technology",
        "Health and fitness technology",
        "Space exploration and astronomy",
        "Renewable energy and sustainability",
        "Social media and digital marketing",
        "Mobile apps and mobile development",
        "Cloud computing and serverless technology",
        "Data science and analytics",
        "UI/UX design and web development",
        "E-commerce and online business",
        "Open source software and communities",
        "Podcasts and video production techniques"
    ]

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async createCompletion() {
        let randomIndex = Math.floor(Math.random() * this.topics.length);
        let randomTopic = this.topics[randomIndex];
        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write me a blog about ${randomTopic} in a json format without linebreaks, with these fields: 
            title, description, content, createdAt and author which is an imaginary author name,
             where the length of the content is ${this.numberOfWords} words or more.`,
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
            prompt: (title ? title : "Cool random picture, ") + ", " + randomString + ", pure image, artistic",
            n: 1,
            size: "512x512",
        })
        return response.data.data[0].url;
    }
}