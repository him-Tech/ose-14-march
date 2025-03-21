import React, { useEffect } from "react";
import backdropSVG from "src/assets/backdrop.svg";
import { Cards } from "src/views/pages/website/home/elements/Cards";
import { Audience } from "../../../../Audience";
import { paths } from "../../../../../paths";
import { useProjects } from "../../../../hooks/useProjects";
import { projectsIds } from "../../../../../services/data/projects";
import { ProjectUtils } from "../../../../../api/model";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const { projects, error, reloadProjects, loading } = useProjects(projectsIds);

  useEffect(() => {
    reloadProjects();
  }, []);

  return (
    <>
      <div
        data-aos="fade-right"
        className="relative sm:px-8 max-[540px]:px-[18px] flex w-full justify-center max-w-[1330px] mx-auto overflow-hidden min-h-[1000px]"
      >
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-8 lg:gap-16">
          <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="backdrop" />
          <h1 className="text-center font-mich text-[28px] font-[400] lg:text-[42px]">New Onboarded Projects</h1>
          <div className="flex flex-wrap z-[10] w-full justify-center gap-4">
            {/*TODO*/}
            {error && <div>{error.toSting()}</div>}

            {loading ? (
              <>
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <Cards key={i} isLoading />
                  ))}
              </>
            ) : (
              // projects.map(project => (
              //   <Cards key={ProjectUtils.key(project)} project={project} audience={Audience.ALL} action={"Learn More"} to={paths.project(project.id)} />
              // ))
              projects.map((project, index) => (
                <Cards key={`${project.id}-${index}`} project={project} audience={Audience.ALL} action={"Learn More"} to={paths.project(project.id)} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
