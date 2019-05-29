import React, { Component } from 'react';
import * as db from './db.js';
import InputCustomizado from './componentes/InputCustomizado';


class SelectAutores extends Component {
  constructor(){
    super();
    this.setAutorId = this.setAutorId.bind(this);
  }

  setAutorId(evento){
    this.props.callbackSetAutorId(evento.target.value);
  }

  render(){
    return(
      <div>
        <select value={ this.props.idAutorLivro } name="autorId" onChange={ this.setAutorId }>
          <option value="">Selecione</option>
          { 
              this.props.autores.map(function(autor) {
              return <option key={ autor.id } value={ autor.id }>
                          { autor.nome }
                      </option>;
              })
          }
        </select>
      </div>
    );
  }
}

export default class LivroBox extends Component {

    constructor() {
      super();    
      this.state = {autores : [], nomeLivro: '', idAutorLivro: '', precoLivro: ''};
      this.enviaForm = this.enviaForm.bind(this);
      this.getAutores= this.getAutores.bind(this);
      this.setNomeLivro = this.setNomeLivro.bind(this);
      this.setAutorId = this.setAutorId.bind(this);
      this.setPrecoLivro = this.setPrecoLivro.bind(this);
    }

    enviaForm(evento){
      db.addLivro(this.state.nomeLivro, this.state.idAutorLivro, this.state.precoLivro);
      this.getAutores();
      this.setState({nomeLivro:'', idAutorLivro:''});
  }

    setNomeLivro(evento){
      this.setState({nomeLivro:evento.target.value});
    }

    setAutorId(id){
      this.setState({idAutorLivro:id});
    }
  
    setPrecoLivro(evento){
      this.setState({precoLivro:evento.target.value});
    }

    componentDidMount() {
      this.getAutores();
    }
  
    getAutores(){
      db.getAutores().then(function(resolve){
        this.setState({autores:resolve});
      }.bind(this));  
    }
  
    render(){
      return (
        <div>
          <div className="header">
              <h1>Cadastro de livros</h1>
          </div>
          <div className="content" id="content">
            <SelectAutores  callbackSetAutorId={this.setAutorId} autores={this.state.autores}/>
            <InputCustomizado id="nomeLivro" type="text" name="nomeLivro" value={this.state.nomeLivro} onChange={this.setNomeLivro} label="nomeLivro"/>
            <InputCustomizado id="precoLivro" type="text" name="precoLivro" value={this.state.precoLivro} onChange={this.setPrecoLivro} label="precoLivro"/>
          </div>
          <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="button" onClick={this.enviaForm} className="pure-button pure-button-primary">Gravar</button>                                    
          </div>
        </div>
      );
    }
  }