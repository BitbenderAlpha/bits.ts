import { CliCommand } from "../../../../Cli/Command/Command";

export interface ChatBotCommandHandlerInterface {
	handle(command: CliCommand, senderDisplayName: string): AsyncIterable<string>;
}