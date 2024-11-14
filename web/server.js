const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const PORT = 3002; // 웹소켓 포트 번호 설정

// 웹소켓 서버 설정
const wss = new WebSocket.Server({ port: PORT });
console.log(`WebSocket server is running on ws://localhost:${PORT}`); // 서버 포트 표시

const port = new SerialPort({ path: "COM6", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  parser.on("data", (data) => {
    const trimmedData = data.trim();
    console.log("Received from Arduino:", trimmedData);

    // 특정 센서 카운트를 인식하여 전송
    if (trimmedData.startsWith("Kick Count:")) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(trimmedData); // "Kick Count: X" 전송
        }
      });
    } else if (trimmedData.startsWith("Cymbal Count:")) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(trimmedData); // "Cymbal Count: Y" 전송
        }
      });
    } else if (trimmedData.startsWith("High Tom Count:")) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(trimmedData); // "High Tom Count: Z" 전송
        }
      });
    } else {
      console.warn("Unknown data format:", trimmedData);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});
