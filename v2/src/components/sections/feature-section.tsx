import { SectionHeader } from "@/components/section-header";
import { Feature as FeatureComponent } from "@/components/ui/feature-slideshow";
import { siteConfig } from "@/lib/config";

export function FeatureSection() {
  const { title, description, items } = siteConfig.featureSection;

  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center gap-5 w-full relative px-4 md:px-6 lg:px-10"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          {title}
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          {description}
        </p>
      </SectionHeader>
      <div className="w-full max-w-7xl mx-auto h-full lg:h-[450px] flex items-center justify-center">
        <FeatureComponent
          collapseDelay={5000}
          linePosition="bottom"
          featureItems={items}
          lineColor="bg-secondary"
        />
      </div>
    </section>
  );
}
