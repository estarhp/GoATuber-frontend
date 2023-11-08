import './App.css'
import {useEffect} from "react";
import ws from "./ws";
function App() {
    useEffect(() => {
        ws.startHeartbeat()
        ws.stopHeartbeat()
    }, []);


  return (
    <>
    </>
  )
}

export default App
