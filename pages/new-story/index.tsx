import { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "urql";
import uuid from 'react-uuid';
import { TextEditor } from "components/text-editor";
import { Spinner } from "components/loaders";
import { EditorContentType } from "@prisma/client";

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

export type EditorContent = {
  ele: EditorContentType,
  content: string,
}

type NewStoryState = {
  contentArray: ({ id: string } & EditorContent)[]
}

type UpdateContentArgs = [id: string, update: boolean, contents: EditorContent[]];

const AddPost = `
mutation ($input: PostInput!) {
  createPost(input: $input) {
    id
  }
}
`

// --[START]-- //
const NewStory: NextPage = () => {
  const [contentArray, setContentArray] = useState<NewStoryState['contentArray']>([{ id: uuid(), ele: "title", content: '' }]);
  const [currentLine, setCurrentLine] = useState(0);
  const [addPostResult, addPost] = useMutation(AddPost);

  const onClickSubmit = async () => {
    const withoutId = contentArray.map(line => ({ ele: line.ele, content: line.content}))
    const postInput = {
      email: 'random@email.com',
      editorContent: withoutId,
    };

    await addPost({ input: postInput }).then(result => {
      if (result.error) {
        console.error(result.error);
      } 
    });
  }

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
    <div className="page" id="newstory-page">
      <TextEditor
        currentLine={currentLine} 
        contentArray={contentArray}
        updateContentArray={updateContentArray}
      />
      <div className="actions">
        <button>Cancel</button>
        {addPostResult.fetching ? <Spinner /> : <button type="submit" onClick={onClickSubmit}>Submit</button>}
      </div>
      <div className={`notif ${addPostResult.error ? 'error' : 'success'}`}>
          {addPostResult.error ? <p>Save unsuccessful.</p> : <p>{addPostResult.data && 'Post added successfully!'}</p>}
        </div>
    </div>
  )
}

export default NewStory


