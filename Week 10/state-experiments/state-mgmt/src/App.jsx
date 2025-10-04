// import { createContext } from "react";
import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
// const CountContext = createContext();

// function CountContextProvider({ children }) {
//     const [count, setCount] = useState(0);
//     return (
//         <CountContext.Provider value={{ count, setCount }}>
//             {children}
//         </CountContext.Provider>
//     );
// }

const countAtom = atom({
    key: "countState",
    default: 0,
});

export default function Parent() {
    return (
        <RecoilRoot>
            <Increase />
            <Decrease />
            <Value />
        </RecoilRoot>
    );
}

function Increase() {
    const setCount = useSetRecoilState(countAtom);

    return <button onClick={() => setCount((c) => c + 1)}>Increase</button>;
}

function Decrease() {
    const setCount = useSetRecoilState(countAtom)

    return <button onClick={() => setCount((c) => c - 1)}>Decrease</button>;
}

function Value() {
    const count = useRecoilValue(countAtom);
    return (
        <>
            <div>Count: {count}</div>
        </>
    );
}

// import { createContext, useContext, useState } from "react";

// const BulbContext = createContext();

// export default function App() {
//     const [bulbOn, setBulbOn] = useState(true);
//     return (
//         <div>
//             <BulbContext.Provider
//                 value={{
//                     bulbOn: bulbOn,
//                     setBulbOn: setBulbOn,
//                 }}
//             >
//                 <LightBulb></LightBulb>
//             </BulbContext.Provider>
//         </div>
//     );
// }

// function LightBulb() {
//     return (
//         <div>
//             <LightState/>
//             <LightSwitch/>
//         </div>
//     );
// }

// function LightState() {
//     const {bulbOn} = useContext(BulbContext)
//     return <div>{bulbOn ? "Bulb is on" : "Bulb is off"}</div>;
// }

// function LightSwitch() {
//   const {bulbOn,setBulbOn} = useContext(BulbContext)
//     return (
//         <div>
//             <button
//                 onClick={() => {
//                     setBulbOn(!bulbOn);
//                 }}
//             >
//                 Toggle{" "}
//             </button>
//         </div>
//     );
// }
