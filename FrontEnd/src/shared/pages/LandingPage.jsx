
import Navbar from "../components/NavBar";

const NAV_LINKS = ["Discovery", "Projects", "Community"];

const TECHS = [
  { name: "Rust", icon: "⚙️" },
  { name: "AWS", icon: "☁️" },
  { name: "PostgreSQL", icon: "🗄️" },
  { name: "Next.js", icon: "▲" },
  { name: "GraphQL", icon: "{}" },
  { name: "Flutter", icon: "💙" },
];

const DEVS = [
  { name: "Alex Rivera", role: "Core Contributor @React", avatar: "AR" },
  { name: "Sarah Chen", role: "Staff Engineer @Linear", avatar: "SC" },
  { name: "Marcus Thorne", role: "DevOps Lead @Vercel", avatar: "MT" },
  { name: "Elena Rodriguez", role: "Founder @UI-Labs", avatar: "ER" },
];

const PROJECTS = [
  {
    name: "NeuralCanvas OS",
    tag: "TypeScript",
    desc: "A GPU-accelerated OS environment built entirely on web technologies for creative coding.",
    stars: 12,
  },
  {
    name: "FluxEngine DB",
    tag: "Rust",
    desc: "High-performance vector database designed for real-time LLM inference at the edge.",
    stars: 48,
  },
];

const BLOGS = [
  {
    title: "Rust vs. Go: The Speed Test",
    time: "5 min read",
    desc: "A deep dive into memory management and runtime performance for cloud-native workloads.",
  },
  {
    title: "Why LLMs Won't Replace Senior Devs",
    time: "12 min read",
    desc: "The human element in software engineering: empathy, architecture, and systems thinking.",
  },
];



function Hero() {
  return (
    <section className="bg-gray-950 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Build. Share.
            <br />
            <span className="text-violet-400">Connect.</span>
          </h1>
          <p className="mt-4 text-gray-400 text-base max-w-md mx-auto md:mx-0">
            The ultimate social ecosystem for developers to showcase work,
            collaborate on open-source projects, and stay ahead of the curve.
          </p>
          <div className="mt-8 flex gap-3 justify-center md:justify-start flex-wrap">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
              Start Building
            </button>
            <button className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
              Explore Community
            </button>
          </div>
        </div>

        {/* Visual card */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gray-800 rounded-xl w-full max-w-sm aspect-video flex items-center justify-center border border-gray-700">
            <div className="text-center">
              <div className="text-5xl mb-3">💻</div>
              <p className="text-gray-400 text-sm">Code. Build. Deploy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Technologies() {
  return (
    <section className="bg-gray-900 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-white text-2xl font-bold mb-8">
          Featured <span className="text-violet-400">Technologies</span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {TECHS.map((t) => (
            <div
              key={t.name}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-gray-300 text-xs font-medium">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingAndProjects() {
  return (
    <section className="bg-gray-950 py-14 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Trending Developers */}
        <div>
          <h3 className="text-white font-bold text-lg mb-5">
            📈 Trending Developers
          </h3>
          <div className="flex flex-col gap-3">
            {DEVS.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 transition-colors cursor-pointer border border-gray-700"
              >
                <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {d.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{d.name}</p>
                  <p className="text-gray-400 text-xs">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Projects */}
        <div>
          <h3 className="text-white font-bold text-lg mb-5">
            🚀 Latest Projects
          </h3>
          <div className="flex flex-col gap-4">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white text-sm font-semibold">{p.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium ${p.tag === "Rust" ? "bg-orange-500/20 text-orange-300" : "bg-blue-500/20 text-blue-300"}`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">⭐ {p.stars}</span>
                  <a
                    href="#"
                    className="text-violet-400 text-xs hover:text-violet-300 transition-colors"
                  >
                    View Repo →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  return (
    <section className="bg-gray-900 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-white font-bold text-lg mb-6">
          📰 Popular Tech Blogs
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col justify-end min-h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-gray-900/80" />
            <div className="relative">
              <span className="bg-violet-600/30 text-violet-300 text-xs px-2 py-0.5 rounded mb-2 inline-block">
                Architecture
              </span>
              <h4 className="text-white font-semibold text-sm">
                The Evolution of Microservices in 2024
              </h4>
              <p className="text-gray-400 text-xs mt-1">
                Exploring how distributed systems are evolving with AI agents
                and edge-native infrastructure.
              </p>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {BLOGS.map((b) => (
              <div
                key={b.title}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-white text-sm font-semibold">{b.title}</p>
                  <span className="text-gray-500 text-xs shrink-0 ml-2">
                    {b.time}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-gray-950 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-white text-3xl font-bold mb-3">
          Ready to join the elite?
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          DevHub is more than a platform — it's your command center. Connect
          with thousands of top-tier developers and ship faster together.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
            Create Account
          </button>
          <button className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-white font-bold mb-2">
            Dev<span className="text-violet-400">Hub</span>
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            The social network for modern software engineers. Built by
            developers, for developers.
          </p>
        </div>
        <div>
          <p className="text-gray-300 font-semibold mb-3">Product</p>
          {["Discovery", "Projects", "Open Source", "Community"].map((l) => (
            <a
              key={l}
              href="#"
              className="block text-gray-500 hover:text-gray-300 text-xs mb-1.5 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <div>
          <p className="text-gray-300 font-semibold mb-3">Resources</p>
          {["Guidelines", "Privacy", "About", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="block text-gray-500 hover:text-gray-300 text-xs mb-1.5 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <div>
          <p className="text-gray-300 font-semibold mb-3">Subscribe</p>
          <p className="text-gray-500 text-xs mb-3">
            Weekly digest of top projects and tech news.
          </p>
          <div className="flex">
            <input
              placeholder="email@devhub.com"
              className="bg-gray-800 text-gray-300 text-xs rounded-l-md px-3 py-2 outline-none flex-1 placeholder-gray-600 border border-gray-700"
            />
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs px-3 py-2 rounded-r-md transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-600 text-xs mt-10">
        © 2024 DevHub Social Platform. Built for developers.
      </p>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <Navbar />
      <Hero />
      <Technologies />
      <TrendingAndProjects />
      <Blogs />
      <CTA />
      <Footer />
    </div>
  );
}
