// Debug script to see raw Minecraft server response - MULTIPLE ATTEMPTS to catch dynamic content
const net = require('net');

const HOST = 'tw-edge2.vproxy.cloud';
const PORT = 20004;
const PROTOCOL_VERSION = 767;

function writeVarInt(value) {
    const bytes = [];
    while (true) {
        if ((value & ~0x7f) === 0) {
            bytes.push(value);
            break;
        }
        bytes.push((value & 0x7f) | 0x80);
        value >>>= 7;
    }
    return Buffer.from(bytes);
}

function readVarInt(buffer, offset) {
    let value = 0;
    let length = 0;
    let currentByte;

    do {
        if (offset + length >= buffer.length) {
            throw new Error('VarInt too short');
        }
        currentByte = buffer[offset + length];
        value |= (currentByte & 0x7f) << (length * 7);
        length++;
        if (length > 5) {
            throw new Error('VarInt too long');
        }
    } while ((currentByte & 0x80) !== 0);

    return { value, length };
}

function createHandshakePacket(host, port) {
    const hostBuffer = Buffer.from(host, 'utf8');
    const data = Buffer.concat([
        writeVarInt(PROTOCOL_VERSION),
        writeVarInt(hostBuffer.length),
        hostBuffer,
        Buffer.from([port >> 8, port & 0xff]),
        writeVarInt(1),
    ]);

    const packetId = writeVarInt(0x00);
    const packetLength = writeVarInt(packetId.length + data.length);

    return Buffer.concat([packetLength, packetId, data]);
}

function createStatusRequestPacket() {
    const packetId = writeVarInt(0x00);
    const packetLength = writeVarInt(packetId.length);
    return Buffer.concat([packetLength, packetId]);
}

async function queryServer() {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        let buffer = Buffer.alloc(0);

        socket.setTimeout(10000);

        socket.on('timeout', () => {
            socket.destroy();
            reject(new Error('Timeout'));
        });

        socket.on('error', (err) => {
            socket.destroy();
            reject(err);
        });

        socket.on('data', (data) => {
            buffer = Buffer.concat([buffer, data]);

            try {
                let offset = 0;
                const packetLengthResult = readVarInt(buffer, offset);
                offset += packetLengthResult.length;
                const packetLength = packetLengthResult.value;

                if (buffer.length < offset + packetLength) {
                    return;
                }

                const packetIdResult = readVarInt(buffer, offset);
                offset += packetIdResult.length;

                const jsonLengthResult = readVarInt(buffer, offset);
                offset += jsonLengthResult.length;
                const jsonLength = jsonLengthResult.value;

                if (buffer.length < offset + jsonLength) {
                    return;
                }

                const jsonString = buffer.subarray(offset, offset + jsonLength).toString('utf8');
                const serverData = JSON.parse(jsonString);

                socket.destroy();
                resolve(serverData.description);
            } catch (e) {
                // Need more data
            }
        });

        socket.connect(PORT, HOST, () => {
            const handshake = createHandshakePacket(HOST, PORT);
            const statusRequest = createStatusRequestPacket();
            socket.write(handshake);
            socket.write(statusRequest);
        });
    });
}

async function main() {
    console.log('Querying server 5 times to catch dynamic MOTD variations...\n');

    for (let i = 0; i < 5; i++) {
        try {
            const desc = await queryServer();
            console.log(`\n=== Query ${i + 1} ===`);
            console.log(JSON.stringify(desc, null, 2));

            // Wait 2 seconds between queries
            await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
            console.error(`Query ${i + 1} failed:`, e.message);
        }
    }
}

main();
