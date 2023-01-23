const enum NavActions {
    UP = "mouse_up",
    DOWN = "mouse_down",
    LEFT = "mouse_left",
    RIGHT = "mouse_right",
    POSITION = "mouse_position",
}

const enum DrowActions {
    CIRCLE = "draw_circle",
    RECT = "draw_rectangle",
    CUBE = "draw_square",
}

type Actions = NavActions | DrowActions;

export { NavActions, DrowActions, Actions }