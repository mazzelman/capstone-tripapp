import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft as faChevronLeftSolid } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

import { StyledCard } from "./DetailsCard";
import { StyledCardBody } from "./PreviewCard";
import { StyledTitle } from "./PreviewCard";
import { StyledInfo } from "./PreviewCard";
import { StyledLink } from "./DetailsCard";

export default function FavoriteCard({ favoritePlaces, onToggleFavorite }) {
  return (
    <>
      <StyledLink href="/">
        <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
        <span>go back</span>
      </StyledLink>
      {favoritePlaces.map(({ id, name, activity, region, image }) => (
        <StyledCard key={id}>
          <Image
            src={image}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width="0"
            height="0"
            alt={name}
            loading="lazy"
          />
          <StyledCardBody>
            <Link href={`/places/${id}`}>
              <StyledTitle>{name}</StyledTitle>
            </Link>
            <FavoriteButton
              id={id}
              favoritePlaces={favoritePlaces}
              onToggleFavorite={onToggleFavorite}
            />
            <StyledInfo>
              {region} &#183; {activity.join(", ")}
            </StyledInfo>
          </StyledCardBody>
        </StyledCard>
      ))}
    </>
  );
}
