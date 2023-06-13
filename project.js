//The prompt-sync module is a function that creates prompting functions, 
//so you need to call prompt-sync in order to get your actual prompting function.

const prompt=require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOL_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

//deposit the money
const deposit = () =>{
    while(true){
        const depositAmount=prompt("Enter a deposit amount: ");
        const numdepositAmount=parseFloat(depositAmount);

        if(isNaN(numdepositAmount) || numdepositAmount<=0)
        {
            console.log("Invalid deposit amount,try again! ");
        }
        else {
            return numdepositAmount;
        }
    }
}

//takes number of lines from the user
const numOfLines =()=> {
    while(true){
        const numLines=prompt("Enter number of lines to bet on: ");
        const lines=parseInt(numLines);

        if(isNaN(lines) || lines<=0 || lines>3)
        {
            console.log("Invalid ,try again! ");
        }
        else {
            return lines;
        }
    }
  
}

//takes the amount to bet per line
const getBet= (balance,lines) =>{
    while(true)
    {
        const bet=prompt("Enter the amount to bet per line : ");
        const betAmount=parseInt(bet);

        if(isNaN(betAmount) || betAmount<=0 || betAmount>balance/lines)
        {
            console.log("Invalid ,try again!");
        }
        else {
            return betAmount;
        }
    }
}

//this function constructs the slot machine
const spin = () =>
{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++)
        {
            symbols.push(symbol);
        }
    }
    const reel=[];
    for(let i=0;i<ROWS;i++)
    {
        reel.push([]);
        reelSymbols=[...symbols];
        for(let j=0;j<COLS;j++)
        {
            let randomIndex=Math.floor(Math.random()*reelSymbols.length);
            let selectedSymbol=reelSymbols[randomIndex];
            reel[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1) 
        }
    }
    return reel;
}


const transpose = (reels) =>
{
    const rows=[];
    for(let i=0;i< COLS;i++)
    {
        rows.push([]);
        for(let j=0;j<ROWS;j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

//displaying the result of the machine - 3 lines
const slotMachine = (rows) =>
{
    for(const row of rows){
        let slot=" ";
        for(const [i,symbol] of row.entries())
        {
            slot+= symbol;
            if(i!=row.length-1)
            {
                slot+=" | "; 
            }
        }
        console.log(slot);
    }  
}

//calculates the winnings of the user
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };
  
//this function calls other functions and also asks user to play again or not
const game = () =>
{
    let balance=deposit();
    while(true)
    {
        console.log("You have a balance of $" + balance);
        const numLines=numOfLines();
        let betAmount=getBet(balance,numLines);
        balance -= betAmount * numLines;
        const reels=spin();
        const rows=transpose(reels);
        slotMachine(rows);
        const winnings=getWinnings(rows,betAmount,numLines);
        balance+=winnings;
        console.log("You won, $" + winnings.toString());
        
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
          }
      
          const playAgain = prompt("Do you want to play again (y/n)? ");
      
          if (playAgain != "y") break;

    }
}

game();













