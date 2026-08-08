import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Switch,
  Linking,
  ScrollView,
} from 'react-native';
import { useSidebar } from '../contexts/SidebarContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { radius } from '../utils/theme';
import AppLogo from './AppLogo';

const W = 296;

const RESEARCH_URL =
  'https://idp.springer.com/authorize?response_type=cookie&client_id=springerlink' +
  '&redirect_uri=https%3A%2F%2Flink.springer.com%2Farticle%2F10.1007%2Fs00586-021-06860-x';

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const { currentLanguage, changeLanguage, availableLanguages, t } = useLanguage();
  const { isDark, toggleTheme } = useAppTheme();
  const tx = useRef(new Animated.Value(-W)).current;
  const bo = useRef(new Animated.Value(0)).current;

  const c = {
    bg:      isDark ? '#040810' : '#ffffff',
    surface: isDark ? '#070e1a' : '#f2f6fd',
    line:    isDark ? '#0e1a28' : '#dce8f5',
    label:   isDark ? '#2a3d52' : '#7090ac',
    muted:   isDark ? '#3a5268' : '#7090ac',
    body:    isDark ? '#8aabcc' : '#1a2e44',
    strong:  isDark ? '#d0e4f8' : '#08192e',
    blue:    '#1a40c8',
    blueDim: isDark ? 'rgba(26,64,200,0.10)' : 'rgba(26,64,200,0.06)',
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(tx, { toValue: isOpen ? 0 : -W, duration: isOpen ? 260 : 200, useNativeDriver: true }),
      Animated.timing(bo, { toValue: isOpen ? 1 : 0, duration: isOpen ? 260 : 200, useNativeDriver: true }),
    ]).start();
  }, [isOpen]);

  return (
    <>
      <Animated.View style={[styles.backdrop, { opacity: bo }]} pointerEvents={isOpen ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View style={[styles.panel, { backgroundColor: c.bg, transform: [{ translateX: tx }] }]}>

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: c.line }]}>
          <View style={[styles.logoBox, { backgroundColor: c.blue }]}>
            <AppLogo size={26} color="#fff" accentColor="#93c5fd" />
          </View>
          <View>
            <Text style={[styles.appName, { color: c.strong }]}>ScolioBuddy</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

          {/* Display */}
          <View style={styles.block}>
            <Text style={[styles.blockLabel, { color: c.label }]}>
              {t('sidebar.display').toUpperCase()}
            </Text>
            <View style={[styles.row, { borderColor: c.line, backgroundColor: c.surface }]}>
              <Text style={[styles.rowText, { color: c.body }]}>
                {isDark ? t('sidebar.dark_theme') : t('sidebar.light_theme')}
              </Text>
              <Switch
                value={!isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#1e3050', true: c.blue }}
                thumbColor="#fff"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>
          </View>

          {/* Language */}
          <View style={styles.block}>
            <Text style={[styles.blockLabel, { color: c.label }]}>
              {t('sidebar.language').toUpperCase()}
            </Text>
            <View style={[styles.listCard, { borderColor: c.line, backgroundColor: c.surface }]}>
              {availableLanguages.map((lang, i) => {
                const active = currentLanguage === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => { changeLanguage(lang.code); closeSidebar(); }}
                    activeOpacity={0.55}
                  >
                    <View style={[
                      styles.langRow,
                      i < availableLanguages.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.line },
                      active && { backgroundColor: c.blueDim },
                    ]}>
                      {active && <View style={[styles.activeStripe, { backgroundColor: c.blue }]} />}
                      <Text style={[styles.langAbbr, { color: active ? c.blue : c.muted }]}>{lang.abbr}</Text>
                      <Text style={[styles.langName,  { color: active ? c.strong : c.body,
                        fontFamily: active ? 'SpaceGrotesk_600SemiBold' : 'SpaceGrotesk_400Regular' }]}>
                        {lang.label}
                      </Text>
                      {active && <View style={[styles.activeDot, { backgroundColor: c.blue }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Clinical References */}
          <View style={[styles.block, { paddingBottom: 44 }]}>
            <Text style={[styles.blockLabel, { color: c.label }]}>
              {t('sidebar.references').toUpperCase()}
            </Text>

            {/* Website */}
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={() => Linking.openURL('https://scoliobuddy.app')}
            >
              <View style={[styles.refCard, { borderColor: c.line, backgroundColor: c.surface }]}>
                <View style={[styles.refTop, { borderBottomColor: c.line }]}>
                  <Text style={[styles.refKind, { color: c.label }]}>
                    {t('sidebar.official_docs').toUpperCase()}
                  </Text>
                  <Text style={[styles.refOpen, { color: c.blue }]}>
                    {t('common.open').toUpperCase()}
                  </Text>
                </View>
                <View style={styles.refBody}>
                  <Text style={[styles.refTitle, { color: c.strong }]}>ScolioBuddy</Text>
                  <Text style={[styles.refDesc, { color: c.muted }]}>
                    {t('sidebar.docs_desc')}
                  </Text>
                  <Text style={[styles.refUri, { color: c.label }]}>scoliobuddy.app</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Research paper */}
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={() => Linking.openURL(RESEARCH_URL)}
            >
              <View style={[styles.refCard, { borderColor: c.line, backgroundColor: c.surface }]}>
                <View style={[styles.refTop, { borderBottomColor: c.line }]}>
                  <Text style={[styles.refKind, { color: c.label }]}>
                    {t('sidebar.literature').toUpperCase()}
                  </Text>
                  <Text style={[styles.refOpen, { color: c.blue }]}>
                    {t('common.open').toUpperCase()}
                  </Text>
                </View>
                <View style={styles.refBody}>
                  <Text style={[styles.refTitle, { color: c.strong }]}>
                    {t('sidebar.paper_title')}
                  </Text>
                  <Text style={[styles.refDesc, { color: c.muted }]}>
                    {t('sidebar.paper_desc')}
                  </Text>
                  <Text style={[styles.refUri, { color: c.label }]}>
                    DOI 10.1007/s00586-021-06860-x
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  panel: {
    position: 'absolute', top: 0, left: 0, bottom: 0, width: W,
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 20,
  },

  /* header */
  header: {
    paddingTop: 58, paddingBottom: 16, paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row', alignItems: 'center', gap: 13,
  },
  logoBox: {
    width: 42, height: 42, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  appName: { fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold' },
  appSub:  { fontSize: 11, fontFamily: 'SpaceGrotesk_400Regular', marginTop: 2 },

  /* blocks */
  block: { paddingTop: 24, paddingHorizontal: 16, gap: 8 },
  blockLabel: {
    fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 1.6, marginLeft: 2,
  },

  /* single row (display toggle) */
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 11, paddingHorizontal: 14,
    borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth,
  },
  rowText: { flex: 1, fontSize: 14, fontFamily: 'SpaceGrotesk_400Regular' },

  /* language list */
  listCard: {
    borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden',
  },
  langRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 11, paddingHorizontal: 14, gap: 12, minHeight: 46,
  },
  activeStripe: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
  },
  langAbbr: {
    width: 30, fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold',
  },
  langName: { flex: 1, fontSize: 14 },
  activeDot: { width: 5, height: 5, borderRadius: radius.xs },

  /* reference cards */
  refCard: {
    borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden', marginBottom: 10,
  },
  refTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 13, paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  refKind: { fontSize: 9, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1.2 },
  refOpen: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1.0 },
  refBody: { paddingHorizontal: 13, paddingVertical: 12, gap: 4 },
  refTitle: { fontSize: 13, fontFamily: 'SpaceGrotesk_600SemiBold' },
  refDesc:  { fontSize: 11, fontFamily: 'SpaceGrotesk_400Regular', lineHeight: 17, marginTop: 2 },
  refUri:   { fontSize: 10, fontFamily: 'SpaceGrotesk_400Regular', marginTop: 5, letterSpacing: 0.1 },
});
