import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './DetailBox.style';

import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { PortfolioAPI } from '../../api/client';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

type DetailBoxProps = {
  text: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
});

const DetailBox: React.FC<DetailBoxProps> = ({ text, content, setContent }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    if (!quillRef.current) return;
    console.log(typeof quillRef.current.getEditor());
    const quillInstance: any = quillRef.current.getEditor();
    // 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

    // input이 클릭되면 파일 선택창이 나타난다.
    input.onchange = async () => {
      const file = input.files![0];

      try {
        // 이미지 업로드
        const url = await PortfolioAPI.uploadImg(file);
        console.log(url);
        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, 'image', url);
        quillInstance.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }

      // ! 1 FileReader 방식
      // const reader = new FileReader();
      // reader.onloadend = function () {
      //   // console.log(reader.result);

      //   const range = quillInstance.getSelection(true);

      //   quillInstance.insertEmbed(range.index, 'image', reader.result);
      //   quillInstance.setSelection(range.index + 1);
      // };
      // reader.readAsDataURL(file);

      // ! 2 createObjectURL 방식
      // const blob = new Blob([file]);
      // const url = URL.createObjectURL(blob);
      // console.log(url);
      // const range = quillInstance.getSelection(true);
      // quillInstance.insertEmbed(range.index, 'image', url);
      // console.log(range);
      // quillInstance.setSelection(range.index + 1);

      // setContentImgs((prev) => [...prev, file]);

      // 이미지를 서버로 전송 (서버 엔드포인트 주소를 사용)
      // const response = await axios.post('http://43.201.157.191:8080/portfolios/52/img-upload', {
      //   body: formData,
      // });
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
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
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
