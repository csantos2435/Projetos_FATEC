import React from "react";
import { connect } from "react-redux";
import Card from "./Card"

function Propriedades(props){
    const { max } = props

    return (
        <Card title={props.titulo} yellow>
            <div className="Propriedades">
                <span>
                    <span>{props.aluno} é: </span>
                    <strong> { max }</strong>
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
export default connect(mapStateToProps)(Propriedades)