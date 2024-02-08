import { channels } from "@/server/models";

export default defineEventHandler(async (event) => {
  try {
    const channelsData = await channels.find().limit(5);

    return channelsData.map((channel) => ({
      id: channel._id,
      name: channel.name,
      users_connected: channel.users_connected,
    }));
  } catch (err) {
    event.res.statusCode = 500;

    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
