import { httpServer } from "./src/http_server/index";

import { createWebSocketStream, WebSocketServer } from "ws";
// import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { NavActions, DrowActions, Actions } from "./src/types";
import { NavService } from "./src/navigate";
import { DrawService } from "./src/drow";

const HTTP_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start http server on the ${HTTP_PORT} port!`);
});

const SOCET_PORT = 4000;

const wSocet = new WebSocketServer({ port: SOCET_PORT });

wSocet.on("listening", () => {
  console.log(`The WebSocket is running on port ${SOCET_PORT}`);
});

wSocet.on("connection", async (socet) => {
  const wsStream = createWebSocketStream(socet, {
    encoding: "utf-8",
    decodeStrings: false,
  });

  wsStream.on("data", async (chunk) => {
    const [action, ...args] = chunk.toString().split(" ");

    const values = args.map(Number);

    let output = "";

    if (action === NavActions.UP || action === NavActions.DOWN || action === NavActions.LEFT || action === NavActions.RIGHT || action === NavActions.POSITION) {
        output = await NavService(action, values[0]);
    }

    if (action === DrowActions.CIRCLE || action === DrowActions.RECT || action === DrowActions.CUBE) {
      output = await DrawService(action, values);
    }

    wsStream.write(chunk);
  });

  socet.on("close", () => {
    wsStream.destroy();
    console.log("Connection was ended");
  });

  wSocet.on("close", () => {
    wsStream.destroy();
    console.log("WebSocket was stopped!");
  });
});
