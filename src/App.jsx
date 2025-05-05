import Routing from "./route";
import MainLayout from "./layout/MainLayout";
import "./App.scss";

function App() {
  return (
    <>
      <header className="header">
        <p>Anime Search App</p>
      </header>
      <MainLayout>
        <Routing />
      </MainLayout>
    </>
  );
}

export default App;
