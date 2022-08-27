import { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { StateSetters } from 'utils/types';
import uuid from 'react-uuid';

export type editorContent = {
  id: string,
  ele: 'title' | 'subheader' | 'paragraph',
  content: string,
  tabCount?: number
}
export type NewStoryChildren = {
  title: {
    updateContentArray: (...args: UpdateContentArgs) => void,
  }
  paragraph: {
    index: number,
    content: string,
    currentLine: number,
    tabCount: number,
    updateContentArray: (...args: UpdateContentArgs) => void,
  } & Partial<{ [property in keyof NewStoryType]: NewStoryType[property]; }>
} 

type NewStoryType = NewStoryState & StateSetters<NewStoryState>;

type NewStoryState = {
  contentArray: editorContent[]
}

type UpdateContentArgs = [update: boolean, contents: Omit<editorContent, "id">[]]


// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([{ id: uuid(), ele: 'title', content: '' }]);
  const [currentLine, setCurrentLine] = useState(0);
  // Wrapper function to state-setter.
  // Use bind method to create from it a new function that's specific to the use-case.
  const updateContentArray = (id: string, ...rest: UpdateContentArgs) => {
    const [update, contents] = rest;
    const idx = contentArray.findIndex(item => item.id === id);
    const withId = contents.map(content => ({ id: update ? id : uuid(), ...content }));

    // either update at index or add from index, depending on update param
    setContentArray([...contentArray.slice(0, update ? idx : idx + 1), ...withId, ...contentArray.slice(idx+1)]);
    if (!update) {
      setCurrentLine(idx+1);
    }
  }

  return(
    <div className="text-editor">
      {contentArray.map((item, index) => {
        if (item.ele === 'title') {
          return <TextEditorTitle key={item.id} updateContentArray={updateContentArray.bind(null, item.id)}/>
        }
        else if (item.ele === 'paragraph') { 
          return (
            <>
              <br></br>
              {/* TODO too many props here. Try to make it fewer */}
              <TextEditorParagraph
                index={index}
                content={item.content}
                currentLine={currentLine}
                key={item.id}
                tabCount={item.tabCount}
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
