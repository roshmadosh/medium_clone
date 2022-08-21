import { useEffect } from "react";


// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object


const TextEditorTitle = () => {


  useEffect(() => {
    const title = window.document.getElementById('title');

    console.log(title);
    const observer = new MutationObserver(function(mutationsList, observer) {
      console.log(mutationsList[0].target.nodeValue);
    });

    observer.observe(title, {characterData: true, subtree: true});
  
    return () => {
      observer.disconnect();
    }
  }, [])
  return(
      <h1 contentEditable id="title">d</h1>
  )
}

export default TextEditorTitle;