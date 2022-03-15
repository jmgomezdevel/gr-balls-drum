import { DataService } from "./data.service";

describe('DataService', () => {
    let service: DataService;
    beforeEach(() => { service = new DataService();});

    it('addOrDeleteBall have to change the length of balls selected', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: true}]
      service.balls_selected = 1
      var previousLength = service.balls_selected;
      service.addOrDeleteBall(1)
      var newLength = service.balls_selected;
      expect(previousLength).not.toEqual(newLength)
    });
  
    it('addOrDeleteBall have to disable the PlaceBet button', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: true}]
      service.disabledToBet = false;
      service.addOrDeleteBall(1)
      expect(service.disabledToBet).toBeTruthy()
    });

    it('checkBall should return true if the ball is included in user selection', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: true}]
      expect(service.checkBall(1)).toBeTrue();
    });

    it('checkBall should return false if the ball is not included in user selection', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: false}]
      expect(service.checkBall(2)).toBeFalse();
    });

    it('getBallClassesByBallNumber should return an object with class circle as true if the small parameter is false', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: false}]
      let classes = service.getBallClassesByBallNumber(1, false)
      expect(Object.keys(classes)).toContain('circle')
      expect(classes).toEqual(jasmine.objectContaining({
        'circle': true
      }));
    });

    it('getBallClassesByBallNumber should return an object with class gray as true if the small parameter is true and the ball is not selected', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: false}]
      let classes = service.getBallClassesByBallNumber(1, true)
      expect(Object.keys(classes)).toContain('gray')
      expect(classes).toEqual(jasmine.objectContaining({
        'gray': true
      }));
    });

    it('getBallClassesByBallNumber should return an object without class gray if the ball is selected', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: true}]
      let classes = service.getBallClassesByBallNumber(1, true)
      expect(classes).not.toEqual(jasmine.objectContaining({
        'gray': true
      }));
    });

    it('getBallClassesByBallNumber should return an object without class red-selected if the ball is selected and its color is red', () => {
      service.bet.drum = [{number: 1, color: 'red', isSelected: true}]
      let classes = service.getBallClassesByBallNumber(1, true)
      expect(classes).toEqual(jasmine.objectContaining({
        'red-selected': true
      }));
    });
  
    it('restartGame should set the money alteration to 0', () => {
      service.bet.money_alteration = -10;
      service.restartGame()
      expect(service.bet.money_alteration).toBe(0)
    });

    it('restartGame should set the state to ready', () => {
      service.state = 'finished'
      service.restartGame().then(
        (response) => {
          if(response){
            expect(service.state).toBe('ready')
          }
        }
      )
      
    });
  

  });