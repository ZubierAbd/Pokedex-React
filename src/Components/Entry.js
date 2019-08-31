import React from "react";
import "./Entry.css";


class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: "",
      sprite: "",
      type1: "",
      type2: "",
      flavor_text: ""
    };
  }

  componentDidMount() {
    const API = "https://pokeapi.co/api/v2/";
    fetch(API + "pokemon/" + this.props.id + "/")
      .then(res => res.json())
      .then(res =>
        this.setState({
          name: res.name,
          sprite: res.sprites.front_default,
          type1: res.types[0].type.name,
          type2: res.types[1] ? res.types[1].type.name : ""
        })
      );
    fetch(API + "pokemon-species/" + this.props.id + "/")
      .then(res => res.json())
      .then(res => {
        var x ; 
        if(res.flavor_text_entries[0].language.name === "en"){
          x = res.flavor_text_entries[0].flavor_text;
        } else if (res.flavor_text_entries[1].language.name === "en") {
          x = res.flavor_text_entries[1].flavor_text;
        } else if (res.flavor_text_entries[2].language.name === "en"){
          x = res.flavor_text_entries[2].flavor_text;
        }
        
        this.setState({flavor_text: x  })
      })
  }

  randomFunction() {
    this.props.callbackFromParent(this.state.name);
  }

  render() {
    return (
      <div className="container">
        <img className="portrait" src={this.state.sprite} alt=""></img>
        <div className="card">
          {" "}
          <h2 className="Name" id={this.props.gen}  > {this.state.name}</h2> 
          <p className="flavor-text"> 
            {this.state.flavor_text}
          </p>
          <a href={"https://pokemondb.net/pokedex/"+ this.state.name} target="_blank" rel="noopener noreferrer">  :) </a>
        </div>
      </div>
    );
  }
}

export default Entry;
