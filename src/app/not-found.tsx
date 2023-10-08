import ImgNotFound from "@/assets/not-found.svg";
import { ButtonLink } from "@/components/Button";

import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <main className={styles.error} data-container>
      <ImgNotFound />
      <div>
        <h1 data-h3>Ohh! Page not found</h1>
        <p>{`We cant' seem to find the page you're looking for`}</p>
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </main>
  );
};

export default NotFound;
