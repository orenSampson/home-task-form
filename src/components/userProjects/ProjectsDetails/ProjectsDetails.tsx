import React from "react";

import ProjectDetail from "../ProjectDetails/ProjectDetails";
import { ProjectDetailsType } from "../../../userProject.model";

type ProjectsDetailsProps = {
  projectNames: string[];
  projectsDetails: ProjectDetailsType[];
  addNewProjectDetails: () => void;
  deleteProjectDetails: (id: string) => void;
  updateProjectDetails: (updatedProjectDetail: ProjectDetailsType) => void;
  checkProjectNameNotValid: (id: string, projectNameParam: string) => void;
  checkProjectNameValid: (id: string, projectNameParam: string) => void;
};

const ProjectsDetails: React.FC<ProjectsDetailsProps> = (props) => {
  const onAddNewProjectHandler = () => {
    props.addNewProjectDetails();
  };

  const ProjectsArr = props.projectsDetails.map((projectDetails) => {
    return (
      <ProjectDetail
        key={projectDetails.id}
        projectNames={props.projectNames}
        projectDetails={projectDetails}
        deleteProjectDetails={props.deleteProjectDetails}
        updateProjectDetails={props.updateProjectDetails}
        checkProjectNameNotValid={props.checkProjectNameNotValid}
        checkProjectNameValid={props.checkProjectNameValid}
      />
    );
  });

  return (
    <div>
      <button onClick={onAddNewProjectHandler}>Add Project</button>
      <div>{ProjectsArr}</div>;
    </div>
  );
};

export default ProjectsDetails;
