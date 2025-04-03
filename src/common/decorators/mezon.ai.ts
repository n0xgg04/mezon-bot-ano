import { MezonClient } from "mezon-sdk";
import "reflect-metadata";
import { ReflectKeys } from "./constants";

export function MezonBot(key: string): ClassDecorator {
  return (target: any) => {
    target.prototype.mezon = new MezonClient(key);
  };
}

export async function startBot(target: any) {
  const mezon = target.prototype.mezon;

  const instance = new target();
  const metadata = Reflect.getMetadata(ReflectKeys.EVENTS, instance);
  if (await mezon.authenticate()) {
    instance.onBotStart(mezon);
  } else {
    throw new Error("Failed to authenticate");
  }

  for (const event of metadata) {
    mezon.on(event.on, event.callback);
  }
  console.log("[LOADED] Events loaded");
}
