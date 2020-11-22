import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./home.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// MUI - Design
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar";

axios.defaults.baseURL = 'https://nates-notes-api.herokuapp.com/'

//design
const styles = {
  form: {
    textAlign: "center",
  },
  button: {
    margin: "10px",
  },
  root: {
    "& > *": {
      margin: "10px",
      width: "25ch",
    },
  },
};

//components
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      items: [],
      currentItem: {
        text: "",
        key: "",
        date: new Date(),
        submit: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  //get all items
  componentDidMount() {
    axios.get("/items/").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }
  //input field
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: this.state.d,
        date: this.state.startDate,
      },
    });
  }
  //add an item
  addItem() {
    //create item with unique id
    const newItem = {
      id: Math.floor(Math.random() * 1000000000).toString(),
      date: this.state.startDate.toString(),
      text: this.state.currentItem.text.slice(),
    };

    // update state with new list, reset the new item input
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
      newItem: "",
    }));

    axios
      .post("/items/add", newItem)
      .then((res) => console.log(res.data));
  }
  deleteItem(id) {
    // copy current list of items
    const items = [...this.state.items];
    // filter out the item being deleted
    const updatedList = items.filter((items) => items.id !== id);

    this.setState({ items: updatedList });

    axios.delete("/items/" + id).then((response) => {
      console.log(response.data);
    });
  }
  changeInput(e, id) {
    //... copy all items, this state = update not possible, therefore copy
    const items = [...this.state.items];

    items.find((item) => item.id == id).updateText = e.target.value;

    this.setState({
      items,
    });
  }
  //update item
  updateItem(id) {
    const items = [...this.state.items];
    const item = items.find((item) => item.id == id)
    const updateText = item.updateText;

    axios
      .put("/items/" + id, { ...item, text: updateText })
      .then((response) => {
        console.log(response.data);
        item.text = updateText;
        item.updateText = "";
        this.setState({
          items,
        });
      });
  }
  //date picker
  addZ(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  addD(d) {
    return d < 10 ? "0" + d : "" + d;
  }
  changeFormat(date) {
    var newDate =
      date.getFullYear() +
      "-" +
      this.addZ(date.getMonth() + 1) +
      "-" +
      this.addD(date.getDate());
    console.log(newDate);
    return newDate;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="home-background">
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <NavBar />
            <h1>Hello {this.props.userProp.given_name}</h1>
            <h2>Whom do you wanna call next?</h2>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={this.addItem}
            >
              <TextField
                id="standard-basic"
                label="Name"
                value={this.state.currentItem.text}
                onChange={this.handleInput}
              />
              <DatePicker
                className="datepicker-analyitcs"
                selected={this.state.startDate}
                onChange={(date) => {
                  this.setState({ startDate: date });
                  this.changeFormat(date);
                }}
              />
              <Button onClick={() => this.addItem()}>Add reminder</Button>
            </form>
            <h1>{this.state.submit}</h1>
            <ul>
              {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.text}
                    {item.date}
                    <input
                      onChange={(e) => this.changeInput(e, item.id)}
                      value={item.updateText}
                    />
                    <button onClick={() => this.updateItem(item.id)}>
                      update
                    </button>
                    <button onClick={() => this.deleteItem(item.id)}>x</button>
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
