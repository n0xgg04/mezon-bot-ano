import { globalMezon, MezonBot, startBot } from "./common/decorators/mezon.ai";
import { OnMessage } from "./common/decorators/events";
import { Filter } from "./common/decorators/filter";
import { AvatarModule } from "./features/avatar/avatar.module";
import { Module } from "./common/decorators/core";
import { WithBotEvent } from "./common/interfaces/withBotEvent";

@MezonBot(process.env.MEZON_APPLICATION_TOKEN!)
@Module({
  imports: [AvatarModule],
})
class Mezon implements WithBotEvent {
  onBotStart() {
    console.log("BOT STARTED");
  }

  @OnMessage("*hi", Filter.CONTAINS)
  hi(message: any) {
    globalMezon.sendMessage(
      message.clan_id,
      message.channel_id,
      2,
      true,
      {
        t: "hi",
      },
      undefined,
      undefined,
      [
        {
          message_id: message.references?.[0]?.id,
        },
      ]
    );
  }

  @OnMessage("*hpbd", Filter.CONTAINS)
  hpbd(message: any) {
    globalMezon.sendMessage(
      message.clan_id,
      message.channel_id,
      2,
      true,
      {
        t: "Happy birthday to you 🎂",
      },
      undefined,
      undefined,
      [
        {
          message_id: message.references?.[0]?.id,
        },
      ]
    );
  }

  @OnMessage("*avatar", Filter.CONTAINS)
  avatar(message: any) {
    globalMezon.sendMessage(
      message.clan_id,
      message.channel_id,
      2,
      true,
      {},
      undefined,
      [
        {
          filename: "image.png",
          size: 23799,
          url: message.references?.[0]?.mesages_sender_avatar,
          filetype: "image/png",
          width: 208,
          height: 208,
        },
      ]
    );
  }
}

(async () => startBot(Mezon))();
