import styles from "../../css/Guide/Guide.module.css";
import ReactPlayer from "react-player";

function Guide() {
  return (
    <div className={styles.header}>
      <div className={styles.first}>
        <h2 className={styles.title}>• 프로젝트 열람</h2>
        <ReactPlayer
          className={styles.video}
          url="https://youtu.be/enFmfDDfl8k"
          controls
          width="100%"
          height="60vh"
        />
        <h3 className={styles.description}>
          타인이 만든 프로젝트를 보고 영감을 얻고 참여하세요
        </h3>
      </div>
      <div className={styles.second}>
        <h2 className={styles.title}>• 프로젝트 등록</h2>
        <ReactPlayer
          className={styles.video}
          url="https://youtu.be/NKptE_5g37M"
          controls
          width="100%"
          height="60vh"
        />
        <h3 className={styles.description}>
          여러분의 멋진 프로젝트를 등록하고 팀원을 모으세요
        </h3>
      </div>
      <div className={styles.third}>
        <h2 className={styles.title}>• 마이 프로젝트</h2>
        <ReactPlayer
          className={styles.video}
          url="https://youtu.be/oT3_Jl4pxfQ"
          controls
          width="100%"
          height="60vh"
        />
        <h3 className={styles.description}>
          여러분의 프로젝트를 관리하고 팀원을 관리하세요
        </h3>
      </div>
    </div>
  );
}

export default Guide;
