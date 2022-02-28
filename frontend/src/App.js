import { Modal } from "bootstrap";
import React, { Component } from "react";
import "./App.css";
import CustomModal from "./Component/Modal";
const tasks = [
  {
    id: 1,
    title: "Dunning",
    description: "Sending dunning letters to client for uncollected cash",
    completed: false,
  },
  {
    id: 2,
    title: "other Release",
    description: "check",
    completed: true,
  },
  {
    id: 3,
    title: "Weekly Reports",
    description: "Sending",
    completed: false,
  },
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      taskList: tasks,
      activeItem: null,
      isOpen: false,
      modal: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen, modal: false });
  };
  onSave = (obj) => {
    alert("ok");
  };
  displayCompleted = (status) => {
    if (status) {
      return this.setstatus({ viewCompleted: true });
    }
    return this.setstatus({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };
  editItem = (activeItem) => {
    this.setState({ isOpen: !this.state.isOpen, modal: true, activeItem: activeItem });
  };
  //rendering item in the list compeleted or incompleted
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter((item) => item.completed == viewCompleted);
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2 spanBtn" onClick={() => this.editItem(item)}>
            Edit
          </button>
          <button className="btn btn-danger spanBtn">Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="p-3">
              <button className="btn btn-warning">Add task</button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush">{this.renderItems()}</ul>
          </div>
        </div>
        {this.state.modal ? (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={() => this.toggle()}
            onSave={this.onSave}
            isOpen={this.state.isOpen}
          />
        ) : null}
      </main>
    );
  }
}
export default App;