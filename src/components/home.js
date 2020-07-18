import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker'
import './home.css'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// MUI stuff
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";



const styles = {
    form: {
        textAlign: "center",
    },
    button: {
        margin: '10px',
    },
    root: {
        '& > *': {
            margin: '10px',
            width: '25ch',
        },
    },
};

class Home extends Component {


    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            items:[],
            currentItem:{
                text:'',
                key:'',
                date: new Date(),
                submit: ''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.updateItem = this.updateItem.bind(this);

    }

    //input field
    handleInput(e){
        this.setState({
            currentItem:{
                text: e.target.value,
                key: this.state.d,
                date: this.state.startDate
            }
        })
    }
    addItem() {
        //create item with unique id
        const newItem={
            id: 1+Math.random(),
            date: this.state.startDate.toString(),
            text:this.state.currentItem.text.slice()
        }

        // update state with new list, reset the new item input
        this.setState(prevState => ({
            items: [...prevState.items, newItem],
            newItem: ""
        }))

        axios.post('http://localhost:5000/items/add', newItem)
            .then(res => console.log(res.data));
    }
    deleteItem(id) {
        // copy current list of items
        const items = [...this.state.items];
        // filter out the item being deleted
        const updatedList = items.filter(items => items.id !== id);

        this.setState({ items: updatedList });

        axios.delete('http://localhost:5000/items/'+id)
            .then(response => { console.log(response.data)});
    }

    changeInput(e, id){
        //... kopiert alle items, this-state- = update state selber, geht nicht, deshlab kopieren
        //fehler googlen
        const items = [...this.state.items];

        items.find(item => item.id == id).updateText = e.target.value;

        this.setState({
            items
        })
    }
    updateItem(id){
        const items = [...this.state.items];
        items.find(item => item.id == id).text = items.find(item => item.id == id).updateText;
        items.find(item => item.id == id).updateText = "";
        this.setState({
            items
        })
    }

    //date picker
    addZ(n){
        return n<10? '0'+n:''+n;
    }
    addD(d){
        return d<10? '0'+d:''+d;
    }
    changeFormat(date){
        var newDate = date.getFullYear() + '-' + (this.addZ(date.getMonth()+1)) + '-' + (this.addD(date.getDate()));
        console.log(newDate);
        return newDate
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <h1>Whom do you wanna call next?</h1>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={this.addItem}>
                        <TextField id="standard-basic" label="Name" value= {this.state.currentItem.text} onChange={this.handleInput} />
                        <DatePicker
                            className = "datepicker-analyitcs"
                            selected={this.state.startDate}
                            onChange={(date) => {
                                this.setState({startDate: date})
                                this.changeFormat(date);
                            }}
                        />
                        <Button onClick={() => this.addItem()}>Add reminder</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Clear all reminder
                        </Button>
                    </form>

                    <h1>Hello {this.state.currentItem.text}</h1>
                    <h1>{this.state.submit}</h1>

                    <ul>
                        {this.state.items.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.text}
                                    {item.date}
                                    <input onChange={e => this.changeInput(e, item.id)} value={item.updateText}/>
                                    <button onClick={() => this.updateItem(item.id)}>update</button>
                                    <button onClick={() => this.deleteItem(item.id)}>x</button>
                                </li>
                            );
                        })}
                    </ul>

                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}
export default withStyles(styles)(Home);