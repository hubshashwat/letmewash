# Contributing to LetMeWash

Thank you for your interest in contributing to LetMeWash! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

### 1. Adding New Clothing Items

To add a new item to the wash frequency guide:

1. **Edit `wash_frequency.json`**
2. **Add your item** to the appropriate category:
   ```json
   "category_name": {
     "New Item Name": "Wash frequency description"
   }
   ```
3. **Add an icon** in `script.js` (optional but recommended):
   ```javascript
   const iconMap = {
     'New Item Name': '👕',  // Choose an appropriate emoji
     // ... other items
   };
   ```

### 2. Adding New Sources

To add research sources:

1. **Edit `sources.txt`**
2. **Add your source** in this format:
   ```
   Title of Source, accessed Month Day, Year, https://url-to-source.com
   ```

### 3. Fixing Bugs

1. **Check existing issues** on GitHub
2. **Create a new issue** if it doesn't exist
3. **Fork the repository**
4. **Create a branch**: `git checkout -b fix/bug-description`
5. **Make your changes**
6. **Test thoroughly**
7. **Commit**: `git commit -m "Fix: description of what was fixed"`
8. **Push**: `git push origin fix/bug-description`
9. **Create a Pull Request**

### 4. Adding Features

1. **Open an issue first** to discuss the feature
2. **Wait for approval** from maintainers
3. **Follow the same process** as bug fixes
4. **Branch name**: `feat/feature-description`
5. **Commit**: `git commit -m "Feat: description of feature"`

## 📝 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Keep structure clean and readable
- Use meaningful class names

### CSS
- Follow existing variable naming (`--spacing-md`, `--bg-primary`, etc.)
- Group related styles together
- Add comments for complex sections
- Maintain responsiveness

### JavaScript
- Use ES6+ features
- Keep functions small and focused
- Add comments for complex logic
- Use descriptive variable names
- Follow existing code patterns

## 🧪 Testing

Before submitting a PR:

1. **Test locally**:
   ```bash
   python -m http.server 8000
   ```

2. **Check all features**:
   - Category navigation works
   - Search returns correct results
   - Sources modal opens and links work
   - Responsive design on different screen sizes

3. **Test your changes**:
   - If you added items, verify they appear correctly
   - If you modified code, test affected features
   - Check browser console for errors

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Ensure PR title is descriptive**:
   - ✅ Good: "Add washing frequency for hiking boots"
   - ❌ Bad: "Update JSON"

3. **Describe your changes**:
   ```markdown
   ## What does this PR do?
   Brief description
   
   ## Type of change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Other
   
   ## Checklist
   - [ ] Tested locally
   - [ ] Updated documentation
   - [ ] Added sources (if applicable)
   ```

4. **Wait for review** from maintainers
5. **Address feedback** if requested
6. **Celebrate** when merged! 🎉

## 📖 Adding New Categories

To add an entirely new category:

1. **Add to `wash_frequency.json`**:
   ```json
   "new_category": {
     "Item 1": "Frequency",
     "Item 2": "Frequency"
   }
   ```

2. **Add to sidebar** in `index.html`:
   ```html
   <button class="nav-item" data-category="new_category">
       <span class="nav-icon">🆕</span>
       <span>New Category</span>
   </button>
   ```

3. **Add category name** in `script.js`:
   ```javascript
   const categoryNames = {
     'new_category': 'New Category',
     // ... other categories
   };
   ```

## 🔍 Research Sources

When adding wash frequencies:

- **Provide sources** for your information
- **Use reputable sources**: scientific studies, expert guidance, manufacturer recommendations
- **Add to `sources.txt`** following the format
- **Link in PR** to the source you used

## ❓ Questions?

- Open an issue with the `question` label
- Reach out to [@hubshashwat](https://github.com/hubshashwat)

## 🎯 Good First Issues

Look for issues labeled `good first issue` to get started!

---

Thank you for making LetMeWash better! 💙
