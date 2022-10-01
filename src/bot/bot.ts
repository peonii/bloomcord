import { Client, ClientOptions, Collection } from 'discord.js';
import { DiscordEvent } from './event';

export const events: Array<DiscordEvent> = [];

export class Bot {
    client: Client;
    token: string;
    commands: Collection<string, any>

    constructor(options: ClientOptions) {
        this.client = new Client(options);
        this.token = "";
        this.commands = new Collection();
    }

    public setToken(token: string) {
        this.token = token;
        return this
    }

    public run() {
        this.registerEvents();
        this.client.login(this.token);
    }

    private registerEvents() {
        for (const event of events) {
            this.client[event.once ? 'once' : 'on'](event.name, (...args) => event.execute(this, ...args));
        }
    }
}