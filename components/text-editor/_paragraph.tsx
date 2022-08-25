import { useState, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ updateContentArray, idx }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${idx}`);
    
    paragraphDOM.focus(); // focuses on component mount

  }, [])

  const kdh = keyDownHandler.bind(null, (e) => keyDownCallback(e));

  function keyDownCallback(event) {
    if (event.key === 'Enter') {
      // creates a new <p> tag
      updateContentArray(false, [{ ele: 'paragraph', content: ''}])
    } else {
      // updates current <p> tag content.
      updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerText + event.key }]);
    }
  }
  
  return(
    <div className="field">
      <p className='content' id={`p-${idx}`} contentEditable onKeyDown={e => kdh(e)}></p>
    </div>
  )
}

export default TextEditorParagraph;