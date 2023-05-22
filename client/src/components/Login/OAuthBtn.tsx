import React from 'react';
import { OAuthButton } from './OAuthBtn.style';

type OauthBtnProps = {
  logo: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

const OAuthBtn: React.FC<OauthBtnProps> = ({ logo, onClick }) => {
  return <OAuthButton onClick={onClick}>{logo}</OAuthButton>;
};

export default OAuthBtn;
