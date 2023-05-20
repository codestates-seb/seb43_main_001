import * as S from './SignInput.style';

type SignInputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function SignInput({ type, name, placeholder, value, setValue }: SignInputProps) {
  return (
    <S.Wrapper>
      <S.SignTitle>{name}</S.SignTitle>
      <S.SignInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </S.Wrapper>
  );
}

export default SignInput;
