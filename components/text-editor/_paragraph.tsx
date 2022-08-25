import { useState, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";
import uuid from "react-uuid";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${index}`);
    
    paragraphDOM.focus(); // focuses on component mount

  }, [])

  const kdh = keyDownHandler.bind(null, (e) => keyDownCallback(e));

  function keyDownCallback(event) {
    if (event.key === 'Shift' || /^Arrow/.test(event.key)) {
      return;
    }
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
      <h2>{index}</h2>
      <p className='content' id={`p-${index}`} contentEditable onKeyDown={e => kdh(e)}></p>
    </div>
  )
}

export default TextEditorParagraph;