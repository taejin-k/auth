import styled, { css } from "styled-components";
import iconClose from "../assets/svg/iconClose.svg";
import iconBack from "../assets/svg/iconBack.svg";

type HeaderType = "login" | "signIn";

interface HeaderProps {
  headerType: HeaderType;
  title: string;
  onClick: () => void;
}

const Header = (props: HeaderProps) => {
  const { headerType, title, onClick } = props;

  return (
    <HeaderStyled HeaderType={headerType}>
      <p className="title">{title}</p>
      <img
        src={headerType === "login" ? iconClose : iconBack}
        className="icon"
        onClick={onClick}
        alt={headerType === "login" ? "닫기" : "뒤로가기"}
      />
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.div<{ HeaderType: HeaderType }>`
  width: ${({ HeaderType }) => (HeaderType === "login" ? "432px" : "375px")};
  background: ${({ theme }) => theme.ul.white};
  border-bottom: 1px solid ${({ theme }) => theme.ul.light};
  padding: 17px 0;
  position: relative;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .title {
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    ${({ HeaderType }) =>
      HeaderType === "login"
        ? css`
            right: 19px;
          `
        : css`
            left: 19px;
          `}
  }
`;
