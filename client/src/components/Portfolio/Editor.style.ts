import styled from 'styled-components';
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

export const EditorContainer = styled.div`
  min-height: 300px;
  .ql-container {
    background-color: ${(props) => props.theme.themeStyle.inputColor};
    min-height: 15rem;
  }
  .ql-toolbar {
    background-color: ${mainColor};
  }
  .ql-editor img {
    max-width: 100%;
  }
`;
