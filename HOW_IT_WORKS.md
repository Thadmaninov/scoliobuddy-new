# 🌍 How Multi-Language Works (Super Simple Explanation)

## 🎯 The Big Picture

```
┌─────────────────┐
│  Your Screen    │
│  uses t('key')  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Translation    │
│  System         │
└────────┬────────┘
         │
    ┌────┴────┬────────┐
    ↓         ↓        ↓
┌────────┐ ┌────────┐ ┌────────┐
│ EN     │ │ TH     │ │ ZH     │
│ File   │ │ File   │ │ File   │
└────────┘ └────────┘ └────────┘

User switches language → System picks correct file → Screen updates!
```

---

## 📚 The Translation Files (Your Dictionary)

Think of these as 3 dictionaries:

### English Dictionary (`en.json`)
```json
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```

### Thai Dictionary (`th.json`)
```json
{
  "hello": "สวัสดี",
  "goodbye": "ลาก่อน"
}
```

### Chinese Dictionary (`zh.json`)
```json
{
  "hello": "你好",
  "goodbye": "再见"
}
```

When you use `t('hello')`:
- English mode → Looks in `en.json` → Returns "Hello"
- Thai mode → Looks in `th.json` → Returns "สวัสดี"
- Chinese mode → Looks in `zh.json` → Returns "你好"

**Easy, right?** 😊

---

## 🔑 Keys and Values

### What's a "Key"?
A key is like a variable name that points to different text in each language.

```
Key: "welcome"
  ├─ English value: "Welcome"
  ├─ Thai value: "ยินดีต้อนรับ"
  └─ Chinese value: "欢迎"
```

### Nested Keys (For Organization)
```json
{
  "user": {
    "name": "Name",
    "email": "Email",
    "profile": {
      "edit": "Edit Profile",
      "save": "Save Changes"
    }
  }
}
```

Access them with dots:
- `t('user.name')` → "Name"
- `t('user.email')` → "Email"
- `t('user.profile.edit')` → "Edit Profile"

---

## 💻 How to Use in Code

### Step-by-Step Example

**1️⃣ Old way (hardcoded - BAD):**
```typescript
export default function MyScreen() {
  return <Text>Welcome to my app</Text>;
}
```
Problem: Always shows English! 😞

**2️⃣ New way (multi-language - GOOD):**
```typescript
import { useTranslation } from 'react-i18next';

export default function MyScreen() {
  const { t } = useTranslation();
  return <Text>{t('welcome')}</Text>;
}
```
Magic: Automatically shows correct language! ✨

---

## 🎨 Visual Comparison

### What User Sees:

```
┌─────────────────────────────┐
│  English Mode               │
├─────────────────────────────┤
│  Welcome to ScolioBuddy     │
│                             │
│  [Add Patient]  [Settings]  │
└─────────────────────────────┘

Switch to Thai ↓

┌─────────────────────────────┐
│  โหมดไทย                    │
├─────────────────────────────┤
│  ยินดีต้อนรับสู่ ScolioBuddy │
│                             │
│  [เพิ่มผู้ป่วย]  [การตั้งค่า] │
└─────────────────────────────┘

Switch to Chinese ↓

┌─────────────────────────────┐
│  中文模式                    │
├─────────────────────────────┤
│  欢迎使用 ScolioBuddy        │
│                             │
│  [添加患者]  [设置]          │
└─────────────────────────────┘
```

### What Code Looks Like:

```typescript
// Same code for all languages!
<Text>{t('welcome')}</Text>
<Button>{t('buttons.add_patient')}</Button>
<Button>{t('buttons.settings')}</Button>
```

---

## 🔄 How Language Switching Works

```
1. User taps translate icon (🌐)
   ↓
2. User selects "ไทย (Thai)"
   ↓
3. System saves choice → AsyncStorage
   ↓
4. System tells i18n → "Use Thai now"
   ↓
5. ALL screens automatically re-render
   ↓
6. t('key') now returns Thai text
   ↓
7. ✨ Everything is in Thai!
```

**Next time app opens:**
```
1. App starts
   ↓
2. System checks AsyncStorage
   ↓
3. Finds "Thai" was last choice
   ↓
4. Automatically loads Thai
   ↓
5. User sees Thai immediately! 🎉
```

---

## 🎯 Complete Real Example

Let's create a login screen from scratch!

### Step 1: Create Translation Keys

**en.json:**
```json
{
  "login": {
    "title": "Sign In",
    "email": "Email Address",
    "password": "Password",
    "button": "Login",
    "forgot": "Forgot Password?",
    "success": "Login successful!",
    "error": "Invalid credentials"
  }
}
```

**th.json:**
```json
{
  "login": {
    "title": "เข้าสู่ระบบ",
    "email": "ที่อยู่อีเมล",
    "password": "รหัสผ่าน",
    "button": "เข้าสู่ระบบ",
    "forgot": "ลืมรหัสผ่าน?",
    "success": "เข้าสู่ระบบสำเร็จ!",
    "error": "ข้อมูลไม่ถูกต้อง"
  }
}
```

**zh.json:**
```json
{
  "login": {
    "title": "登录",
    "email": "电子邮件",
    "password": "密码",
    "button": "登录",
    "forgot": "忘记密码？",
    "success": "登录成功！",
    "error": "凭据无效"
  }
}
```

### Step 2: Create the Screen

```typescript
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const { t } = useTranslation();  // 👈 Magic line!
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Success', t('login.success'));
    } else {
      Alert.alert('Error', t('login.error'));
    }
  };

  return (
    <View style={styles.container}>
      {/* All text uses t() - automatically multi-language! */}
      <Text variant="headlineLarge" style={styles.title}>
        {t('login.title')}
      </Text>

      <TextInput
        label={t('login.email')}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        label={t('login.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        {t('login.button')}
      </Button>

      <Button mode="text">
        {t('login.forgot')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});
```

### Step 3: Test It!

**English:**
- Title: "Sign In"
- Email: "Email Address"
- Button: "Login"

**Thai:**
- Title: "เข้าสู่ระบบ"
- Email: "ที่อยู่อีเมล"
- Button: "เข้าสู่ระบบ"

**Chinese:**
- Title: "登录"
- Email: "电子邮件"
- Button: "登录"

All with the **SAME CODE!** 🎉

---

## 🎓 Key Concepts

### 1. The Hook
```typescript
const { t } = useTranslation();
```
- `t` is a function that translates keys
- Call it like: `t('my.key')`

### 2. The Key
```typescript
t('login.title')
```
- Keys use dot notation
- Must exist in ALL language files

### 3. The Result
```typescript
<Text>{t('login.title')}</Text>
```
- Returns translated text
- Automatically updates when language changes

---

## ✅ Checklist for Your Screen

When creating a new screen:

- [ ] Import: `import { useTranslation } from 'react-i18next';`
- [ ] Hook: `const { t } = useTranslation();`
- [ ] Replace ALL text with `t('key')`
- [ ] Add keys to `en.json`
- [ ] Add keys to `th.json`
- [ ] Add keys to `zh.json`
- [ ] Test: Switch languages in app
- [ ] ✨ Celebrate!

---

## 🚫 Common Mistakes

### ❌ Mistake 1: Forgot to add key to all files
```
en.json: ✅ "welcome": "Welcome"
th.json: ❌ Missing!
zh.json: ✅ "welcome": "欢迎"
```
**Result:** Shows "Welcome" in Thai mode (fallback to English)

### ❌ Mistake 2: Hardcoded text mixed with translations
```typescript
<Text>{t('hello')}</Text>  ✅ Good
<Text>Goodbye</Text>       ❌ Bad - always English!
```

### ❌ Mistake 3: Forgot the hook
```typescript
// Missing: const { t } = useTranslation();
<Text>{t('hello')}</Text>  ❌ Error! t is not defined
```

### ✅ Correct Way
```typescript
import { useTranslation } from 'react-i18next';

export default function MyScreen() {
  const { t } = useTranslation();  ✅
  return <Text>{t('hello')}</Text>; ✅
}
```

---

## 🎉 You're Ready!

**Remember the 3-line formula:**

```typescript
import { useTranslation } from 'react-i18next';  // Line 1
const { t } = useTranslation();                   // Line 2
<Text>{t('your.key')}</Text>                      // Line 3
```

**That's all you need!** 🚀

Now go make your app multi-language! 🌍
