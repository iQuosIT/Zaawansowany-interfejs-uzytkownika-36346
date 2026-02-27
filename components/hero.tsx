import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Now in Open Beta
          </span>
        </div>

        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
          Think Two Moves Ahead
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
          Play, learn, and compete on the most refined chess platform.
          Sharpen your mind against players worldwide or study with
          grandmaster-level analysis.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 px-8 text-base">
            Start Playing
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button size="lg" className="px-8 text-base">
            Analyse games
          </Button>

          <Button variant="outline" size="lg" className="px-8 text-base">
            Watch a Game
          </Button>
        </div>
      </div>

      <div className="relative mt-16 w-full max-w-4xl overflow-hidden rounded-xl border border-border shadow-2xl">
        <Image
          src="/images/chess-hero.jpg"
          alt="Elegant chess board with marble pieces under dramatic lighting"
          width={1200}
          height={675}
          className="w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
    </section>
  )
}
