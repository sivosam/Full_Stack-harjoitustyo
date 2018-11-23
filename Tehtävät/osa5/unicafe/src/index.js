import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import counterReducer from './reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: store.getState().good,
      neutraali: store.getState().ok,
      huono: store.getState().bad,
      summa: store.getState().sum,
      klik: store.getState().klik,
    }
  }


  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <div>
          <Button
            handleClick={() => store.dispatch({ type: 'GOOD' })}
            text="Hyvä" />
          <Button
            handleClick={() => store.dispatch({ type: 'OK' })}
            text="Neutraali" />
          <Button
            handleClick={() => store.dispatch({ type: 'BAD' })}
            text="Huono" />
          <Button
            handleClick={() => store.dispatch({ type: 'ZERO'})}
            text='Nollaa'
            />
        </div>

        <h3>Statistiikka</h3>
        <div>
          <Statistics props={this.state} />

        </div>

      </div>
    )
  }

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ props }) => {
  if (store.getState().klik === 0) {
    return (
      <p>Ei palautetta</p>
    )
  }
  return (

    <table>
      <tbody>
        <Statistic text="Hyvä" stat1={store.getState().good} />
        <Statistic text="Neutraali" stat1={store.getState().ok} />
        <Statistic text="Huonot" stat1={store.getState().bad} />
        <Statistic text="Keskiarvo" stat1={store.getState().sum} stat2={store.getState().klik} type={1} />
        <Statistic text="Positiivisia" stat1={store.getState().good} stat2={store.getState().klik} type={2} />
      </tbody>
    </table>


  )
}

const Statistic = ({ text, stat1, stat2, type }) => {
  if (type === 1) {
    return (
      <tr>
        <td className="eka">{text}</td>
        <td>{parseFloat(stat1 / stat2).toFixed(2)}</td>
      </tr>
    )
  }
  if (type === 2) {
    return (
      <tr>
        <td className="eka">{text}</td>
        <td>{parseFloat(stat1 / stat2 * 100).toFixed(1)} %</td>
      </tr>

    )
  }
  return (

    <tr>
      <td className="eka">{text}</td>
      <td>{stat1}</td>
    </tr>

  )

}


const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)