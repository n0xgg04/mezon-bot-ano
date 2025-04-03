import { MezonBot, startBot } from "./common/decorators/mezon.ai";
import { OnMessage } from "./common/decorators/events";
import { Filter } from "./common/decorators/filter";
import { AvatarModule } from "./features/avatar/avatar.module";
import { Module } from "./common/decorators/core";
import { WithBotEvent } from "./common/interfaces/withBotEvent";
import { MezonClient } from "mezon-sdk";

@MezonBot(process.env.MEZON_APPLICATION_TOKEN!)
@Module({
  imports: [AvatarModule],
})
class Mezon implements WithBotEvent {
  onBotStart(mezon: MezonClient) {
    console.log("BOT STARTED");
  }

  @OnMessage("*avatar", Filter.CONTAINS)
  avatar(message: any) {
    console.log(message);
  }
}

(async () => startBot(Mezon))();
