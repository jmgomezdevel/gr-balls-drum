import { Injectable, EventEmitter } from "@angular/core";
import { BallI } from "src/models/ball";
import { BetI } from "src/models/bet";
import { UserI } from "src/models/user";

// RxJS
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public user: UserI;
    public bet: BetI;
    public state: string;

    public disabledToBet: boolean;
    public addOrDeleteBallEmitter$ = new EventEmitter<BallI>();

    public total_money: number;

    public colors: string[]
    public balls_selected: number;

    constructor() {
        this.colors = ['red', 'yellow', 'green'];
        this.state = "ready"
        this.total_money = 0;
        this.disabledToBet = true;
        this.balls_selected = 0;

        // Initialize variables with sample data. In real work, i suposse this info will come from endpoints or localStorage
        this.user = { id: "userid", email: "user_email@email.com", password: "encripted_password", name: "user_name", surname: "user_surname", wallet: 500 }
        this.bet = { id: "betid", n_balls: 0, max_selection: 0, drum: [], result_ball: { number: 0, color: '', isSelected: false }, input_stake: 5, money_alteration: 0, user: this.user.id }

        this.addOrDeleteBallEmitter$.subscribe(ball => {
            this.addOrDeleteBall(ball.number)
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
    * @return Promise<boolean>
    */
    public initDrum(n_balls: number, max_selection: number): Promise<boolean> {
        let self = this;
        return new Promise(function (resolve) {
            const source = from([...Array(n_balls).keys()])
            const example = source.pipe(map(n => n + 1))
            example.subscribe(n => self.bet.drum.push({ number: n, color: self.colors[(n - 1) % self.colors.length], isSelected: false }))
            self.bet.n_balls = n_balls;
            self.bet.max_selection = max_selection;
            resolve(true);
        })

    }

    /* This function adds a ball to the selection or adds it if it is not found. Then, disable Place bet button in order to force user to recheck if input stake is valid
    *
    * @param Ball: The ball we have to remove or add to selection
    * @return void
    */
    addOrDeleteBall(number: number): void {
        if (this.state === 'ready') {
            let index = this.bet.drum.findIndex(b => b.number === number);
            if (this.bet.drum[index].isSelected) {
                this.bet.drum[index].isSelected = false;
                this.balls_selected--;
                this.disabledToBet = true;
            } else {
                if (this.balls_selected < this.bet.max_selection) {
                    this.bet.drum[index].isSelected = true;
                    this.balls_selected++;
                    this.disabledToBet = true;
                }
            }

        }
    }

    /* This function will return the class of the ball, depending of it's color and if it's selected or not
    *
    * @param number: The number of the ball to get the color
    * @return string
    */
    public getBallClassesByBallNumber(number: number, small: boolean): Object {

        let classes: any = {
            'center-center': true,
            'pointer': true,
            'ml-4': true,
            'mr-10': !small && number === this.bet.n_balls,
        }

        if (small) {
            classes['little-circle'] = true;
        } else {
            classes['circle'] = true;
        }

        let index = this.bet.drum.findIndex(b => b.number === number);
        let str: string;
        if (small && !this.bet.drum[index].isSelected) {
            str = 'gray'
            classes[str] = true;
        } else {
            let str = this.bet.drum[index].color;
            if (this.bet.drum[index].isSelected) {
                str += '-selected'
            }
            classes[str] = true;
        }

        return classes;

    }

    /* This method check if a ball is inside the user's selection
    *
    * @input ball
    * @returns boolean
    */
    public checkBall(number: number): boolean {
        return this.bet.drum.some(b => b.number === number && b.isSelected)
    }

    /* This function remove all balls from selection
    *
    * @returns void
    */
    public clearSelection(): void {
        const source = from(this.bet.drum)
        const example = source.pipe(map(n => n.isSelected = false))
        this.disabledToBet = true;
    }

    /* This method restart the game
    *
    * 1 Create new bet saving the previous selection
    * 2 Set the total money to 0
    * 3 Set state of the game to ready
    * 
    * @return Promise<boolean>
    */
    public restartGame(): Promise<boolean> {
        this.bet = { id: "betid", n_balls: this.bet.n_balls, max_selection: this.bet.max_selection, drum: [], result_ball: { number: 0, color: '', isSelected: false }, input_stake: 5, money_alteration: 0, user: this.user.id }
        let self = this;
        return new Promise(function (resolve) {
            self.initDrum(self.bet.n_balls, self.bet.max_selection).then(
                (response) => {
                    if (response) {
                        self.balls_selected = 0;
                        self.total_money = 0;
                        self.disabledToBet = true;
                        self.state = "ready"
                    }
                }
            )
            resolve(true)
        })
        
    }


}