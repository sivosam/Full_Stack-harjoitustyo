import React from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}</p>
            
        </div>
    )
}



const App = () => {
    const ika = 15
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Pekka" age={15+12}/>
            <Hello name="Jaakko" asd={ika}/>
            <Hello asd="asd"/>
            <Hello />

        </div>
    )}

ReactDOM.render(<App />, document.getElementById('root'));

