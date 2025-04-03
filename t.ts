import { MezonClient, Events, ChannelMessage } from "mezon-sdk";

const client = new MezonClient(process.env.MEZON_APPLICATION_TOKEN);
(async () => {
  console.log(await client.authenticate());
  client.on(Events.ChannelMessage, (message: ChannelMessage) => {
    console.log(message);
    if (message.content.t?.startsWith("*avatar")) {
      const target_user = message.references?.[0];
      client.sendMessage(
        message.clan_id!,
        message.channel_id,
        2,
        true,
        {},
        undefined,
        [
          {
            filename: "image.png",
            size: 23799,
            url: target_user?.mesages_sender_avatar,
            filetype: "image/png",
            width: 82,
            height: 108,
          },
        ]
      );
    }
  });
})();
