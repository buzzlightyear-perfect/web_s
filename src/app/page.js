import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import WhatIDo from "./components/whatido/WhatIDo";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Journey from "./components/journey/Journey";
import GitHub from "./components/github/GitHub";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import { CursorProvider } from "./components/cursor/CursorContext";
import CustomCursor from "./components/cursor/CustomCursor";

export default function Home() {
  return (
    <CursorProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <Projects />
        <Journey />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </CursorProvider>
  );
}
