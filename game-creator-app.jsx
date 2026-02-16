import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, RefreshCw, Play, Code, Sparkles } from 'lucide-react';

export default function AIGameCreator() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI Game Creator. Describe any game you'd like to create, and I'll build it for you instantly!\n\nTry something like:\n• \"Create a snake game with score tracking\"\n• \"Make a space shooter with enemies\"\n• \"Build a platformer with jumping mechanics\"",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const messagesEndRef = useRef(null);
  const iframeRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateGame = async (prompt) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: `You are an expert game developer. Create a complete, playable HTML5 game based on this description: "${prompt}"

CRITICAL REQUIREMENTS:
1. Generate ONLY the complete HTML code with embedded CSS and JavaScript
2. The game must be fully self-contained in a single HTML file
3. Use HTML5 Canvas or DOM elements for rendering
4. Include all game logic, controls, and UI
5. Make it visually appealing with colors and styling
6. Add score/lives display if relevant
7. Include clear instructions in the game
8. Make controls intuitive (arrow keys, WASD, mouse/touch)
9. DO NOT include any explanatory text before or after the code
10. DO NOT use markdown code blocks or backticks
11. Start directly with <!DOCTYPE html>

The game should be production-ready and fun to play immediately.`
            }
          ]
        })
      });

      const data = await response.json();
      const gameCode = data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n')
        .trim();

      // Clean any potential markdown artifacts
      let cleanCode = gameCode
        .replace(/^```html\n?/gm, '')
        .replace(/^```\n?/gm, '')
        .replace(/```$/gm, '')
        .trim();

      // Ensure it starts with DOCTYPE
      if (!cleanCode.startsWith('<!DOCTYPE')) {
        cleanCode = '<!DOCTYPE html>\n' + cleanCode;
      }

      setCurrentGame(cleanCode);
      setGameKey(prev => prev + 1);

      const assistantMessage = {
        role: 'assistant',
        content: `🎮 **Game Created Successfully!**\n\nI've generated your ${prompt.toLowerCase()}. The game is now playable in the window above!\n\n**How to play:**\n• Use arrow keys or WASD to control\n• Follow the on-screen instructions\n• Have fun!\n\nWant to modify it? Just tell me what changes you'd like!`,
        timestamp: new Date(),
        gameCode: cleanCode
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `❌ Sorry, I encountered an error creating the game: ${error.message}\n\nPlease try again with a different prompt.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    await generateGame(currentInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadGame = () => {
    if (!currentGame) return;
    
    const blob = new Blob([currentGame], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-game-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerateGame = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      generateGame(lastUserMessage.content);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col max-w-2xl">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Game Creator</h1>
              <p className="text-sm text-gray-400">Create games with natural language</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-800 border border-gray-700'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{message.content}</div>
                {message.gameCode && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={downloadGame}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={regenerateGame}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">Creating your game...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 p-4 bg-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the game you want to create..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Game Preview Section */}
      <div className="flex-1 bg-gray-950 border-l border-gray-700 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold">Game Preview</h2>
            </div>
            {currentGame && (
              <div className="flex gap-2">
                <button
                  onClick={() => setGameKey(prev => prev + 1)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-4">
          {currentGame ? (
            <iframe
              key={gameKey}
              ref={iframeRef}
              srcDoc={currentGame}
              className="w-full h-full bg-white rounded-lg shadow-2xl"
              title="Game Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500 max-w-md">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Game Yet</h3>
                <p className="text-sm">
                  Describe a game in the chat to see it come to life here!
                </p>
                <div className="mt-6 text-left space-y-2 text-xs bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="font-semibold text-purple-400">Example prompts:</p>
                  <p>• "Create a flappy bird clone"</p>
                  <p>• "Make a breakout game with power-ups"</p>
                  <p>• "Build a simple platformer with coins"</p>
                  <p>• "Create a memory card matching game"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
