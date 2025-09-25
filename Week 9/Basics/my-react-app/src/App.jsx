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

// export default function App(){
//         const [currentTab, setCurrentTab] = useState(1);
//         const [TabData, setTabData] = useState({});
//         const [Loading, setLoading] = useState(true);

//         useEffect(()=>{
//             setLoading(true)
//             fetch(`https://dummyjson.com/todos/${currentTab}`).then(async res=>{
//                 const json = await res.json();
//                 setLoading(false)
//                 console.log(json)
//                 setTabData(json)
//             })
//         },[currentTab])
//     return <div>
//         <button onClick={()=>setCurrentTab(1)} style={{color: currentTab==1?"red":"black"}}>Todo #1</button>
//         <button onClick={()=>setCurrentTab(2)} style={{color: currentTab==2?"red":"black"}}>Todo #2</button>
//         <button onClick={()=>setCurrentTab(3)} style={{color: currentTab==3?"red":"black"}}>Todo #3</button>
//         <br />
//         <br />
//         {Loading === false? TabData.todo: "loading..."}
//     </div>
// }







import { useEffect, useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    useEffect(()=>{
        console.log("sssssssss")
        setInterval(()=>{
        setCount(c=>c+1);
    },1000)
    },[])

    return (
        <div>
            <div
                style={{
                    backgroundColor: "red",
                    width: 10,
                    borderRadius: 30,
                    paddingLeft: 2,
                    marginLeft: 20,
                }}
            >
                {count}
            </div>
            <img
                src="https://img.icons8.com/?size=100&id=11642&format=png&color=000000"
                width={30}
            />
        </div>
    );
}
