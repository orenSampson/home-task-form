import React, { useRef } from "react";
import { ProjectDetailsType } from "../../../userProject.model";

type ProjectDetailsProps = {
  projectNames: string[];
  projectDetails: ProjectDetailsType;
  deleteProjectDetails: (id: string) => void;
  updateProjectDetails: (updatedProjectDetail: ProjectDetailsType) => void;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = (props) => {
  const nameInputRef = useRef<HTMLSelectElement>(null);
  const detailsInputRef = useRef<HTMLTextAreaElement>(null);
  const durationInputRef = useRef<HTMLInputElement>(null);
  const unitsInputRef = useRef<HTMLSelectElement>(null);

  const nameOptions = props.projectNames.map((projectName) => {
    return (
      <option key={projectName} value={projectName}>
        {projectName}
      </option>
    );
  });

  const fieldChangedHandler = () => {
    const updatedProjectDetails: ProjectDetailsType = {
      id: props.projectDetails.id,
      name: nameInputRef.current?.value!,
      details: detailsInputRef.current?.value!,
      duration: +durationInputRef.current?.value!,
      units: unitsInputRef.current?.value!,
    };

    console.log("updatedProjectDetails :>> ", updatedProjectDetails);

    props.updateProjectDetails(updatedProjectDetails);
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Project </label>
        <select
          id="name"
          defaultValue={props.projectDetails.name}
          required
          ref={nameInputRef}
          onChange={fieldChangedHandler}
        >
          {nameOptions}
        </select>
      </div>

      <div>
        <label htmlFor="details">Details </label>
        <textarea
          id="details"
          defaultValue={props.projectDetails.details}
          required
          ref={detailsInputRef}
          onChange={fieldChangedHandler}
        ></textarea>
      </div>

      <div>
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          type="number"
          defaultValue={props.projectDetails.duration}
          required
          ref={durationInputRef}
          onChange={fieldChangedHandler}
        />
        <select
          defaultValue={props.projectDetails.units}
          required
          ref={unitsInputRef}
          onChange={fieldChangedHandler}
        >
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
