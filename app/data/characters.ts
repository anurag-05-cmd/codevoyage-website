export interface Character {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string;
  imageAlt: string;
  image?: string; 
}

export const characters: Character[] = [
  {
    id: "spider-man",
    name: "SPIDER-MAN",
    subtitle: "PETER PARKER",
    description: "He is a crime-fighting hero in the Marvel universe. Peter Parker gained his powers by being bitten by a radioactive spider and follows the motto 'With great power comes great responsibility.'",
    themeColor: "#C62828", // Spider Red
    secondaryColor: "#FFFFFF", // White
    accentColor: "#0A1F44", // Dark Navy
    gradient: "linear-gradient(135deg, #C62828 0%, #EF5350 100%)",
    imageAlt: "Spider-Man hero pose",
    image: "/characters/spider-man.png",
  },
  {
    id: "iron-man",
    name: "IRON MAN",
    subtitle: "TONY STARK",
    description: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man.",
    themeColor: "#8B0000", // Metallic Red
    secondaryColor: "#D4AF37", // Gold
    accentColor: "#2C2C2C", // Gunmetal
    gradient: "linear-gradient(135deg, #8B0000 0%, #D4AF37 100%)",
    imageAlt: "Iron Man in armor suit",
    image: "/characters/iron-man.png",
  },
  {
    id: "captain-america",
    name: "CAPTAIN AMERICA",
    subtitle: "STEVE ROGERS",
    description: "From the dark days of world war to the explosive challenges of today, Super-Soldier Captain America stands ready as a shining sentinel of liberty to shield the oppressed and fight for freedom everywhere.",
    themeColor: "#1E3A8A", // Royal Blue
    secondaryColor: "#FFFFFF", // White
    accentColor: "#C62828", // Crimson Red
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #FFFFFF 100%)",
    imageAlt: "Captain America with shield",
    image: "/characters/captain-america.png",
  },
  {
    id: "thor",
    name: "THOR",
    subtitle: "THOR ODINSON",
    description: "The God of Thunder, wielding the enchanted hammer Mjolnir and controlling lightning itself to protect the Nine Realms and Asgard.",
    themeColor: "#3B82F6", // Electric Blue
    secondaryColor: "#C0C0C0", // Silver
    accentColor: "#111827", // Black
    gradient: "linear-gradient(135deg, #2563EB 0%, #93C5FD 100%)",
    imageAlt: "Thor God of Thunder",
    image: "/characters/thor.png",
  },
  {
    id: "hulk",
    name: "HULK",
    subtitle: "BRUCE BANNER",
    description: "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk.",
    themeColor: "#2E7D32", // Hulk Green
    secondaryColor: "#6A1B9A", // Purple
    accentColor: "#2D2D2D", // Dark Gray
    gradient: "linear-gradient(135deg, #2E7D32 0%, #6A1B9A 100%)",
    imageAlt: "Incredible Hulk smashing",
    image: "/characters/hulk.png",
  }
];
