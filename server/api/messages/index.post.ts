import { messages } from "@/server/models";

export default defineEventHandler(async (event) => {
  const { content, author_name, channel_id } = await readBody(event);

  try {
    const newMessageData = await messages.create({
      content,
      author_name,
      channel_id,
    });

    return {
      id: newMessageData._id,
      content: newMessageData.content,
      author_name: newMessageData.author_name,
      channel_id: newMessageData.channel_id,
      created_at: newMessageData.createdAt,
    };
  } catch (err) {
    event.res.statusCode = 500;

    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});
