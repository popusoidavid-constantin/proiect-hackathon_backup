import styles from "./.Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.fullscreen}>
      <div className={`${styles.spinner} ${styles.xlarge}`} />
    </div>
  );
};

export default Loading;
