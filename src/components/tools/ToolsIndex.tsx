import { tools } from '../../config/tools';
import styles from './ToolsIndex.module.css';

/**
 * Tools hub — lists every tool from src/config/tools.ts.
 * No interactivity, so it's rendered to static HTML (no client directive in the
 * route), shipping zero JavaScript.
 */
export default function ToolsIndex() {
  return (
    <div className="container">
      <header className={`${styles.pageHead} flow`}>
        <p className="kicker">// utilities</p>
        <h1>Tools</h1>
        <p className="muted">
          A growing set of small, self-contained web tools. No tracking, no server —
          everything runs locally in your browser.
        </p>
      </header>

      <div className={styles.grid}>
        {tools.map((tool) => (
          <a key={tool.slug} href={`/tools/${tool.slug}/`} className={styles.tool}>
            <div className={styles.top}>
              <span className={styles.tag}>{tool.tag}</span>
              {tool.status === 'wip' && <span className={styles.status}>wip</span>}
            </div>
            <h3 className={styles.title}>{tool.title}</h3>
            <p className={styles.desc}>{tool.description}</p>
            <span className={styles.more}>launch →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
