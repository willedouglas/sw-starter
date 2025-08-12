import Card from "@/components/Card";
import Divider from "@/components/Divider";
import SearchEmptyState from "@/modules/search/components/SearchEmptyState";

interface SearchResultItem {
  name: string;
  url: string;
}

interface SearchResultsProps {
  items: SearchResultItem[];
  isLoading?: boolean;
}

export default function SearchResults({
  items = [],
  isLoading = false,
}: SearchResultsProps) {
  return (
    <Card className="flex flex-col min-h-[291px] min-w-[291px]">
      <h2 className="text-md font-bold text-black">Results</h2>

      <Divider />

      {items.length === 0 && !isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <SearchEmptyState />
        </div>
      )}

      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm font-bold text-[var(--color-pinkish-grey)]">
            Searching...
          </span>
        </div>
      )}

      {items.length > 0 && !isLoading && (
        <ul className="w-full divide-y divide-gray-200 text-gray-700">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm font-bold py-[8.5px]">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
