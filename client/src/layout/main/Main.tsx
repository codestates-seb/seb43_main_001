import React from 'react';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const Main: React.FC<GeneralLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Main;
