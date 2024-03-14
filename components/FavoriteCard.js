import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

import { StyledCard } from "./DetailsCard";
import { StyledCardBody } from "./PreviewCard";
import { StyledTitle } from "./PreviewCard";
import { StyledInfo } from "./PreviewCard";

export default function FavoriteCard({ place, toggleFavorite }) {
  const {
    _id,
    name,
    description,
    region,
    image,
    temperature,
    reviews,
    activities,
  } = place;

  return (
    <>
      <StyledCard>
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
          <Link href={`/places/${_id}`}>
            <StyledTitle>{place.name}</StyledTitle>
          </Link>
          <FavoriteButton id={_id} toggleFavorite={toggleFavorite} />
          <StyledInfo>
            {region} &#183; &nbsp;
            {activities.map((activity) => activity.activityname).join(", ")}
          </StyledInfo>
        </StyledCardBody>
      </StyledCard>
    </>
  );
}
