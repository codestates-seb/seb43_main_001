import styled from 'styled-components';
import { RxGithubLogo, RxPerson } from 'react-icons/rx';
import { IoMdEye } from 'react-icons/io';

import { COLOR } from '../../constants/index';
const { mainColor } = COLOR;

export const BasicInfo = styled.div`
  margin-top: 80px;
  padding: 0 3%;
  position: relative;
  display: flex;
  align-items: flex-end;
  img {
    width: 15px;
    height: 15px;
  }
`;
export const EditImg = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${mainColor};
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
  }
  margin-right: 10px;
  input {
    display: none;
  }
`;
export const UserImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  margin-right: 10px;
`;
export const UserName = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 3%;
  bottom: 0;
`;
export const GithubIcon = styled(RxGithubLogo)``;
export const ViewIcon = styled(IoMdEye)`
  margin: 0 5px;
`;
export const FollowrIcon = styled(RxPerson)``;
