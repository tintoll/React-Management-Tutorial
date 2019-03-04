import React, { Component } from "react";
import "./App.css";
import Customer from "./components/Customer";
import CustomerAdd from './components/CustomerAdd';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { TableRow, TableBody, Paper, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
});

// map함수는 특정한 리스트(List)가 있을 때 해당 리스트의 각 원소에 특정한 문법을 적용한 결과 리스트를 반환합니다.
// 맵(Map)을 이용해 다수의 정보를 출력할 때는 key라는 이름의 Props를 사용해야 한다는 점입니다.
// 이를 사용하지 않으면 자바스크립트 콘솔(Console)에 관련 오류가 출력됩니다.
class App extends Component {
  
  state = {
    customers :'',
    completed : 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err));
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  callApi = async ()=> {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100?0 : completed+1});
  }


  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(customer => {
                return (
                  <Customer
                    key={customer.id}
                    id={customer.id}
                    image={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                  />
                );
              }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress}
                      variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </>
    );
  }
}

export default withStyles(styles)(App);
