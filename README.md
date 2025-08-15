# Crypto Wallet Wordlock Game

A memory-based word arrangement game that simulates the process of memorizing and reconstructing crypto wallet seed phrases.

## How to Play

1. **Memorize Phase**: You have 5 seconds to memorize a sequence of words displayed on screen
2. **Arrange Phase**: Drag and drop words from the scrambled pool to recreate the correct phrase
3. **Scoring**: Earn points based on difficulty level and accuracy
4. **Progression**: Complete 3 rounds with increasing difficulty

## Game Features

- **3 Difficulty Levels**:
  - Round 1: 6 words + 3 decoys (10 points)
  - Round 2: 8 words + 4 decoys (15 points)
  - Round 3: 10 words + 5 decoys (20 points)

- **Drag & Drop Interface**: Intuitive word arrangement using mouse/touch
- **Timer System**: 30 seconds per round to complete the phrase
- **Score Tracking**: Real-time score display and final results
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- @dnd-kit (Drag and Drop)
- React Router

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd crypto-wallet-wordlock
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Game Rules

- Memorize the word sequence shown for 5 seconds
- Drag words from the bottom pool to the answer area
- Arrange them in the correct order
- Submit before the 30-second timer runs out
- Complete all 3 rounds to see your final score

## Maximum Score

Perfect score: **45 points** (10 + 15 + 20)

---

**Note**: This is a memory training game and does not involve real cryptocurrency or wallet functionality.
