export default function SearchEmptyState() {
  return (
    <div className="flex-grow flex items-center justify-center text-[var(--color-pinkish-grey)] text-sm text-center font-bold">
      There are zero matches.
      <br />
      Use the form to search for People or Movies.
    </div>
  );
}
