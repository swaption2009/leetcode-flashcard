# LeetCode Flashcards with AI Chat

A React-based flashcard application for studying LeetCode problems with an integrated AI chatbot powered by Google's Gemini 2.5 Pro.

## Features

- Interactive flashcards with flip animation
- Filter by difficulty level (Easy, Medium, Hard)
- Navigation controls (Previous, Next, Shuffle)
- AI-powered chatbot for discussing problems and concepts
- Side-by-side layout with aligned containers
- Scrollable chat interface

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Gemini API:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Click "Get API key" in the left sidebar
   - Create a new API key
   - Copy the API key
   - Open `src/config.js` and replace `'YOUR_API_KEY_HERE'` with your actual API key

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Flashcards**: Click on a flashcard to flip between the question and answer
- **Navigation**: Use Previous/Next buttons to move between cards, or Shuffle to randomize order
- **Filtering**: Use the filter buttons to show only Easy, Medium, or Hard problems
- **AI Chat**: Ask questions about the current problem or coding concepts in general. The AI has context about the current flashcard and can provide detailed explanations, hints, and related concepts.

## Chat Features

The AI chatbot can help with:
- Explaining algorithms and approaches
- Discussing time/space complexity
- Providing hints for similar problems
- Explaining code implementations
- General coding concept discussions

The AI has full context of the current flashcard including the problem description, examples, solution, and complexity analysis.
