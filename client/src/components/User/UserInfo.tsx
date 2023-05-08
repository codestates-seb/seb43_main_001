import { useState } from 'react';
import { YellowBtn } from '../common/Button.style';
import { user } from './mock';
import * as S from './UserInfo.style';
import UserEditForm from './UserEditForm';
import UserBasicInfo from './UserBasicInfo';
import UserDetailInfo from './UserDetailInfo';
import Feedback from './Feedback';
import Portfolio from './Portfolio';

function UserInfo() {
  const [select, setSelect] = useState<boolean>(true);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>(user.img);

  return (
    <S.UserInfo>
      <UserBasicInfo onEdit={onEdit} photo={photo} />
      <S.SelectBtn>
        <button onClick={() => setSelect(true)}>유저 정보</button>
        <button onClick={() => setSelect(false)}>포트 폴리오</button>
      </S.SelectBtn>
      {select && (
        <S.MoreInfo>
          {onEdit ? <UserEditForm /> : <UserDetailInfo />}
          {onEdit ? (
            <S.DetailBtns>
              <YellowBtn type='submit' onClick={() => setOnEdit(false)}>
                수정 완료
              </YellowBtn>
              <button onClick={() => setOnEdit(false)}>수정 취소</button>
            </S.DetailBtns>
          ) : (
            <YellowBtn onClick={() => setOnEdit(true)}>정보 수정</YellowBtn>
          )}
          <Feedback />
        </S.MoreInfo>
      )}
      {!select && <Portfolio />}
    </S.UserInfo>
  );
}

export default UserInfo;
