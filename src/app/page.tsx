import HeroImg from "@/assets/main-alternative.svg";
import { ButtonLink } from "@/components/Button";
import Logo from "@/components/Logo";

import styles from "./page.module.scss";

const Landing = () => {
  return (
    <>
      <header className={styles.header} data-container="fixed">
        <Logo />
      </header>
      <main className={styles.main} data-container="fixed">
        <article>
          <h1 data-h1>
            Job <em>Tracking</em> App
          </h1>
          <p>
            {`I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings brunch
              narwhal.`}
          </p>
          <ButtonLink href="/login">Get started</ButtonLink>
        </article>
        <figure className="img">
          <HeroImg />
        </figure>
      </main>
    </>
  );
};

export default Landing;
