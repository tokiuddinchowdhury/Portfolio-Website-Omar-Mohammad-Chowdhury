/**
 * js/projects.js
 * Renders project cards from data/projects.js on the projects page.
 */

(function () {
  function getImageOrPlaceholder(imagePath, projectName) {
    // Returns an img element or a placeholder div
    return `
      <img
        src="${imagePath}"
        alt="${projectName} — project screenshot"
        loading="lazy"
        onerror="this.parentElement.innerHTML=\`<div class='project-img-placeholder'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <span>Screenshot coming soon</span>
          <span style='color:var(--accent-primary);font-size:0.6rem;'>Replace: ${imagePath}</span>
        \`"
      />
    `;
  }

  function isPlaceholder(url) {
    return !url || url.includes('YOUR_') || url === '#';
  }

  function renderProjectCard(project, index) {
    const featuresHtml = project.features
      .slice(0, 4)
      .map((f) => `<li class="project-feature">${f}</li>`)
      .join('');

    const techHtml = project.technologies
      .map((t) => `<span class="tech-badge">${t}</span>`)
      .join('');

    const liveUrl   = isPlaceholder(project.liveUrl)   ? '#'             : project.liveUrl;
    const githubUrl = isPlaceholder(project.githubUrl) ? '#'             : project.githubUrl;
    const liveAttr  = isPlaceholder(project.liveUrl)   ? 'aria-disabled="true" title="URL coming soon"' : `target="_blank" rel="noopener noreferrer"`;
    const ghAttr    = isPlaceholder(project.githubUrl) ? 'aria-disabled="true" title="GitHub URL coming soon"' : `target="_blank" rel="noopener noreferrer"`;

    return `
      <article class="project-card tilt-card reveal reveal-delay-${(index % 3) + 1}" 
               aria-label="${project.name}">
        <div class="project-img-wrap">
          <span class="project-num" aria-hidden="true">0${project.id}</span>
          ${getImageOrPlaceholder(project.image, project.name)}
          <div class="project-overlay" aria-hidden="true">
            <a href="${project.slug}.html" 
               class="project-view-btn"
               aria-label="View ${project.name} case study">
              View Case Study →
            </a>
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-name">${project.name}</h3>
          <p class="project-desc">${project.description}</p>
          <ul class="project-features" aria-label="Key features">
            ${featuresHtml}
          </ul>
          <div class="project-tech-stack" aria-label="Technologies">
            ${techHtml}
          </div>
          <div class="project-actions">
            <a href="${liveUrl}" 
               class="btn btn-primary"
               ${liveAttr}
               aria-label="View live demo of ${project.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
            <a href="${githubUrl}" 
               class="btn btn-secondary"
               ${ghAttr}
               aria-label="View source code of ${project.name} on GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View Source
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function initProjects() {
    const grid = document.querySelector('#projects-grid');
    if (!grid) return;

    if (typeof PROJECTS_DATA === 'undefined' || !PROJECTS_DATA.length) {
      grid.innerHTML = '<p class="text-muted text-center">No projects to display yet.</p>';
      return;
    }

    grid.innerHTML = PROJECTS_DATA.map((p, i) => renderProjectCard(p, i)).join('');
  }

  // Homepage featured preview (shows first 3)
  function initHomepageProjects() {
    const container = document.querySelector('#homepage-projects');
    if (!container) return;
    if (typeof PROJECTS_DATA === 'undefined') return;

    const featured = PROJECTS_DATA.slice(0, 3);
    container.innerHTML = featured.map((p, i) => renderProjectCard(p, i)).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initProjects();
      initHomepageProjects();
    });
  } else {
    initProjects();
    initHomepageProjects();
  }
})();