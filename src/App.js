import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
// import DataProjects from "./pages/DataProjects";
// import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        { <About /> }
        { <Projects /> }
        {/* <DataProjects />*/ }
        {/* <Skills /> */}
        { <Contact /> }
      </main>
      { <Footer /> }
    </>
  );
};

export default App;
