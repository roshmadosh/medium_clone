import { KeyboardEvent, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray, content, tabCount, currentLine }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${index}`);

    // component doesn't remember innerHTML when it remounts, have to pass it as a stateful prop and assign
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
    const paragraphDOM = document.getElementById(`p-${index}`);
    switch(event.key) {
      case 'Tab': {
        const selection = window.getSelection();
        let node = selection.focusNode;
        let offset = selection.focusOffset;
        const childNodes = Array.from(node.childNodes);

        // on double-tab, selection.focusNode becomes the outer <p> tag. In this case, reassign node to its #current-tab childNode
        if (node.hasChildNodes()) {

          if (selection.focusOffset > 0) {
            const tabNodes = [-1,0,1].map(index => childNodes[selection.focusOffset - index])
                    .filter(childNode => childNode && childNode.nodeName === 'PRE');
            if (tabNodes.length > 0) {
              node = tabNodes.pop();
            }
          } else {
            node = childNodes[selection.focusOffset];
          }
          offset = 0;
        }
        
        if (node.nodeType === 3) {
          if (node.textContent.length === 1 && node.textContent.charCodeAt(0) == 8203) {
            node = node.previousSibling;
          } else if (node.textContent.length === selection.focusOffset) {
            if (node.nextSibling?.nodeName === 'PRE') {
              node = node.nextSibling;
              offset = 0;
            }
          } else if (selection.focusOffset === 0) {
            if (node.previousSibling) {
              node = node.previousSibling;
            }
            // offset should already be zero.
          }

        }

        // **Not allowing tab if selection is multichar. Introduces new bugs that are difficult to resolve.
        if (selection.toString()) {
          return;
        }
     
        // count the existing tag elements, and include current tag being added
        tabCount = Array.from(paragraphDOM.innerHTML.matchAll(/<pre/g)).length + 1;
  
        // to distinguish current tabspace from previous ones
        const TABSPACE = `<pre id=\"current-tabspace\" contenteditable=\"false\">    </pre>`;
        // previous tabspaces
        const DEFAULT_TABSPACE = `<pre contenteditable=\"false\">    </pre>`;
        // this is a placeholder. made ambiguous to prevent replacing user input
        const CURRENT_TAB_PLACEHOLDER = `SUPERSERCRETKEY`;
     
        // insert the placeholder inside relevant node (textcontent gets split into nodes when it contains HTML, such as our TABSPACE element) 
        node.textContent = node.textContent.slice(0, offset) 
          + CURRENT_TAB_PLACEHOLDER + node.textContent.slice(offset, node.textContent.length);

        // replace prevous current tabspace with a "default" tabspace
        event.target.innerHTML = event.target.innerHTML.replaceAll('id=\"current-tabspace\"', '');

        // this placeholder replacement may seem like an extra step, but is necessary bc innerhtml can't be sliced like textContent
        event.target.innerHTML = event.target.innerHTML.replace(CURRENT_TAB_PLACEHOLDER, TABSPACE);

        const content = event.target.innerHTML;

        // state-setter for persistance purposes
        updateContentArray(true, [{ ele: 'paragraph', content, tabCount }]);
        

        // if tab is added to end of content, add an empty zero-width character so that cursor shows after tab.
        if (paragraphDOM.lastChild.nodeType !== 3) {
          paragraphDOM.innerHTML += '&#8203';
        } 

        // move cursor to end of current-tabspace
        var range = document.createRange();
        var sel = window.getSelection();
        node = paragraphDOM.querySelector(`#current-tabspace`);
        while (node.parentNode.nodeName === 'PRE') {
          node = node.parentNode;
        }
      
        range.setStartAfter(node);
        range.setEndAfter(node);
        range.collapse(false);
        
        sel.removeAllRanges()
        sel.addRange(range)
        console.log('END:', selection.focusNode);
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