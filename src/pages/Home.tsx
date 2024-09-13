import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import HeroBanner from "../components/HeroBanner.tsx";
import WordList from "../components/WordList.tsx";

function Home() {

  return (
    <>
        <Header>
            <Navbar enableSearchBar={false} />
        </Header>
        <div className={"flex flex-col gap-6 justify-center mx-auto my-10 w-3/5"}>
            <HeroBanner/>
            <WordList/>
        </div>
    </>
  )
}

export default Home
