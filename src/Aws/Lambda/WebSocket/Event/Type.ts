export type AwsLambdaWebSocketConnectEvent = {
	requestContext: {
		eventType: "CONNECT",
		stage: string
		domainName: string,
		connectionId: string,
	},
	isBase64Encoded: boolean
}

export type AwsLambdaWebSocketDisconnectEvent = {
	requestContext: {
		eventType: "DISCONNECT",
		stage: string
		domainName: string,
		connectionId: string,
	},
	isBase64Encoded: boolean
}

export type AwsLambdaWebSocketMessageEvent = {
	requestContext: {
		eventType: "MESSAGE",
		stage: string
		domainName: string,
		connectionId: string,
	},
	isBase64Encoded: boolean
	body: string
}

export type AwsLambdaWebSocketEvent =
	AwsLambdaWebSocketConnectEvent |
	AwsLambdaWebSocketMessageEvent |
	AwsLambdaWebSocketDisconnectEvent;