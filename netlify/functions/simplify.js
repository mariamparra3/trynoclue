import OpenAI from "openai";

export default async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "No text provided." });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Simplify the user's text so a 5th grader can understand it."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const simplifiedText = completion.choices[0].message.content;

    return res.status(200).json({ message: simplifiedText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};
