# 🧺 LetMeWash

> The ultimate open-source guide to washing your clothes the right way.

A beautiful, modern web application that helps you determine the optimal wash frequency for all your clothing items - from everyday socks to specialty cultural wear.

![LetMeWash Interface](https://via.placeholder.com/1200x600/0f172a/10b981?text=LetMeWash+Screenshot)

## ✨ Features

- **📋 12 Categories**: Organized clothing types including Towels, Socks, Athletic Wear, Formal Wear, and more
- **🔍 Smart Search**: Search across all categories to quickly find any item
- **🎨 Modern UI**: macOS-inspired interface with dark theme and smooth animations
- **📚 Research-Backed**: All wash frequencies are backed by 48+ trusted sources
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🌐 Open Source**: Community-driven and completely free to use

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hubshashwat/letmewash.git
   cd letmewash
   ```

2. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or just open index.html directly in your browser
   open index.html
   ```

3. **Visit** `http://localhost:8000`

That's it! No build steps, no dependencies.

## 🎯 How to Use

1. **Browse by Category**: Click any category in the sidebar to see relevant items
2. **Search**: Use the search bar to find specific clothing items
3. **View Sources**: Click the "Sources" button to see all research references
4. **Share**: Bookmark the page or share it with friends!

## 💻 Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, flexbox, grid
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **JSON**: Structured data storage

## 📊 Data Structure

The wash frequency data is stored in `wash_frequency.json`:

```json
{
  "towels": {
    "Bath towel": "Every 3-5 uses (ensure it dries fully between uses)",
    "Hand towel": "Every 1-2 days (daily if high traffic)"
  },
  "socks": {
    "Casual socks": "After every wear",
    "Wool socks": "Every 2-3 wears (if aired out between wears)"
  }
}
```

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌍 Adding new clothing items
- 🔗 Adding more sources

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the researchers and publications that helped compile this guide
- The open-source community for inspiration
- Everyone who has contributed to making laundry less confusing!

## 📧 Contact

- **GitHub**: [@hubshashwat](https://github.com/hubshashwat)
- **Project**: [LetMeWash](https://github.com/hubshashwat/letmewash)

---

<p align="center">Made with 💙 by the open source community</p>
<p align="center">Wash frequencies are general guidelines. Adjust based on your activity level and climate.</p>
