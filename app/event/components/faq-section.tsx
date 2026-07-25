"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export default function FAQSection() {
  const faqs = [
    {
      question: "Who can participate in Code Voyage?",
      answer:
        "The hackathon is open to all college students, regardless of their field of study or experience level. Whether you're a beginner or an experienced developer, you're welcome to participate for Code Voyage.",
    },
    {
      question: "What is the team size limit?",
      answer:
        "Teams can have a minimum of 2 members and a maximum of 4 members. You can form teams with participants from different colleges.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "No, participation in Code Voyage is completely free. We believe in making technology accessible to everyone.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, chargers, any hardware you might need for your project, and most importantly, your enthusiasm! We'll provide food, drinks, and a great environment.",
    },
    {
      question: "Will food and accommodation be provided?",
      answer:
        "Yes, we will provide meals and refreshments throughout the event. However, accommodation is not provided, so participants need to arrange their own stay if coming from outside Kolkata.",
    },
    {
      question: "What are the judging criteria?",
      answer:
        "Projects will be evaluated based on innovation, technical implementation, design, presentation, and potential impact. Our panel of expert judges will assess each project fairly.",
    },
    {
      question: "Who owns the intellectual property of the projects?",
      answer:
        "You retain full ownership of your project and any intellectual property created during the hackathon. We encourage you to continue developing your ideas after the event.",
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer:
        "No, all development work must be done during the hackathon hours. Problem Statements will be given on the day of the hackathon.",
    },
    {
      question: "What if I don't have a team?",
      answer:
        "Don't worry reach out to the student coorinators we will help you finding a team.",
    },
    {
      question: "Are there any specific technologies we must use?",
      answer:
        "No, you're free to use any programming languages, frameworks, or tools you're comfortable with. The focus is on solving problems creatively, not on using specific technologies.",
    },
  ]

  return (
    <section id="faqs" className={`py-20 bg-secondary/20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6 text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers to help you prepare for the hackathon
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
