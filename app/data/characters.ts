export interface Character {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  secondaryColor: string;
  imageAlt: string;
}

export const characters: Character[] = [
  {
    id: "spider-man",
    name: "SPIDER-MAN",
    subtitle: "PETER PARKER",
    description: "He is a crime-fighting hero in the Marvel universe. Peter Parker gained his powers by being bitten by a radioactive spider and follows the motto 'With great power comes great responsibility.'",
    themeColor: "#dc2626", // Red
    secondaryColor: "#ffffff", // White
    imageAlt: "Spider-Man hero pose",
  },
  {
    id: "captain-america",
    name: "CAPTAIN AMERICA",
    subtitle: "STEVE ROGERS",
    description: "From the dark days of world war to the explosive challenges of today, Super-Soldier Captain America stands ready as a shining sentinel of liberty to shield the oppressed and fight for freedom everywhere.",
    themeColor: "#1e3a8a", // Dark Blue
    secondaryColor: "#ffffff", // White
    imageAlt: "Captain America with shield",
  },
  {
    id: "iron-man",
    name: "IRON MAN",
    subtitle: "TONY STARK",
    description: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man.",
    themeColor: "#b91c1c", // Dark Red
    secondaryColor: "#f59e0b", // Gold
    imageAlt: "Iron Man in armor suit",
  },
  {
    id: "black-panther",
    name: "BLACK PANTHER",
    subtitle: "T'CHALLA",
    description: "T'Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther.",
    themeColor: "#4c1d95", // Purple
    secondaryColor: "#111827", // Dark Gray/Black
    imageAlt: "Black Panther ready for combat",
  },
  {
    id: "hulk",
    name: "HULK",
    subtitle: "BRUCE BANNER",
    description: "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk.",
    themeColor: "#15803d", // Green
    secondaryColor: "#ffffff", // White
    imageAlt: "Incredible Hulk smashing",
  },
  {
    id: "black-widow",
    name: "BLACK WIDOW",
    subtitle: "NATASHA ROMANOFF",
    description: "Despite super spy Natasha Romanoff's checkered past, she's become one of S.H.I.E.L.D.'s most deadly assassins and a frequent member of the Avengers.",
    themeColor: "#000000", // Black
    secondaryColor: "#dc2626", // Red
    imageAlt: "Black Widow action pose",
  }
];
