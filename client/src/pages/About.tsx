import * as S from './About.style';
import LandingSection from '../components/About/LandingSection';
import ServiceSection from '../components/About/ServiceSection';
import ShareSection from '../components/About/ShareSection';

function About() {
  return (
    <S.Container>
      <LandingSection />
      <ServiceSection />
      <ShareSection />
    </S.Container>
  );
}

export default About;
