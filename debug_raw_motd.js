// Debug script to see raw Minecraft server response - with more details
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

const socket = new net.Socket();
let buffer = Buffer.alloc(0);

socket.setTimeout(10000);

socket.on('timeout', () => {
    console.error('Timeout');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error('Error:', err.message);
    socket.destroy();
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

        console.log('=== FULL RAW DESCRIPTION (stringified) ===');
        console.log(JSON.stringify(serverData.description, null, 2));

        console.log('\n=== DEEP TRACE OF ALL COMPONENTS ===');
        deepTrace(serverData.description, 0);

        socket.destroy();
    } catch (e) {
        // Need more data
    }
});

function deepTrace(comp, depth) {
    const indent = '  '.repeat(depth);

    if (typeof comp === 'string') {
        // Escape for visibility
        const escaped = JSON.stringify(comp);
        console.log(`${indent}[STRING]: ${escaped}`);
        return;
    }

    if (!comp || typeof comp !== 'object') {
        console.log(`${indent}[OTHER]: ${comp}`);
        return;
    }

    console.log(`${indent}{`);
    for (const [key, value] of Object.entries(comp)) {
        if (key === 'extra' && Array.isArray(value)) {
            console.log(`${indent}  extra: [`);
            value.forEach((child, i) => {
                console.log(`${indent}    [${i}]:`);
                deepTrace(child, depth + 3);
            });
            console.log(`${indent}  ]`);
        } else if (key === 'text') {
            console.log(`${indent}  text: ${JSON.stringify(value)}`);
        } else {
            console.log(`${indent}  ${key}: ${JSON.stringify(value)}`);
        }
    }
    console.log(`${indent}}`);
}

socket.connect(PORT, HOST, () => {
    console.log('Connected, sending handshake...');
    const handshake = createHandshakePacket(HOST, PORT);
    const statusRequest = createStatusRequestPacket();
    socket.write(handshake);
    socket.write(statusRequest);
});
