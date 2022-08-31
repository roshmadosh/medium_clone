import { useState } from "react";
import { NewStoryChildren } from "pages/new-story";
import dynamic from "next/dynamic";

export type TextEditorChildren = {
  title: {
    propTypes: {
      updateContentArray: (...args: UpdateContentArgs) => void,
    }
  },
  paragraph: { //TODO too many proptypes
    propTypes: {
      index: number,
      content: string,
      currentLine: NewStoryChildren['textEditor']['propTypes']['currentLine'],
      tabCount: number,
      updateContentArray: (...args: UpdateContentArgs) => void,
    }
  },
}

// children won't need to pass id (index 0) as argment for updateContentArray()
type UpdateContentArgs = [
  NewStoryChildren['textEditor']['utilTypes']['updateContentArgs'][1], 
  NewStoryChildren['textEditor']['utilTypes']['updateContentArgs'][2]
]

export const TextEditor: React.FC<NewStoryChildren['textEditor']['propTypes']> = ({ currentLine, contentArray, updateContentArray }) => {

  return (
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
    <div className="actions">
      <button>Cancel</button>
      <button type="submit">Submit</button>
    </div>
  </div>
  )
}

const TextEditorTitle = dynamic(
  () => import('components/text-editor/_title'),
  { ssr: false }
)

const TextEditorParagraph = dynamic(
  () => import('components/text-editor/_paragraph'),
  { ssr: false }
)