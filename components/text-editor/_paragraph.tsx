import { useEffect } from "react";
import { NewStoryChildren } from "pages/new-story";


type TEParagraphProps = NewStoryChildren['paragraph'];

const TextEditorParagraph: React.FC<TEParagraphProps> = ({ content, idx }) => {

  useEffect(() => {
    const p = document.getElementById(`p-${idx}`);
    p.focus();
  }, [])
  
  return(
    <div className="field">
      <p className='content' id={`p-${idx}`} contentEditable>{content}</p>
    </div>
  )
}

export default TextEditorParagraph;