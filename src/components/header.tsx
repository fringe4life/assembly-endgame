import { css } from "../../styled-system/css";

export default function Header() {
  return (
    <header
      className={css({ mx: "auto", maxW: "80", pt: "18", textAlign: "center" })}
    >
      <h1
        className={css({
          fontSize: "xl",
          fontWeight: "bold",
          color: "white",
        })}
      >
        Assembly: Endgame
      </h1>
      <p
        className={css({
          fontSize: "sm",
          fontWeight: "medium",
          color: "text.muted",
        })}
      >
        Guess the word in under 8 attempts to keep the programming world safe
        from Assembly!
      </p>
    </header>
  );
}
