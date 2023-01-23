import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { NavActions } from "./types";

const NavService = async (action: NavActions, value: number) => {
    if (NavActions.UP) {
        await mouse.move(up(value));
        return action;
    } else if (NavActions.DOWN) {
        await mouse.move(down(value));
        return action;
    } else if (NavActions.RIGHT) {
        await mouse.move(right(value));
        return action;
    } else if (NavActions.LEFT) {
        await mouse.move(left(value));
        return action;
    } else if (NavActions.POSITION) {
        const { x, y } = await mouse.getPosition();
        return `${action} ${x}px,${y}px`;
    } else return ""
};

export { NavService }