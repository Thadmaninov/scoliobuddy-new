import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { useLanguage } from '../contexts/LanguageContext';
import { radius } from '../utils/theme';

// Vertebra ranges are anatomical notation — identical in every language.
const REGIONS = [
  { key: 'cervical', color: '#2563eb', tag: 'C1 – C7'  },
  { key: 'thoracic', color: '#1d4ed8', tag: 'T1 – T12' },
  { key: 'lumbar',   color: '#1e40af', tag: 'L1 – L5'  },
];

function Vertebra({ x, y, width, height, rx, fill, opacity = 1 }) {
  return (
    <G>
      <Rect x={x - width / 2} y={y} width={width} height={height} rx={rx} fill={fill} opacity={opacity} />
      <Rect x={x - 4} y={y + height * 0.2} width={8} height={height * 0.6} rx={3} fill={fill} opacity={opacity * 0.6} />
      <Rect x={x - width / 2 - 12} y={y + height * 0.3} width={12} height={height * 0.4} rx={2} fill={fill} opacity={opacity * 0.35} />
      <Rect x={x + width / 2}      y={y + height * 0.3} width={12} height={height * 0.4} rx={2} fill={fill} opacity={opacity * 0.35} />
    </G>
  );
}

export default function SpineModel({ selected, onSelect, isDark = true }) {
  const { t } = useLanguage();
  const inactive   = isDark ? '#1a2540' : '#c8d8ef';
  const inactTxt   = isDark ? '#4a6080' : '#64748b';
  const silhouette = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(10,20,60,0.06)';
  const descBg     = isDark ? 'rgba(8,16,36,0.85)'    : 'rgba(210,228,255,0.5)';

  const cx = 70;

  const cervicalVerts = Array.from({ length: 7 },  (_, i) => ({ y: 80  + i * 18, width: 36, height: 12, rx: 4 }));
  const thoracicVerts = Array.from({ length: 12 }, (_, i) => ({ y: 214 + i * 20, width: 42, height: 13, rx: 4 }));
  const lumbarVerts   = Array.from({ length: 5 },  (_, i) => ({ y: 460 + i * 26, width: 52, height: 18, rx: 5 }));

  const col = (region) =>
    selected === region ? REGIONS.find((r) => r.key === region).color : inactive;

  const activeRegion = REGIONS.find((r) => r.key === selected) || REGIONS[1];

  return (
    <View style={styles.container}>
      <Svg width={140} height={640} viewBox="0 -60 140 640">

        {/* ── Silhouette ── */}
        <Circle cx="70" cy="-28" r="24" fill="none" stroke={silhouette} strokeWidth="1.5" />
        <Path d="M 58,-4 L 54,20"  stroke={silhouette} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Path d="M 82,-4 L 86,20"  stroke={silhouette} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Path d="M 54,20 Q 36,30 8,58 C 4,100 4,200 14,320 C 18,360 6,405 12,455 Q 22,498 44,510"
          stroke={silhouette} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Path d="M 86,20 Q 104,30 132,58 C 136,100 136,200 126,320 C 122,360 134,405 128,455 Q 118,498 96,510"
          stroke={silhouette} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <Path d="M 44,510 Q 70,530 96,510"
          stroke={silhouette} strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* ── Cervical vertebrae, then hit rect on top ── */}
        <G>
          {cervicalVerts.map((v, i) => (
            <Vertebra key={i} x={cx} y={v.y} width={v.width} height={v.height} rx={v.rx}
              fill={col('cervical')} opacity={selected === 'cervical' ? 1 : 0.4} />
          ))}
          <Rect x={10} y={70} width={120} height={150}
            fill="transparent" onPress={() => onSelect('cervical')} />
        </G>

        {/* ── Thoracic vertebrae, then hit rect on top ── */}
        <G>
          {thoracicVerts.map((v, i) => (
            <Vertebra key={i} x={cx} y={v.y} width={v.width} height={v.height} rx={v.rx}
              fill={col('thoracic')} opacity={selected === 'thoracic' ? 1 : 0.4} />
          ))}
          <Rect x={5} y={222} width={130} height={256}
            fill="transparent" onPress={() => onSelect('thoracic')} />
        </G>

        {/* ── Lumbar vertebrae, then hit rect on top ── */}
        <G>
          {lumbarVerts.map((v, i) => (
            <Vertebra key={i} x={cx} y={v.y} width={v.width} height={v.height} rx={v.rx}
              fill={col('lumbar')} opacity={selected === 'lumbar' ? 1 : 0.4} />
          ))}
          <Rect x={5} y={458} width={130} height={165}
            fill="transparent" onPress={() => onSelect('lumbar')} />
        </G>
      </Svg>

      {/* ── Region buttons ── */}
      <View style={styles.labels}>
        {REGIONS.map((region) => {
          const isActive = selected === region.key;
          return (
            <TouchableOpacity
              key={region.key}
              style={[
                styles.labelBtn,
                {
                  borderColor:       isActive ? region.color + '60' : 'transparent',
                  backgroundColor:   isActive ? region.color + '18' : 'transparent',
                },
              ]}
              onPress={() => onSelect(region.key)}
            >
              <View style={[styles.dot, { backgroundColor: isActive ? region.color : inactTxt }]} />
              <Text style={[styles.labelTxt, { color: isActive ? region.color : inactTxt,
                fontFamily: isActive ? 'SpaceGrotesk_600SemiBold' : 'SpaceGrotesk_400Regular' }]}>
                {t(`measurement.${region.key}`)}
              </Text>
              <Text style={[styles.tagTxt, { color: isActive ? region.color + 'aa' : inactTxt + '66' }]}>
                {region.tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Description ── */}
      <View style={[styles.desc, { backgroundColor: descBg, borderLeftColor: activeRegion.color }]}>
        <Text style={[styles.descTitle, { color: activeRegion.color }]}>
          {t(`measurement.${activeRegion.key}`)}  ·  {activeRegion.tag}
        </Text>
        <Text style={[styles.descBody, { color: isDark ? '#8aaccc' : '#2a4a6a' }]}>
          {t(`spine.${activeRegion.key}_desc`)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 12 },
  labels:    { marginTop: 14, gap: 5, width: '100%', paddingHorizontal: 4 },
  labelBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 9, paddingHorizontal: 12,
    borderRadius: radius.md, borderWidth: 1, gap: 10,
  },
  dot:      { width: 7, height: 7, borderRadius: 4 },
  labelTxt: { fontSize: 14, flex: 1 },
  tagTxt:   { fontSize: 11, fontFamily: 'SpaceGrotesk_400Regular' },
  desc: {
    marginTop: 12, marginHorizontal: 4, width: '100%',
    borderRadius: radius.md, borderLeftWidth: 2,
    padding: 13, gap: 5,
  },
  descTitle: { fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 0.2 },
  descBody:  { fontSize: 11, fontFamily: 'SpaceGrotesk_400Regular', lineHeight: 17 },
});
