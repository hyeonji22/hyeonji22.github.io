
/*eslint-disable */
import React, { useState, useTransition } from 'react';
import './App.css';

function App() {

  //data
  let post ='강남 우동 맛집';
  let [글제목 , 글제목변경] = useState(['다자 코트 추천','가집추천','나이썬독학']); //잠깐 자료저장 
 //변경시 자동으로 반영되게 만들고 싶으면 state써야함 
  let[like,setLike] = useState([0,0,0]);
  let[likeState,setLikeState] = useState([false,false,false]);
          //state 변경함수 이거써야 재렌더링 
  let [modal, setModal] = useState(false); 
  let [selectIdx, setSelectedIdx] =useState('');//제목 인덱스
  let [입력값,입력값변경] = useState('');

  //시간 구하기
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month  + '-' + day; //년월일 
  const hours = ('0' + today.getHours()).slice(-2); 
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2); 
  const timeString = hours + ':' + minutes  + ':' + seconds; //시분초


  //좋아요
  let handlersetLike = (i) =>{
    //setLikeState(!likeState);
    let copysetLikeState = [...likeState];
    copysetLikeState[i]  =  !copysetLikeState[i];
    setLikeState(copysetLikeState)
    let copyLike = [...like];
    if(copysetLikeState[i] == true){
      copyLike[i] = copyLike[i]+1;
    }else{
      copyLike[i] = copyLike[i]-1;
    }
    setLike(copyLike)
  }
  //제목변경
  function change (){
    let arr = [1,2,3];
    //arraa/object이면 copy만들어서 데이터 변경해야함 
    let copy = [...글제목];
    copy[0] ='여자 코트 추천';
    b(copy);
  }
  //가나다순 정렬
  function sort(){
    let copy = [...글제목];
    b(copy.sort());
  }
  //글등록
  function register(){
    if(입력값 == ''){
      return false;
    }
    let copylike=[...like,0];
    let copy= [...글제목,입력값];
    //let copy =[...글제목] 
    //copy.upshift(입력값); --> 이렇게 해도됨 끼어넣기 기능 
    글제목변경(copy);
    setLike(copylike);
    setModal(false);
    입력값변경(''); //초기화
  }
  //글삭제
  let onRemove = (i) =>{
    let copy=[...글제목];
    copy.splice(i,1);
    글제목변경(copy);
    setModal(false);
  }
  //엔터키 설정
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      if(입력값 !== ''){
        register();
        입력값변경('');//초기화
      }
    }
  }
  return (
    <div className="App">
      <div className="black-nav">
        <h4  style={ {color:'red' ,fontSize:'16px'} }>블로그임</h4>
      </div>
      <button onClick={ change }>글수정</button>
      <button onClick={ sort  }>가나다순 정렬</button>

      <h4>{post}</h4>
     {/* <div className='list'>
      <h4>{글제목[0]} <span onClick={ 따봉변경함수 }>👍</span> {따봉} </h4>
      <p>2월 17일 발행</p> 
    </div>
    <div className='list'>
      <h4>{글제목[1]}</h4>
      <p>2월 17일 발행</p>
    </div>
    <div className='list'>
      <h4 onClick={modalState}>{글제목[2]}</h4>
      <p>2월 17일 발행</p>
    </div> */}
      
    <div>{글제목.length >0 ? '':'작성된 글이 없습니다.'}</div>
    {

      //for사용 x ->map 사용
      글제목.map(function(a , i ){
        return(
          <div className='list' key={i} id={i}>
          {/* <h4>{ a }</h4> */}
          {/* <h4  onClick={modalState} >{ 글제목[i] }</h4> */}
          <h4  onClick={() => {
           // setModal(true);
            if (selectIdx === i && modal) {
              setModal(false);
            } else {
              setModal(true);
              setSelectedIdx(i);
            }
            }} >{ 글제목[i] }
            <span id={i} onClick={(e) => { e.stopPropagation();
             handlersetLike(i)} }>👍</span> {like[i]}
            </h4>
          <p>{dateString} {timeString}</p>
            <button onClick={() => onRemove(i)}>x</button>
        </div>
        )
      })
    }
    {/* input 에 먼가 입력하고 코드 실행하고 싶으면 onChange,onInput */}
    
    <input value={입력값}
    onChange={(e)=>{
      입력값변경(e.target.value)
    }} 
    onKeyDown={(e) => activeEnter(e)} 
    ></input>
    <button onClick={register}>작성</button>
    {/* {
      //if문 사용x -> 삼항연산자 사용
      modal == true ? <Modal title={글제목[selectIdx]} 글제목변경={글제목변경[selectIdx]}/>: null
    } */}
     {modal === true ? (
        <Modal  글제목변경={글제목변경} 글제목={글제목} selectIdx={selectIdx}/>
      ) : null}

      <Modal2 post={post}></Modal2>
    </div>
  );
}
//컴포넌트 
// 1 반복적 html 축약할때
// 2 큰 페이지들 
// 3 자주변경되는 것들 
// state 가져올떄 문제 생김 
function Modal(props){ //props는 부모-> 자식만 가능
  //글제목 변경
  function changeTitle() {
    let copy = [...props.글제목];
    copy[props.selectIdx] = '여자 코드 추천';
    props.글제목변경(copy);
  }
  return(
    <div className='modal'>
      <h4>{props.글제목[props.selectIdx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={changeTitle}>글수정</button>
    </div>
  )
}

//옛날 문법 .. 알아만두기 
class Modal2 extends React.Component{
  constructor(props){
    super(props);
    //state저장
    this.state = {
      name:'kim',
      age : 20,
    }
  }
  render(){
    return(
      <div>안녕 {this.state.age} / {this.props.post}
       <button onClick={()=>{
        this.setState({age : 21}) //data 변경
       }}>버튼</button>
      </div>
     
    )
  }

}

export default App;
