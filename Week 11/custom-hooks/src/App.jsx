import { useState } from "react";


function useFetch(x){
  const [post, setPost]=useState({});
  const [loading, setLoading] = useState(false)

  async function getPost(){
    setLoading(true);
    const res = await fetch(x);
    const json = await res.json();
    setLoading(false)
    setPost(json);
  }

  return{post,getPost,loading}


}


export default function App() {
    const {post, getPost,loading} = useFetch('https://jsonplaceholder.typicode.com/todos/1');
    return (
        <div>
            <button onClick={getPost}>click</button>
            <div>{loading?"loading...":post.title}</div>
        </div>
    );
}
