import Work from "@/components/Work/Work";
import SEOHead from "@/components/SEO/SEOHead";
import { developmentProjects } from "@/data/developmentProjects";

const WorkPage = () => {
  return (
    <>
      <SEOHead
        title="Portfolio & Case Studies"
        description="Explore GlimmerInk portfolio work, including business websites, dashboard concepts, and custom digital product case studies."
        path="/work"
      />
      <Work projects={developmentProjects} />
    </>
  );
};

export default WorkPage;
