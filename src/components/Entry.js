import React, {Component} from 'react';

class Entry extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      id: this.props.id.$loki,
      update: false,
      type: '',
      desc: '',
      date: ''
    }
  }

  delete = () =>{
    let id = {id: this.state.id};
    fetch('http://localhost:5000/del', {
      method: "DELETE",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(id)
    })
    .then(response => response.json())
    .then(data => {
				console.log(data);
			});
      window.location.reload();
  }

  update = () =>{

    let data = {id: this.state.id, type: this.state.type, desc: this.state.desc, date: this.state.date};

    fetch('http://localhost:5000/up', {
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
				console.log(data);
			});

  }

  change = () =>{
    if(this.state.update === false){
      this.setState({update: true});
    }
    else {
      this.setState({update: false});
    }
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

  render(){
    return(
      <p id={this.state.id + " "}>{'TYPE: ' + this.state.data.type + ' DESCRIPTION: ' + this.state.data.desc + ' DATE: ' + this.state.data.date}<button onClick={this.delete}>Delete</button>
      <button onClick={this.change}>Update</button>
      <body style={{visibility: this.state.update === true ? 'visible' : 'hidden'}}>
      <form onSubmit={this.update}>
      <input ref="type" type="text" name="type" placeholder="Type" value={this.state.type} onChange={e => this.handleType(e)}/>
      <input ref="desc" type="text" name="desc" placeholder="Description" value={this.state.desc} onChange={e => this.handleDesc(e)}/>
      <input ref="date" type="text" name="date" placeholder="Date" value={this.state.date} onChange={e => this.handleDate(e)}/>
      <button>Confirm</button>
      </form>
      </body>
      </p>
      )
  }

}

export default Entry;
