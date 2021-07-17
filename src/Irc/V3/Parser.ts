import { IrcV3Message } from "./Message";

// todo: this could use some love.  I'd love for it to be more state-machine and less procedural
export class IrcV3Parser {

	public * parse(rawMessage: string): Iterable<IrcV3Message> {
		for (const line of rawMessage.split('\r\n').map(s => s.trim()).filter(Boolean)) {

			let unparsedText = line;

			// get tags
			const tags: Record<string,string> = {};
			if (unparsedText.charAt(0) === '@' && unparsedText.includes(' ')) {
				let rawTags;
				[rawTags, unparsedText] = splitOnFirstSpace(unparsedText);
				for (const tag of rawTags.slice(1).split(';')) {
					const [key, escapedValue] = tag.split('=', 2) as [string, string];

					const value =
						escapedValue
							.replace(/\\:/g, ';')    // \: --> ;
							.replace(/\\s/g, ' ')   // \s --> SPACE
							.replace(/\\\\/g, '\\')  // \\ --> \
							.replace(/\\r/g, '\r')  // \r --> CR
							.replace(/\\n/g, '\n')  // \n --> LF

					tags[key] = value;
				}
			}

			// Prefix
			let prefix = '';
			if (unparsedText.charAt(0) === ':' && unparsedText.includes(' ')) {
				let rawPrefix;
				[rawPrefix, unparsedText] = splitOnFirstSpace(unparsedText);
				prefix = rawPrefix.slice(1);
			}

			// Command
			let command;
			[command, unparsedText] = splitOnFirstSpace(unparsedText);

			// Parameters
			const parameters = [];
			while (unparsedText) {
				// Detect Trailing params
				if (unparsedText.charAt(0) === ':') {
					parameters.push(unparsedText.slice(1))
					unparsedText = ''
					break;
				}

				let param;
				[param, unparsedText] = splitOnFirstSpace(unparsedText);
				parameters.push(param);
			}

			yield new IrcV3Message(
				tags,
				prefix,
				command,
				parameters
			);
		}
	}
}

// todo: refactor away
function splitOnFirstSpace(input: string): [string, string] {
	const indexOfFirstSpace =
		input.indexOf(' ');

	if (indexOfFirstSpace === -1) {
		return [input, ''];
	}

	return [
		input.slice(0, indexOfFirstSpace),
		input.slice(indexOfFirstSpace + 1),
	];
}