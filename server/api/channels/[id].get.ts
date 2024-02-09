import { channels } from "@/server/models";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    const channelData = await channels.findOne({
      _id: id,
    });

    if (channelData) {
      return {
        id: channelData._id,
        name: channelData.name,
      };
    } else {
      event.res.statusCode = 404;

      return {
        code: "CHANNEL_NOT_FOUND",
        message: `Channel with id ${id} doesn't exists.`,
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
