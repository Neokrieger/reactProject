import React, { Component } from 'react';
import Entry from './Entry.js'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      type: '',
      desc: '',
      date: ''
    }
  }

  async componentDidMount(){
    await fetch('http://localhost:5000/view', {
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({data: data.response});
    })
  }

  handleType(e){
    this.setState({type: e.target.value});
  }
  handleDesc(e){
    this.setState({desc: e.target.value});
  }
  handleDate(e){
    this.setState({date: e.target.value});
  }

  send = (event) =>{

    let data = {type: this.state.type, desc: this.state.desc, date: this.state.date};

    fetch('http://localhost:5000/make', {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
				console.log(data);
			});
  }


  render(){
    return(
      <body>
      <h1>Appointments</h1>
      <div>{this.state.data.map((text) => <Entry id={text} data={text}/>)}</div>
      <h2>Add new</h2>
      <form onSubmit={this.send}>
      <input ref="type" type="text" name="type" placeholder="Type" value={this.state.type} onChange={e => this.handleType(e)}/>
      <input ref="desc" type="text" name="desc" placeholder="Description" value={this.state.desc} onChange={e => this.handleDesc(e)}/>
      <input ref="date" type="text" name="date" placeholder="Date" value={this.state.date} onChange={e => this.handleDate(e)}/>
      <button>Create</button>
      </form>
      </body>
    );
  }

}

export default Home;
