import React from "react";
import "./Pokedex.css";
import Entry from "./Entry";
import Title from './Title'
//import Navbar from "./NavBar";
import PokemonData from './PokemonData' 

class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemonarray: [],
      gen : 'Gen1'
    };
  }

  myCallBack = dataFromChild => {
    console.log(dataFromChild);
    console.log("this is working");
  };

  chooseGen(){
    var gen = Math.floor(Math.random()*7 + 1);
    let start = 0; 
    let end = 0; 

    switch(gen){
      case 1:
        start = 1
        end = 151
        this.setState({gen: 'Gen1'})
        break; 
      case 2:
        start = 152
        end = 251
        this.setState({gen: 'Gen2'})
        break; 
      case 3:
        start = 252
        end = 386
        this.setState({gen: 'Gen3'})
        break; 
      case 4:
        start = 387
        end = 493
        this.setState({gen: 'Gen4'})
        break; 
      case 5:
        start = 494
        end = 649
        this.setState({gen: 'Gen5'})
        break; 
      case 6:
        start = 650
        end = 721
        this.setState({gen: 'Gen6'})
        break; 
      case 7:
        start = 722
        end = 809
        this.setState({gen: 'Gen7'})
        break; 
     default:
       start =1;
       end = 151;    
    }

    return [start,end]
  }

  setPokemon(){
    let array = [];
    let x = this.chooseGen()
    for(var i = x[0]; i < x[1]; i++){
      array.push(i);
    }
    this.setState({ pokemonarray: array });
  }

  componentDidMount() {
    console.log(PokemonData)
   this.setPokemon();
  }
  render() {
    return (
      <div>
        <div onClick={()=>{this.setPokemon()}}> <Title gen={this.state.gen}></Title> </div>
        <div className="main">
          {this.state.pokemonarray.map(ele => (
            <Entry
              callbackFromParent={this.myCallBack}
              key={ele}
              id={ele}
              gen={this.state.gen}
            ></Entry>
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
