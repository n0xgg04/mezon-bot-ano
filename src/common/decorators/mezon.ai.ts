import { MezonClient } from "mezon-sdk";
import "reflect-metadata";
import { ReflectKeys } from "./constants";

export let globalMezon: MezonClient;
export function MezonBot(key: string): ClassDecorator {
  return (target: any) => {
    globalMezon = new MezonClient(key);
  };
}

export async function startBot(target: any) {
  const mezon = globalMezon;

  if (await mezon.authenticate()) {
  } else {
    throw new Error("Failed to authenticate");
  }
  const instance = new target();
  const metadata = Reflect.getMetadata(ReflectKeys.EVENTS, instance);
  //Load events
  for (const event of metadata) {
    mezon.on(event.on, event.callback);
  }
  console.log("[LOADED] Events loaded");
  instance.onBotStart(mezon);
}
