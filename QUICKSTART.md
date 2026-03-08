# ⚡ Multi-Language Quick Start (2 Minutes!)

## 🎯 Want to Make Your Screen Multi-Language? Follow These 3 Steps:

---

### 📝 Step 1: Add Your Text to Translation Files (30 seconds)

Open these 3 files and add your text:

#### File: `src/i18n/locales/en.json`
```json
{
  "my_screen": {
    "title": "My Awesome Screen",
    "message": "Hello, user!",
    "button": "Click Me"
  }
}
```

#### File: `src/i18n/locales/th.json`
```json
{
  "my_screen": {
    "title": "หน้าจอของฉัน",
    "message": "สวัสดีผู้ใช้!",
    "button": "คลิกฉัน"
  }
}
```

#### File: `src/i18n/locales/zh.json`
```json
{
  "my_screen": {
    "title": "我的屏幕",
    "message": "你好，用户！",
    "button": "点击我"
  }
}
```

**💡 Tip:** Keep the same structure in all 3 files!

---

### 💻 Step 2: Create Your Screen (1 minute)

Create a new file: `src/screens/MyScreen.tsx`

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';  // 👈 Import this

export default function MyScreen() {
  const { t } = useTranslation();  // 👈 Add this line

  return (
    <View style={styles.container}>
      {/* 👇 Use t() to get translated text */}
      <Text variant="headlineLarge">
        {t('my_screen.title')}
      </Text>

      <Text variant="bodyLarge">
        {t('my_screen.message')}
      </Text>

      <Button mode="contained">
        {t('my_screen.button')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

### ✅ Step 3: Test It! (30 seconds)

1. Run your app: `npm start`
2. Navigate to your screen
3. Tap the **🌐 translate icon** in the header
4. Switch between languages:
   - **EN** → "My Awesome Screen"
   - **TH** → "หน้าจอของฉัน"
   - **ZH** → "我的屏幕"

**🎉 Done! Your screen is now multi-language!**

---

## 🚀 Even Simpler: Copy-Paste Template

Just copy this and customize:

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function MyScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>{t('your.text.here')}</Text>
      <Button>{t('your.button.here')}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
});
```

---

## 📖 Common Patterns

### Pattern 1: Simple Text
```typescript
const { t } = useTranslation();
<Text>{t('welcome')}</Text>
```

### Pattern 2: With Variables
```typescript
const { t } = useTranslation();
const angle = 15;
<Text>{t('measurement.save')} ({angle}°)</Text>
```

### Pattern 3: Alerts
```typescript
const { t } = useTranslation();
Alert.alert('Success', t('messages.saved'));
```

### Pattern 4: Buttons
```typescript
const { t } = useTranslation();
<Button>{t('buttons.submit')}</Button>
```

### Pattern 5: Placeholders
```typescript
const { t } = useTranslation();
<TextInput
  label={t('form.name')}
  placeholder={t('form.name_placeholder')}
/>
```

---

## 🎨 Translation Key Naming Convention

Use this format: `section.subsection.item`

**Examples:**
```json
{
  "screens.home.title": "Home",
  "screens.home.welcome": "Welcome back",

  "buttons.save": "Save",
  "buttons.cancel": "Cancel",

  "forms.name": "Name",
  "forms.email": "Email",

  "messages.success": "Success!",
  "messages.error": "Error occurred",

  "patients.add": "Add Patient",
  "patients.delete": "Delete Patient"
}
```

---

## ❓ FAQ

**Q: Do I need to restart the app when I add new translations?**
A: No! Just reload the app (shake device → Reload)

**Q: What if I forget to add a key to one language?**
A: It will show the English version (fallback)

**Q: Can I use the same key in different places?**
A: Yes! `t('buttons.save')` can be used anywhere

**Q: How do I know which language is active?**
A: `const { i18n } = useTranslation(); console.log(i18n.language);`

---

## 🎯 Real Example: Before & After

### ❌ Before (Hardcoded)
```typescript
export default function WelcomeScreen() {
  return (
    <View>
      <Text>Welcome to ScolioBuddy</Text>
      <Button>Get Started</Button>
    </View>
  );
}
```

### ✅ After (Multi-Language)
```typescript
import { useTranslation } from 'react-i18next';  // Added

export default function WelcomeScreen() {
  const { t } = useTranslation();  // Added

  return (
    <View>
      <Text>{t('welcome.title')}</Text>
      <Button>{t('welcome.button')}</Button>
    </View>
  );
}
```

**Translation files:**
```json
// en.json
{ "welcome": { "title": "Welcome to ScolioBuddy", "button": "Get Started" }}

// th.json
{ "welcome": { "title": "ยินดีต้อนรับสู่ ScolioBuddy", "button": "เริ่มต้น" }}

// zh.json
{ "welcome": { "title": "欢迎使用 ScolioBuddy", "button": "开始" }}
```

---

## 🎬 Summary

**3 Lines of Code:**
```typescript
import { useTranslation } from 'react-i18next';  // Line 1
const { t } = useTranslation();                   // Line 2
<Text>{t('your.key')}</Text>                      // Line 3
```

**That's it!** Multi-language support is now working! 🎉

**Next Steps:**
- See `DemoScreen.tsx` for a complete working example
- See `SIMPLE_MULTILANGUAGE_GUIDE.md` for more details
- Check existing screens to see real implementations

---

**💡 Pro Tip:** Start with English translations first, then copy the structure to Thai and Chinese files. Use Google Translate for quick translations, then refine them later!
