import Client from "socket.io-client";

const createSocket = async (accessToken: any) => {
  const clientSocket = Client("http://192.168.43.164:3000", {
    auth: { token: "barrer " + accessToken },
  });
  await clientSocketConnect(clientSocket);
  return clientSocket
};

const clientSocketConnect = (clientSocket: any): Promise<string> => {
  return new Promise((resolve) => {
    clientSocket.on("connect", () => {
      console.log("===> Connected to socket server");
      resolve("1");
    });
  });
};

export default createSocket