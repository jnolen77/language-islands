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

Generate 6 short, beginner-level sentences in ${language} that this person might use in the topic. After each sentence, include the English translation in parentheses. Do not number the sentences or use bullet points.

`;

const chatResponse = await openaiClient.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `You are a language tutor. Generate exactly 6 short beginner-level sentences in ${language}. Each sentence must be followed by its English translation in parentheses. Do not number or use bullet points. Format: "Sentence in ${language}. (English translation)"`,
    },
    {
      role: "user",
      content: `The user is learning German. Topic: At a restaurant.`,
    },
    {
      role: "assistant",
      content: `Ich hätte gern einen Kaffee. (I would like a coffee.)
Wo ist die Toilette? (Where is the bathroom?)
Können wir bezahlen, bitte? (Can we pay, please?)
Die Rechnung, bitte. (The bill, please.)
Das Essen ist sehr lecker. (The food is very delicious.)
Haben Sie einen Tisch frei? (Do you have a table available?)`,
    },
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.7,
  max_tokens: 300,
});


  return chatResponse.choices[0].message.content;
}

module.exports = generateIsland;
