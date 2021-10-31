import React from "react";

import ProjectDetail from "../ProjectDetails/ProjectDetails";
import { ProjectDetailsType } from "../../../userProject.model";

type ProjectsDetailsProps = {
  projectNames: string[];
  projectsDetails: ProjectDetailsType[];
  addNewProjectDetails: () => void;
  deleteProjectDetails: (id: string) => void;
  updateProjectDetails: (updatedProjectDetail: ProjectDetailsType) => void;
  checkProjectNameNotValid: (id: string, projectName: string) => void;
  checkProjectNameValid: (id: string, projectName: string) => void;
  checkProjectDetailsNotValid: (id: string, projectDetails: string) => void;
  checkProjectDetailsValid: (id: string, projectDetails: string) => void;
  checkProjectDurationNotValid: (id: string, projectDuration: number) => void;
  checkProjectDurationValid: (id: string, projectDuration: number) => void;
  checkProjectUnitsNotValid: (id: string, projectUnits: string) => void;
  checkProjectUnitsValid: (id: string, projectUnits: string) => void;
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
        checkProjectDetailsNotValid={props.checkProjectDetailsNotValid}
        checkProjectDetailsValid={props.checkProjectDetailsValid}
        checkProjectDurationNotValid={props.checkProjectDurationNotValid}
        checkProjectDurationValid={props.checkProjectDurationValid}
        checkProjectUnitsNotValid={props.checkProjectUnitsNotValid}
        checkProjectUnitsValid={props.checkProjectUnitsValid}
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
