import { BallI } from "./ball";

export interface BetI{
    id: string,
    n_balls: number,
    max_selection: number,
    drum: BallI[],
    result_ball: BallI,
    input_stake: number,
    money_alteration: number,
    user: string
}