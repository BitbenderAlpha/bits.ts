import { Result } from "../../Result/Result";
import { CliCommand } from "./Command";

/**
 * This could use some locking-down. But it hits 80% of use cases and meets my current needs.
 */
export class CliCommandParser {

	public parse(unparsedCommand: string, name: string = 'CliCommandParser.parse input'): Result<CliCommand, string> {

		const [commandName, ...parameters] = 
			unparsedCommand.trim().replace(/\s+/g,' ').split(' ');

		if (commandName === void 0) {
			return Result.Failure(`${name} did not contain a valid command name`)
		}

		const keyedParameters: Record<string,string|true> = {}
		const orderedParameters: string[] = []
		for (const parameter of parameters) {
			if (!parameter.startsWith('-')) {
				orderedParameters.push(parameter);
				continue;
			}
			const [key, value] = parameter.replace(/^-+/,'').split('=')
			keyedParameters[key as string] = value || true;
		}

		return Result.Success(
			new CliCommand(
				commandName,
				keyedParameters,
				orderedParameters,
			),
		);
	}

}