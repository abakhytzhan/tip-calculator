import Image from "next/image";
import styles from "./Splitter.module.css";
import titlePicture from "./splitter.png";

const Splitter = () => {
  return (
    <Image
      className={styles.split}
      src={titlePicture}
      alt="splitter"
      width={87}
      height={53}
    ></Image>
  );
};

export default Splitter;
