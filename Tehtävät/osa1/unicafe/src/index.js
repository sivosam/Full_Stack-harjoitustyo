import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            summa: 0,
            klik: 0,
        }


        this.klikHyva = () => {
            this.setState({
                hyva: this.state.hyva + 1,
                summa: this.state.summa + 1,
                klik: this.state.klik + 1
            })
        }

        this.klikNeutraali = () => {
            this.setState({
                neutraali: this.state.neutraali + 1,
                klik: this.state.klik + 1
            })
        }
        this.klikHuono = () => {
            this.setState({
                huono: this.state.huono + 1,
                summa: this.state.summa - 1,
                klik: this.state.klik + 1
            })
        }


    }


    render() {
        return (
            <div>
                <h2>Anna palautetta</h2>
                <div>
                    <Button
                        handleClick={this.klikHyva}
                        text="Hyvä" />
                    <Button
                        handleClick={this.klikNeutraali}
                        text="Neutraali" />
                    <Button
                        handleClick={this.klikHuono}
                        text="Huono" />
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
    if (props.klik === 0) {
        return (
            <p>Ei palautetta</p>
        )
    }
    return (

        <table>
            <tbody>
                <Statistic text="Hyvä" stat1={props.hyva} />
                <Statistic text="Neutraali" stat1={props.neutraali} />
                <Statistic text="Huonot" stat1={props.huono} />
                <Statistic text="Keskiarvo" stat1={props.summa} stat2={props.klik} type={1} />
                <Statistic text="Positiivisia" stat1={props.hyva} stat2={props.klik} type={2} />
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


ReactDOM.render(<App />, document.getElementById('root'));

