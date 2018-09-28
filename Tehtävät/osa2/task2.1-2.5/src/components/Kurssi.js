import React from 'react'

const Kurssi = (props) => {
    const { kurssit } = props;
    return (
        <div>
            <div>
                {kurssit.map(kurssi =>
                    <div key={kurssi.id}>
                        <Otsikko kurssi={kurssi} />
                        <Sisalto kurssi={kurssi.osat} />
                        <Yhteensa kurssi={kurssi.osat} />
                    </div>
                )}
            </div>
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi}</h1>
        </div>
    )
}
const Sisalto = (props) => {
    return (
        <ul>
            {props.kurssi.map(kurssi => <Osa key={kurssi.id} nimi={kurssi.nimi} tehtavia={kurssi.tehtavia} />)}
        </ul>
    )
}
const Yhteensa = (props) => {
    let summa = props.kurssi.reduce((a, b) => a + b.tehtavia, 0)
    return (
        <div>
            <p>Yhteensä {summa} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <li>{props.nimi} {props.tehtavia}</li>
    )
}

export default Kurssi