export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "AI function is working!" }),
  };
}
