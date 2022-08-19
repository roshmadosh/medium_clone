import { Header } from "./_header";

export default function Layout(props: any) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}