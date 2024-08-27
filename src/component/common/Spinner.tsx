import { Spin } from "antd";
import { SpinnerProps } from "@/types/global";

export default function Spinner({
  size,
  opacity,
  background = "white",
  loading,
}: SpinnerProps) {
  return (
    <div
      className={`absolute top-0 bottom-0 right-0 left-0 bg-${background} opacity-${opacity} z-[100] transition-all ${
        loading ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-1/2 left-1/2">
        <Spin size={size} />
      </div>
    </div>
  );
}
