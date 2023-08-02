import styles from "@/styles/auth.module.css";

export default function Loading() {
  return (
      <div className={styles.outerForm}>
        <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
  )
}
