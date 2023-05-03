import React from 'react';
import { OAuthButton } from './OAuthBtn.style';

type OauthBtnProps = {
  logo: React.ReactNode;
  text: string;
};

const OAuthBtn: React.FC<OauthBtnProps> = ({ logo, text }) => {
  return (
    <OAuthButton>
      {logo}
      {text}
    </OAuthButton>
  );
};

export default OAuthBtn;
