import "./App.css";
import CardsList from "./components/CardsList";
import { Route, Routes } from "react-router-dom";
import CreateCard from "./components/CreateCard";
import HeaderMenu from "./components/HeaderMenu";
import { MainContentPageStyles } from "./styles/styles";

function App() {
  return (
    <div className="App">
      <HeaderMenu />
      <MainContentPageStyles>
        <Routes>
          <Route path="/" element={<CardsList />} />
          <Route path="/create_card" element={<CreateCard />} />
        </Routes>
      </MainContentPageStyles>
    </div>
  );
}

export default App;
