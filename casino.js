class User{
    constructor(name,money){
        this.name = name;
        Money(money);
        this.selectedgameMachien = null;
    }

    set Money(money)
    {
        this.money = money < 0 ? 0 : money;
    }

    set setGameMachine(machine) {
        this.selectedgameMachien = machine;
    }

    playMachien(money){
        if((this.money - money) > 0) {
            this.selectedgameMachien !== null ? this.selectedgameMachien.play(money) : "there is no game machine";
        }
        else
        {
            console.log("Not enough money to pay")
        }
    }
}

class SuperAdmin extends User{
    constructor(name,money){
        super(name,money);
        this.casino = null;
    }
    newCasino(name) {
        this.casino = new Casino(name);
        return this.casino
    }
    newGameMachine(money){
        if(this.casino !== null)
        {
            if((this.money - money) > 0){
                this.money -= money;
                let newMachine = new GameMachine(money);
                this.casino.gameMachines.push(newMachine);
            }
            else{
                console.log("Not enough money to pay");
            }
        }
        else{
            console.log("There is no casino");
        }
    }
    takeSomeMoneyFromMachines(number){
        let sum = 0;
        let gameMachines = new Array(...this.casino.gameMachines);
        gameMachines.forEach(el => sum += el);
        if(sum > number && number > 0) {

            gameMachines.sort(function (a, b) {
                if (a.getMoney() < b.getMoney()) {
                    return -1
                }
                if (a.getMoney() > b.getMoney()) {
                    return 1
                }
                return 0;
            });

            let i = 0;
            let moneyToTake = number;
            while(moneyToTake > 0)
            {
                let moneyFromMachine = gameMachines[i].getMoney();
                if((moneyToTake - moneyFromMachine) >= 0){
                    moneyToTake -= moneyFromMachine;
                    gameMachines[i].getSomeMoney(moneyFromMachine);
                }
                else if((moneyToTake - moneyFromMachine) < 0){
                    moneyToTake -= moneyFromMachine;
                    gameMachines[i].getSomeMoney(moneyFromMachine - moneyToTake);
                }
                i++;
            }
            this.casino.gameMachines = new Array(...gameMachines)
        }
        else{
            console.log("Error")
        }
    }
    addMoneyToCasino(money){
        if(this.casino !== null && money > 0 && this.casino.gameMachines.length > 0){
            this.casino.gameMachines.forEach(el => el.setMoney = Math.trunc(money/this.casino.gameMachines.length))
        }
    }
    removeGameMachine(id){
        if(this.casino !== null && this.casino.gameMachines[id] !== undefined ){
            let moneyFromMachine = this.casino.gameMachines[id].getMoney();
            this.casino.gameMachines.forEach(el => el.setMoney = Math.trunc(moneyFromMachine/this.casino.gameMachine.length))
        }
    }

}

class Casino {
    constructor(name){
        this.name = name;
        this.gameMachines = [];
    }
    get getMoney(){
        let allMoney = 0;
        this.gameMachines.forEach(el => allMoney += el.getMoney());
        return allMoney;
    }
    get getMachineCount(){
        return this.gameMachines.length;
    }
}

class GameMachine {
    static MIN_VALUE = 100;
    static MAX_VALUE = 1000;
    static DOUBLE_WIN = 2;
    static TRIPLE_WIN = 3;
    constructor(number){
        this.number = number;
    }
    get getMoney(){
        return this.number;
    }
    set setMoney(number){
        this.number += number;
    }
    getSomeMoney(number){
        if(this.getMoney - number >= 0)
        {
            this.number -= number;
            return number;
        }
        else
        {
            console.log("there is no enough money to take");
        }
    }
    play(number){
        this.setMoney = number;

        const randomNumber = Math.trunc((Math.random() * (GameMachine.MAX_VALUE - GameMachine.MIN_VALUE) + GameMachine.MIN_VALUE));
        const randomStrNumber =
            randomNumber
                .toString()
                .split("");
        console.log("Number is -  " + randomNumber);
        if(randomStrNumber[0] === randomStrNumber[1] || randomStrNumber[0] === randomStrNumber[2] || randomStrNumber[1] === randomStrNumber[2])
        {
            if(randomStrNumber[0] === randomStrNumber[1] && randomStrNumber[0] === randomStrNumber[2] && randomStrNumber[1] === randomStrNumber[2])
            {
                let winPrice = number * GameMachine.TRIPLE_WIN;
                console.log("You win  " + this.getSomeMoney(winPrice));
            }
            else{
                let winPrice = number * GameMachine.DOUBLE_WIN;
                console.log("You win  " + this.getSomeMoney(winPrice));
            }
        }
        else
        {
            console.log("You lost");
        }
    }
}
