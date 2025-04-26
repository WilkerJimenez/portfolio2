import React, { useEffect, useRef, useState } from "react";
import "../styles/global.css";
import alien from "../assets/characters/alien/alienBeige.png";
import { Stage, Layer, Circle, Image as KonvaImage } from "react-konva";
import { useImage } from "react-konva-utils";

function URLImage({
  src,
  position,
  dimensions,
  velocity,
  movement,
}: {
  src: string;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  velocity: { vx: number; vy: number };
  movement: { mx: number; my: number };
}) {
  const [image] = useImage(src);
  return (
    <KonvaImage
      image={image}
      x={position.x}
      y={position.y}
      width={dimensions.width}
      height={dimensions.height}
      draggable
    />
  );
}

export default function Pet() {
  const parentRef = useRef(null);
  const [size, setSize] = useState({ width: 1280, height: 678 });

  useEffect(() => {
    if (parentRef.current) {
      if (!parentRef.current) return;

      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });

      observer.observe(parentRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className="w-screen sm:w-md sm:h-md md:w-2xl md:h-2xl lg:w-4xl lg:h-4xl xl:w-6xl xl:h-6xl 2xl:w-7xl 2xl:h-7xl"
    >
      <Stage width={size.width} height={size.height}>
        <Layer>
          <URLImage
            src={"https://placecats.com/300/200"}
            position={{ x: 50, y: 50 }}
            dimensions={{ width: 100, height: 100 }}
            velocity={{ vx: 50, vy: 50 }}
            movement={{ mx: 50, my: 50 }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
