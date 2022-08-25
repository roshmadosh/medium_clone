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
      setContentArray([...contentArray.slice(0,idx), ...contents, ...contentArray.slice(idx+1)]);

    } else {
      setContentArray([...contentArray, ...contents]);
    }
  }

  return(
    <div className="text-editor">
      {contentArray.map((item, idx) => {
        if (item.ele === 'title') return <TextEditorTitle updateContentArray={updateContentArray.bind(null, 0)}/>
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
