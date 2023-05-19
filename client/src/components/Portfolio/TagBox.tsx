import { useState } from 'react';

import * as S from './TagBox.style';
import { TiDeleteOutline } from 'react-icons/ti';

type TagBoxProps = {
  text: string;
  tags: string[];
  addTags: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTags: (indexToRemove: number) => void;
};

const TagBox: React.FC<TagBoxProps> = ({ text, tags, addTags, removeTags }) => {
  return (
    <S.TagContainer>
      <S.Title>{text}</S.Title>
      <S.TagEditor>
        <ul id='tags'>
          {tags.map((tag: string, index: number) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <TiDeleteOutline className='tag-close-icon' onClick={() => removeTags(index)} />
            </li>
          ))}
        </ul>
        <S.TagInput
          type='text'
          onKeyUp={(e) => {
            {
              if (e.key === 'Enter') {
                addTags(e);
              }
            }
          }}
          placeholder={'기술 스택을 입력해주세요'}
        />
      </S.TagEditor>
    </S.TagContainer>
  );
};

export default TagBox;
