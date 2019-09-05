import React from "react";
import "./Pokedex.css";
import Entry from "./Entry";
import Title from "./Title";
//import Navbar from "./NavBar";
import PokemonData from "./PokemonData";
import pokeball from "./pkball.png";

class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemonarray: [],
      gen: "Gen1",
      fullArray: PokemonData.array,
      gen1Array: PokemonData.array.slice(0, 150),
      gen2Array: PokemonData.array.slice(151, 250),
      gen3Array: PokemonData.array.slice(251, 385),
      gen4Array: PokemonData.array.slice(386, 492),
      gen5Array: PokemonData.array.slice(493, 648),
      gen6Array: PokemonData.array.slice(649, 720),
      gen7Array: PokemonData.array.slice(721, 808),
      testArray: PokemonData.array.slice(0, 15),
      offset: 0,
      searchString: ""
    };
  }

  chooseGen() {
    var gen = Math.floor(Math.random() * 7 + 1);

    switch (gen) {
      case 1:
        this.setState({ gen: "Gen1" });
        this.setState({ pokemonarray: this.state.gen1Array });
        break;
      case 2:
        this.setState({ gen: "Gen2" });
        this.setState({ pokemonarray: this.state.gen2Array });
        this.setState({ offset: 151 });
        break;
      case 3:
        this.setState({ gen: "Gen3" });
        this.setState({ pokemonarray: this.state.gen3Array });
        this.setState({ offset: 251 });
        break;
      case 4:
        this.setState({ gen: "Gen4" });
        this.setState({ pokemonarray: this.state.gen4Array });
        this.setState({ offset: 386 });
        break;
      case 5:
        this.setState({ gen: "Gen5" });
        this.setState({ pokemonarray: this.state.gen5Array });
        this.setState({ offset: 493 });
        break;
      case 6:
        this.setState({ gen: "Gen6" });
        this.setState({ pokemonarray: this.state.gen6Array });
        this.setState({ offset: 649 });
        break;
      case 7:
        this.setState({ gen: "Gen7" });
        this.setState({ pokemonarray: this.state.gen7Array });
        this.setState({ offset: 721 });
        break;
      default:
    }
  }

  componentDidMount() {
    this.chooseGen();
  }

  handleChange = e => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    let array = this.state.pokemonarray;
    let searchString = this.state.searchString.trim().toLowerCase();
    let filteredArray = array.filter(
      ele => ele.toLowerCase().indexOf(searchString) !== -1
    );
    return (
      <div>
        <div>
          <Title gen={this.state.gen}></Title>{" "}
        </div>
        <div className="filter">
          {" "}
          <input
            placeholder="Search By Pokemon...."
            id="searchString"
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="Generations">
          <button
            onClick={() =>
              this.setState({
                pokemonarray: this.state.gen1Array
              })
            }
          >
            Gen1{" "}
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen2Array
              });
            }}
          >
            Gen2
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen3Array
              });
            }}
          >
            Gen3
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen4Array
              });
            }}
          >
            Gen4
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen5Array
              });
            }}
          >
            Gen5
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen6Array
              });
            }}
          >
            Gen6
          </button>
          <button
            onClick={() => {
              this.setState({
                pokemonarray: this.state.gen7Array
              });
            }}
          >
            Gen7
          </button>
        </div>
        <div className="main">
          {filteredArray.map((ele, index) => (
            <Entry
              callbackFromParent={this.myCallBack}
              key={index}
              id={index}
              name={ele}
              gen={this.state.gen}
            ></Entry>
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
