import { useEffect, useState } from "react";
import { keyDownHandler } from "utils/eventHandlers"
import { editorContent } from "pages/new-story";
import { NewStoryType } from "pages/new-story";


type TextEditorProps = NewStoryType;

const TextEditorTitle: React.FC<TextEditorProps> = ({contentArray, setContentArray}) => {
  //todo: make editor fields a custom hook with boolean "blank" state
  const [title, setTitle] = useState('');
  const [titleBlank, setTitleBlank] = useState(true);


  // putting the mutation observer inside a useEffect feels like an anti-pattern, but whatever
  useEffect(() => {
    const title = window.document.getElementById('title');

    // observes changes to innertext of #title. This is required bc onChange attribute for jsx does not work with contentEditable attr
    const observer = new MutationObserver(function(mutationsList, observer) {
      const innerText = mutationsList[0].target.nodeValue;
      // titleBlank handler, for adding/removing CSS visible class on placeholder
      if (innerText !== '') {
        if (titleBlank) { // only call this on initial
          setTitleBlank(false)
        }        
      } else { // only call this when no innerText
        setTitleBlank(true);
      }
      setTitle(innerText);
    });

    observer.observe(title, {characterData: true, subtree: true});
  
    return () => {
      observer.disconnect();
    }
  }, [])

  function keyDownCallback(addedContent: editorContent) {
    const emptyParagraph = {
      ele: 'paragraph',
      content: ''
    } as const;
    setContentArray([...contentArray, emptyParagraph])
  }



  const kdh = keyDownHandler.bind(null, 'Enter', () => keyDownCallback({ ele: 'title', content: title }));

  return(

      <div className="field">
        <h1 className={`placeholder ${titleBlank ? 'visible': ''}`} id="title-placeholder">Write title here...</h1>
        <h1 className='content' contentEditable id="title" onKeyDown={e => kdh(e)}></h1>
      </div>

  )
}

export default TextEditorTitle;