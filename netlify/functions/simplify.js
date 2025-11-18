import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const text = body.text;

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No text provided." })
      };
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Simplify the user's text." },
        { role: "user", content: text }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        simplified: response.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
        details: error.message
      })
    };
  }
}
