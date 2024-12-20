import React, { useState, useRef } from "react";
import styles from "./Body.module.css";
import Form from "../Form/Form";
import ResumePDF from "../ResumePDF/ResumePDF";
import { useReactToPrint } from "react-to-print";

const Body = () => {
  const formFields = {
    personalInfo: "Personal Info",
    education: "Education",
    workExp: "Work Experience",
    skills: "Skills",
    projects: "Projects",
  };
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [resumeInformation, setResumeInformation] = useState({
    [formFields.personalInfo]: {
      id: formFields.personal,
      sectionTitle: formFields.personal,
      detail: {},
    },
    [formFields.education]: {
      id: formFields.education,
      sectionTitle: formFields.education,
      details: [],
    },
    [formFields.workExp]: {
      id: formFields.workExp,
      sectionTitle: formFields.workExp,
      details: [],
    },
    [formFields.projects]: {
      id: formFields.projects,
      sectionTitle: formFields.projects,
      details: [],
    },
    [formFields.skills]: {
      id: formFields.skills,
      sectionTitle: formFields.skills,
      details: [],
    },
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <div className={styles.colors}>
            <p className={styles.themeheading}>Theme:</p>
            <span className={styles.themewhite} />
            <span className={styles.themeblack} />
          </div>

          <button className={styles.downloadbutton} onClick={reactToPrintFn}>
            Download
          </button>
        </div>
        <div className={styles.mainbody}>
          <Form
            formFields={formFields}
            resumeInformation={resumeInformation}
            setResumeInformation={setResumeInformation}
          />
          <ResumePDF
            ref={contentRef}
            formFields={formFields}
            resumeInformation={resumeInformation}
            activeColor={["white", "black"]}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
