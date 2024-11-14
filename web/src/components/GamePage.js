import React, { useState } from "react";

const GamePage = () => {
  const [kickCount, setKickCount] = useState(0);
  const [cymbalCount, setCymbalCount] = useState(0);
  const [highTomCount, setHighTomCount] = useState(0);
 // eslint-disable-next-line no-unused-vars
const [port, setPort] = useState(null);


  const connectToSerial = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      console.log("Connected to serial port");
  
      // 데이터 읽기
      const reader = selectedPort.readable.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          break;
        }
        const data = new TextDecoder().decode(value);
        processSerialData(data);
      }
    } catch (error) {
      console.error("Error connecting to serial port:", error);
    }
  };
  

  const processSerialData = (data) => {
    // 받은 데이터 처리
    if (data.includes("Kick Count:")) {
      setKickCount((prev) => prev + 1);
    } else if (data.includes("Cymbal Count:")) {
      setCymbalCount((prev) => prev + 1);
    } else if (data.includes("High Tom Count:")) {
      setHighTomCount((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h1>Game Page</h1>
      <button onClick={connectToSerial}>Connect to Arduino</button>
      <h2>Kick Count: {kickCount}</h2>
      <h2>Cymbal Count: {cymbalCount}</h2>
      <h2>High Tom Count: {highTomCount}</h2>
    </div>
  );
};

export default GamePage;
