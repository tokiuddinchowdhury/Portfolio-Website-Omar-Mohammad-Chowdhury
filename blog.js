/**
 * js/blog.js
 * Blog page renderer — currently shows Coming Soon state.
 * When BLOG_POSTS has entries, automatically renders them.
 */

(function () {
  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function renderBlogCard(post) {
    return `
      <article class="blog-card reveal">
        <div style="aspect-ratio:16/9;background:var(--bg-secondary);overflow:hidden;">
          <img
            src="${post.coverImage || 'artholingo.webp'}"
            alt="${post.title}"
            loading="lazy"
            style="width:100%;height:100%;object-fit:cover;"
            onerror="this.style.display='none'"
          />
        </div>
        <div style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <span class="label-mono" style="font-size:0.65rem;">${post.category}</span>
            <span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-subtle);">
              ${formatDate(post.date)} · ${post.readingTime} min read
            </span>
          </div>
          <h3 style="font-size:1.1rem;margin-bottom:var(--space-sm);">${post.title}</h3>
          <p style="font-size:0.875rem;color:var(--text-muted);">${post.excerpt}</p>
          <div style="margin-top:var(--space-lg);">
            <a href="${post.slug}.html" class="btn btn-secondary" style="font-size:0.825rem;padding:0.5rem 1rem;">
              Read Article →
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function renderComingSoon() {
    return `
      <div class="blog-coming-soon reveal">
        <div class="blog-coming-icon" aria-hidden="true">✍️</div>
        <span class="label-mono">Learning Journal</span>
        <h2>Articles Coming Soon</h2>
        <p>
          I'm working on writing about what I learn — web development techniques,
          AI experiments, project build logs, and honest reflections from a 
          CSE student's perspective. Stay tuned.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm);justify-content:center;margin-top:var(--space-md);">
          ${['Frontend', 'Full Stack', 'AI', 'Projects', 'Learning'].map((t) =>
            `<span class="philosophy-tag">${t}</span>`
          ).join('')}
        </div>
      </div>
    `;
  }

  function renderFilters(posts) {
    const mount = document.querySelector('#blog-filters');
    if (!mount) return;
    const categories = typeof BLOG_CATEGORIES !== 'undefined' && BLOG_CATEGORIES.length
      ? BLOG_CATEGORIES
      : ['All'];
    mount.innerHTML = categories.map((category, index) =>
      `<button type="button" class="blog-filter-btn" data-category="${category}" aria-pressed="${index === 0}">${category}</button>`
    ).join('');
    mount.addEventListener('click', (event) => {
      const button = event.target.closest('.blog-filter-btn');
      if (!button) return;
      const category = button.dataset.category;
      mount.querySelectorAll('.blog-filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      renderPosts(category === 'All' ? posts : posts.filter((post) => post.category === category));
    });
  }

  let currentPosts = [];
  function renderPosts(posts) {
    const blogGrid = document.querySelector('#blog-grid');
    const blogCount = document.querySelector('#blog-count');
    if (!blogGrid) return;
    currentPosts = posts;
    if (blogCount) blogCount.textContent = posts.length ? `${posts.length} article${posts.length !== 1 ? 's' : ''}` : 'No articles yet';
    if (!posts.length) {
      blogGrid.innerHTML = `<div class="blog-empty-state"><span class="label-mono">Learning Journal</span><h2>No articles in this topic yet.</h2><p>New notes and experiments will appear here as the journal grows.</p></div>`;
      return;
    }
    blogGrid.innerHTML = posts.map(renderBlogCard).join('');
  }

  function initBlog() {
    const blogGrid = document.querySelector('#blog-grid');
    if (!blogGrid) return;
    const posts = typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS : [];
    renderFilters(posts);
    renderPosts(posts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  } else {
    initBlog();
  }
})();