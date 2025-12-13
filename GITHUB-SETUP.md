# راهنمای اتصال به GitHub

## مراحل اتصال پروژه به GitHub:

### 1. ایجاد Repository در GitHub:
1. به سایت [GitHub.com](https://github.com) بروید و وارد حساب کاربری خود شوید
2. روی دکمه **"New"** یا **"+"** کلیک کنید و **"New repository"** را انتخاب کنید
3. نام repository را وارد کنید (مثلاً: `medilab-lab-system`)
4. توضیحات را وارد کنید (اختیاری)
5. Repository را **Public** یا **Private** انتخاب کنید
6. **توجه:** گزینه "Initialize this repository with a README" را تیک نزنید
7. روی دکمه **"Create repository"** کلیک کنید

### 2. اتصال Repository محلی به GitHub:

بعد از ایجاد repository در GitHub، دستورات زیر را در Command Prompt یا PowerShell اجرا کنید:

```bash
# اضافه کردن remote repository
git remote add origin https://github.com/danialsa13/lab.git

# تغییر نام branch به main (اگر لازم باشد)
git branch -M main

# ارسال فایل‌ها به GitHub
git push -u origin main
```

**توجه:** به جای `YOUR_USERNAME` و `YOUR_REPO_NAME`، نام کاربری و نام repository خود را وارد کنید.

### 3. اگر از SSH استفاده می‌کنید:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. برای آپدیت‌های بعدی:

هر زمان که تغییراتی ایجاد کردید:

```bash
git add .
git commit -m "توضیحات تغییرات"
git push
```

## مثال کامل:

فرض کنید نام کاربری شما `john` و نام repository شما `medilab-lab-system` است:

```bash
git remote add origin https://github.com/john/medilab-lab-system.git
git branch -M main
git push -u origin main
```

## نکات مهم:

- اگر اولین بار است که از Git استفاده می‌کنید، باید نام و ایمیل خود را تنظیم کنید:
  ```bash
  git config --global user.name "نام شما"
  git config --global user.email "email@example.com"
  ```

- اگر از HTTPS استفاده می‌کنید و GitHub از شما رمز عبور خواست، باید از **Personal Access Token** استفاده کنید (نه رمز عبور حساب).

- برای ایجاد Personal Access Token:
  1. به GitHub بروید
  2. Settings > Developer settings > Personal access tokens > Tokens (classic)
  3. Generate new token
  4. دسترسی‌های لازم را انتخاب کنید
  5. Token را کپی کنید و در هنگام push استفاده کنید

## مشکل دارید؟

اگر مشکلی پیش آمد، می‌توانید از دستور زیر برای بررسی وضعیت استفاده کنید:

```bash
git status
git remote -v
```

