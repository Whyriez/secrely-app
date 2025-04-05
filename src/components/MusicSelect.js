// MusicSelect.jsx
"use client";

import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import useDebounce from "../hooks/useDebounce";

import Image from "next/image";

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        {props.data.image && (
          <Image
            src={props.data.image}
            alt={props.data.label}
            width={32}
            height={32}
            className="rounded-md object-cover"
            style={{ width: "2rem", height: "2rem" }}
          />
        )}
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const CustomSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {props.data.image && (
          <Image
            src={props.data.image}
            alt={props.data.label}
            width={24}
            height={24}
            className="rounded object-cover"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        )}
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

export default function MusicSelect({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalFetched, setTotalFetched] = useState(0);

  const debouncedQuery = useDebounce(searchQuery, 500);
  const LIMIT = 10;

  useEffect(() => {
    setOptions([]);
    setPage(1);
    setHasMore(true);
    setTotalFetched(0);
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchMusic = async () => {
      if (!debouncedQuery) return;

      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/searchTrack?q=${encodeURIComponent(
            debouncedQuery
          )}&limit=${LIMIT}&offset=${(page - 1) * LIMIT + 1}`
        );
        const data = await res.json();

        if (data?.tracks && data.tracks.length > 0) {
          const newOptions = data.tracks.map((track) => ({
            value: track.id,
            label: `${track.name} - ${track.artist}`,
            image: track.album_image,
            preview_url: track.preview_url,
          }));

          setOptions((prev) =>
            page === 1 ? newOptions : [...prev, ...newOptions]
          );
          // Hanya anggap tidak ada lagi data jika kita menerima 0 track
          setHasMore(data.tracks.length > 0);
          setTotalFetched((prev) => prev + data.tracks.length);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load music:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();
  }, [debouncedQuery, page]);

  // Handle scroll to load more
  const handleMenuScrollToBottom = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Handle input change
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        onInputChange={handleInputChange}
        onMenuScrollToBottom={handleMenuScrollToBottom}
        isLoading={isLoading}
        placeholder="🎵 Pilih Musik"
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
          NoOptionsMessage: () => (
            <div className="p-4 text-center text-gray-500">
              {searchQuery ? "Tidak ada hasil" : "Ketik untuk mencari musik"}
            </div>
          ),
        }}
        className="text-sm"
        filterOption={() => true} // Disable client-side filtering
        isSearchable={true}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: state.isFocused ? "#6366F1" : "#D1D5DB",
            boxShadow: state.isFocused
              ? "0 0 0 2px rgba(99, 102, 241, 0.3)"
              : "none",
            "&:hover": {
              borderColor: "#6366F1",
            },
            padding: "0.25rem 0.5rem",
            borderRadius: "0.75rem",
            minHeight: "2.75rem",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#6366F1"
              : state.isFocused
              ? "#E0E7FF"
              : "white",
            color: state.isSelected ? "white" : "#1F2937",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1F2937",
            fontWeight: 500,
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.75rem",
            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }),
        }}
      />
    </>
  );
}
