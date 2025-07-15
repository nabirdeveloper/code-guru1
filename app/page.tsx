import Container from "../components/Container";
import SocialLinks from "../components/SocailLinks";
import Statistics from "../components/Statistics";
import Photo from "@/components/Photo";
import { Download } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <Container classname="py-10 grid grid-cols-1 md:grid-cols-2 gap-7 bg-gray-900">
      <div className="flex flex-col items-center md:items-start gap-5 md:gap-7 text-center md:text-start">
        <div>
          <h3 className="font-semibold text-emerald-400 tracking-wider mb-1">
            I&lsquo;m a Frontend Developer
          </h3>
          <h2 className="text-3xl md:text-5xl mb-2 text-white">Hello, I&lsquo;m</h2>
          <h1 className="mb-3 text-emerald-500 text-5xl md:text-7xl tracking-normal">
            Code Guru
          </h1>
        </div>
        <p className="mb-3 w-auto md:max-w-[500px] text-white/70 font-thin leading-6">
          Hi there! 👋  I&lsquo;m a passionate web developer with expertise in building
          responsive, user-friendly websites and web applications. I specialize
          in front-end development (HTML, CSS, JavaScript, React, Next.js) and back-end
          development (Node.js, Python, PHP) to create seamless,
          high-performance digital experiences.

          <br />
          <br />

          In my portfolio, you&lsquo;ll find a collection of projects that
          showcase my skills and creativity. Whether it&lsquo;s building
          interactive interfaces, optimizing performance, or implementing
          complex features, I&lsquo;m dedicated to delivering exceptional
          user experiences.
        </p>
        <a
          href="/resume.pdf"
          download=""
          className="w-37 mb-2 text-xs bg-emerald-900/70 text-white px-6 py-2.5 rounded-full border border-emerald-500/20 hover:border-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 flex items-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV <Download className="w-4 h-4" />
        </a>
        <SocialLinks />
        <div className="flex gap-4 mt-4">
          <Link href="/register">
            <span className="text-sm bg-emerald-950/50 text-white px-4 py-2 rounded-md border border-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black hovereffect transition cursor-pointer shadow focus:outline-none focus:ring-2 focus:ring-emerald-500">Register</span>
          </Link>
          <Link href="/login">
            <span className="text-sm bg-emerald-950/50 text-white px-4 py-2 rounded-md border border-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black hovereffect transition cursor-pointer shadow focus:outline-none focus:ring-2 focus:ring-emerald-500">Login</span>
          </Link>
        </div>
        <div className="w-full mt-4">
          <Statistics />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Photo />
      </div>
    </Container>
  );
};

export default page;