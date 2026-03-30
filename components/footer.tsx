import Link from "next/link"

const links = {
  Platform: ["Play Online", "Puzzles", "Tournaments", "Leaderboard"],
  Learn: ["Openings", "Endgames", "Strategy", "Video Lessons"],
  Company: ["About", "Blog", "Careers", "Contact"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <span className="font-serif text-lg font-bold text-foreground">
            Checkmate
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The most elegant way to play, learn, and master the royal game.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-8">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Checkmate. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
