import React, { Component } from "react";
import axios from 'axios'

import PageHeader from "../template/pageHeader";
import CadastroForm from "./cadastroForm";
import CadastroList from "./cadastroList";

const URL = 'http://localhost:3003/api/cadastros'

export default class Cadastro extends Component {
  constructor(props){
    super(props)
    this.state = { name: '', list: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.refresh()
  }

  refresh(name = ''){
    const search = name ? `&name__regex=/${name}/` : ''
    axios.get(`${URL}?sort=name${search}`)
      .then(resp => this.setState({...this.state, name, list: resp.data}))
  }

  handleSearch() {
    this.refresh(this.state.name)
  }

  handleChange(e){
    this.setState({...this.state, name: e.target.value})
  }

  handleAdd(){
    const name = this.state.name
    axios.post(URL, { name })
      .then(resp => this.refresh())
  }

  handleClear(){ 
    this.refresh()
  }

  handleRemove(cadastro) {
    axios.delete(`${URL}/${cadastro._id}`)
      .then(resp => this.refresh(this.state.name))
  }

  render() {
    return (
      <div>
        <PageHeader name='Cadastro' small='Pessoas'></PageHeader>
        
        <CadastroForm
          name={this.state.name}
          handleChange={this.handleChange}
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear} />

        <CadastroList
          list={this.state.list}
          handleRemove={this.handleRemove}/>
      </div>
    );
  }
}