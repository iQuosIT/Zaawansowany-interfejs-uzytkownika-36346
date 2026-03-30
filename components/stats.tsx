const stats = [
  { value: "2M+", label: "Active Players" },
  { value: "50K+", label: "Daily Games" },
  { value: "120+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card px-6 py-20">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
