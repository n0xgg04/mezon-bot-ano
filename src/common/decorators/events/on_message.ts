import { ChannelMessage, Events } from "mezon-sdk";
import { ReflectKeys } from "../constants";

export function OnMessage(
  filter: string,
  matcher: (a: string, b: string) => boolean
): MethodDecorator {
  return (target: any, propertyKey: string | Symbol) => {
    const events = Reflect.getMetadata(ReflectKeys.EVENTS, target) || [];

    events.push({
      on: Events.ChannelMessage,
      callback: (message: ChannelMessage) => {
        if (!message.content.t) return;
        if (matcher(message.content.t, filter)) {
          target[propertyKey as string](message);
        }
      },
    });

    Reflect.defineMetadata(ReflectKeys.EVENTS, events, target);
    console.log("[LOADED] OnMessage named", propertyKey);
  };
}
