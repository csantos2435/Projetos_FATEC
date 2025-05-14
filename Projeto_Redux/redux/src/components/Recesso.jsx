import React from "react";
import Card from "./Card";
import {connect} from 'react-redux'

function Recesso(props){

    const { max }  =  props

    return (
        <Card title="Está chegando..." green>
            <div className="Recesso">
                <span>
                    <span>Estarei de recesso em </span>
                    <strong> { max + 10 } dias</strong>
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

export default connect(mapStateToProps)(Recesso) 