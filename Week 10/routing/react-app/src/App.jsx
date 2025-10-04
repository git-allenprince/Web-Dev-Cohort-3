import { useRef } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/helo" element={<Layout></Layout>}>
                        <Route
                            path="/helo/hello1"
                            element={<Hello1></Hello1>}
                        ></Route>
                        <Route
                            path="/helo/hello2"
                            element={<Hello2></Hello2>}
                        ></Route>
                        <Route
                            path="/helo/hello3"
                            element={<Hello3></Hello3>}
                        ></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

function Layout() {
    const inputRef = useRef();
    function focusOnInput(){
        inputRef.current.focus();
    }

    return (
        <>
            <Header></Header>
            <div style={{ height: "60vh" }}>
                <Outlet></Outlet>
            </div>
            <input type="text" ref={inputRef} />
            <button onClick={focusOnInput}>Submit</button>
            footer
        </>
    );
}
function Header() {
    return (
        <>
            <Link to="/helo/hello1">hello1</Link> <br />
            <Link to="/helo/hello2">hello2</Link> <br />
            <Link to="/helo/hello3">hello3</Link>
        </>
    );
}

function Hello1() {
    return (
        <>
            <div>welcome to hello1</div>
        </>
    );
}
function Hello2() {
    return <>welcome to hello2</>;
}
function Hello3() {
    return <>welcome to hello3</>;
}
