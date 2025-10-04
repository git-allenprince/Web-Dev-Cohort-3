import { useRef, useState } from "react";

export default function App() {
    const [currentCount, setCurrentCount] = useState(0);
    const timer = useRef();
    function startTimer() {
        let value = setInterval(() => {
            console.log("tick");
            setCurrentCount((c) => c + 1);
        }, 1000);
        timer.current = value;
    }
    function stopTimer() {
      console.log(timer.current)
      clearInterval(timer.current);
    }
    return (
        <div>
            {currentCount}
            <br />
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}

// export default function App(){
//     return <div>
//         <Card>
//             Hi hello
//         </Card>
//         <Card>
//             Hi sughano
//         </Card>
//     </div>
// }

// function Card({children}){
//     return <span style={{backgroundColor:"#b2bec3", borderRadius: 5}}>
//         {children}
//     </span>
// }

// import { useEffect, useState } from "react";

// export default function App() {
//   const [currentTab, setCurrentTab] = useState(1);
//   const [TabData, setTabData] = useState({});
//   const [Loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`https://dummyjson.com/todos/${currentTab}`).then(async (res) => {
//       const json = await res.json();
//       setTabData(json);
//       setLoading(false);
//     });
//   }, [currentTab]);

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => setCurrentTab(1)}
//         style={{ color: currentTab === 1 ? "red" : "black", marginRight: "8px" }}
//       >
//         Todo #1
//       </button>
//       <button
//         onClick={() => setCurrentTab(2)}
//         style={{ color: currentTab === 2 ? "red" : "black", marginRight: "8px" }}
//       >
//         Todo #2
//       </button>
//       <button
//         onClick={() => setCurrentTab(3)}
//         style={{ color: currentTab === 3 ? "red" : "black" }}
//       >
//         Todo #3
//       </button>

//       <br />
//       <br />

//       {Loading ? <Skeleton /> : <h2>{TabData?.todo}</h2>}
//     </div>
//   );
// }

function Skeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-40"></div>
        </div>
    );
}
