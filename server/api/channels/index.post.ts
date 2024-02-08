import { channels } from "@/server/models";

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);

  try {
    const channelData = await channels.findOne({
      name,
    });

    if (channelData) {
      event.res.statusCode = 409;

      return {
        code: "CHANNEL_EXISTS",
        message: "Channel with given name already exists.",
      };
    } else {
      const newChannelData = await channels.create({
        name,
        users_connected: [],
      });

      return {
        id: newChannelData._id,
        name: newChannelData.name,
        users_connected: newChannelData.users_connected,
      };
    }
  } catch (err) {
    event.res.statusCode = 500;

    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});
