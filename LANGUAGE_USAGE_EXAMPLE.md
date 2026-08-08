# Multi-Language Usage Guide

## Overview
This project now supports Thai (th), Chinese (zh), and English (en) without using i18n libraries.

## How to Use Translations in Your Screens

### 1. Import the Language Hook
```javascript
import { useLanguage } from '../contexts/LanguageContext';
```

### 2. Use the Hook in Your Component
```javascript
export default function YourScreen() {
  const { t, language, changeLanguage } = useLanguage();
  
  return (
    <View>
      <Text>{t('app_name')}</Text>
      <Text>{t('instructions.title')}</Text>
      <Text>{t('patients.no_patients')}</Text>
    </View>
  );
}
```

## Available Functions

### `t(key)`
Translates a key to the current language.
- Example: `t('app_name')` → "ScolioBuddy"
- Example: `t('instructions.title')` → "How to Use ScolioBuddy" (en) / "วิธีใช้ ScolioBuddy" (th) / "如何使用 ScolioBuddy" (zh)

### `language`
Returns the current language code ('en', 'th', or 'zh').

### `changeLanguage(code)`
Changes the current language.
- Example: `changeLanguage('th')` → switches to Thai
- Example: `changeLanguage('zh')` → switches to Chinese

## Translation Files Location
- English: `src/i18n/locales/en.json`
- Thai: `src/i18n/locales/th.json`
- Chinese: `src/i18n/locales/zh.json`

## Adding New Translations
1. Open the translation files in `src/i18n/locales/`
2. Add the same key to all three files (en.json, th.json, zh.json)
3. Use the key with `t()` function in your component

Example:
```json
// en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  }
}

// th.json
{
  "common": {
    "save": "บันทึก",
    "cancel": "ยกเลิก"
  }
}

// zh.json
{
  "common": {
    "save": "保存",
    "cancel": "取消"
  }
}
```

Then use in component:
```javascript
<Button>{t('common.save')}</Button>
<Button>{t('common.cancel')}</Button>
```

## Settings Screen
Navigate to the Settings screen to switch languages:
```javascript
navigation.navigate('Settings');
```

The language preference is automatically saved to AsyncStorage and persists between app sessions.

## Example: Converting an Existing Screen

### Before (Hardcoded Text):
```javascript
export default function PatientListScreen() {
  return (
    <View>
      <Text>Patient Records</Text>
      <Text>No Patients Yet</Text>
      <Button>Add New Patient</Button>
    </View>
  );
}
```

### After (With Translations):
```javascript
import { useLanguage } from '../contexts/LanguageContext';

export default function PatientListScreen() {
  const { t } = useLanguage();
  
  return (
    <View>
      <Text>{t('patients.title')}</Text>
      <Text>{t('patients.no_patients')}</Text>
      <Button>{t('patients.add_patient')}</Button>
    </View>
  );
}
```

## Navigation to Settings
You can add a settings button in any screen:
```javascript
import { IconButton } from 'react-native-paper';

// In your component's header or body:
<IconButton
  icon="cog"
  onPress={() => navigation.navigate('Settings')}
/>
```
