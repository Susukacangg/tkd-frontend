import Header from "../components/common/Header.tsx";
import HeroBanner from "../components/home/HeroBanner.tsx";
import WordList from "../components/home/WordList.tsx";

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
