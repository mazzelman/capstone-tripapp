import FavoriteCard from "@/components/FavoriteCard";

export default function Favorites({
  isFavorite,
  favoritePlaces,
  onToggleFavorite,
}) {
  if (favoritePlaces.length === 0) {
    return <h2>Wow, so much empty...</h2>;
  } else {
    return (
      <>
        <FavoriteCard
          isFavorite={isFavorite}
          favoritePlaces={favoritePlaces}
          onToggleFavorite={onToggleFavorite}
        />
      </>
    );
  }
}
