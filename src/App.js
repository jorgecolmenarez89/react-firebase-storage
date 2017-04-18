import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDtC39uNAvjs9dBDSm2w6Zvk3exf9Kg_EI',
    authDomain: 'reat-firebase.firebaseapp.com',
    databaseURL: 'https://reat-firebase.firebaseio.com',
    storageBucket: 'reat-firebase.appspot.com',
    messagingSenderId: '867497078720'
};
firebase.initializeApp(config);

class App extends Component {
  constructor(){
    super()
    this.state = {
      uploadValue: 0
    }
  }

  handleOnChange(event)
  {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let prencentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: prencentage
      })
    }, (error) => {
      this.setState({
        message: `Ha ocurrido un error: ${error.message}`
      })
    },() => {
      this.setState({
        message: `Archivo Subido Correctamente`,
        picture: task.snapshot.downloadURL
      })
    })
  }

  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100'>
        </progress>
        <br />
        <input type='file' onChange={this.handleOnChange.bind(this)} />
        <br />
        {this.state.message}
        <br />
        <img src={this.state.picture} />
      </div>
    );
  }
}

export default App;
