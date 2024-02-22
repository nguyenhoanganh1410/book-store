import Head from "next/head";
import React, { ReactNode } from "react";
interface IProps {
  children: ReactNode;
  headTitle: string;
  className?: string;
}

const Container: React.FC<IProps> = ({ children, headTitle, className }) => {
  return (
    <main className={`flex flex-col w-full min-h-screen overflow-hidden font-Inter bg-white ${className}`}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      {children}
    </main>
  );
};

export default Container;
