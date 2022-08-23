import { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { StateSetters } from 'utils/types';


export type editorContent = {
  ele: 'title' | 'subheader' | 'paragraph',
  content: string
}
export type NewStoryChildren = {
  title: {
    updateContentArray: (update: boolean, contents: editorContent[]) => void;
  }
  paragraph: {
    updateContentArray: (update: boolean, contents: editorContent[]) => void;
    idx: number
  } & Partial<{ [property in keyof NewStoryType]: NewStoryType[property]; }>
} 

type NewStoryType = NewStoryState & StateSetters<NewStoryState>;

type NewStoryState = {
  contentArray: editorContent[]
}

// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([{ ele: 'title', content: '' }]);
  
  // Wrapper function to state-setter.
  // Use bind method to create from it a new function that's specific to the use-case.
  const updateContentArray = (idx: number, update: boolean, contents: editorContent[]) => {
    if (update) {
      contentArray[idx] = contents[0]
    } else {
      setContentArray([...contentArray, ...contents]);
    }
  }

  return(
    <div className="text-editor">
      <TextEditorTitle updateContentArray={updateContentArray.bind(null, 0)}/>
      {contentArray.map((item, idx) => {
        if (item.ele === 'subheader') return (<><br></br><h3 contentEditable>{item.content}</h3></>)
        else if (item.ele === 'paragraph'){ 
          return (
            <>
              <br></br>
              <TextEditorParagraph
                updateContentArray={updateContentArray.bind(null, idx)} 
                idx={idx}
              />
            </>
          )
        }
      })}

    </div>
  )
}

export default NewStory

const TextEditorTitle = dynamic(
  () => import('components/text-editor/_title'),
  { ssr: false }
)

const TextEditorParagraph = dynamic(
  () => import('components/text-editor/_paragraph'),
  { ssr: false }
)
