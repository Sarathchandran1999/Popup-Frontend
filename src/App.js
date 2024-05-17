import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CreateNow from "./Components/CreateNow";
import ShowPop from "./Components/ShowPop";
import GenerateSnippet from "./Components/GenerateSnippet";

function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <CreateNow/>
      <GenerateSnippet/>
      <ShowPop/>
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
