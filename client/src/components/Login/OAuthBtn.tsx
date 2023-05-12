import React from 'react';
import { OAuthButton } from './OAuthBtn.style';

type OauthBtnProps = {
  logo: React.ReactNode;
  text: string;
  onClick: (e: React.MouseEvent) => void;
};

const OAuthBtn: React.FC<OauthBtnProps> = ({ logo, text, onClick }) => {
  return (
    <OAuthButton onClick={onClick}>
      {logo}
      {text}
    </OAuthButton>
  );
};

export default OAuthBtn;
