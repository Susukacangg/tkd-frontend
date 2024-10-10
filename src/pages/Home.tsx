import Header from "../components/Header.tsx";
import HeroBanner from "../components/HeroBanner.tsx";
import WordList from "../components/WordList.tsx";

function Home() {

  return (
    <>
        <Header enableSearchBar={false}/>
        <div className={"flex flex-col gap-6 justify-center mx-auto my-10 w-3/5"}>
            <HeroBanner/>
            <WordList/>
        </div>
    </>
  )
}

export default Home
