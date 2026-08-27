import AppShell from "../layouts/AppShell";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Skills from "../components/Skills/Skills";
import Coding from "../components/Coding/Coding";
import Education from "../components/Education/Education";
import Certifications from "../components/Certifications/Certifications";
import Contact from "../components/Contact/Contact";

export default function Home() {
    return (
        <AppShell>
            <Hero />
            <Stats />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Coding />
            <Education />
            <Certifications />
            <Contact />
        </AppShell>
    );
}
