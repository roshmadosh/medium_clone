import { KeyboardEvent, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray, content, currentLine }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${index}`);

    // component doesn't remember innerText when it remounts, have to pass it as a stateful prop and assign
    // here.
    paragraphDOM.innerText = content;
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
    switch(event.key) {
      case 'Tab': {
        // need this in case someone tabs on a multi-char selection
        const selection = window.getSelection();
        const node = selection.focusNode;

        // if selection is mulitchar, delete selection first.
        if (selection.toString()) {
          selection.deleteFromDocument();
        }
        
        // this is inserted where tab was pressed
        const TABSPACE = "<pre contenteditable=\"false\">    </pre>";
        // this is a placeholder
        const SECRET_TAB_HOLDER = 'qwelkfSvjh23fadfqef';

        const offset = selection.focusOffset;
        // insert the placeholder inside relevant node (textcontent gets split into nodes when it contains HTML, such as our TABSPACE element) 
        node.textContent = node.textContent.slice(0, offset) 
          + SECRET_TAB_HOLDER + node.textContent.slice(offset, node.textContent.length);
  
        // this is done to sniff out all the previously-entered tabspaces that wouldn't show in innertext 
        event.target.innerHTML = event.target.innerHTML.replaceAll(TABSPACE, SECRET_TAB_HOLDER);
        
        // all the placeholders replaced with stringifyed TABSPACE. This may look silly but is necessary bc innerHTML can't be sliced.
        const content = event.target.innerText.replaceAll(SECRET_TAB_HOLDER, TABSPACE);

        // state-setter for persistance purposes
        updateContentArray(true, [{ ele: 'paragraph', content }]);

        // to see changes on DOM
        event.target.innerHTML = content;
     
        // TODO move cursor to end of content

        break;
      }
      case 'Enter': {
        updateContentArray(false, [{ ele: 'paragraph', content: ''}]);
        break;
      }
      case 'Shift': {
        return;
      }
      default: { // for all other keys
        updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerText}]); 
      }
    }
  }

  function keyDownCallback(event) {

  }
  
  return(
    <div className="field">
      <h2>{index}</h2>
      <p className='content' id={`p-${index}`} contentEditable onKeyDown={e => kdh(e)} onKeyUp={e => kuh(e)}></p>
    </div>
  )
}

export default TextEditorParagraph;