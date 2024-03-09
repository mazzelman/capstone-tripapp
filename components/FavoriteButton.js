export default function FavoriteButton({
  id,
  favoritePlaces,
  onToggleFavorite,
}) {
  // Check if the current place is favorited
  const isFavorited = favoritePlaces.some((place) => place.id === id);
  return (
    <>
      <button type="button" onClick={() => onToggleFavorite(id)}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>
    </>
  );
}
