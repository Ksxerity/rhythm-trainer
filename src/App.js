import React, { Component } from 'react';
import styles from './App.module.scss';

const MAX_NUMBER_OF_KEYS = 9;

export default class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      refs: [],
      ptr: 0
    }
    this.checkKeyPress = this.checkKeyPress.bind(this);
  }

  componentDidMount() {
    let refs = []
    for (let i = 0; i < MAX_NUMBER_OF_KEYS; i++) {
      refs.push(React.createRef());
    }
    this.setState({
      refs: refs
    })
    this.generateRandomNumbers()
    document.addEventListener("keydown", this.checkKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.checkKeyPress);
  }

  checkKeyPress(e) {
    if (e.code === this.state.refs[this.state.ptr].current.getAttribute('orientation')) {
      this.setState({
        ptr: this.state.ptr + 1
      })
    } else {
      this.setState({
        ptr: 0
      })
    }
  }

  generateRandomNumbers() {
    let set = [];
    for (let i = 0; i < MAX_NUMBER_OF_KEYS; i++) {
      set.push(Math.floor(Math.random() * 4))
    }
    this.setState({
      set: set,
      ptr: 0
    })
  }

  generateKeys() {
    let arr = Array.from(Array(MAX_NUMBER_OF_KEYS).keys());
    if (this.state.ptr === MAX_NUMBER_OF_KEYS) {
      this.generateRandomNumbers()
    }
    return arr.map(i => {
      let key = this.state.set[i];
      switch (key) {
        case 0:
          return (<div key={i} ref={this.state.refs[i]} orientation="ArrowUp" className={this.state.ptr > i ? styles["circle-green"] : styles["circle-blue"]}>
            <div className={styles.up}></div>
          </div>)
        case 1:
          return (<div key={i} ref={this.state.refs[i]} orientation="ArrowDown" className={this.state.ptr > i ? styles["circle-green"] : styles["circle-blue"]}>
            <div className={styles.down}></div>
          </div>)
        case 2:
          return (<div key={i} ref={this.state.refs[i]} orientation="ArrowLeft" className={this.state.ptr > i ? styles["circle-green"] : styles["circle-blue"]}>
            <div className={styles.left}></div>
          </div>)
        default:
          return (<div key={i} ref={this.state.refs[i]} orientation="ArrowRight" className={this.state.ptr > i ? styles["circle-green"] : styles["circle-blue"]}>
            <div className={styles.right}></div>
          </div>)
      }
    })
  }

  // Create buttons for options.
  // Then create a refresh/start button so that its not updating during an existing state transition
  render() {
    return (
      <div className={styles.bar}>
        {this.generateKeys()}
      </div>
    )
  }
}
