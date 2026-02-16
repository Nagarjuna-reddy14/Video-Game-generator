# 🎮 AI Game Creator

> Create playable games instantly using natural language prompts

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![Node](https://img.shields.io/badge/Node-16+-green.svg)

AI Game Creator is a full-stack application that allows anyone to create playable HTML5 games using simple text descriptions. Just describe the game you want, and watch it come to life instantly!

## ✨ Features

- 🤖 **AI-Powered Generation** - Leverages Claude AI to generate complete game code
- 💬 **ChatGPT-Style Interface** - Intuitive chat interface for game requests
- 🎯 **Instant Playability** - Games render and run immediately after generation
- 🔒 **Safe Execution** - Sandboxed iframe prevents malicious code execution
- 📥 **Download Games** - Export generated games as standalone HTML files
- 🔄 **Regenerate Option** - Don't like the result? Generate again with one click
- 🎨 **Modern UI** - Clean, dark-themed interface with smooth animations
- 📱 **Responsive Design** - Works on desktop and tablet devices

## 🎯 Supported Game Types

- 2D Arcade Games (Snake, Pong, Breakout)
- Platformers (jumping, collecting, obstacles)
- Puzzle Games (memory, matching, logic)
- Shooter Games (space shooters, bullet hell)
- Endless Runners (auto-scrolling, obstacle dodging)
- Card & Board Games (tic-tac-toe, cards)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-game-creator.git
cd ai-game-creator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
```
http://localhost:3000
```

## 📖 Usage

### Creating Your First Game

1. Type a game description in the chat input:
   ```
   "Create a snake game with score tracking"
   ```

2. Press Enter or click Send

3. Wait for the AI to generate your game (usually 5-15 seconds)

4. Play the game in the preview window!

### Example Prompts

```
"Create a flappy bird clone with pipes"
"Make a breakout game with colorful bricks"
"Build a space invaders style shooter"
"Create a simple platformer with coins to collect"
"Make a memory card matching game"
"Build a whack-a-mole game with timer"
"Create a racing game with keyboard controls"
```

### Tips for Best Results

- Be specific about game mechanics you want
- Mention control schemes (keyboard, mouse, touch)
- Specify visual elements (colors, themes, styles)
- Include scoring or win conditions if desired

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **HTML5 Canvas** - Game rendering

### Backend
- **Anthropic Claude API** - AI game generation
- **Sandbox iframe** - Safe code execution

### Security
- Sandboxed execution environment
- No file system access
- No network requests from games
- Content Security Policy enforcement

## 📁 Project Structure

```
ai-game-creator/
├── src/
│   ├── components/
│   │   └── AIGameCreator.jsx    # Main application component
│   ├── App.js                    # Root component
│   └── index.js                  # Entry point
├── public/
│   └── index.html                # HTML template
├── package.json                  # Dependencies
├── .env                          # Environment variables
└── README.md                     # This file
```

## 🔧 Configuration

### API Settings

The app uses Claude Sonnet 4 by default. You can modify the model in `AIGameCreator.jsx`:

```javascript
model: 'claude-sonnet-4-20250514',  // Change model here
max_tokens: 4000,                     // Adjust token limit
```

### Styling Customization

Colors and themes can be modified using Tailwind classes in the component:

```javascript
// Main background
className="bg-gray-900"

// Accent colors
className="from-purple-600 to-pink-600"
```

## 🎮 How It Works

1. **User Input** - User describes a game in natural language
2. **API Request** - App sends prompt to Claude API with specific instructions
3. **Code Generation** - Claude generates complete HTML5 game code
4. **Code Cleaning** - App removes markdown artifacts and ensures valid HTML
5. **Rendering** - Game code is injected into sandboxed iframe
6. **Execution** - Game runs immediately with full interactivity

## 🔐 Security Considerations

The app implements several security measures:

- **Sandbox Attribute** - Restricts iframe capabilities
- **No External Scripts** - Games are self-contained
- **Content Validation** - Ensures generated code starts with proper DOCTYPE
- **Limited Permissions** - No access to parent window or user data

## 🚧 Limitations

- Games are client-side only (no multiplayer)
- No persistent storage between sessions
- Limited to browser-compatible technologies
- API rate limits apply based on your Anthropic plan
- Complex 3D games may have performance constraints

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- Additional game templates
- UI/UX improvements
- Performance optimizations
- Mobile responsiveness enhancements
- New features (game saving, user accounts, etc.)

## 📝 Roadmap

- [ ] User authentication and game library
- [ ] Game editing and modification interface
- [ ] Community game sharing
- [ ] Template gallery for quick starts
- [ ] Enhanced error handling and validation
- [ ] Game versioning and history
- [ ] Mobile app version
- [ ] Multiplayer game support
- [ ] Advanced graphics options (Three.js, Phaser)
- [ ] Asset library integration


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude API
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for beautiful icons
- The open-source community



**🎮 Happy Game Creating!** 
