import { MezonClient } from "mezon-sdk";

export interface WithBotEvent {
  onBotStart: (mezon?: MezonClient) => void;
}
