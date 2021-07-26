import { Channel } from "./Channel";
import { TimeDuration } from "../Time/Duration";

const tenMs = TimeDuration.FromNumberOfMilliseconds(10).orDie();

describe('Channel', () => {

	test('Basic Usage', async () => {
		// Arrange
		let output = '';
		const channel = new Channel<string>();
		const publisher = channel.getPublisher();
		const pub = (m: string) => publisher.publish(m);
		async function sub(n: string) {
			for await (const m of channel.getSubscriber()) {
				await tenMs.wait();
				output += (n + m); 
			}
		};

		// Act
		sub('0');
		sub('1');
		sub('2');
		await pub('a');
		await pub('b');
		await pub('c');

		// Assert
		expect(channel.subscriberCount).toBe(3);
		expect(output).toBe('0a1a2a0b1b2b0c1c2c');
	});

	test('Throw in sub loop', async () => {
		// Arrange
		let output = '';
		const channel = new Channel<string>();
		const publisher = channel.getPublisher();
		const pub = (m: string) => publisher.publish(m);
		async function sub(n: string) {
			try {
				for await (const m of channel.getSubscriber()) {
					if (n === '1' && m === 'b') throw new Error('oops!');
					await tenMs.wait();
					output += (n + m); 
				}
			} catch (e) {}
		};

		// Act
		sub('0');
		sub('1');
		sub('2');
		await pub('a');
		await pub('b');
		await pub('c');

		// Assert
		expect(channel.subscriberCount).toBe(2);
		expect(output).toBe('0a1a2a0b2b0c2c');
	});

	test('Break in sub loop', async () => {
		// Arrange
		let output = '';
		const channel = new Channel<string>();
		const publisher = channel.getPublisher();
		const pub = (m: string) => publisher.publish(m);
		async function sub(n: string) {
			try {
				for await (const m of channel.getSubscriber()) {
					if (n === '1' && m === 'b') break;
					await tenMs.wait();
					output += (n + m); 
				}
			} catch (e) {}
		};

		// Act
		sub('0');
		sub('1');
		sub('2');
		await pub('a');
		await pub('b');
		await pub('c');

		// Assert
		expect(channel.subscriberCount).toBe(2);
		expect(output).toBe('0a1a2a0b2b0c2c');
	});

	test('Tolerates abuse from impatient senders', async () => {
		// Arrange
		let output = '';
		const channel = new Channel<string>();
		const publisher = channel.getPublisher();
		const pub = (m: string) => publisher.publish(m);
		async function sub(n: string) {
			for await (const m of channel.getSubscriber()) {
				await tenMs.wait();
				output += (n + m); 
			}
		};

		// Act
		Array.from('01234').map(sub);
		await Promise.all(Array.from('abcdefghij').map(pub));
		
		// Assert
		expect(channel.subscriberCount).toBe(5);
		expect(output).toBe(
			'0a1a2a3a4a0b1b2b3b4b0c1c2c3c4c0d1d2d3d4d0e1e2e3e4e0f1f2f3f4f0g1g2g3g4g0h1h2h3h4h0i1i2i3i4i0j1j2j3j4j'
		);
	});

});