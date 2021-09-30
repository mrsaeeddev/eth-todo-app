import React, { Component } from 'react'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import Web3 from 'web3'

console.log(TODO_LIST_ABI)
class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3("HTTP://127.0.0.1:7545")
    const network = await web3.eth.net.getNetworkType()
    const networkId = '0x09dA8A331A889396D2E15CFd19BeADaeC5adbC4A';
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, networkId)
    const taskCount = await todoList.methods.taskCount().call()
    console.log(taskCount)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      });
    }
  }

  constructor(props) {
    super(props)
    this.state = { account: '', taskCount:0, tasks: '' }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        {console.log(this.state.tasks.length,'tasks')}
        <p>Your account: {this.state.account}</p>
        <ul id="taskList" className="list-unstyled">
        {this.state.tasks}
              {this.state.tasks.length > 0 ? this.state.tasks.map((task, key) => {
                return(
                  <div className="taskTemplate" className="checkbox" key={key}>
                    <label>
                      <input type="checkbox" />
                      <span className="content">{task.content}</span>
                    </label>
                  </div>
                )
              }):<div>No tasks</div>}
          </ul> 
      </div>
    );
  }
}

export default App;