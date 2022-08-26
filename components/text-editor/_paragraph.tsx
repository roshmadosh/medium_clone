import { KeyboardEvent, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray, content, currentLine }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${index}`);

    // component doesn't remember innerText when it remounts, have to pass it as a stateful prop and assign
    // here.
    paragraphDOM.innerHTML = content;
    if (index === currentLine) {
      paragraphDOM.focus(); // focuses on component mount
    }
  }, [])

  // keyup for update logic. keydown to prevent adding newline to DOM
  const kuh = keyDownHandler.bind(null, (e) => keyUpCallback(e));
  // empty callback, just need to prevent default behavior of keypress
  const kdh = keyDownHandler.bind(null, (e) => keyDownCallback(e));
  
  
  // TODO might want to make this a switch-case
  function keyUpCallback(event) {
    if (event.key === 'Tab') {
      // need this in case someone tabs on a multi-char selection
      const { anchorOffset, focusOffset } = window.getSelection();
      console.log(anchorOffset, focusOffset);

      // if selection a single space, just add TABSPACE
      if (anchorOffset == focusOffset) {
        const paragraphDOM = document.getElementById(`p-${index}`);
        const TABSPACE = '    ';
        // state-setter for persisting content onChange
        updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerHTML + TABSPACE }]);
        // to see changes on DOM
        event.target.innerHTML += TABSPACE;
        // move cursor to end of content
        window.getSelection().setPosition(paragraphDOM, paragraphDOM.childNodes.length);
      }
    }
    if (event.key === 'Shift' || /^Arrow/.test(event.key)) {
      return;
    }
    if (event.key === 'Enter') {
      // creates a new <p> tag
      updateContentArray(false, [{ ele: 'paragraph', content: ''}])
    } else {
      // updates current <p> tag content.
      updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerHTML}]);
    }
  }

  function keyDownCallback(event) {

  }
  
  return(
    <div className="field">
      <h2>{index}</h2>
      <pre className='content' id={`p-${index}`} contentEditable onKeyDown={e => kdh(e)} onKeyUp={e => kuh(e)}></pre>
    </div>
  )
}

export default TextEditorParagraph;