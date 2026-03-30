import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
          Your Next Move Starts Here
        </h2>
        <p className="mt-5 text-muted-foreground md:text-lg text-pretty">
          Whether you are a beginner learning the basics or a seasoned
          competitor chasing your next rating milestone, Checkmate is
          built for you.
        </p>
        <div className="mt-10">
          <Button size="lg" className="gap-2 px-10 text-base">
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
