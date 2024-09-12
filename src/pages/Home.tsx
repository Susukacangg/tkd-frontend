import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import HeroBanner from "../components/HeroBanner.tsx";

function Home() {

  return (
    <>
        <Header>
            <Navbar enableSearchBar={false} />
        </Header>
        <div className={"flex flex-row justify-center mx-auto mt-8 w-3/5"}>
            <HeroBanner/>
        </div>
    </>
  )
}

export default Home
