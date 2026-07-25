import { Card, CardContent } from "@/components/ui/card"
import { Brain, Leaf, Shield, Smartphone, Globe, Zap } from "lucide-react"

export default function TracksSection() {
  const tracks = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Build intelligent systems using artificial intelligence and machine learning technologies.",
      color: "from-blue-500 to-red-600",
    },
    {
      icon: Shield,
      title: "Blockchain & Web3",
      description: "Create decentralized applications and explore the future of blockchain technology.",
      color: "from-red-500 to-orange-600",
    },
    {
      icon: Leaf,
      title: "Sustainable Tech",
      description: "Develop solutions that address environmental challenges and promote sustainability.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Innovation",
      description: "Design and develop cutting-edge mobile applications for iOS and Android platforms.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "Build modern web applications using the latest frameworks and technologies.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Open Innovation",
      description: "Think outside the box and create solutions for any problem you're passionate about.",
      color: "from-yellow-500 to-orange-600",
    },
  ]

  return (
    <section id="tracks" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6 text-gradient">Hackathon Tracks</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your domain and build innovative solutions that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${track.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <track.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {track.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{track.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
