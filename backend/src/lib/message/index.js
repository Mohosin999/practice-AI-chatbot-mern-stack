const Chat = require("../../model/Chat");
const genAI = require("../../config/gemini");
const { notFound } = require("../../utils/error");

const createMessage = async ({ userId, chatId, prompt }) => {
  // Find chat
  const chat = await Chat.findOne({ userId, _id: chatId });
  if (!chat) {
    throw notFound();
  }

  // Save user message
  chat.messages.push({
    role: "user",
    content: prompt,
    timestamp: Date.now(),
  });

  // Gemini model (TEXT ONLY)
  const model = genAI.getGenerativeModel({
    // model: "gemini-2.5-flash",
    model: "gemini-3-flash-preview",
  });

  // Generate text response
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const reply = {
    role: "assistant",
    content: text,
    timestamp: Date.now(),
  };

  // Save AI reply
  chat.messages.push(reply);
  await chat.save();

  return reply;
};

module.exports = { createMessage };
