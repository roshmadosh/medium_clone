import { NextPage } from "next";
import { useState } from "react";
import { StateSetters } from 'utils/types';
import uuid from 'react-uuid';
import { TextEditor } from "components/text-editor";

export type NewStoryChildren = {
  textEditor: {
    propTypes: {
      currentLine: number,
      updateContentArray: (...args: UpdateContentArgs) => void,
    } & NewStoryState;
    utilTypes: { // passing args down for redefining a binded version of fn
      updateContentArgs: UpdateContentArgs
    }
  }
}

type NewStoryState = {
  contentArray: ({ id: string } & EditorContent)[]
}

type EditorContent = {
  ele: 'title' | 'subheader' | 'paragraph',
  content: string,
  tabCount?: number
}

type UpdateContentArgs = [id: string, update: boolean, contents: EditorContent[]];



// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([{ id: uuid(), ele: 'title', content: '' }]);
  const [currentLine, setCurrentLine] = useState(0);
  // Wrapper function to state-setter.
  // Use bind method to create from it a new function that's specific to the use-case.
  const updateContentArray = (...args: UpdateContentArgs) => {
    const [id, update, contents] = args;
    const idx = contentArray.findIndex(item => item.id === id);
    const withId = contents.map(content => ({ id: update ? id : uuid(), ...content }));

    // either update at index or add from index, depending on update param
    setContentArray([...contentArray.slice(0, update ? idx : idx + 1), ...withId, ...contentArray.slice(idx+1)]);
    if (!update) {
      setCurrentLine(idx+1);
    }
  }

  return (
    <TextEditor
      currentLine={currentLine} 
      contentArray={contentArray}
      updateContentArray={updateContentArray}
    />
  )
}

export default NewStory


