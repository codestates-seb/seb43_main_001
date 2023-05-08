import { useState } from 'react';

import * as S from './TagBox.style';
import { TiDeleteOutline } from 'react-icons/ti';

type TagBoxProps = {
  text: string;
};

const TagBox: React.FC<TagBoxProps> = ({ text }) => {
  const [tags, setTags] = useState([] as any);
  const removeTags = (indexToRemove: number) => {
    setTags(tags.filter((it: string, index: number) => index !== indexToRemove));
  };

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const tag = event.currentTarget.value;
    if (tags.includes(tag) || tag.length === 0) {
      console.log('Fail!');
      return;
    }
    event.currentTarget.value = '';
    setTags([...tags, tag]);
  };

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
