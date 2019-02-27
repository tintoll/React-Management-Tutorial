import React, { Component } from "react";
import "./App.css";
import Customer from "./components/Customer";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "홍길동",
    birthday: "961222",
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "나동빈",
    birthday: "960508",
    gender: "남자",
    job: "프로그래머"
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이순신",
    birthday: "961127",
    gender: "남자",
    job: "디자이너"
  }
];
// map함수는 특정한 리스트(List)가 있을 때 해당 리스트의 각 원소에 특정한 문법을 적용한 결과 리스트를 반환합니다.
// 맵(Map)을 이용해 다수의 정보를 출력할 때는 key라는 이름의 Props를 사용해야 한다는 점입니다.
// 이를 사용하지 않으면 자바스크립트 콘솔(Console)에 관련 오류가 출력됩니다.
class App extends Component {
  render() {
    return (
      <div>
        {customers.map(customer => {
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
        })}
      </div>
    );
  }
}

export default App;
