require("dotenv").config();
const OpenAI = require("openai");

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateIsland({
  name,
  age,
  city,
  profession,
  relationship,
  language,
  topic,
  likes,
  dislikes,
}) {
  const details = [];
  if (name) details.push(`- Name: ${name}`);
  if (age) details.push(`- Age: ${age}`);
  if (city) details.push(`- City: ${city}`);
  if (profession) details.push(`- Profession: ${profession}`);
  if (relationship) details.push(`- Relationship status: ${relationship}`);
  if (likes) details.push(`- Likes: ${likes}`);
  if (dislikes) details.push(`- Dislikes: ${dislikes}`);

  const userProfile = details.length
    ? `The learner provided:\n${details.join("\n")}`
    : `No personal details were provided.`;

  const topicLine = topic
    ? `Topic: ${topic}.`
    : `Create a general beginner scenario.`;

  const mustUseName = name
    ? `If a name is provided ("${name}"), use it naturally in **at least 3** of the 6 sentences (e.g., introductions, requests, or clarifications). Do **not** overuse it (max once per sentence).`
    : `No name provided—do not invent one.`;

  const prompt = `
You are a tutor generating beginner ${language} sentences.

${userProfile}

${topicLine}

Requirements:
- Output **6** short, beginner-friendly sentences in ${language}.
- After **each** sentence, include the English translation in parentheses on the **same line**.
- Do **not** number or bullet the sentences.
- Keep each sentence under ~12 words where possible.
- Use common, practical phrases for the scenario.
- ${mustUseName}
- If a city/profession/relationship is given, reference them naturally once or twice.
- Avoid slang and complex grammar.

Good examples (for German, pretend the name is Alex):
Ich heiße Alex. (My name is Alex.)
Ich komme aus München. (I am from Munich.)
Ich suche einen Tisch für zwei, bitte. (I’m looking for a table for two, please.)
`;

  const chatResponse = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo", // change model here
    messages: [
      { role: "system", content: "You produce clean, concise language-learning examples." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 350,
  });

  return chatResponse.choices[0].message.content;
}

module.exports = generateIsland;
