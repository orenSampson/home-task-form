import React, { useRef } from "react";
import { ProjectDetailsType } from "../../../userProject.model";

type ProjectDetailsProps = {
  projectNames: string[];
  projectDetails: ProjectDetailsType;
  deleteProjectDetails: (id: string) => void;
  updateProjectDetails: (updatedProjectDetail: ProjectDetailsType) => void;
  checkProjectNameNotValid: (id: string, projectName: string) => void;
  checkProjectNameValid: (id: string, projectName: string) => void;
  checkProjectDetailsNotValid: (id: string, projectDetails: string) => void;
  checkProjectDetailsValid: (id: string, projectDetails: string) => void;
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

  nameOptions.unshift(
    <option key={""} value={""}>
      {""}
    </option>
  );

  const fieldChangedHandler = () => {
    const updatedProjectDetails: ProjectDetailsType = {
      id: props.projectDetails.id,
      name: nameInputRef.current?.value!,
      nameErrorMsg: props.projectDetails.nameErrorMsg,
      details: detailsInputRef.current?.value!,
      detailsErrorMsg: props.projectDetails.detailsErrorMsg,
      duration: +durationInputRef.current?.value!,
      units: unitsInputRef.current?.value!,
    };

    props.updateProjectDetails(updatedProjectDetails);

    props.checkProjectNameValid(
      props.projectDetails.id,
      nameInputRef.current?.value!
    );

    props.checkProjectDetailsValid(
      props.projectDetails.id,
      detailsInputRef.current?.value!
    );
  };

  const projectNameOnBlurHandler = () => {
    props.checkProjectNameNotValid(
      props.projectDetails.id,
      nameInputRef.current?.value!
    );
  };

  const projectDetailsOnBlurHandler = () => {
    props.checkProjectDetailsNotValid(
      props.projectDetails.id,
      detailsInputRef.current?.value!
    );
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
          onBlur={projectNameOnBlurHandler}
        >
          {nameOptions}
        </select>
        <div>{props.projectDetails.nameErrorMsg}</div>
      </div>

      <div>
        <label htmlFor="details">Details </label>
        <textarea
          id="details"
          defaultValue={props.projectDetails.details}
          required
          ref={detailsInputRef}
          onChange={fieldChangedHandler}
          onBlur={projectDetailsOnBlurHandler}
        ></textarea>
        <div>{props.projectDetails.detailsErrorMsg}</div>
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
