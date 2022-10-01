import { Bot, events } from './bot';

export class DiscordEvent {
    name: string;
    once: boolean;

    constructor(name: string, once: boolean) {
        this.name = name;
        this.once = once;
    }

    async execute(bot: Bot, ...args: any[]) {
        console.log('Bot: ' + bot + ' Args: ' + args);
        throw new Error(`The execute method has not been implemented in ${this.name}`);
    }
}

export function RegisterEvent(name: string, once = false) {
    return function (target: any) {
        const event: DiscordEvent = new target(name, once);
        events.push(event);
    }
}