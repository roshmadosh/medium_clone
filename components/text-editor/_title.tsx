import { useEffect, useState } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { TextEditorChildren } from "./";

const TextEditorTitle: React.FC<TextEditorChildren['title']['propTypes']> = ({ updateContentArray }) => {
  //todo: make editor fields a custom hook with boolean "blank" state
  const [titleBlank, setTitleBlank] = useState(true);

  useEffect(() => {
    const titleDOM = window.document.getElementById('title');

    // observer for subscribing to changes to title, so that placeholder is visible at right times
    const observer = new MutationObserver(function(mutationsList, observer) {
      const innerText = mutationsList[mutationsList.length - 1].target.nodeValue;
      // titleBlank handler for making placeholder (in)visible
      if (innerText !== '') {
        if (titleBlank) { // only call this on initial
          setTitleBlank(false)
        }        
      } else { // only call this when no innerText
        setTitleBlank(true);
      }
    });

    observer.observe(titleDOM, {characterData: true, subtree: true});
  
    return () => {
      observer.disconnect();
    }
  }, [])

  // imported keyDownHandler method prevents default when pressing certain keys.
  const kuh = keyDownHandler.bind(null, (e) => keyUpCallback(e));
  // empty callback, just need to prevent default behavior of keypress
  const kdh = keyDownHandler.bind(null, (e) => {});
  
  function keyUpCallback(event) {
    if (event.key === 'Enter') {
      // create a new <p> tag
      updateContentArray(false, [{ ele: 'paragraph', content: ''}])
    } else { 
      // update content of existing header tag.
      updateContentArray(true, [{ ele: 'title', content: event.target.innerText}])
    }
  }

  return(
      <div className="field">
        <h1 className={`placeholder ${titleBlank ? 'visible': ''}`} id="title-placeholder">Write title here...</h1>
        <h1 className='content' contentEditable id="title" onKeyDown={e => kdh(e)} onKeyUp={e => kuh(e)}></h1>
      </div>
  )
}

export default TextEditorTitle;