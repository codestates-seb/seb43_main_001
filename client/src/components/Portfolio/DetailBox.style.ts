import styled from 'styled-components';
import { COLOR } from '../../constants';

const { mainColor } = COLOR;
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  .ql-container {
    background-color: ${(props) => props.theme.themeStyle.inputColor};
    min-height: 15rem;
  }
  .ql-toolbar {
    background-color: ${mainColor};
  }
`;
export const Title = styled.span`
  height: 45px;
`;
