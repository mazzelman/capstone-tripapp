import styled from "styled-components";

export default function Wrapper700({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
