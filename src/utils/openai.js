import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const openai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default openai;
