import { Ball } from "./ball";

export class Bet{
    constructor(
        public _id: string,
        public n_balls: number,
        public max_selection: number,
        public drum: Ball[],
        public balls_selected: Ball[],
        public result_ball: Ball,
        public input_stake: number,
        public money_alteration: number,
        public user: string
    ){};
}