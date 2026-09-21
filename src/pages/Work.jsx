import Work from "@/components/Work/Work";
import SEOHead from "@/components/SEO/SEOHead";
import { developmentProjects } from "@/data/developmentProjects";
import pageSeo from "@/data/pageSeo";
import { workCollection } from "@/data/schema";

const WORK_SCHEMA = [workCollection(developmentProjects)];

const WorkPage = () => {
  return (
    <>
      <SEOHead {...pageSeo.work} jsonLd={WORK_SCHEMA} />
      <Work projects={developmentProjects} />
    </>
  );
};

export default WorkPage;
