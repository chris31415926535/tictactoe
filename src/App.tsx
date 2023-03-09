import { Component, createSignal, Match, Switch } from 'solid-js';


const [getTurn, setTurn] = createSignal(true);
const [getSquareValues, setSquareValues] = createSignal(["", "", "", "", "", "", "", "", ""]);

const [getGameState, setGameState] = createSignal("running");

const Square = (props: any) => {
  let num = props.i;

  const [getSquareValue, setSquareValue] = createSignal("");

  const handleClick = () => {

    let squareValues = getSquareValues();

    if (squareValues[num] === "") {
      setSquareValue(getTurn() ? "X" : "Y");
      squareValues[num] = getTurn() ? "X" : "Y";
      setSquareValues(squareValues);
      setTurn((value) => !value);
    }

    // CHECK GAME CONDITIONS

    if (squareValues[0] === squareValues[3] && squareValues[0] === squareValues[6] && squareValues[0] !== "") {
      console.log(squareValues[0] + " wins")
      setGameState(squareValues[0]);
    }

    if (squareValues[0] === squareValues[1] && squareValues[0] === squareValues[2] && squareValues[0] !== "") {
      console.log(squareValues[0] + " wins")
      setGameState(squareValues[0]);
    }

    if (squareValues[0] === squareValues[4] && squareValues[0] === squareValues[8] && squareValues[0] !== "") {
      console.log(squareValues[0] + " wins")
      setGameState(squareValues[0]);
    }

    if (squareValues[1] === squareValues[4] && squareValues[1] === squareValues[7] && squareValues[1] !== "") {
      console.log(squareValues[1] + " wins")
      setGameState(squareValues[1]);
    }

    if (squareValues[2] === squareValues[5] && squareValues[2] === squareValues[8] && squareValues[2] !== "") {
      console.log(squareValues[2] + " wins")
      setGameState(squareValues[2]);
    }

    if (squareValues[2] === squareValues[4] && squareValues[2] === squareValues[6] && squareValues[2] !== "") {
      console.log(squareValues[2] + " wins")
      setGameState(squareValues[2]);
    }

    if (squareValues[3] === squareValues[4] && squareValues[3] === squareValues[5] && squareValues[3] !== "") {
      console.log(squareValues[3] + " wins")
      setGameState(squareValues[3]);
    }

    if (squareValues[6] === squareValues[7] && squareValues[6] === squareValues[8] && squareValues[6] !== "") {
      console.log(squareValues[6] + " wins")
      setGameState(squareValues[6]);
    }

    // check for a draw if game isn't won yet
    if (getGameState() === "running") {
      let numFilled = 0;
      for (let i = 0; i < 9; i++) {
        numFilled += squareValues[i] !== "" ? 1 : 0;
      }
      if (numFilled === 9) setGameState("draw");
    }
    console.log(squareValues)
    console.log(getSquareValues()[num])
    console.log(num)
  }

  return <div onClick={handleClick}>{getSquareValue()}</div>

}

const App: Component = () => {

  const resetGame = () => {
    setGameState("resetting");
    setSquareValues(["", "", "", "", "", "", "", "", ""]);
    setGameState("running");
  }

  return (
    <div id="game">
      <div id="title">
      <h1>Ugly Tic-Tac-Toe Made in SolidJS</h1>
      </div>
    <Switch>
      <Match when={getGameState() === "running"}>
        <div id="board">

          <div><h1>{(getTurn() ? "X" : "Y") + "'s turn"}</h1></div>

          <div id="container">
            <Square i={0} />
            <Square i={1} />
            <Square i={2} />
            <Square i={3} />
            <Square i={4} />
            <Square i={5} />
            <Square i={6} />
            <Square i={7} />
            <Square i={8} />
          </div>

         <div id="resetbutton"> <button onClick={resetGame}>Clear Board</button></div>
        </div>
      </Match>
      
      <Match when={getGameState() === "X" || getGameState() === "Y"}>
        <div id="gameover">
          <h1>{getGameState()} wins</h1>
          <button onClick={resetGame}>Play Again</button>
        </div>
      </Match>

      <Match when={getGameState() === "draw"}>
        <div id="gameover">
          <h1>Nobody wins</h1>
          <button onClick={resetGame}>Play Again</button>
        </div>
      </Match>

    </Switch>
    </div>

  );
};

export default App;
