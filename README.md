# 🚦 SignalForm

> An Angular 22 playground exploring the new Signal Forms API, schema-driven validation, reactive state management and offline-first persistence with IndexedDB.

🔗 **Repository:** https://github.com/Balha147/signalform

---

## 🎯 About the Project

**SignalForm** is a hands-on Angular 22 project created to experiment with the new **Signal-based Forms API** and explore how it can be used in a realistic application.

The application is built around a small **CRM and invoicing use case**, including:

- Client management
- Quotes
- Invoices
- Dynamic line items
- Form validation
- Automatic calculations
- Local data persistence

However, the business domain is secondary.

The main purpose of the project is to explore how modern Angular APIs can be combined to build **reactive, strongly typed and maintainable forms**.

---

# 🧪 What I Wanted to Explore

The project focuses on several modern Angular concepts:

- Signal Forms
- Schema-driven validation
- Angular Signals
- Computed state
- Custom form controls
- Dynamic form collections
- Conditional validation
- Strongly typed forms
- Offline-first persistence
- Standalone Components
- OnPush Change Detection

The project is intentionally designed as a **technical playground**, allowing new Angular APIs to be tested in a realistic application rather than isolated examples.

---

# ✨ Key Features

## 📝 Signal Forms

The application uses Angular's Signal Forms API:

```typescript
import { form } from '@angular/forms/signals';
