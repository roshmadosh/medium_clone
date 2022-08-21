import { NextPage } from "next";
import dynamic from "next/dynamic";


const NewStory: NextPage = () => {
  const onChangeTitle = (e) => {
  }

  return(
      <TextEditorTitle />
  )
}

export default NewStory

const TextEditorTitle = dynamic(
  () => import('components/text-editor/_title'),
  { ssr: false }
)
