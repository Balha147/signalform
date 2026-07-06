# 🚦 SignalForm

> A modern **Angular 22** showcase demonstrating the new **Signal-based Forms API**, schema-driven validation and offline persistence with **IndexedDB**.

SignalForm is a small CRM and invoice management application built to explore the latest Angular features.

The project focuses on three major topics:

* ✅ **Signal-based Forms** (`@angular/forms/signals`)
* ✅ **Schema-driven validation**
* ✅ **Offline-first persistence with IndexedDB**

Although the application manages clients, invoices and quotations, its primary goal is to demonstrate how these new APIs can be used together to build reactive, maintainable and type-safe forms.

---

## ✨ Features

### 📝 Signal-based Forms

* Built entirely with `@angular/forms/signals`
* Strongly typed forms
* Reactive state powered by Angular Signals
* Custom form controls with `FormValueControl`
* Dynamic form arrays
* Instant validation feedback
* Computed values with `computed()`

### ✅ Schema Validation

Validation logic is centralized using Angular's schema API.

Examples include:

* Required fields
* Conditional validation with `when()` and `applyWhen()`
* Nested object validation
* Dynamic collection validation with `applyEach()`
* Business rules separated from UI components

---

### 👥 Client Management

Create and manage customer profiles including:

* Company information
* Contact details
* Email / Phone
* Address
* SIRET validation
* Preferred contact method

The form automatically adapts its validation rules depending on the selected contact preference.

---

### 🧾 Quotes & Invoices

Generate quotations and invoices with:

* Customer selection
* Dynamic line items
* Automatic totals (HT / VAT / TTC)
* Invoice number validation
* Real-time calculations using Angular Signals

---

### 💾 Offline First

All data is stored locally using **IndexedDB** through the lightweight **idb** library.

The application works without any backend and supports full local CRUD operations.

---

### 🎨 UI

* Tailwind CSS v4
* Responsive layout
* Standalone Components
* OnPush Change Detection
* Modern Angular architecture

---

# 🛠 Tech Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Angular 22         | Application Framework     |
| Angular Signals    | Reactive state management |
| Signal Forms       | Modern forms API          |
| Schema Validation  | Declarative validation    |
| IndexedDB + idb    | Local persistence         |
| Tailwind CSS v4    | Styling                   |

---

# 📂 Project Structure

The project keeps business rules separate from UI components.

```
Models
        │
        ▼
Schema Validation
        │
        ▼
Signal Forms
        │
        ▼
Angular Components
```

Validation rules remain independent from presentation, making the application easier to maintain and test.

---

## 📁 Interesting Files

```
src/app/clients/client-profile.ts
```

Client model and validation schema.

```
src/app/invoice/invoice.ts
```

Invoice model, schema and business rules.

---

# 🚀 Getting Started

## Prerequisites

* Node.js 20+
* npm or pnpm

## Installation

```bash
git clone https://github.com/Balha147/signalform.git

cd signalform

npm install

ng serve
```

Navigate to:

```
http://localhost:4200
```

---

# 🎯 What this project demonstrates

This project is mainly a playground for exploring the latest Angular APIs.

It demonstrates how to:

* build fully reactive forms using Signals;
* centralize validation with schemas;
* implement reusable custom controls;
* compute derived state without RxJS;
* create an offline-first application using IndexedDB.

---

# 🔮 Possible Improvements

* PDF export
* Authentication
* Synchronization with a backend
* PWA support
* tests with Harness component

---

# ⭐ If you like this project

Feel free to leave a ⭐ on GitHub or connect with me on LinkedIn.

Feedback and contributions are always welcome.
