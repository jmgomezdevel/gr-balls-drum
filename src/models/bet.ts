import { Ball } from "./ball";

export interface Bet{
    id: string,
    n_balls: number,
    max_selection: number,
    drum: Ball[],
    balls_selected: Ball[],
    result_ball: Ball,
    input_stake: number,
    money_alteration: number,
    user: string
}