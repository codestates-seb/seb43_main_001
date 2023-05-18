import { useEffect, useState } from 'react';
import * as S from './UserDetailInfo.style';

type DetailInfoProps = {
  about: string;
  jobStatus: string;
  email: string;
  blogLink: string;
};
const UserDetailInfo: React.FC<DetailInfoProps> = ({ about, jobStatus, email, blogLink }) => {
  const [userJobStatus, setUserJobStatus] = useState('');
  const jobSetting = () => {
    switch (jobStatus) {
      case 'JOB_SEEKING':
        return setUserJobStatus('구직중');
      case 'ON_THE_JOB':
        return setUserJobStatus('재직중');
      case 'STUDENT':
        return setUserJobStatus('학생');
      default:
        return;
    }
  };

  // ! : 다른 방법이 없는지 찾아볼 것
  useEffect(() => {
    jobSetting();
  }, [jobStatus]);

  return (
    <S.DetailInfo>
      <label>
        About
        <p>{about}</p>
      </label>
      {jobStatus && (
        <label>
          <S.CompanyIcon />
          <p>: {userJobStatus}</p>
        </label>
      )}
      {email && (
        <label>
          <S.EmailIcon />
          <p>: {email}</p>
        </label>
      )}
      {blogLink && (
        <label>
          <S.BlogIcon />
          <a href={blogLink} target='_blank' rel='noreferrer'>
            : {blogLink}
          </a>
        </label>
      )}
    </S.DetailInfo>
  );
};

export default UserDetailInfo;
