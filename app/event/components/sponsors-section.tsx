import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"


/*
interface Sponsor {
  name: string
  logo: string
  website: string
}
*/

export default function SponsorsSection() {
  /*
  // Sponsor data
  const sponsors = {
    title: [
      {
        name: "TechCorp",
        logo: "/placeholder.svg?height=100&width=200",
        website: "https://techcorp.com",
      },
    ],
    gold: [
      {
        name: "InnovateLabs",
        logo: "/placeholder.svg?height=80&width=160",
        website: "https://innovatelabs.com",
      },
      {
        name: "CodeMasters",
        logo: "/placeholder.svg?height=80&width=160",
        website: "https://codemasters.com",
      },
    ],
    community: [
      {
        name: "DevCommunity",
        logo: "/placeholder.svg?height=60&width=120",
        website: "https://devcommunity.com",
      },
      {
        name: "TechHub",
        logo: "/placeholder.svg?height=60&width=120",
        website: "https://techhub.com",
      },
      {
        name: "StartupIndia",
        logo: "/placeholder.svg?height=60&width=120",
        website: "https://startupindia.gov.in",
      },
      {
        name: "GirlsWhoCode",
        logo: "/placeholder.svg?height=60&width=120",
        website: "https://girlswhocode.com",
      },
    ],
  }

  const SponsorCard = ({ sponsor, size = "md" }: { sponsor: Sponsor; size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
      sm: "h-16",
      md: "h-20",
      lg: "h-24",
    }

    const imageSizes = {
      sm: { width: 120, height: 60 },
      md: { width: 160, height: 80 },
      lg: { width: 200, height: 100 },
    }

    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
        <CardContent className="p-6 flex items-center justify-center">
          <a 
            href={sponsor.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={sponsor.name}
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Image
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              width={imageSizes[size].width}
              height={imageSizes[size].height}
              className={`${sizeClasses[size]} w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter grayscale group-hover:grayscale-0`}
            />
          </a>
        </CardContent>
      </Card>
    )
  }
  */

  return (
    <section className={`py-20 `} id="sponsors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6 text-gradient">
            Our Partners & Sponsors
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Proud to be supported by industry leaders and community partners
          </p>
        </div>

        {/*
        {/* Title Sponsors * /}
        {sponsors.title.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Title Sponsor</h3>
            <div className="flex justify-center">
              <div className="max-w-sm">
                {sponsors.title.map((sponsor, index) => (
                  <SponsorCard key={index} sponsor={sponsor} size="lg" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gold Sponsors * /}
        {sponsors.gold.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Gold Sponsors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {sponsors.gold.map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Community Partners * /}
        {sponsors.community.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Community Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsors.community.map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="sm" />
              ))}
            </div>
          </div>
        )}
        */}

        {/* Become a Sponsor CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">Become a Sponsor</h3>
              <p className="text-muted-foreground mb-6">
                Partner with us to support the next generation of innovators and showcase your brand to talented
                developers.
              </p>
              <a
                href="mailto:sponsors@codevoyage.tech"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Contact Us
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
