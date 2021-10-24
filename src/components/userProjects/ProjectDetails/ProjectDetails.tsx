import React from "react";
import { ProjectDetailsType } from "../../../userProject.model";

type ProjectDetailsProps = {
  projectNames: string[];
  projectDetails: ProjectDetailsType;
  deleteProjectDetails: (id: string) => void;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = (props) => {
  const nameOptions = props.projectNames.map((projectName) => {
    return <option value={projectName}>{projectName}</option>;
  });

  return (
    <div>
      <div>
        <label htmlFor="name">Project </label>
        <select id="name" defaultValue={props.projectDetails.name} required>
          {nameOptions}
        </select>
      </div>

      <div>
        <label htmlFor="details">Details </label>
        <textarea
          id="details"
          defaultValue={props.projectDetails.details}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          type="number"
          defaultValue={props.projectDetails.duration}
          required
        />
        <select defaultValue={props.projectDetails.units} required>
          <option value="month">month</option>
          <option value="year">year</option>
        </select>
      </div>
      <button
        onClick={props.deleteProjectDetails.bind(null, props.projectDetails.id)}
      >
        X
      </button>
    </div>
  );
};

export default ProjectDetails;
