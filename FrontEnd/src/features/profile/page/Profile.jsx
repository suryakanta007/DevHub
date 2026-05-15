import { useState } from "react";

const SIDEBAR_LINKS = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "🔍", label: "Discovery" },
  { icon: "🚀", label: "Projects", active: true },
  { icon: "👥", label: "Community" },
  { icon: "⚙️", label: "Settings" },
];

const TAGS = [
  "React",
  "Node.js",
  "Tailwind",
  "TypeScript",
  "PostgreSQL",
  "Docker",
];

const PROJECTS = [
  {
    name: "DevStream UI Kit",
    desc: "A comprehensive design system and component library built for developers.",
    tags: ["React", "Framer Motion", "Tailwind"],
    stars: "1.2k",
    forks: 240,
    featured: true,
    bg: "from-violet-800 to-indigo-950",
  },
  {
    name: "AlgoVisualizer",
    desc: "An interactive tool for visualizing complex sorting and graph algorithms.",
    tags: ["D3.js", "TypeScript", "Vite"],
    stars: 845,
    forks: 112,
    featured: false,
    bg: "from-cyan-900 to-slate-900",
  },
  {
    name: "NodeForge CLI",
    desc: "A powerful command-line tool to scaffold and manage Node.js projects.",
    tags: ["Node.js", "CLI", "Bash"],
    stars: 530,
    forks: 88,
    featured: false,
    bg: "from-emerald-900 to-gray-900",
  },
  {
    name: "ReactQuery Dashboard",
    desc: "Admin dashboard template powered by React Query and Recharts.",
    tags: ["React", "Recharts", "TailwindCSS"],
    stars: 310,
    forks: 45,
    featured: false,
    bg: "from-pink-900 to-gray-900",
  },
];

const STATS = [
  { val: "12.4k", label: "Followers" },
  { val: "842", label: "Following" },
  { val: "47", label: "Projects" },
  { val: "128", label: "Blogs" },
];

const TABS = ["Projects", "Blogs", "About"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /*
     * ROOT: full viewport, dark bg, no overflow on the root itself.
     * Structure:
     *   <div root flex-row>
     *     <aside sidebar>          ← fixed width, full height, scrolls independently
     *     <div right-col flex-col> ← fills remaining width
     *       <header topbar>
     *       <main scrollable>
     */
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950 text-white">
      {/* ── SIDEBAR ── */}
      {/* mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={[
          // sizing & position
          "z-30 flex h-full w-56 shrink-0 flex-col",
          // appearance
          "border-r border-gray-800 bg-gray-900",
          // spacing
          "gap-4 px-3 py-6",
          // desktop: always visible; mobile: slide in/out
          "fixed lg:relative",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "transition-transform duration-300",
        ].join(" ")}
      >
        {/* logo */}
        <div className="px-2">
          <p className="font-bold text-white">
            Dev<span className="text-violet-400">Hub</span>
          </p>
          <p className="mt-0.5 text-xs text-gray-500">Developer Network</p>
        </div>

        {/* nav */}
        <nav className="flex flex-1 flex-col gap-1">
          {SIDEBAR_LINKS.map((l) => (
            <button
              key={l.label}
              className={[
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all",
                l.active
                  ? "border border-violet-600/40 bg-violet-600/20 text-violet-300"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
              ].join(" ")}
            >
              <span>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </nav>

        <button className="rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500">
          + Create Project
        </button>
      </aside>

      {/* ── RIGHT COLUMN (topbar + scrollable content) ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-800 bg-gray-950 px-4">
          {/* left: hamburger (mobile) */}
          <button
            className="text-xl text-gray-400 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* right: search + icons */}
          <div className="ml-auto flex items-center gap-3">
            <input
              placeholder="Search developers..."
              className="hidden w-52 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-300 placeholder-gray-500 outline-none focus:ring-1 focus:ring-violet-500 sm:block"
            />
            <button className="text-lg text-gray-400 hover:text-white">
              🔔
            </button>
            <button className="text-lg text-gray-400 hover:text-white">
              💬
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold">
              AR
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE BODY */}
        <div className="flex-1 overflow-y-auto">
          {/* cover banner */}
          <div className="relative h-40 shrink-0 overflow-hidden bg-gradient-to-r from-gray-900 via-violet-950 to-indigo-950 md:h-52">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg,#7c3aed 0,#7c3aed 1px,transparent 0,transparent 14px)",
              }}
            />
          </div>

          {/* profile header bar */}
          <div className="border-b border-gray-800 bg-gray-900 px-4 pb-4 md:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              {/* avatar + name — avatar climbs into the cover */}
              <div className="-mt-10 flex items-end gap-4">
                <div className="relative shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-900 bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-bold sm:h-24 sm:w-24">
                    AR
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-full border-2 border-gray-900 bg-green-400" />
                </div>
                <div className="pb-1">
                  <h1 className="text-xl font-bold leading-tight">
                    Alex Rivera
                  </h1>
                  <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
                    Senior Full-Stack Architect &amp; Open Source Contributor
                  </p>
                </div>
              </div>

              {/* action buttons */}
              <div className="flex gap-2 sm:self-end sm:pb-1">
                <button className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500">
                  👤 Follow
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-400 hover:text-white">
                  ✉️ Message
                </button>
              </div>
            </div>
          </div>

          {/* main content grid */}
          <div className="grid grid-cols-1 gap-5 p-4 md:p-6 lg:grid-cols-[260px_1fr]">
            {/* ── LEFT ── */}
            <div className="flex flex-col gap-4">
              {/* about card */}
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                <h3 className="mb-3 text-sm font-semibold">About</h3>
                <p className="mb-4 text-xs leading-relaxed text-gray-400">
                  Building the future of the web, one commit at a time. Focused
                  on high-performance React apps and scalable Node.js
                  microservices. Passionate about DX and clean code
                  architecture.
                </p>
                <div className="mb-4 flex flex-col gap-2 text-xs text-gray-400">
                  <span>📍 San Francisco, CA</span>
                  <span>🔗 alexrivera.dev</span>
                  <span>🐦 @arivera_codes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gray-700 bg-gray-800 px-2.5 py-1 text-xs text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* stats 2×2 */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center"
                  >
                    <p className="text-lg font-bold text-white">{s.val}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="flex flex-col gap-4">
              {/* tabs */}
              <div className="flex border-b border-gray-800">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={[
                      "-mb-px border-b-2 px-5 py-2.5 text-sm font-medium transition-colors",
                      activeTab === tab
                        ? "border-violet-500 text-violet-400"
                        : "border-transparent text-gray-400 hover:text-white",
                    ].join(" ")}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* PROJECTS */}
              {activeTab === "Projects" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {PROJECTS.map((p) => (
                      <div
                        key={p.name}
                        className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-colors hover:border-violet-600/50"
                      >
                        {/* card top */}
                        <div
                          className={`relative flex h-24 items-start bg-gradient-to-br ${p.bg} p-3`}
                        >
                          {p.featured && (
                            <span className="rounded bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white">
                              FEATURED
                            </span>
                          )}
                        </div>

                        {/* card body */}
                        <div className="flex flex-1 flex-col p-4">
                          <p className="mb-1 text-sm font-semibold text-white">
                            {p.name}
                          </p>
                          <p className="mb-3 flex-1 text-xs leading-relaxed text-gray-400">
                            {p.desc}
                          </p>
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs text-gray-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                            <div className="flex gap-3 text-xs text-gray-400">
                              <span>⭐ {p.stars}</span>
                              <span>🍴 {p.forks}</span>
                            </div>
                            <div className="flex gap-1 text-gray-400">
                              <button className="rounded px-2 py-1 text-xs hover:bg-gray-800 hover:text-white">
                                {"</>"}
                              </button>
                              <button className="rounded px-2 py-1 text-xs hover:bg-gray-800 hover:text-white">
                                ↗
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full rounded-xl border border-gray-700 py-3 text-sm text-gray-400 transition-colors hover:border-violet-600/50 hover:text-white">
                    Explore All Projects →
                  </button>
                </>
              )}

              {/* BLOGS */}
              {activeTab === "Blogs" && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-gray-800 bg-gray-900 py-16 text-gray-500">
                  <span className="mb-3 text-4xl">📝</span>
                  <p className="text-sm">No blogs published yet.</p>
                </div>
              )}

              {/* ABOUT */}
              {activeTab === "About" && (
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                  <h3 className="mb-3 font-semibold text-white">
                    About Alex Rivera
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Building the future of the web, one commit at a time.
                    Focused on high-performance React applications and scalable
                    Node.js microservices. Passionate about developer experience
                    and clean code architecture. Open source contributor and
                    technical writer.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <footer className="mt-6 border-t border-gray-800 bg-gray-900 px-4 py-8 md:px-8">
            <div className="grid grid-cols-2 gap-6 text-xs md:grid-cols-4">
              <div>
                <p className="mb-2 text-sm font-bold text-white">
                  Dev<span className="text-violet-400">Hub</span>
                </p>
                <p className="leading-relaxed text-gray-500">
                  The global network for creators and developers. Build, share,
                  and grow together.
                </p>
              </div>
              <div>
                <p className="mb-3 font-semibold uppercase tracking-wider text-gray-300">
                  Platform
                </p>
                {["Discovery", "Projects", "Guidelines"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="mb-1.5 block text-gray-500 transition-colors hover:text-gray-300"
                  >
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <p className="mb-3 font-semibold uppercase tracking-wider text-gray-300">
                  Company
                </p>
                {["About", "Open Source", "Contact"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="mb-1.5 block text-gray-500 transition-colors hover:text-gray-300"
                  >
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <p className="mb-3 font-semibold uppercase tracking-wider text-gray-300">
                  Stay Connected
                </p>
                <div className="mb-3 flex gap-3 text-base text-gray-500">
                  <button className="hover:text-white">🌐</button>
                  <button className="hover:text-white">{"</>"}</button>
                </div>
                <p className="text-gray-600">
                  © 2024 DevHub. Built for developers.
                </p>
              </div>
            </div>
          </footer>
        </div>
        {/* end scrollable */}
      </div>
      {/* end right column */}
    </div> /* end root */
  );
}
