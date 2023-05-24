import Feature from './Feature';
import * as S from './ServiceSection.style';
import { Avatar1, Avatar2 } from '../common/icons';

function ServiceSection() {
  return (
    <S.ServiceSection>
      <Feature
        featureTitle='포트폴리오 공유하기'
        description='포트폴리오를 업로드해서 다른 사용자에게 공유해 보세요. 프로젝트, 기술 및 경험을 포함하여 포트폴리오에 대한 세부 정보를 추가할 수 있습니다.'
      >
        <Avatar1 />
      </Feature>
      <Feature
        featureTitle='피드백 주고받기'
        description='코멘트 기능을 사용해서 다른 사용자에게 피드백을 주고받아보세요. 포트폴리오에 대한 피드백뿐만 아니라 사용자에 대한 피드백도 남길 수 있습니다.'
      >
        <Avatar2 />
      </Feature>
    </S.ServiceSection>
  );
}

export default ServiceSection;
