import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import * as db from './db.js';

class FormularioAutor extends Component {

  constructor() {
    super();    
    this.state = {nome:'',email:'',senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(evento){
      db.addAutor(this.state.nome, this.state.email, this.state.senha);
      this.props.callbackAtualizaListagem();
      this.setState({nome: '', email:'', senha:''});
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setEmail(evento){
    this.setState({email:evento.target.value});
  }  

  setSenha(evento){
    this.setState({senha:evento.target.value});
  }  

	render() {
		return (
            <div className="pure-form pure-form-aligned">
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                              
                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>                                              
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>                                                                      
                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="button" onClick={this.enviaForm} className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
            </div>  
		);
	}
}

class TabelaAutores extends Component {

	render() {
		return (
            <div>            
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.lista.map(function(autor){
                      return (
                        <tr key={autor.senha}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table> 
            </div>             		
		);
	}
}

export default class AutorBox extends Component {

  constructor() {
    super();    
    this.state = {lista : []};
    this.atualizaListagem = this.atualizaListagem.bind(this);
  }

  componentDidMount() {
    this.atualizaListagem();
  }

  atualizaListagem(){
    db.getAutores().then(function(resolve){
      this.setState({lista:resolve});
    }.bind(this));  
  }

  render(){
    return (
      <div>
        <div className="header">
            <h1>Cadastro de autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/> 
          <TabelaAutores lista={this.state.lista}/>
        </div>
      </div>
    );
  }
}