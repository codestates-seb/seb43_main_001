import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './Editor.style';

import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { PortfolioAPI } from '../../api/client';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

type EditorProps = {
  writeMode: boolean;
  content: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
};

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
});

const Editor: React.FC<EditorProps> = ({ writeMode, content, setContent }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    if (!quillRef.current) return;
    // console.log(typeof quillRef.current.getEditor());
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
      toolbar: writeMode
        ? {
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
          }
        : false,
    };
  }, []);

  return (
    <S.EditorContainer>
      {writeMode ? (
        <ReactQuill
          ref={quillRef}
          formats={formats}
          modules={modules}
          onChange={setContent}
          value={content}
          theme='snow'
        />
      ) : (
        <ReactQuill
          // formats={formats}
          modules={modules}
          // toolbar={false} // 툴바를 숨깁니다.
          readOnly={true}
          value={content}
          theme={'snow'} // 생성할 때 사용한 테마를 설정합니다.
        />
      )}
    </S.EditorContainer>
  );
};

export default Editor;
