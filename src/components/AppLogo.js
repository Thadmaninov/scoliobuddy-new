import React from 'react';
import Svg, { Path, Ellipse, G, Circle, Line } from 'react-native-svg';

/**
 * Minimalistic ScolioBuddy logo:
 * An S-curve spine (representing scoliosis) with disc markers,
 * plus a subtle angle arc at the base — referencing measurement.
 */
export default function AppLogo({ size = 60, color = '#ffffff', accentColor = '#4f8ef7' }) {
  const s = size;
  const cx = s / 2;

  // S-curve control points scaled to size
  const scale = s / 60;

  return (
    <Svg width={s} height={s} viewBox="0 0 60 60">
      {/* Angle arc at bottom — measurement reference */}
      <Path
        d="M 10 52 A 20 20 0 0 1 50 52"
        stroke={accentColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />
      {/* Angle tick left */}
      <Line x1="10" y1="52" x2="10" y2="46" stroke={accentColor} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      {/* Angle tick right */}
      <Line x1="50" y1="52" x2="50" y2="46" stroke={accentColor} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />

      {/* Spine S-curve */}
      <Path
        d="M 30 6 C 42 10 18 20 30 30 C 42 40 18 46 30 50"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />

      {/* Vertebra discs — placed along the S-curve */}
      {/* Top (cervical area) - slightly right of center */}
      <Ellipse cx={33} cy={10} rx={7} ry={2.8} fill={color} opacity={0.95} />
      {/* Upper thoracic - left of center */}
      <Ellipse cx={25} cy={17} rx={7} ry={2.8} fill={color} opacity={0.9} />
      {/* Mid thoracic - right */}
      <Ellipse cx={33} cy={24} rx={7} ry={2.8} fill={color} opacity={0.85} />
      {/* Lower thoracic - left */}
      <Ellipse cx={25} cy={31} rx={7} ry={2.8} fill={color} opacity={0.85} />
      {/* Lumbar - right */}
      <Ellipse cx={33} cy={38} rx={7} ry={2.8} fill={color} opacity={0.9} />
      {/* Lower lumbar - center */}
      <Ellipse cx={30} cy={45} rx={7} ry={2.8} fill={color} opacity={0.95} />
    </Svg>
  );
}
