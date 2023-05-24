import { useEffect, useState } from 'react';

import * as S from './TagBox.style';
import { TiDeleteOutline } from 'react-icons/ti';

type TagBoxProps = {
  text: string;
  tags: string[];
  addTags: (skill: string) => void;
  removeTags: (indexToRemove: number) => void;
};

const TagBox: React.FC<TagBoxProps> = ({ text, tags, addTags, removeTags }) => {
  const skillList = [
    'Angular',
    'ArangoDB',
    'Arcus',
    'AWS AuroraDB',
    'AWS CodePipeline',
    'AWS DynamoDB',
    'AWS SNS',
    'AWS SQS',
    'C#',
    'C++',
    'CassandraDB',
    'Ceph',
    'Docker',
    'Elasticsearch',
    'Electron',
    'Flask',
    'GitHub',
    'GitHub Actions',
    'Go',
    'Go CD',
    'GoLang',
    'GraphQL',
    'Greenplum',
    'Hibernate',
    'Istio',
    'Jaeger',
    'Jenkins',
    'JavaScript',
    'Java',
    'Kotlin',
    'Kubernetes',
    'Ktor',
    'Memcached',
    'MongoDB',
    'Mobx',
    'MySQL',
    'Netty',
    'Next.js',
    'NuxtJS',
    'Objective-C',
    'OpenEBS',
    'OpenGL',
    'PostgreSQL',
    'R',
    'ReactJS',
    'Reactivex',
    'React Query',
    'Redis',
    'Redux',
    'RabbitMQ',
    'Rundeck',
    'Scala',
    'Spring',
    'Spring Boot',
    'Styled-Components',
    'Swift',
    'Swagger',
    'TypeScript',
    'Unity',
    'VueJS',
    'Vuex',
    'WebRTC',
  ];

  const [skill, setSkill] = useState<string>('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [hasText, setHasText] = useState<boolean>(false);

  // 인자를 포함하는 단어 찾기
  function findMatches(wordToMatch: string) {
    return skillList.filter((skill) => {
      // const regex = new RegExp(wordToMatch, 'gi');
      // return skill.match(regex);
      return skill.toUpperCase().includes(wordToMatch.toUpperCase());
    });
  }

  useEffect(() => {
    if (skill === '') {
      setHasText(false);
    }
  }, [skill]);

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
          onChange={(e) => {
            setSkill(e.currentTarget.value);
            setFilteredSkills(findMatches(e.currentTarget.value));
            setHasText(true);
          }}
          placeholder={'기술 스택을 입력 후 선택해주세요'}
          value={skill}
        />
        {hasText && (
          <S.AutoSearchWrap>
            {filteredSkills.slice(0, 5).map((it) => (
              <S.AutoSearchData
                key={it}
                onClick={() => {
                  addTags(it);
                  setSkill('');
                }}
              >
                {it}
              </S.AutoSearchData>
            ))}
          </S.AutoSearchWrap>
        )}
      </S.TagEditor>
    </S.TagContainer>
  );
};

export default TagBox;
