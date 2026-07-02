import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { profile } from "./data/profile";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

function App() {
  const [previewImage, setPreviewImage] = useState(null);

  const openPreview = (image) => {
    setPreviewImage({
      ...image,
      src: assetPath(image.src),
    });
  };

  useEffect(() => {
    if (!previewImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${profile.name} home`}>
          {profile.name}
        </a>
        <nav className="nav-links">
          <a href="#case-studies">Case Studies</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#open-source">Open Source</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Portfolio
          </p>
          <h1>{profile.name}</h1>
          <p className="role">
            {profile.displayName} · {profile.role}
          </p>
          <p className="headline">{profile.headline}</p>
          <div className="hero-actions" aria-label="Profile links">
            <a
              className="button primary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              className="button secondary"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <aside className="profile-panel" aria-label="Profile summary">
          <img className="portrait" src={assetPath(profile.portrait)} alt={`${profile.name} portrait`} />
          <div>
            <p className="panel-label">Currently focused on</p>
            <ul className="focus-list">
              {profile.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="meta-grid">
            <span>
              <MapPin size={16} aria-hidden="true" />
              {profile.location}
            </span>
            <span>
              <BriefcaseBusiness size={16} aria-hidden="true" />
              {profile.role}
            </span>
          </div>
        </aside>
      </section>

      <section className="section about-section" aria-labelledby="about-title">
        <div className="section-heading">
          <p className="section-kicker">About</p>
          <h2 id="about-title">{profile.aboutTitle}</h2>
        </div>
        <p className="about-text">{profile.summary}</p>
      </section>

      <section className="section case-study-section" id="case-studies" aria-labelledby="case-study-title">
        <div className="section-heading">
          <p className="section-kicker">Case Studies</p>
          <h2 id="case-study-title">기술로 문제를 해결한 경험</h2>
        </div>
        <div className="case-study-content">
          <aside className="fit-callout">
            <p className="panel-label">Catalog system fit</p>
            <p>{profile.fitStatement}</p>
          </aside>
          <div className="case-study-grid">
            {profile.caseStudies.map((study) => (
              <article className="case-study-card" key={study.title}>
                <p className="card-eyebrow">{study.label}</p>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <dl>
                  {study.details.map((detail) => (
                    <div key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="case-study-insight">{study.insight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="section-kicker">Experience</p>
          <h2 id="experience-title">경력</h2>
        </div>
        <div className="timeline">
          {profile.experience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-meta">
                <span>{item.period}</span>
              </div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.description}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {item.link ? (
                  <div className="blog-summary">
                    <a className="text-link" href={item.link.href} target="_blank" rel="noreferrer">
                      {item.link.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <p>{item.link.summary}</p>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="section-kicker">Projects</p>
          <h2 id="projects-title">대표 프로젝트</h2>
        </div>
        <div className="project-grid">
          {profile.projects.map((project) => (
            <article className="project-card" key={project.name}>
              {project.image ? (
                <button
                  className="image-button project-image-button"
                  type="button"
                  onClick={() =>
                    openPreview({
                      src: project.image,
                      alt: project.imageAlt,
                      title: project.name,
                    })
                  }
                  aria-label={`${project.name} image 크게 보기`}
                >
                  <img className="project-image" src={assetPath(project.image)} alt={project.imageAlt} />
                </button>
              ) : null}
              <div className="project-card-header">
                <p>{project.type}</p>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} link`}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ) : (
                  <ArrowUpRight size={18} aria-hidden="true" />
                )}
              </div>
              <h3>{project.name}</h3>
              <p className="card-meta">{project.period}</p>
              <p>{project.description}</p>
              <ul className="project-highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {project.supportingImages ? (
                <div className="supporting-image-grid">
                  {project.supportingImages.map((image) => (
                    <figure className="supporting-figure" key={image.src}>
                      <button
                        className="image-button supporting-image-button"
                        type="button"
                        onClick={() => openPreview(image)}
                        aria-label={`${image.title} 이미지 크게 보기`}
                      >
                        <img src={assetPath(image.src)} alt={image.alt} />
                      </button>
                      <figcaption>
                        <strong>{image.title}</strong>
                        <span>{image.description}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              {project.link && project.linkLabel ? (
                <div className="project-link-block">
                  <a className="text-link project-link" href={project.link} target="_blank" rel="noreferrer">
                    {project.linkLabel}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  {project.linkSummary ? <p>{project.linkSummary}</p> : null}
                </div>
              ) : null}
              <div className="tag-list" aria-label={`${project.name} skills`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="open-source" aria-labelledby="open-source-title">
        <div className="section-heading">
          <p className="section-kicker">Open Source</p>
          <h2 id="open-source-title">오픈소스 기여</h2>
        </div>
        <div className="open-source-list">
          {profile.openSource.map((item) => (
            <article className="open-source-item" key={item.name}>
              <div className="open-source-media">
                <img src={assetPath(item.image)} alt={item.imageAlt} />
                {item.secondaryImage ? (
                  <img src={assetPath(item.secondaryImage)} alt={item.secondaryImageAlt} />
                ) : null}
              </div>
              <div className="open-source-copy">
                <div className="project-card-header">
                  <p>{item.type}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.name} pull request`}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
                <h3>{item.name}</h3>
                <p className="card-meta">{item.period}</p>
                <p>{item.description}</p>
                <ul className="project-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tag-list" aria-label={`${item.name} skills`}>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <aside className="award-callout" aria-label="Open source award">
            <Award size={20} aria-hidden="true" />
            <div>
              <h3>Awards</h3>
              {profile.awards.map((award) => (
                <span key={award}>{award}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="section-kicker">Skills</p>
          <h2 id="skills-title">기술 스택</h2>
        </div>
        <div className="skill-list">
          {profile.skills.map((skill) => (
            <span key={skill}>
              <Code2 size={16} aria-hidden="true" />
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section credential-section" aria-labelledby="credential-title">
        <div className="section-heading">
          <p className="section-kicker">More</p>
          <h2 id="credential-title">교육, 활동</h2>
        </div>
        <div className="credential-grid">
          <article>
            <GraduationCap size={20} aria-hidden="true" />
            <h3>Education</h3>
            <p>{profile.education.school}</p>
            <span>{profile.education.major}</span>
            <span>{profile.education.period} · {profile.education.gpa}</span>
          </article>
          <article>
            <BriefcaseBusiness size={20} aria-hidden="true" />
            <h3>Activities</h3>
            {profile.activities.map((activity) => (
              <span key={activity}>{activity}</span>
            ))}
          </article>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">함께 이야기할 준비가 되어 있습니다.</h2>
        </div>
        <div className="contact-links">
          {profile.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {previewImage ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewImage.title ?? previewImage.alt} 이미지 미리보기`}
          onClick={() => setPreviewImage(null)}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setPreviewImage(null)}
              aria-label="이미지 미리보기 닫기"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img src={previewImage.src} alt={previewImage.alt} />
            {previewImage.title ? <p>{previewImage.title}</p> : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
