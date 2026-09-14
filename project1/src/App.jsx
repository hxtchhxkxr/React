import "./App.css";
import { useRef, useEffect, useState } from "react";
import Controller from "./component/Controller";
import Viewer from "./component/Viewer";
import Even from "./component/Even";

function App() {
  // count : state 변수, setCount : setter 함수
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  // 이벤트핸들러 : setCount함수를 호출하는 함수
  const handdleSetCount = (value) => {
    setCount(count + value);
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const didMountRef = useRef(false);

  // useEffect(콜백, 의존성배열) : 의존성배열에 있는 값이 변경될 때마다 콜백함수가 호출됨
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    } else {
      console.log("컴포넌트 업데이트");
    }
  });

  useEffect(() => {
    console.log("컴포넌트 마운트");
  }, []); // 의존성 배열이 비어있으면 마운트될 때만 실행

  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     console.log("깜빡");
  //   }, 1000);

  //   return () => {
  //     console.log("클린업");
  //     clearInterval(intervalID);
  //   };
  // });

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={text} onChange={handleChangeText} />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller handleSetCount={handdleSetCount} />
      </section>
    </div>
  );
}

export default App;
