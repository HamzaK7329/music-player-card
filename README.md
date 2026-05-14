# 🎵 Music Player Card

A modern animated music player card built with Next.js, React, TypeScript, and Tailwind CSS.

This project is a clean interactive music player UI that allows users to play songs, switch between tracks, and open a Spotify-style lyrics panel. The lyrics card slides out from behind the main music player and displays synced lyrics line by line.

---

# 📦 Technologies

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- HTML Audio API
- React Hooks

---

# ✨ Features

## 🎧 Music Playback

Users can play and pause music directly from the card using a custom animated play button.

## ⏮️ Previous and Next Song Controls

The player includes previous and next buttons, allowing users to move between songs. The buttons use the same pop animation style as the play button.

## 📀 Song Information

Each song displays its own:

- cover image
- song title
- artist name
- audio file
- optional lyrics file

## 📜 Spotify-Style Lyrics Card

The lyrics panel appears when the user presses the lyrics button. It slides out from behind the music player card to the right side.

## 🎤 Synced Lyrics

For songs with lyrics, the active lyric line changes based on the current song time. The active lyric is highlighted while the other lines stay faded.

## 🔄 Auto-Scrolling Lyrics

The lyrics automatically scroll to keep the current active lyric centered, similar to Spotify.

## 🚫 Lyrics Not Available State

If a song does not have a lyrics file, the lyrics card displays:

```txt
Lyrics not available
```

## ✨ Smooth Animations

The project includes smooth UI animations such as:

- button pop effects
- lyrics card slide animation
- active lyric transition
- hover and click feedback

---

# 👩🏽‍🍳 The Process

I started by building the main music player card with song cover art, title, artist name, and playback controls.

After that, I added multiple songs and created previous and next buttons so the user can switch between tracks. I then connected the player to the HTML Audio API so the music could play, pause, and update its progress.

Next, I created a separate `LyricsCard` component. This component receives the current song time and checks which lyric should be active. If lyrics exist, it displays them line by line. If lyrics do not exist, it shows a simple “Lyrics not available” message.

Then, I added a lyrics button to the main card. When clicked, it toggles the lyrics card on and off. The lyrics card uses absolute positioning and animation so it slides out from behind the music player.

Finally, I added auto-scrolling lyrics using `useRef` and `useEffect`. This makes the active lyric stay centered while the song is playing.

---

# 📚 What I Learned

## ⚛️ React State Management

I learned how to manage different states such as:

- current song
- play/pause status
- current time progress
- lyrics visibility
- loaded lyrics

## 🎵 Working With Audio

I learned how to control audio playback in React and track the current time of a song.

## 📜 Dynamic Lyrics Loading

I learned how to connect lyrics files to specific songs and show lyrics only when they are available.

## 🎯 Conditional Rendering

I used conditional rendering to display either synced lyrics or a “Lyrics not available” message.

## 🧠 Auto Scroll Logic

I learned how to use `useRef` and `scrollIntoView()` to automatically move the lyrics container to the active lyric line.

## 🎨 UI Animation

I practiced creating smooth UI effects using Tailwind CSS, including sliding cards, scaling buttons, and lyric transitions.

---

# 💭 How It Can Be Improved

- Add a draggable progress bar
- Add volume controls
- Add shuffle mode
- Add repeat mode
- Add more songs
- Add lyrics for every song
- Add album or playlist view
- Add mobile responsiveness
- Add background blur based on album cover
- Add dark and light themes
- Add a queue system

---

# 🚦 Running the Project

To run the project locally:

1. Clone the repository.

2. Install the required dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local server in your browser:

```txt
http://localhost:3000
```
