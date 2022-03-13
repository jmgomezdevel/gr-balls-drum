import { EventEmitter, Injectable } from "@angular/core";
import { Ball } from "src/models/ball";
import { Bet } from "src/models/bet";
import { User } from "src/models/user";

@Injectable({
    providedIn: 'root',
})
export class DataService{

    public user: User;
    public bet: Bet;
    public state: string;

    public total_money: number;

    public colors: string[]

    constructor () {
        this.colors = ['red', 'yellow', 'green'];
        this.state = "ready"
    
        // Initialize variables with sample data. In real work, i suposse this info will come from endpoints or localStorage
        this.user = new User("user_id", "user_email@email.com", "encripted_password", "user_name", "user_surname", 500)
        this.bet = new Bet("bet_id", 0, 0, [], [], new Ball(0, ''), 5, 0, this.user._id)
        this.total_money = 0;
    }

    initDrum(n_balls: number, max_selection: number){
        this.bet.n_balls = n_balls;
        this.bet.max_selection = max_selection;
        for (let i = 1; i <= this.bet.n_balls; i++) {
            this.bet.drum.push(new Ball(i, this.colors[(i-1)%this.colors.length]))
          }
    }

    checkBall(ball: Ball){
        return this.bet.balls_selected.some(b => b.number === ball.number && b.color === ball.color)
    }

    restartGame(){
        this.bet = new Bet("bet_id", this.bet.n_balls, this.bet.max_selection, this.bet.drum, this.bet.balls_selected, new Ball(0, ''), 5, 0, this.user._id)
        this.total_money = 0;
        this.state = "ready"
    }
}