import React from "react";
import IconButton from "../template/iconButton";

export default props => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map(cadastro => (
            <tr key={cadastro._id}>
                <td>{cadastro.name}</td>
                <td>{cadastro.createdAt}</td>
                <td>
                    <IconButton style='danger' icon='trash-o' 
                        onClick={() => props.handleRemove(cadastro)}></IconButton>
                </td>
            </tr>
        ));
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nomes</th>
                    <th>Data / Hora</th>
                    <th className="tableActions">Excluir</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}