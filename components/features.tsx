import { Zap, BookOpen, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-Time Matches",
    description:
      "Challenge opponents instantly with our lightning-fast matchmaking engine. Play blitz, rapid, or classical games with players at your level.",
  },
  {
    icon: BookOpen,
    title: "Grandmaster Analysis",
    description:
      "Learn from the best with AI-powered post-game analysis. Understand your mistakes, discover stronger moves, and track your progress over time.",
  },
  {
    icon: Users,
    title: "Global Community",
    description:
      "Join a thriving community of chess enthusiasts. Participate in tournaments, join clubs, and follow top-rated players from around the world.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Everything You Need to Excel
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A complete platform designed for every level of play.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex rounded-lg bg-secondary p-3">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
