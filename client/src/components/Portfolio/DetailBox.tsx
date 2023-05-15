import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './DetailBox.style';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import c from 'highlight.js/lib/languages/c';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

type DetailBoxProps = {
  text: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('c', c);

const DetailBox: React.FC<DetailBoxProps> = ({ text, content, setContent }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
    if (!quillRef.current) return;
    const quillInstance: any = quillRef.current.getEditor();
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    input.onchange = async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('image', file);

      // 이미지를 서버로 전송 (서버 엔드포인트 주소를 사용)
      const response = await axios.post('YOUR_SERVER_API_URL', {
        body: formData,
      });

      const imageUrl = await response;
      const range = quillInstance.getSelection(true);
      quillInstance.insertEmbed(range.index, 'image', imageUrl);
    };
  };

  const formats = [
    'align',
    'background',
    'blockquote',
    'bold',
    'code-block',
    'color',
    'float',
    'font',
    'header',
    'height',
    'image',
    'italic',
    'link',
    'script',
    'strike',
    'size',
    'underline',
    'width',
    'image',
  ];

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'image', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'],
        ],

        // 내부 이미지를 url로 받아오는 handler
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <S.DetailContainer>
      <S.Title>{text}</S.Title>
      <ReactQuill
        ref={quillRef}
        formats={formats}
        modules={modules}
        onChange={setContent}
        value={content}
        theme='snow'
      />
    </S.DetailContainer>
  );
};

export default DetailBox;
