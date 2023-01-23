import { down, left, mouse, up, right, straightTo } from "@nut-tree/nut-js";
import { DrowActions } from "./types";

const drawRectangle = async (width: number, heght: number) => {
  await mouse.drag(right(width));
  await mouse.drag(down(heght));
  await mouse.drag(left(width));
  await mouse.drag(up(heght));
};

const DrawService = async (command: DrowActions, values: number[]) => {
    const [width, heght] = values;
    const { x, y } = await mouse.getPosition();

    if (command === DrowActions.CUBE) {

        await drawRectangle(width, heght);
        return command;

    } else if (command === DrowActions.RECT) {

        await drawRectangle(width, heght);
        return command;

    } else if (DrowActions.CIRCLE) {

        const cx = x - width;
        const cy = y;
      
        const round = [];
        for (let i = 0; i <= 360; i++) {
          const x = cx + width * Math.cos((i * Math.PI) / 180);
          const y = cy + width * Math.sin((i * Math.PI) / 180);
      
          round.push({ x, y });
        }
      
        await mouse.drag(round);
        await mouse.drag(straightTo({ x, y })); 
        
        return command;

    } else return "";
};

export { DrawService }