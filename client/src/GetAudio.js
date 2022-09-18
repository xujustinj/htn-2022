import React from 'react'
import { storage } from './firebase'
import { ref, getDownloadURL } from "firebase/storage";

export function GetAudio() {
    const [urlAudio, setUrl] = React.useState(null)

    function audio(){
        getDownloadURL(ref(storage, 'myFolder/myFile.wav')).then((url) => { 
            setUrl(url)
            console.log(urlAudio)})
            .catch((error) => {console.log(error)})
    }


  return (
   <button onClick={audio}>Click Me</button>
  )
}
