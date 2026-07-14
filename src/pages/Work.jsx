import Work from "@/components/Work/Work";
import SEOHead from "@/components/SEO/SEOHead";
import { developmentProjects } from "@/data/developmentProjects";
import pageSeo from "@/data/pageSeo";

const WorkPage = () => {
  return (
    <>
      <SEOHead {...pageSeo.work} />
      <Work projects={developmentProjects} />
    </>
  );
};

export default WorkPage;
