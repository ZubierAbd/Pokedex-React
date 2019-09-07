import React from "react";
import "./Pokedex.css";
import Entry from "./Entry";
import Title from "./Title";
//import Navbar from "./NavBar";
// import PokemonData from "./PokemonData";
// import pokeball from "./pkball.png";

class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemonarray: [],
      gen: "Gen1",
      gen1Array: "",
      gen2Array: "",
      gen3Array: "",
      gen4Array: "",
      gen5Array: "",
      gen6Array: "",
      gen7Array: ""
    };
  }

  setAllArrays() {
    let gen1 = [];
    let gen2 = [];
    let gen3 = [];
    let gen4 = [];
    let gen5 = [];
    let gen6 = [];
    let gen7 = [];
    let i = 1;
    for (i = 1; i < 152; i++) {
      gen1.push(i);
    }
    for (i = 152; i < 252; i++) {
      gen2.push(i);
    }
    for ( i = 252; i < 386; i++) {
      gen3.push(i);
    }
    for (i = 387; i < 493; i++) {
      gen4.push(i);
    }
    for (i = 494; i < 649; i++) {
      gen5.push(i);
    }
    for (i = 650; i < 741; i++) {
      gen6.push(i);
    }
    for (i = 722; i < 809; i++) {
      gen7.push(i);
    }

    this.setState({ gen1Array: gen1 });
    this.setState({ gen2Array: gen2 });
    this.setState({ gen3Array: gen3 });
    this.setState({ gen4Array: gen4 });
    this.setState({ gen5Array: gen5 });
    this.setState({ gen6Array: gen6 });
    this.setState({ gen7Array: gen7 });
  }

  chooseGen() {
    var gen = Math.floor(Math.random() * 7 + 1);
    let start = 0;
    let end = 0;

    switch (gen) {
      case 1:
        start = 1;
        end = 151;
        this.setState({ gen: "Gen1" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 2:
        start = 152;
        end = 251;
        this.setState({ gen: "Gen2" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 3:
        start = 252;
        end = 386;
        this.setState({ gen: "Gen3" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 4:
        start = 387;
        end = 493;
        this.setState({ gen: "Gen4" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 5:
        start = 494;
        end = 649;
        this.setState({ gen: "Gen5" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 6:
        start = 650;
        end = 721;
        this.setState({ gen: "Gen6" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      case 7:
        start = 722;
        end = 809;
        this.setState({ gen: "Gen7" });
        this.setState({pokemonarray: this.state.gen1Array})
        break;
      default:
        start = 1;
        end = 151;
    }

    return [start, end];
  }

  setPokemon() {
    let array = [];
    let x = this.chooseGen();
    for (var i = x[0]; i < x[1]; i++) {
      array.push(i);
    }
    this.setState({ pokemonarray: array });
  }

  componentDidMount() {
    this.setPokemon();
    this.setAllArrays();
  }

  render() {
    let array = this.state.pokemonarray;
    return (
      <div>
        <div onClick={
          ()=>{
            this.setState({pokemonarray: this.state.gen4Array})
          }
        }>
          <Title gen={this.state.gen}></Title>{" "}
        </div>
        <div className="Generations">
          <button
            onClick={() => {
              this.setState({ gen: "Gen1" });
              this.setState({ pokemonarray: this.state.gen1Array });
              array = this.state.gen1Array;
            }}
          >
            Gen1{" "}
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen2" });
              this.setState({ pokemonarray: this.state.gen2Array });
              array = this.state.gen2Array;
            }}
          >
            Gen2
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen3" });
              this.setState({ pokemonarray: this.state.gen3Array });
              array = this.state.gen3Array;
            }}
          >
            Gen3
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen4" });
              this.setState({ pokemonarray: this.state.gen4Array });
            }}
          >
            Gen4
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen5" });
              this.setState({ pokemonarray: this.state.gen5Array });
            }}
          >
            Gen5
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen6" });
              this.setState({ pokemonarray: this.state.gen6Array });
            }}
          >
            Gen6
          </button>
          <button
            onClick={() => {
              this.setState({ gen: "Gen7" });
              this.setState({ pokemonarray: this.state.gen7Array });
            }}
          >
            Gen7
          </button>
        </div>
        <div className="row main-row">
          {array.slice(0, 21).map((ele, index) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 col-lg-4"
              key={index + 100}
            >
              <Entry id={ele} gen={this.state.gen}>
                {" "}
                key={ele}
              </Entry>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
