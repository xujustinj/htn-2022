import React, { useState } from "react";
import { Player } from "@remotion/player";
import { MyComp } from "./remotion/MyComp";


const API_URL = process.env.REACT_APP_API_URL;
async function getSummary(text){
    const request = { text };
    const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      return await response.json().summary;
}
  
    

function App() {
     // Text source: https://ugo-ii.com/products/content
  // const [text, setText] = useState(
  //   "Employee recognition boosts morale and is the core of any great company. But, employee of the month awards are too temporary. UGO II has introduced employee of the decade awards to truly give our employees the sense that their contributions are appreciated. To ensure each employee will have a decade to be recognized in, UGO II has pre-reserved decades up to the year 32000."
  // );
  // const [summary, setSummary] = useState("");

  // const submit = async () => {
  //   setSummary(await getSummary(text));
  // };




  // return (
  //   <div>
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         submit();
  //       }}
  //     >
  //       <textarea value={text} onChange={(e) => setText(e.target.value)} />
  //       <input type="submit" value="submit" />
  //     </form>
  //     <p>{summary}</p>
  //   </div>
  // );
  return(
  <Player
      component={MyComp}
      inputProps={{ text: "World" }}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{
        width: 1280,
        height: 720,
      }}
      controls
    />
    );
}

export default App;