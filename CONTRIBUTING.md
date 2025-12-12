# Contributing to StudEdu

First off, thank you for considering contributing to StudEdu! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version, etc.)

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you've thought about

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- Python 3.12+
- Git
- A code editor (VS Code recommended)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/StudEdu-Platform.git
cd StudEdu-Platform

# Install dependencies
npm install
cd ai-backend && pip install -r requirements.txt

# Set up environment variables
cp ai-backend/.env.example ai-backend/.env
# Edit .env with your Groq API key

# Run the development servers
# Terminal 1: AI Backend
cd ai-backend
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
npm run dev:client
```

## 🎨 Coding Guidelines

### TypeScript/React

- Use **TypeScript** for all new code
- Follow **React Hooks** best practices
- Use **functional components** over class components
- Prefer **named exports** over default exports
- Use **descriptive variable names**

```typescript
// ✅ Good
const handleUserSubmit = async (userData: UserData) => {
  // ...
}

// ❌ Bad
const h = async (d: any) => {
  // ...
}
```

### Python (FastAPI)

- Follow **PEP 8** style guide
- Use **type hints** for all functions
- Write **docstrings** for public functions
- Keep functions **small and focused**

```python
# ✅ Good
async def generate_quiz(
    topic: str,
    num_questions: int = 5,
    difficulty: str = "medium"
) -> QuizResponse:
    """Generate a quiz on the given topic."""
    # ...

# ❌ Bad
async def gen(t, n=5, d="medium"):
    # ...
```

### File Organization

- **One component per file**
- **Co-locate tests** with source files
- **Group related files** in directories
- **Use index files** for clean imports

### Styling

- Use **Tailwind CSS** utility classes
- Follow existing **design system**
- Ensure **dark mode** compatibility
- Test on **mobile and desktop**

## 📝 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Examples

```bash
feat(ai-tutor): add support for code explanation
fix(quiz): resolve answer validation bug
docs(readme): update installation instructions
style(navbar): improve mobile responsiveness
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG** if applicable
5. **Rebase on latest main** branch

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Steps to test the changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

### Review Process

1. At least **one maintainer review** required
2. All **CI checks must pass**
3. No **merge conflicts**
4. **Discussions resolved**

## 🧪 Testing

### Frontend Tests

```bash
npm run test
```

### Backend Tests

```bash
cd ai-backend
pytest
```

### E2E Tests

```bash
npm run test:e2e
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

## ❓ Questions?

Feel free to:
- Open a [Discussion](https://github.com/yourusername/StudEdu-Platform/discussions)
- Ask in our [Discord](https://discord.gg/studedu)
- Email us at dev@studedu.com

## 🙏 Thank You!

Your contributions make StudEdu better for everyone. We appreciate your time and effort! 

---

Happy Coding! 🚀
