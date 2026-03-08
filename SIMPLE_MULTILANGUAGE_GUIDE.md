# Simple Multi-Language Guide

## 🎯 Super Simple 3-Step Process

### Step 1: Add Translation Text (1 minute)

Open the translation files and add your text:

**English** (`src/i18n/locales/en.json`):
```json
{
  "welcome": "Welcome to ScolioBuddy",
  "patients": {
    "title": "Patients"
  }
}
```

**Thai** (`src/i18n/locales/th.json`):
```json
{
  "welcome": "ยินดีต้อนรับสู่ ScolioBuddy",
  "patients": {
    "title": "ผู้ป่วย"
  }
}
```

**Chinese** (`src/i18n/locales/zh.json`):
```json
{
  "welcome": "欢迎使用 ScolioBuddy",
  "patients": {
    "title": "患者"
  }
}
```

### Step 2: Use in Your Component (2 lines)

```typescript
import { useTranslation } from 'react-i18next';

export default function MyScreen() {
  const { t } = useTranslation();  // Line 1: Add this hook

  return (
    <Text>{t('welcome')}</Text>     // Line 2: Use t() function
  );
}
```

### Step 3: Switch Language (Already Done!)

Just tap the translate icon (🌐) in the app header - that's it!

---

## 📝 Quick Examples

### Example 1: Simple Text
```typescript
// Before (hardcoded)
<Text>Welcome</Text>

// After (multi-language)
const { t } = useTranslation();
<Text>{t('welcome')}</Text>
```

### Example 2: Nested Keys
```typescript
// Before
<Text>Patients</Text>

// After
const { t } = useTranslation();
<Text>{t('patients.title')}</Text>
```

### Example 3: With Dynamic Content
```typescript
// Before
<Button>Save Measurement (15°)</Button>

// After
const { t } = useTranslation();
<Button>{t('save')} ({angle}°)</Button>
```

---

## 🎨 Complete Working Example

Let's create a simple screen from scratch:

### 1. Create translation keys:

**en.json:**
```json
{
  "greeting": "Hello",
  "button": "Click Me"
}
```

**th.json:**
```json
{
  "greeting": "สวัสดี",
  "button": "คลิกฉัน"
}
```

**zh.json:**
```json
{
  "greeting": "你好",
  "button": "点击我"
}
```

### 2. Create your screen:

```typescript
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function SimpleScreen() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('greeting')}</Text>
      <Button>{t('button')}</Button>
    </View>
  );
}
```

That's it! The screen will automatically show:
- **English**: "Hello" + "Click Me"
- **Thai**: "สวัสดี" + "คลิกฉัน"
- **Chinese**: "你好" + "点击我"

---

## 🔧 How to Add a New Screen

**Copy this template** and customize it:

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';  // Step 1: Import

export default function YourScreen() {
  const { t } = useTranslation();  // Step 2: Add hook

  return (
    <View style={styles.container}>
      {/* Step 3: Use t() for all text */}
      <Text>{t('your.key.here')}</Text>
      <Button>{t('button.text')}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
});
```

---

## 📋 Translation File Structure (Keep it Organized)

Use nested structure for better organization:

```json
{
  "app_name": "ScolioBuddy",

  "screens": {
    "home": {
      "title": "Home",
      "welcome": "Welcome back"
    },
    "settings": {
      "title": "Settings",
      "language": "Language"
    }
  },

  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },

  "messages": {
    "success": "Success!",
    "error": "Error occurred"
  }
}
```

Access them like:
```typescript
t('screens.home.title')     // "Home"
t('buttons.save')           // "Save"
t('messages.success')       // "Success!"
```

---

## 🎯 Real Example from Your App

Here's how we converted the PatientListScreen:

### Before (Hardcoded):
```typescript
export default function PatientListScreen({ navigation }) {
  return (
    <View>
      <Text>No Patients Yet</Text>
      <Text>Tap the + button to add your first patient</Text>
    </View>
  );
}
```

### After (Multi-language):
```typescript
import { useTranslation } from 'react-i18next';  // Added

export default function PatientListScreen({ navigation }) {
  const { t } = useTranslation();  // Added

  return (
    <View>
      <Text>{t('patients.no_patients')}</Text>
      <Text>{t('patients.no_patients_desc')}</Text>
    </View>
  );
}
```

### Translation files:
```json
// en.json
{
  "patients": {
    "no_patients": "No Patients Yet",
    "no_patients_desc": "Tap the + button to add your first patient"
  }
}

// th.json
{
  "patients": {
    "no_patients": "ยังไม่มีผู้ป่วย",
    "no_patients_desc": "แตะปุ่ม + เพื่อเพิ่มผู้ป่วยคนแรกของคุณ"
  }
}

// zh.json
{
  "patients": {
    "no_patients": "还没有患者",
    "no_patients_desc": "点击 + 按钮添加您的第一位患者"
  }
}
```

---

## ✅ Checklist for Converting a Screen

- [ ] Import `useTranslation` hook
- [ ] Add `const { t } = useTranslation();`
- [ ] Replace all hardcoded text with `t('key')`
- [ ] Add translations to **en.json**
- [ ] Add translations to **th.json**
- [ ] Add translations to **zh.json**
- [ ] Test by switching languages in the app

---

## 🚀 Quick Reference

| What you want | How to do it |
|---------------|-------------|
| Import hook | `import { useTranslation } from 'react-i18next';` |
| Use hook | `const { t } = useTranslation();` |
| Simple text | `t('welcome')` |
| Nested text | `t('screens.home.title')` |
| Get current language | `i18n.language` |
| Change language | Already done - use the translate icon! |

---

## 🎨 Tips for Good Translation Keys

✅ **Good Keys** (Clear and organized):
```json
{
  "patients.add": "Add Patient",
  "patients.delete": "Delete Patient",
  "buttons.save": "Save",
  "messages.success": "Success"
}
```

❌ **Bad Keys** (Confusing):
```json
{
  "txt1": "Add Patient",
  "btn": "Save",
  "msg": "Success"
}
```

---

## 🔍 Troubleshooting

**Problem**: Text not changing when switching language
**Solution**: Make sure you used `t('key')` not just `"text"`

**Problem**: Shows key name instead of translation
**Solution**: Check the key exists in all 3 language files

**Problem**: Language not saving
**Solution**: Already handled automatically!

---

## 🎉 You're Done!

That's literally all you need to know:

1. **Add text to 3 JSON files** (en, th, zh)
2. **Use `const { t } = useTranslation()`** in your component
3. **Replace text with `t('key')`**

The language switching, saving, and loading is already set up! 🚀
