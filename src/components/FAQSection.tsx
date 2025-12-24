import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How accurate is VisaVerse AI's guidance?",
    answer:
      "VisaVerse AI provides guidance based on general visa requirements and common practices. While we strive for accuracy, immigration rules change frequently. Always verify requirements with official embassy or consulate websites before applying.",
  },
  {
    question: "Does VisaVerse AI guarantee my visa approval?",
    answer:
      "No, VisaVerse AI is an informational tool only. We help you understand requirements and avoid common mistakes, but visa decisions are made solely by immigration authorities. Our AI can help improve your application quality but cannot guarantee outcomes.",
  },
  {
    question: "What documents are typically required for a visa?",
    answer:
      "Common documents include: valid passport (6+ months validity), passport photos, proof of funds, travel itinerary/accommodation, health insurance, and purpose-specific documents like job offers (work visa), admission letters (study visa), or hotel bookings (tourist visa).",
  },
  {
    question: "How long does visa processing usually take?",
    answer:
      "Processing times vary by country and visa type. Tourist visas typically take 2-4 weeks, student visas 4-8 weeks, and work visas 6-12 weeks or longer. We recommend applying well in advance of your intended travel date.",
  },
  {
    question: "What are common reasons for visa rejection?",
    answer:
      "Common rejection reasons include: incomplete documentation, insufficient financial proof, lack of ties to home country, previous visa violations, unclear travel purpose, and unverified employment or educational claims.",
  },
  {
    question: "Can I use VisaVerse AI for any country?",
    answer:
      "Currently, VisaVerse AI covers major destination countries including the US, UK, Canada, Australia, Germany, Singapore, and more. We're continuously expanding our database to include more countries and visa types.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Get answers to common questions about visa applications and our AI assistant
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional help */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <button className="text-primary font-medium hover:underline">
                Use our AI chat for personalized answers
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
