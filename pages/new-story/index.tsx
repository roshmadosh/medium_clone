import { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { StateSetters } from 'utils/types';
import uuid from 'react-uuid';


export type editorContent = {
  id: string,
  ele: 'title' | 'subheader' | 'paragraph',
  content: string
}
export type NewStoryChildren = {
  title: {
    updateContentArray: UpdateContentArray,
  }
  paragraph: {
    index: number,
    updateContentArray: UpdateContentArray,
  } & Partial<{ [property in keyof NewStoryType]: NewStoryType[property]; }>
} 

type NewStoryType = NewStoryState & StateSetters<NewStoryState>;

type NewStoryState = {
  contentArray: editorContent[]
}
type UpdateContentArray = (update: boolean, contents: Omit<editorContent, "id">[]) => void


// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([{ id: uuid(), ele: 'title', content: '' }]);
  
  // Wrapper function to state-setter.
  // Use bind method to create from it a new function that's specific to the use-case.
  const updateContentArray = (id: string, update: boolean, contents: Omit<editorContent, "id">[]) => {
    const idx = contentArray.findIndex(item => item.id === id);
    const withId = contents.map(content => ({ id: update ? id : uuid(), ...content }));

    // either update at index or add from index, depending on update param
    setContentArray([...contentArray.slice(0, update ? idx : idx + 1), ...withId, ...contentArray.slice(idx+1)]);
  }

  return(
    <div className="text-editor">
      {contentArray.map((item, index) => {
        if (item.ele === 'title') return <TextEditorTitle key={item.id} updateContentArray={updateContentArray.bind(null, item.id)}/>
        else if (item.ele === 'paragraph') { 
          return (
            <>
              <br></br>
              <TextEditorParagraph
                index={index}
                key={item.id}
                updateContentArray={updateContentArray.bind(null, item.id)} 
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
