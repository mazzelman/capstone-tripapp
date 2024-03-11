import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import { StyledCard } from "./PreviewCard";

export default function FavoriteCard({ favoritePlaces, onToggleFavorite }) {
  return (
    <>
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
          <Link href={`/places/${id}`}>
            <h3>{name}</h3>
          </Link>
          <FavoriteButton
            id={id}
            favoritePlaces={favoritePlaces}
            onToggleFavorite={onToggleFavorite}
          />
          <p>Region: {region}</p>
          <p>Activity: {activity.join(", ")}</p>
        </StyledCard>
      ))}
    </>
  );
}
