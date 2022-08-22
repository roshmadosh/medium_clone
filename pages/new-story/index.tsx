import { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { StateSetters } from 'utils/types';

export type editorContent = {
  ele: 'title' | 'subheader' | 'paragraph',
  content: string
}

export type NewStoryType = NewStoryState & StateSetters<NewStoryState>;

export type NewStoryChildren = {
  paragraph: {
    content: editorContent['content'],
    idx: number
  } & Partial<{ [property in keyof NewStoryType]: NewStoryType[property]; }>
} 

type NewStoryState = {
  contentArray: editorContent[]
}

// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([]);


  return(
    <div className="text-editor">
      <TextEditorTitle contentArray={contentArray} setContentArray={setContentArray}/>
      <div>
        {contentArray.map((item, idx) => {
          if (item.ele === 'subheader') return (<><br></br><h3 contentEditable>{item.content}</h3></>)
          else if (item.ele === 'paragraph'){ 
            return (<><br></br><TextEditorParagraph content={item.content} idx={idx}/></>)
          }
        })}
    </div>
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
