import { memo } from "react";
import styles from "../../css/MainPage/FirstBlock.module.css";

const FirstBlock = memo(() => {
  return (
    <div className={styles.first_block}>
      <div className={styles.slogan}>
        <div className={styles.slogan_text}>
          <p>
            만국의 개발자여 <br />
            단결하라!
          </p>
          <p>
            그대들이 잃을 것은 <br />빈 이력서요,
          </p>
          <p>얻을 것은 경력이다.</p>
        </div>
        <img
          style={{ marginLeft: "1rem" }}
          className={styles.slogan_img}
          src="image/slogan.png"
          alt="슬로건"
        ></img>
      </div>
      <div className={styles.summary_text}>
        프로젝트를 찾는 개발자를 위한 안내서
      </div>
      <div className={styles.summary}>
        <div className={styles.summary_block}>
          <img
            className={styles.summary_img}
            src="image/idea.png"
            alt="아이디어"
          ></img>
          <div className={styles.s_text}>
            여러분의 멋진 아이디어를 <br />
            사람들에게 공개하세요. <br />
            팀원을 모으고 최고의 팀을
            <br /> 만들어 보세요.
          </div>
        </div>
        <div className={styles.summary_block}>
          <img
            className={styles.summary_img}
            src="image/cooper.png"
            alt="협력"
          ></img>
          <div className={styles.s_text}>
            사람들과 협력하여 아이디어를 현실화 하세요.
            <br /> 개발하고 테스트하고 처음부터 끝까지 자신만의 프로젝트를
            만드세요.
          </div>
        </div>
        <div className={styles.summary_block}>
          <img
            className={styles.summary_img}
            src="image/career.png"
            alt="경력"
          ></img>
          <div className={styles.s_text}>
            커리어를 쌓고 한층 더 유능한 개발자가 되세요.
            <br /> 더 좋은 조건으로 취업, 계약을 할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
});

export default FirstBlock;
