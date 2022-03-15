import { Injectable, EventEmitter } from "@angular/core";
import { Ball } from "src/models/ball";
import { Bet } from "src/models/bet";
import { User } from "src/models/user";

// RxJS
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public user: User;
    public bet: Bet;
    public state: string;

    public disabledToBet: boolean;
    public addOrDeleteBallEmitter$ = new EventEmitter<Ball>();

    public total_money: number;

    public colors: string[]

    constructor() {
        this.colors = ['red', 'yellow', 'green'];
        this.state = "ready"
        this.total_money = 0;
        this.disabledToBet = true;

        // Initialize variables with sample data. In real work, i suposse this info will come from endpoints or localStorage
        this.user = { id: "userid", email: "user_email@email.com", password: "encripted_password", name: "user_name", surname: "user_surname", wallet: 500 }
        this.bet = { id: "betid", n_balls: 0, max_selection: 0, drum: [], balls_selected: [], result_ball: { number: 0, color: '' }, input_stake: 5, money_alteration: 0, user: this.user.id }

        this.addOrDeleteBallEmitter$.subscribe(ball => {
            this.addOrDeleteBall(ball)
        })
    }


    /* This method init the game
    *
    * 1 We set the number of balls of the game
    * 2 Set the maximum balls we can select from drum
    * 3 Create balls from 1 to n_balls assigning different colors
    * 
    * @param n_balls
    * @param max_selection
    */
    public initDrum(n_balls: number, max_selection: number): void {
        const source = from([...Array(n_balls).keys()])
        const example = source.pipe(map(n => n + 1))
        example.subscribe(n => this.bet.drum.push({ number: n, color: this.colors[(n - 1) % this.colors.length] }))
        this.bet.n_balls = n_balls;
        this.bet.max_selection = max_selection;
    }

    /* This function adds a ball to the selection or adds it if it is not found. Then, disable Place bet button in order to force user to recheck if input stake is valid
    *
    * @param Ball: The ball we have to remove or add to selection
    */
    addOrDeleteBall(ball: Ball) {
        if (this.state === 'ready') {
            let index = this.bet.balls_selected.findIndex(b => b.number === ball.number && b.color === ball.color);
            if (index != -1) {
                this.bet.balls_selected.splice(index, 1)
            } else {
                if (this.bet.balls_selected.length < this.bet.max_selection) {
                    this.bet.balls_selected.push(ball)
                }
            }
            this.disabledToBet = true;
        }
    }

    /* This method check if a ball is inside the user's selection
    *
    * @input ball
    * @returns boolean
    */
    public checkBall(ball: Ball): boolean {
        return this.bet.balls_selected.some(b => b.number === ball.number && b.color === ball.color)
    }

    // This function remove all balls from selection
    public clearSelection(): void {
        this.bet.balls_selected = [];
        this.disabledToBet = true;
    }

    /* This method restart the game
    *
    * 1 Create new bet saving the previous selection
    * 2 Set the total money to 0
    * 3 Set state of the game to ready
    * 
    */
    public restartGame(): void {
        this.bet = { id: "betid", n_balls: this.bet.n_balls, max_selection: this.bet.max_selection, drum: this.bet.drum, balls_selected: this.bet.balls_selected, result_ball: { number: 0, color: '' }, input_stake: this.bet.input_stake, money_alteration: 0, user: this.user.id }
        this.state = "ready"
    }


}