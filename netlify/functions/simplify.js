import OpenAI from "openai";

export default async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "No text provided" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Simplify this text so a 6th grader can understand it: ${text}`
        }
      ]
    });

    const simplified = response.choices[0].message.content;

    res.status(200).json({ message: simplified });

  } catch (err) {
    res.status(500).json({ message: "Error processing request" });
  }
};
