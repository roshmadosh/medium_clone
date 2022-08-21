import { useEffect, useState } from "react";


// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object


const TextEditorTitle = () => {
  //todo: make editor fields a custom hook with boolean "blank" state
  const [title, setTitle] = useState('');
  const [titleBlank, setTitleBlank] = useState(true);
  const [titleFocused, setTitleFocused] = useState(false);

  // putting the mutation observer inside a useEffect feels like an anti-pattern, but whatever
  useEffect(() => {
    const title = window.document.getElementById('title');

    title.addEventListener('focus', () => {
      setTitleFocused(true);
    })
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
  return(
    <div className="text-editor">
      <div className="field">
        <h1 className={`placeholder ${titleBlank ? 'visible': ''}`} id="title-placeholder">Write title here...</h1>
        <h1 className='content' contentEditable id="title"></h1>
      </div>
    </div>

      
  )
}

export default TextEditorTitle;