import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import InputField from "../InputField/InputField";
import Select from "react-select";
import { skillOptions } from "../docs/data.jsx";
import { X } from "react-feather";

const Form = ({ formFields, resumeInformation, setResumeInformation }) => {
  const [activeFormField, setActiveFormField] = useState(
    Object.keys(formFields)[0]
  );
  const [activeResumeInformation, setActiveResumeInformation] = useState(
    resumeInformation[formFields[Object.keys(formFields)[0]]]
  );
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [values, setValues] = useState({
    name: activeFormField?.detail?.name ? activeFormField?.detail?.name : "",
    email: activeFormField?.detail?.email ? activeFormField?.detail?.email : "",
    phone: activeFormField?.detail?.phone ? activeFormField?.detail?.phone : "",
    linkedin: activeFormField?.detail?.linkedin
      ? activeFormField?.detail?.linkedin
      : "",
    github: activeFormField?.detail?.github
      ? activeFormField?.detail?.github
      : "",
  });

  const personalInfoBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputField
          label="Name : "
          type={"text"}
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputField
          label="Email : "
          type={"email"}
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputField
          label="Phone : "
          type={"tel"}
          value={values.phoneNumber}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phoneNumber: event.target.value }))
          }
        />
        <InputField
          label="LinkedIn : "
          type="url"
          value={values.linkedin}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, linkedin: event.target.value }))
          }
        />
        <InputField
          label="Github : "
          type="url"
          value={values.github}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
          }
        />
      </div>
    </div>
  );

  const educationInfoBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputField
          label="Institute : "
          type={"text"}
          value={values.institute}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, institute: event.target.value }))
          }
        />
        <InputField
          label="Degree : "
          type={"text"}
          value={values.degree}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, degree: event.target.value }))
          }
        />
        <InputField
          label="Year of Passing : "
          type={"date"}
          value={values.yop}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, yop: event.target.value }))
          }
        />
      </div>
    </div>
  );

  const workExpBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputField
          label="Company : "
          type={"text"}
          value={values.company}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, company: event.target.value }))
          }
        />
        <InputField
          label="Role : "
          type={"text"}
          value={values.role}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, role: event.target.value }))
          }
        />
        <InputField
          label="Duration (in months): "
          type={"number"}
          value={values.duration}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, duration: event.target.value }))
          }
        />
        <InputField
          label="Achievements : "
          type="url"
          value={values.achievements}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, achievements: event.target.value }))
          }
        />
      </div>
    </div>
  );

  const skillsBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <label for="skills">Select your skills:</label>
        <Select
          isMulti
          name="skills"
          options={skillOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );

  const projectsBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputField
          label="Title : "
          type={"text"}
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
        <InputField
          label="Description : "
          type={"text"}
          value={values.desc}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, desc: event.target.value }))
          }
        />
        <InputField
          label="Tech Used : "
          type={"text"}
          value={values.tech}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, tech: event.target.value }))
          }
        />
      </div>
    </div>
  );

  const generateForm = () => {
    switch (formFields[activeFormField]) {
      case formFields.personalInfo:
        return personalInfoBody;
      case formFields.education:
        return educationInfoBody;
      case formFields.workExp:
        return workExpBody;
      case formFields.skills:
        return skillsBody;
      case formFields.projects:
        return projectsBody;
      default:
        return null;
    }
  };

  const handleSubmission = () => {
    switch (formFields[activeFormField]) {
      case formFields.basicInfo: {
        const tempDetail = {
          name: values.name,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };

        setResumeInformation((prev) => ({
          ...prev,
          [formFields.personalInfo]: {
            ...prev[formFields.personalInfo],
            detail: tempDetail,
          },
        }));
        break;
      }
      case formFields.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          companyName: values.companyName,
          location: values.location,
          points: values.points,
        };
        const tempDetails = [...resumeInformation[formFields.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        setResumeInformation((prev) => ({
          ...prev,
          [formFields.workExp]: {
            ...prev[formFields.workExp],
            details: tempDetails,
          },
        }));
        break;
      }
      case formFields.projects: {
        const tempDetail = {
          link: values.link,
          title: values.title,
          overview: values.overview,
          github: values.github,
          points: values.points,
        };
        const tempDetails = [
          ...resumeInformation[formFields.projects]?.details,
        ];
        tempDetails[activeDetailIndex] = tempDetail;

        setResumeInformation((prev) => ({
          ...prev,
          [formFields.project]: {
            ...prev[formFields.projects],
            details: tempDetails,
          },
        }));
        break;
      }
      case formFields.education: {
        const tempDetail = {
          title: values.title,
          college: values.college,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const tempDetails = [
          ...resumeInformation[formFields.education]?.details,
        ];
        tempDetails[activeDetailIndex] = tempDetail;

        setResumeInformation((prev) => ({
          ...prev,
          [formFields.education]: {
            ...prev[formFields.education],
            details: tempDetails,
          },
        }));
        break;
      }
    }
  };

  const handleAddNew = () => {
    const details = activeResumeInformation?.details;
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (!Object.keys(lastDetail).length) return;
    details?.push({});

    setResumeInformation((prev) => ({
      ...prev,
      [formFields[activeFormField]]: {
        ...resumeInformation[formFields[activeFormField]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };

  const handleDeleteDetail = (index) => {
    const details = activeResumeInformation?.details
      ? [...activeResumeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);
    setResumeInformation((prev) => ({
      ...prev,
      [formFields[activeFormField]]: {
        ...resumeInformation[formFields[activeFormField]],
        details: details,
      },
    }));

    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  };

  useEffect(() => {
    const activeInfo = resumeInformation[formFields[activeFormField]];
    setActiveResumeInformation(activeInfo);
    setActiveDetailIndex(0);
    setValues({
      name: activeInfo?.detail?.name || "",
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ""
        : "",
      link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",

      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ""
        : "",
      college: activeInfo?.details ? activeInfo.details[0]?.college || "" : "",
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      title: activeInfo?.details
        ? activeInfo.details[0]?.title || ""
        : activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      github: activeInfo?.details
        ? activeInfo.details[0]?.github || ""
        : activeInfo?.detail?.github || "",
      phone: activeInfo?.detail?.phone || "",
      email: activeInfo?.detail?.email || "",
    });
  }, [activeFormField]);

  useEffect(() => {
    setActiveResumeInformation(resumeInformation[formFields[activeFormField]]);
  }, [resumeInformation]);

  useEffect(() => {
    const details = activeResumeInformation?.details;
    if (!details) return;

    const activeInfo = resumeInformation[formFields[activeFormField]];
    setValues({
      overview: activeInfo.details[activeDetailIndex]?.overview || "",
      link: activeInfo.details[activeDetailIndex]?.link || "",
      certificationLink:
        activeInfo.details[activeDetailIndex]?.certificationLink || "",
      companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
      location: activeInfo.details[activeDetailIndex]?.location || "",
      startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
      endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
      points: activeInfo.details[activeDetailIndex]?.points || "",
      title: activeInfo.details[activeDetailIndex]?.title || "",
      linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
      github: activeInfo.details[activeDetailIndex]?.github || "",
      college: activeInfo.details[activeDetailIndex]?.college || "",
    });
  }, [activeDetailIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {Object.keys(formFields)?.map((item) => (
          <div
            className={`${styles.formField} ${
              activeFormField === item ? styles.active : ""
            }`}
            key={item}
            onClick={() => setActiveFormField(item)}
          >
            {formFields[item]}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.chips}>
          {activeResumeInformation?.details
            ? activeResumeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${
                    activeDetailIndex === index ? styles.active : ""
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {formFields[activeFormField]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeResumeInformation?.details &&
          activeResumeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              +New
            </div>
          ) : (
            ""
          )}
        </div>

        {generateForm()}

        <button onClick={handleSubmission}>Save</button>
      </div>
    </div>
  );
};

export default Form;
