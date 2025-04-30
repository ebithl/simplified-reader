import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



export const simplifyContent = async (req, res) => {
  const { text, language } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You simplify textbook content for intellectually challenged students. Translate to ${language} in simple terms.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const simplified = completion.choices[0].message.content;
    res.json({ simplified });
  } catch (error) {
    res.status(500).json({ error: "Error simplifying content" });
  }
};
