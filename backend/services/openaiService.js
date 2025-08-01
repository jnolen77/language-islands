require("dotenv").config();
const OpenAI = require("openai");

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateIsland({
  age,
  city,
  profession,
  relationship,
  language,
  topic,
  likes,
  dislikes,
}) {
  const userDetails = [];

  if (age) userDetails.push(`- Age: ${age}`);
  if (city) userDetails.push(`- City: ${city}`);
  if (profession) userDetails.push(`- Profession: ${profession}`);
  if (relationship) userDetails.push(`- Relationship status: ${relationship}`);
  if (likes) userDetails.push(`- Likes: ${likes}`);
  if (dislikes) userDetails.push(`- Dislikes: ${dislikes}`);

  const userProfile =
    userDetails.length > 0
      ? `The user provided the following information:\n${userDetails.join(
          "\n"
        )}`
      : `The user has not provided personal details.`;

  const topicLine = topic
    ? `Topic: ${topic}\n`
    : `Create a general language island relevant to a beginner.\n`;

  const prompt = `
You are a language tutor helping someone learn ${language}.

${userProfile}

${topicLine}

Generate 6-8 short, beginner-level sentences in ${language} that this person might use or hear. After each sentence, include the English translation.
Keep vocabulary simple and directly relevant.
`;

  const chatResponse = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return chatResponse.choices[0].message.content;
}

module.exports = generateIsland;
