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
    appendContentArray: AppendContentArray;
  }
  paragraph: {
    appendContentArray: AppendContentArray;
    content: editorContent['content'],
    idx: number
  } & Partial<{ [property in keyof NewStoryType]: NewStoryType[property]; }>
} 

type NewStoryType = NewStoryState & StateSetters<NewStoryState>;

type NewStoryState = {
  contentArray: editorContent[]
}

type AppendContentArray = (content: editorContent) => void;

// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([]);
  const appendContentArray = (content: editorContent) => {
    setContentArray([...contentArray, content]);
  }

  return(
    <div className="text-editor">
      <TextEditorTitle appendContentArray={appendContentArray}/>

      {contentArray.map((item, idx) => {
        if (item.ele === 'subheader') return (<><br></br><h3 contentEditable>{item.content}</h3></>)
        else if (item.ele === 'paragraph'){ 
          return (
            <>
              <br></br>
              <TextEditorParagraph
                appendContentArray={appendContentArray} 
                content={item.content} 
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
