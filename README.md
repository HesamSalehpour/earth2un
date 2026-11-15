# 🌍 Earth Jukebox
### One Planet · Many Voices

**Listen to Earth.**

An interactive, real-time sonification experience that transforms Earth's visual patterns into sound, creating a new way to explore, experience, and connect with our changing planet.

<p align="center">
  <img src="https://img.shields.io/badge/NASA%20Space%20Apps-2026-0B3D91?style=for-the-badge&logo=nasa&logoColor=white" alt="NASA Space Apps 2026"/>
  <img src="https://img.shields.io/badge/Status-Live-00C853?style=for-the-badge" alt="Live"/>
  <img src="https://img.shields.io/badge/Built%20with-Lovable%20AI-FF6B6B?style=for-the-badge" alt="Built with Lovable"/>
  <img src="https://img.shields.io/badge/Technology-Web%20Audio%20API-6C63FF?style=for-the-badge" alt="Web Audio API"/>
</p>

<p align="center">
  **🚀 Live Experience**
  <br/>
  <a href="https://earth2un.lovable.app">https://earth2un.lovable.app</a>
</p>

---

## 🌎 The Vision

What if we could hear our planet?

NASA's Earth Information Center (EIC) makes complex Earth science accessible through powerful visualizations of our changing planet. Yet visual information alone cannot reach everyone or capture every dimension of human sensory experience.

**Earth Jukebox explores a different way of experiencing Earth: through sound.**

Created for the 2026 NASA Space Apps Challenge, Earth Jukebox is an interactive browser-based experience that translates visual characteristics of Earth imagery into dynamic audio.

By analyzing image pixels and translating their properties into sound parameters, the application transforms visual patterns into an evolving auditory landscape.

Oceans become tones. Landscapes become harmonics. Ice and brightness become delicate sonic textures.

The result is an immersive experience that invites users to explore Earth through both sight and hearing.

**One planet. Many signals. One shared experience.**

---

## 🎯 The NASA Challenge

Earth Jukebox responds to the NASA Space Apps Challenge to build an *Earth Jukebox*: an interface, script, or application that pairs Earth Information Center visual frames with dynamic sonifications generated in real time.

The project addresses this challenge through three principles:

- **Accessibility:** Expanding the ways people can engage with Earth science beyond visual interpretation.
- **Exploration:** Making image characteristics perceptible through sound and interactive discovery.
- **Engagement:** Transforming scientific imagery into an immersive, participatory experience.

---

## 🎧 Core Experience

Earth Jukebox offers three curated listening experiences, each designed around a different visual interpretation of Earth.

### 🌊 Ocean & Water

Explore blue-dominant visual patterns through evolving pitches and tonal variations, creating an atmospheric interpretation of Earth's oceans and water systems.

### 🌿 Land & Vegetation

Experience green and earth-toned visual patterns through harmonic variation and layered sonic textures.

### ❄️ Ice & Brightness

Discover bright visual regions through higher-frequency tonal characteristics and delicate audio variations.

<p align="center">
  <em>Three perspectives. Three sonic landscapes. One living planet.</em>
</p>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Real-Time Sonification** | Converts sampled image pixel characteristics into continuously modulated audio. |
| **Interactive Earth Visualization** | Explores Earth imagery through an interactive visual interface and scanning mechanism. |
| **Three Listening Experiences** | Ocean & Water, Land & Vegetation, and Ice & Brightness. |
| **Dynamic Scan Line** | Continuously samples visual information as the image is scanned. |
| **Custom Image Upload** | Allows users to upload their own Earth imagery for sonification. |
| **Live Audio Feedback** | Displays frequency and intensity information during the listening experience. |
| **Browser-Based Audio Synthesis** | Generates sound directly through the Web Audio API without requiring pre-recorded audio files. |
| **Accessible Exploration** | Introduces an additional sensory channel for engaging with Earth imagery. |

---

## 🔬 How It Works: From Pixels to Sound

Earth Jukebox uses image-based sonification to translate visual information into auditory signals.

The current implementation analyzes pixel-level characteristics and maps them to sound parameters through a browser-based audio synthesis engine.

### 1. Image Acquisition

The experience begins with an Earth visualization or an image uploaded by the user.

Supported imagery can include NASA Earth imagery, Earth Information Center visualization frames, and other suitable Earth observation images.

### 2. Visual Analysis

The selected image is rendered onto an HTML Canvas.

A moving scan line samples pixel information and extracts visual characteristics, including:

- Red (R)
- Green (G)
- Blue (B)
- Luminance
- Spatial pixel variation

### 3. Sonification Mapping

Extracted visual characteristics are translated into audio parameters using mode-specific mapping functions.

| Visual characteristic | Audio parameter | Purpose |
|---|---|---|
| Blue-channel intensity | Pitch / frequency | Creates tonal variation |
| Green-channel intensity | Harmonic texture | Adds tonal richness |
| Red-channel intensity | Tonal character | Introduces variation |
| Luminance | Amplitude / intensity | Controls perceived loudness |
| Spatial variation | Audio texture | Adds sonic complexity |
| Scan progression | Temporal modulation | Connects sound to visual movement |

### 4. Real-Time Audio Synthesis

The Web Audio API generates sound using browser-native audio components, including oscillators and gain nodes.

Audio parameters are continuously adjusted as the scan line progresses across the image.

### 5. Listening and Exploration

Users can follow the visual scan, observe changing audio parameters, and experience how different visual patterns produce different sounds.

---

## 🏗️ Technical Architecture

```text
┌──────────────────────────────────────────────┐
│                USER INTERFACE                │
│                                              │
│  • Interactive Earth Visualization           │
│  • Experience Selection                      │
│  • Playback Controls                         │
│  • Custom Image Upload                       │
│  • Frequency & Intensity Feedback            │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│               IMAGE ANALYSIS                 │
│                                              │
│  • HTML Canvas Rendering                     │
│  • Vertical Scan-Line Sampling               │
│  • RGB Extraction                            │
│  • Luminance Calculation                     │
│  • Pixel Variation Analysis                  │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             SONIFICATION ENGINE              │
│                                              │
│  • Mode-Specific Mapping Functions           │
│  • Frequency Modulation                      │
│  • Amplitude Control                          │
│  • Harmonic Variation                         │
│  • Smooth Audio Transitions                   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                WEB AUDIO API                 │
│                                              │
│  • Oscillator Nodes                          │
│  • Gain Nodes                                │
│  • Real-Time Audio Synthesis                 │
│  • Audio Parameter Modulation                │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                EARTH JUKEBOX                 │
│                                              │
│       A Living Auditory Earth Experience     │
└──────────────────────────────────────────────┘
```

### Data Flow

1. Load an Earth visualization or upload an image.
2. Render the image on an HTML Canvas.
3. Continuously sample pixels along the moving scan line.
4. Extract RGB values, luminance, and visual characteristics.
5. Apply the selected sonification mapping.
6. Generate and modulate sound through the Web Audio API.
7. Display corresponding audio feedback during playback.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Development | Lovable AI | AI-assisted application development |
| Frontend | React | Interactive application interface |
| Programming | TypeScript | Application logic and type safety |
| Styling | Tailwind CSS | Responsive visual design |
| Image Processing | HTML Canvas API | Image rendering and pixel analysis |
| Audio Engine | Web Audio API | Real-time audio synthesis |
| Imagery | NASA Earth imagery / User-provided frames | Visual input for sonification |
| Hosting | Lovable App Platform | Application deployment |

---

## ♿ Accessibility & Inclusive Science Communication

Earth Jukebox explores how auditory experiences can complement conventional visual approaches to communicating Earth science.

Its potential applications include:

- Providing an alternative sensory experience for people with visual impairments.
- Helping learners explore visual patterns through auditory feedback.
- Supporting interactive and experiential science education.
- Encouraging new approaches to communicating complex environmental information.

The project is designed as a complementary experience rather than a replacement for accessible visualizations, captions, descriptive explanations, or other established accessibility tools.

---

## 🔬 Scientific Methodology & Limitations

The current version implements **image-based sonification**, not direct measurement of environmental variables.

RGB values, luminance, and pixel variations are used as inputs to the audio mapping system. These characteristics produce sound but should not be interpreted as direct measurements of ocean temperature, vegetation health, ice mass, or other physical Earth-system variables.

The scientific meaning of an image depends on its source dataset, measurement methodology, spatial resolution, and observation period.

Future extensions could integrate numerical Earth observation datasets to enable direct scientific data sonification, including:

- Sea surface temperature.
- Vegetation indices such as NDVI.
- Chlorophyll concentration.
- Sea ice extent.
- Atmospheric composition.
- Changes in land cover over time.

This would create a pathway from visual image sonification toward scientifically grounded, multidimensional Earth data sonification.

---

## 🤖 AI-Assisted Development & Transparency

Earth Jukebox was developed with significant assistance from Lovable, an AI-powered application development platform.

AI supported the development process in several areas:

- **Application Development:** Generation and refinement of React and TypeScript components.
- **Architecture Exploration:** Development of the image-analysis and audio-synthesis architecture.
- **Sonification Design:** Exploration of image-to-audio mapping strategies.
- **Interface Design:** Iterative development of the visual experience and interaction patterns.
- **Prototyping:** Accelerated implementation and refinement of application features.

The project combines AI-assisted software development with human-led creative direction, technical decisions, scientific interpretation, and product design.

---

## 🌱 Impact & Future Possibilities

Earth Jukebox is an exploration of how emerging technologies can transform the way humanity experiences and communicates planetary information.

Its broader vision extends beyond generating sound from images.

Potential future developments include:

**1. Temporal Earth Sonification**

Compare satellite imagery and environmental observations across different dates, allowing users to hear how Earth's systems evolve.

**2. Scientific Data Integration**

Connect numerical Earth observation datasets to dedicated sonification models for more scientifically meaningful auditory representations.

**3. Multidimensional Earth Experiences**

Combine multiple environmental variables into layered auditory compositions, creating richer representations of interconnected Earth systems.

**4. Inclusive Science Education**

Develop educational experiences that help students, researchers, and wider audiences explore Earth science through multiple sensory channels.

**5. Open Sonification Framework**

Explore reusable tools that enable educators, researchers, and developers to transform Earth imagery and scientific datasets into interactive auditory experiences.

---

## 🚀 Getting Started

Experience Earth Jukebox directly in your browser:

**[Launch Earth Jukebox](https://earth2un.lovable.app)**

1. Open the application.
2. Choose one of the three listening experiences.
3. Put on headphones for an immersive experience.
4. Press **Listen to Earth**.
5. Observe the scanning visualization and corresponding audio feedback.
6. Upload your own Earth imagery to explore additional visual patterns.

No dedicated audio software or pre-recorded sound files are required.

---

## 📄 Challenge, Credits & Attribution

**Created for the 2026 NASA Space Apps Challenge.**

Earth Jukebox is an independent prototype developed in response to the NASA Earth Information Center sonification challenge.

- NASA Earth imagery and scientific resources: NASA and the relevant data providers.
- Application development: Lovable AI.
- Audio synthesis: Web Audio API.
- Interface and project concept: Earth Jukebox.

NASA imagery and data are subject to their respective usage, attribution, and third-party content requirements.

**Disclaimer:** Earth Jukebox is an independent project and is not affiliated with, endorsed by, or sponsored by NASA or the United Nations.

---

<p align="center">
  <em>A little closer to our home planet.</em>
  <br/><br/>
  <strong>🌍 Earth Jukebox · 2026</strong>
  <br/>
  <strong>One Planet · Many Voices</strong>
  <br/><br/>
  <a href="https://earth2un.lovable.app">Listen to Earth</a>
</p>
