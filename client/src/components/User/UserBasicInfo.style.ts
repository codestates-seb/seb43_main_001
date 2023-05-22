import styled from 'styled-components';
import { RxGithubLogo, RxPerson, RxSketchLogo } from 'react-icons/rx';
import { IoMdEye } from 'react-icons/io';

import { COLOR } from '../../constants/index';
const { mainColor } = COLOR;

export const BasicInfo = styled.div`
  margin-top: 30px;
  width: 100%;
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
  position: relative;
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    text-align: center;
    color: white;
    background-color: #00000080;
  }
  img {
    width: 100%;
    height: auto;
  }
  margin-right: 15px;
  input {
    display: none;
  }
`;
export const TextBox = styled.div`
  width: -moz-calc(100% - 115px);
  width: -webkit-calc(100% - 115px);
  width: -o-calc(100% - 115px);
  width: calc(100% - 115px);
`;
export const EditName = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  input {
    padding: 0 5px;
    box-sizing: border-box;
    border: 1px solid;
    font-size: 1rem;
    border-radius: 5px;
    margin-bottom: 3px;
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
  margin-right: 15px;
`;
export const UserNameBox = styled.div``;
export const UserName = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 3px;
`;
export const GitBtn = styled.button`
  margin-bottom: 3px;
`;
export const EditGit = styled.label`
  input {
    border: 1px solid;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
  }
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
  margin-left: 8px;
`;
export const FollowrIcon = styled(RxPerson)``;
export const GradeIcon = styled(RxSketchLogo)<{ gradecolor: string }>`
  color: ${(props) => props.gradecolor};
  font-size: 1rem;
  margin: 0;
`;
