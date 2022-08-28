import { KeyboardEvent, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray, content, tabCount, currentLine }) => {

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
    const paragraphDOM = document.getElementById(`p-${index}`);
    switch(event.key) {
      case 'Tab': {
        const selection = window.getSelection();
        let node = selection.focusNode;
        // **Not allowing tab if selection is multichar. Introduces new bugs that are difficult to resolve.
        if (selection.toString()) {
          return;
        }
     
        // count the existing tag elements, and include current tag being added
        tabCount = Array.from(paragraphDOM.innerHTML.matchAll(/<pre/g)).length + 1;
  
        // this is a placeholder. made ambiguous to prevent replacing user input
        const SECRET_TAB_HOLDER = `SUPERSERCRETKEY`;
       
        const offset = selection.focusOffset;
        // insert the placeholder inside relevant node (textcontent gets split into nodes when it contains HTML, such as our TABSPACE element) 
        node.textContent = node.textContent.slice(0, offset) 
          + SECRET_TAB_HOLDER.concat(`-${tabCount}`) + node.textContent.slice(offset, node.textContent.length);
  
         // this is done to sniff out all the previously-entered tabspaces that wouldn't show in innertext 
        for (let i=1 ; i <= tabCount; i++) {
          const lookupString = `<pre id=\"pre-${i}\" contenteditable=\"false\">    </pre>`;
          event.target.innerHTML = event.target.innerHTML.replace(lookupString, SECRET_TAB_HOLDER.concat(`-${i}`));
        }
       
      // all the placeholders replaced with stringifyed TABSPACE. This may look silly but is necessary bc innerHTML can't be sliced.
        for (let j=1; j <= tabCount; j++) {
          const lookupString = 
            `<pre id=\"pre-${j}\" contenteditable=\"false\">    </pre>`;
          event.target.innerHTML = event.target.innerHTML.replace(SECRET_TAB_HOLDER.concat(`-${j}`), lookupString);
        }

        const content = event.target.innerHTML;

        // state-setter for persistance purposes
        updateContentArray(true, [{ ele: 'paragraph', content, tabCount }]);

        // TODO move cursor to end of content
        var range = document.createRange();
        var sel = window.getSelection();
        
        // if tab is added to end of content, add an empty zero-width character so that cursor shows after tab.
        if (Array.from(paragraphDOM.childNodes).pop().nodeType !== 3) {
          paragraphDOM.innerHTML += '&#8203';
        } 

        node = paragraphDOM.querySelector(`#pre-${tabCount}`);
        range.setStartAfter(node);
        range.setEndAfter(node);

        console.log('NODE', node);

        range.collapse(false);
        
        sel.removeAllRanges()
        sel.addRange(range)

        break;
      }
      case 'Enter': {
        updateContentArray(false, [{ ele: 'paragraph', content: '', tabCount: 0 }]);
        break;
      }
      case 'Shift': {
        return;
      }
      default: { // for all other keys
        updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerText, tabCount }]); 
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