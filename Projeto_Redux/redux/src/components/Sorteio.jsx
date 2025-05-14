import React from "react";
import { connect } from "react-redux";
import Card from "./Card"

function Sorteio(props){

    const min = 0
    const { max } = props

    const aleatorio = parseInt(Math.random() * (max - min)) + min

    return (
        <Card title="Sorteio de Números de 0 à N" pink>
            <div>
                <span>
                    <span>Resultado: </span>
                    <strong>{ aleatorio }</strong>
                </span>
            </div>
        </Card>
    )
}
function mapStateToProps(state){
    return {
        max: state.numeros.max
    }
}

export default connect(mapStateToProps)(Sorteio)