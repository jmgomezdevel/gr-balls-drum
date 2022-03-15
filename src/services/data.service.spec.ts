import { DataService } from "./data.service";

describe('DataService', () => {
    let service: DataService;
    beforeEach(() => { service = new DataService(); });

    it('addOrDeleteBall have to change the length of balls selected', () => {
      service.bet.balls_selected = [{ number: 1, color: 'red' }]
      var previousLength = service.bet.balls_selected.length;
      service.addOrDeleteBall({ number: 1, color: 'red' })
      var newLength = service.bet.balls_selected.length;
      expect(previousLength).not.toEqual(newLength)
    });
  
    it('addOrDeleteBall have to disable the PlaceBet button', () => {
      service.disabledToBet = false;
      service.addOrDeleteBall({ number: 1, color: 'red' })
      expect(service.disabledToBet).toBeTruthy()
    });

    it('checkBall should return true if the ball is included in user selection', () => {
      service.bet.balls_selected = [{number:1, color: 'red'}]
      expect(service.checkBall({number: 1, color: 'red'})).toBeTrue();
    });

    it('checkBall should return true if the ball is included in user selection', () => {
      service.bet.balls_selected = [{number:1, color: 'red'}]
      expect(service.checkBall({number: 2, color: 'red'})).toBeFalse();
    });
  
    it('restartGame should set the money alteration to 0', () => {
      service.bet.money_alteration = -10;
      service.restartGame()
      expect(service.bet.money_alteration).toBe(0)
    });

    it('restartGame should set the state to ready', () => {
      service.state = 'finished'
      service.restartGame()
      expect(service.state).toBe('ready')
    });
  

  });