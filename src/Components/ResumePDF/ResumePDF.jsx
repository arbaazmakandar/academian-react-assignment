import React, { forwardRef, useRef, useState, useEffect } from "react";
import styles from "./ResumePDF.module.css";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

const ResumePDF = forwardRef(
  ({ resumeInformation, formFields, activeColor }, ref) => {
    const containerRef = useRef();

    console.log(resumeInformation["Personal Info"].detail);

    const [columns, setColumns] = useState([[], []]);
    const [source, setSource] = useState("");
    const [target, seTarget] = useState("");

    const info = {
      workExp: resumeInformation[formFields.workExp],
      projects: resumeInformation[formFields.projects],
      education: resumeInformation[formFields.education],
      personalInfo: resumeInformation[formFields.personalInfo],
      skills: resumeInformation[formFields.skills],
    };

    const getFormattedDate = (value) => {
      if (!value) return "";
      const date = new Date(value);

      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const sectionDiv = {
      [formFields.workExp]: (
        <div
          key={"workexp"}
          draggable
          onDragOver={() => seTarget(info.workExp?.id)}
          onDragEnd={() => setSource(info.workExp?.id)}
          className={`${styles.section} ${
            info.workExp?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
          <div className={styles.content}>
            {info.workExp?.details?.map((item) => (
              <div className={styles.item} key={item.title}>
                {item.title ? (
                  <p className={styles.title}>{item.title}</p>
                ) : (
                  <span />
                )}
                {item.companyName ? (
                  <p className={styles.subTitle}>{item.companyName}</p>
                ) : (
                  <span />
                )}
                {item.certificationLink ? (
                  <a className={styles.link} href={item.certificationLink}>
                    <Paperclip />
                    {item.certificationLink}
                  </a>
                ) : (
                  <span />
                )}
                {item.startDate && item.endDate ? (
                  <div className={styles.date}>
                    <Calendar /> {getFormattedDate(item.startDate)}-
                    {getFormattedDate(item.endDate)}
                  </div>
                ) : (
                  <div />
                )}
                {item.location ? (
                  <p className={styles.date}>
                    <MapPin /> Remote
                  </p>
                ) : (
                  <span />
                )}
                {item.points?.length > 0 ? (
                  <ul className={styles.points}>
                    {item.points?.map((elem, index) => (
                      <li className={styles.point} key={elem + index}>
                        {elem}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      [formFields.projects]: (
        <div
          key={"project"}
          draggable
          onDragOver={() => seTarget(info.project?.id)}
          onDragEnd={() => setSource(info.project?.id)}
          className={`${styles.section} ${
            info.projects?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.content}>
            {info.project?.details?.map((item) => (
              <div className={styles.item}>
                {item.title ? (
                  <p className={styles.title}>{item.title}</p>
                ) : (
                  <span />
                )}
                {item.link ? (
                  <a className={styles.link} href={item.link}>
                    <Paperclip />
                    {item.link}
                  </a>
                ) : (
                  <span />
                )}
                {item.github ? (
                  <a className={styles.link} href={item.github}>
                    <GitHub />
                    {item.github}
                  </a>
                ) : (
                  <span />
                )}
                {item.overview ? (
                  <p className={styles.overview}>{item.overview} </p>
                ) : (
                  <span />
                )}
                {item.points?.length > 0 ? (
                  <ul className={styles.points}>
                    {item.points?.map((elem, index) => (
                      <li className={styles.point} key={elem + index}>
                        {elem}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      [formFields.education]: (
        <div
          key={"education"}
          draggable
          onDragOver={() => seTarget(info.education?.id)}
          onDragEnd={() => setSource(info.education?.id)}
          className={`${styles.section} ${
            info.education?.sectionTitle ? "" : styles.hidden
          }`}
        >
          <div className={styles.sectionTitle}>
            {info.education?.sectionTitle}
          </div>
          <div className={styles.content}>
            {info.education?.details?.map((item) => (
              <div className={styles.item}>
                {item.title ? (
                  <p className={styles.title}>{item.title}</p>
                ) : (
                  <span />
                )}
                {item.college ? (
                  <p className={styles.subTitle}>{item.college}</p>
                ) : (
                  <span />
                )}
                {item.startDate && item.endDate ? (
                  <div className={styles.date}>
                    <Calendar /> {getFormattedDate(item.startDate)} -
                    {getFormattedDate(item.endDate)}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    };

    useEffect(() => {
      setColumns([
        [formFields.projects, formFields.education],
        [formFields.workExp, formFields.skills],
      ]);
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!activeColor || !container) return;

      container.style.setProperty("--color", activeColor);
    }, [activeColor]);

    return (
      <div ref={ref}>
        <div className={styles.container} ref={containerRef}>
          <div className={styles.header}>
            <p className={styles.heading}>
              {resumeInformation["Personal Info"].detail.name}
            </p>
            <p className={styles.subHeading}>Web Developer</p>

            <div className={styles.links}>
              <a className={styles.link}>
                <AtSign /> {resumeInformation["Personal Info"].detail.email}
              </a>

              <a className={styles.link}>
                <Linkedin />
                {resumeInformation["Personal Info"].detail.linkedin}
              </a>
              <a className={styles.link}>
                <GitHub />
                {resumeInformation["Personal Info"].detail.github}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResumePDF;
