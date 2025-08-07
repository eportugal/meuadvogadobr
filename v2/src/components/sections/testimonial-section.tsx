import { SectionHeader } from "@/components/section-header";
import { SocialProofTestimonials } from "@/components/testimonial-scroll";
import { siteConfig } from "@/lib/config";

export function TestimonialSection() {
  const { testimonials } = siteConfig;

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center w-full px-4 md:px-6 lg:px-10"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          O que nossos clientes dizem
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          Histórias reais de pessoas que encontraram soluções jurídicas rápidas
          e seguras com o Advoga.ai.
        </p>
      </SectionHeader>
      <SocialProofTestimonials testimonials={testimonials} />
    </section>
  );
}
