import React, { ReactNode, useContext } from "react";
import { LuLoader2 } from "react-icons/lu";

import { UserContext } from "providers/providers";
import styles from "./loader.module.css";

interface Props {
  children: ReactNode
}

const Loader = ({ children }: Props) => {
  const { isLoading } = useContext(UserContext)

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <LuLoader2 />
      </div>
    )
  }
  else {
    return (
      <>
        {children}
      </>
    );
  }
};

export default Loader;
