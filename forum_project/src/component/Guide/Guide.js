import styles from "../../css/Guide/Guide.module.css";

function Guide() {
	
  return (
    <div className={styles.header}>
      <div className={styles.first}>
        <h2>•First Step</h2>
        <video
          style={{
            backgroundColor: "black",
            marginLeft: "30px",
          }}
        ></video>
        <h3>•설명</h3>
      </div>
      <div className={styles.second}>
        <h2>•Second Step</h2>
        <video style={{ backgroundColor: "black", marginLeft: "30px" }}></video>
        <h3>•설명</h3>
      </div>
      <div className={styles.third}>
        <h2>•Third Step</h2>
        <video style={{ backgroundColor: "black", marginLeft: "30px" }}></video>
        <h3>•설명</h3>
      </div>
    </div>
  );
}

export default Guide;
