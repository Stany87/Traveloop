export const destinationImages: { label: string; src: string }[] = [
  { label: "Kyoto, Japan", src: "/kyoto.png" },
  { label: "Santorini, Greece", src: "/santorini.png" },
  { label: "Bali, Indonesia", src: "/bali.png" },
  { label: "Swiss Alps", src: "/swiss.png" },
  { label: "Paris, France", src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800" },
  { label: "London, UK", src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800" },
  { label: "Sydney, Australia", src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800" },
  { label: "New York, USA", src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" },
  { label: "Mountains", src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800" },
  { label: "Tropical Beach", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" },
  { label: "Dubai, UAE", src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" },
  { label: "Jaipur, India", src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800" },
];

const defaultImages = destinationImages.map((d) => d.src);

export const getCoverImage = (destination: string | null | undefined, customImage: string | null | undefined) => {
  if (customImage && customImage.trim() !== "") {
    return customImage;
  }
  const dest = destination || "Unknown";
  const hash = dest.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return defaultImages[hash % defaultImages.length];
};
