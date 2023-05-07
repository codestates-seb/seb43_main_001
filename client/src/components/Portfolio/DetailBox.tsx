import React, { useState } from 'react';
import * as S from './DetailBox.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type DetailBoxProps = {
  text: string;
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
        { background: [] },
      ],
      ['image', 'video'],
      ['clean'],
    ],
  },
};

const DetailBox: React.FC<DetailBoxProps> = ({ text }) => {
  const setting =
    '<p><br></p><h3><strong>*본 형식은 작성을 돕는 가이드일 뿐입니다, 자유로운 형식으로 작성해보세요*</strong></h3><p><br></p><h3>기간 : 2023.00.00 - 2023.00.00</h3><p><br></p><h3>Overview ｜ 프로젝트 요약</h3><p>본인이 진행한 프로젝트에서 어떤 일을 진행했는지 알 수 있도록 간결하게 설명해주세요</p><p><br></p><h3>Role ｜ 역할</h3><p>해당 프로젝트에서 본인이 기여한 정도와 역할을 작성해 주세요.</p><p>기여도 : 00%</p><p><br></p><h3>Function ｜ 기능</h3><p> 작동 화면과 간단한 설명으로 프로젝트에서 구현한 기능에 대해서 설명해주세요.</p><p><br></p><p><br></p><h3>Result ｜ 성과</h3><p>해당 프로젝트의 성과를 작성해 주세요. 수치, 숫자로 성과를 표현할 수 있다면 설득력이 높아져요. 수치로 표현하기 어려운 성과라면 정성적인 성과도 괜찮아요.</p><p><br></p><p><br></p><h3>Lesson-Learned ｜ 프로젝트 후 배운 것</h3><p>모든 프로젝트가 성공하지 못했더라도, 배운 점은 있을 거예요. 해당 프로젝트에서 배운 점, 아쉬웠던 점, 개선할 수 있는 점을 적어서 다음 프로젝트 진행 시에 이를 보완할 수 있다는 것을 어필해 보세요.</p>';

  const [content, setContent] = useState(setting);
  console.log(content);
  return (
    <S.DetailContainer>
      <S.Title>{text}</S.Title>
      <ReactQuill modules={modules} onChange={setContent} value={content} />
    </S.DetailContainer>
  );
};

export default DetailBox;
