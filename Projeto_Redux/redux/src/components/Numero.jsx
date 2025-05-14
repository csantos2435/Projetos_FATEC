import './Numero.css'
import React from "react";
import { connect } from "react-redux";
import Card from "./Card"

import {alterarNumeroMaximo } from '../store/actions/numeros'

function Numero(props){
    const { max } = props

    return (
        <Card title="Escolha um número:" blue>
            <div className="Numero">
                <span>
                    <span>Número: </span>
                    <input type="number" value={ max } 
                        onChange={e => props.alterarMaximo(+e.target.value)}/>
                </span>
            </div>
        </Card>
    )
}
function mapDispatchToProps(dispatch){
    return {
        alterarMaximo(novoNumero){
            const action = alterarNumeroMaximo(novoNumero)
            dispatch(action)
        }
    }
}
function mapStateToProps(state){
    return {
        max: state.numeros.max
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Numero)