import { Identity } from "@/components/home/identity";
import { FeatureCards } from "@/components/home/feature-cards";
import { FoundingOffer } from "@/components/offer/founding-offer";
import { ExperienceRows } from "@/components/home/experience-rows";
import { ProjectRows } from "@/components/home/project-rows";
import {
  CertificationRows,
  ServiceRows,
  StackRows,
  TestimonialPreview,
} from "@/components/home/list-sections";

// Editorial, list-based home: each section rises in one after another
export default function Home() {
  return (
    <div className="stagger flex flex-col gap-[88px]">
      <section className="flex flex-col gap-10">
        <Identity />
        <FeatureCards />
      </section>
      <FoundingOffer />
      <ExperienceRows />
      <ProjectRows />
      <ServiceRows />
      <TestimonialPreview />
      <CertificationRows />
      <StackRows />
    </div>
  );
}
