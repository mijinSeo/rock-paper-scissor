import {useState} from 'react';
import './App.css';
import Box from './component/Box';

//1. 박스 두개( 타이틀, 사진, 결과)
//2. 가위 바위 보 버튼
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3,4의 결과를 가지고 승패를 나눈다.
//6. 결과에 따라 이기면 초록 지면 빨강 비기면 검정


const choice ={//사진을 저장할 객체 만들어 줌 
  rock:{
    name:"Rock",img:"https://mnmsoft.co.kr/friendvs/images/2.png"
  },
  paper:{
    name:"Paper",img:"https://mnmsoft.co.kr/friendvs/images/3.png"
  },
  scissors:{
    name:"Scissors",img:"https://mnmsoft.co.kr/friendvs/images/1.png"
  }
}

function App() {
  const [userSelect,setUserSelect] = useState(null);
  const [computerSelect,setComputerSelect] = useState(null);
  const [result,setResult]= useState("");
  const play = (userChoice) => {
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice],computerChoice));
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    //Object.keys() 객체에 키값만 뽑아서 어레이로 만들어주는 함수
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random()*itemArray.length);
    console.log("random value",randomItem);
    let final = itemArray[randomItem];
    console.log("final",final);
    return choice[final];
  }

  const judgement = (user,computer) =>{
    console.log ("user",user,"computer",computer)

    // 유저가 가위를 선택할 경우
    //컴퓨터에 바위가 나오면 유저가 Lose, 보가 나오면 유저가 Win
    // 유저가 바위를 선택할 경우,
    //유저가 컴퓨터에 보가 나오면 Lose,유저가 가위가 나오면 Win
    // 유저가 보를 선택할 경우, 
    //유저가 컴퓨터에 가위가 나오면 Lose, 유저가 바위가 나오면 Win
    // 유저가 선택한 값과 컴퓨처의 랜덤 값이 같을 경우 tie

    if(user.name == computer.name){
      return "Tie"
    }else if(user.name =="Rock") 
      return computer.name == "Scissors"? "Win":"Lose";
    else if(user.name == "Scissors")
      return computer.name == "Paper"? "Win":"Lose";
    else if(user.name == "Paper") 
      return computer.name == "Rock"? "Win":"Lose";
  };

  return (
    <div className='center'>
      <div className='main'>
        <Box title="You" item={userSelect} result = {result}/>
        <Box title="Computer" item ={computerSelect} result = {result}/>
      </div>
      <div className='buttonList'>
        {/* onClick할때 함수를 호출하는 형식이 아닌 콜백하는 형식으로 넣어줘야함.*/}
    
        <button  className='fa-regular fa-hand-scissors fa-2x' onClick={() => play("scissors")}></button>
        <button className='fa-regular fa-hand-back-fist fa-2x' onClick={() => play("rock")}></button>
        <button className='fa-regular fa-hand fa-2x'onClick={() => play("paper")}></button>
      </div>
    </div>
  
  );
}

export default App;
