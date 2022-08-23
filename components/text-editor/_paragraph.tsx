import { useState, useEffect } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ updateContentArray, idx }) => {
  const [paragraph, setParagraph] = useState(''); // for recording paragraph content

  useEffect(() => {
    const paragraphDOM = document.getElementById(`p-${idx}`);

    // observes changes to innertext. This is required bc onChange attribute for jsx does not work with contentEditable attr
    const observer = new MutationObserver(function(mutationsList, observer) {
      // takes the last element in the array bc that's the one that holds the content. idk why
      const innerText = mutationsList[mutationsList.length - 1].target.nodeValue;
      setParagraph(innerText);
    });

    observer.observe(paragraphDOM, {characterData: true, subtree: true});
    paragraphDOM.focus();

    return () => {
      observer.disconnect();
    }
  }, [])

  const kdh = keyDownHandler.bind(null, (e) => keyDownCallback(e));

  function keyDownCallback(event) {
    if (event.key === 'Enter') {
      updateContentArray(false, [{ ele: 'paragraph', content: ''}])
    }
    updateContentArray(true, [{ ele: 'paragraph', content: paragraph }]);
  }
  
  return(
    <div className="field">
      <p className='content' id={`p-${idx}`} contentEditable onKeyDown={e => kdh(e)}></p>
    </div>
  )
}

export default TextEditorParagraph;