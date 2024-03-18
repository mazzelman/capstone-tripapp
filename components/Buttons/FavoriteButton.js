import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteButton({ id, isFavorite, toggleFavorite }) {
  return (
    <>
      <StyledFavoriteButton type="button" onClick={() => toggleFavorite(id)}>
        {isFavorite ? (
          <FontAwesomeIcon icon={faHeartSolid} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faHeartRegular} size="2x" />
        )}
      </StyledFavoriteButton>
    </>
  );
}

export const StyledFavoriteButton = styled.button`
  color: var(--secondary-color);
  position: absolute;
  right: 1em;
  top: 1.5em;
  border: none;
  background-color: transparent;
`;
