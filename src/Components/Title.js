import React from "react";
import './Title.css'
class Title extends React.Component{
render(){
    return(
        <div>
            <h1 className={this.props.gen}> Reactive Pokedex</h1>
        </div>
    )
}
}

export default Title