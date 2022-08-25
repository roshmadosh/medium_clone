import { useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ index, updateContentArray, content, currentLine }) => {

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${index}`);
    paragraphDOM.innerText = content;
    if (index === currentLine) {
      paragraphDOM.focus(); // focuses on component mount
    }
  }, [])

  const kuh = keyDownHandler.bind(null, (e) => keyUpCallback(e));
  const kdh = keyDownHandler.bind(null, (e) => { console.log('newline prevented'); });
  function keyUpCallback(event) {
    if (event.key === 'Shift' || /^Arrow/.test(event.key)) {
      return;
    }
    if (event.key === 'Enter') {
      // creates a new <p> tag
      updateContentArray(false, [{ ele: 'paragraph', content: ''}])
    } else {
      // updates current <p> tag content.
      updateContentArray(true, [{ ele: 'paragraph', content: event.target.innerText}]);
    }
  }
  
  return(
    <div className="field">
      <h2>{index}</h2>
      <p className='content' id={`p-${index}`} contentEditable onKeyDown={e => kdh(e)} onKeyUp={e => kuh(e)}></p>
    </div>
  )
}

export default TextEditorParagraph;