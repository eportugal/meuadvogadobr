"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";

export function GrowthSection() {
  const { title, description, items } = siteConfig.growthSection;

  return (
    <section
      id="growth"
      className="flex flex-col items-center justify-center w-full relative px-4 md:px-6 lg:px-10"
    >
      <div className="border-x mx-auto w-full max-w-7xl relative overflow-hidden">
        {/* Decorative borders */}
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-gray-950/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-gray-950/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>

        {/* Section Header */}
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center md:whitespace-nowrap">
            {title}
          </h2>
          <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
            <span className="block md:whitespace-nowrap">
              Protegemos seus dados com os mais altos padrões de segurança —
              para que você use
            </span>
            <span className="block">
              a plataforma com tranquilidade e confiança.
            </span>
          </p>
        </SectionHeader>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x md:divide-y-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-end gap-2 p-4 md:p-6 min-h-[400px] md:min-h-[500px]"
            >
              {item.content}
              <h3 className="text-lg tracking-tighter font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
