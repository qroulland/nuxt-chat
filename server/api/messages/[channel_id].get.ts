import { messages, channels } from "@/server/models";

export default defineEventHandler(async (event) => {
  const channelId = event.context.params.channel_id;

  try {
    const channelData = await channels.findOne({
      _id: channelId,
    });

    if (channelData) {
      const messagesData = await messages.find({
        channel_id: channelId,
      });

      return messagesData.map((message) => ({
        id: message._id,
        content: message.content,
        author_name: message.author_name,
        channel_id: message.channel_id,
        created_at: message.createdAt,
      }));
    } else {
      event.res.statusCode = 404;
      
      return {
        code: "CHANNEL_NOT_FOUND",
        message: `Channel with id ${channelId} doesn't exists.`,
      };
    }
  } catch (err) {
    event.res.statusCode = 500;

    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
