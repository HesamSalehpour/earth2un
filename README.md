# Earth Jukebox | Earth2un

**An image-to-sound Earth exploration prototype created for the NASA Space Apps Challenge 2026.**

Earth Jukebox pairs a rotating Earth visualization with real-time, browser-generated sound. It translates image colors into musical pitch and intensity, offering an additional sensory perspective on our planet alongside visible playback information.

**[Live application](https://earth2un.lovable.app)** · **[Lovable project](https://lovable.dev/projects/f1362dd2-5603-4f17-992c-428e340215c6)** · **[Earth Information Center](https://earth.gov/)**

## Challenge and purpose

NASA’s Earth Information Center (EIC) presents visualizations of our changing planet. Earth Jukebox explores how these visual frames can also become listening experiences: a person selects a perspective, starts playback, and hears tones generated from the image as the sampling position moves.

The current implementation is an independent proof of concept, not a scientific measurement instrument or a live EIC data service. EIC frames can be supplied manually through image upload.

## Capabilities

- **Real-time sonification:** generates sound with the Web Audio API rather than playing prerecorded tracks.
- **Three listening perspectives:** ocean and water, land and vegetation, and ice and brightness, each with an explicit image-color mapping.
- **Synchronized visualization:** a 2D canvas sphere rotates with the playback position and displays a sampling marker and longitude label.
- **Playback controls:** play/pause, restart, seek, volume, mute/unmute, and adjustable speed from 0.5× to 2×.
- **Image upload:** accepts PNG, JPEG, and WebP files up to 15 MB; uploaded frames remain on the device and can be replaced with the default NASA frame.
- **Visible sound information:** displays frequency in hertz and relative intensity alongside the selected mapping.
- **Sample export:** downloads a JSON record of the current source name, mode, mapping, position, frequency, intensity, and interpretation caveat. This is not an audio export.
- **Accessible interactions:** labeled controls, keyboard focus indicators, focus-managed dialogs, Escape dismissal, and reduced-motion styling.
- **Mobile and desktop layouts:** adapts the player and collection to different screen sizes.

## How the sonification works

The source image is drawn into a **1024 × 512 sampling canvas**. The renderer reads the equatorial pixel associated with the current playback position and passes its RGB values to a pure mapping function. Sampling therefore uses a resized raster of the source image, not a calibrated geospatial dataset.

| Perspective | Normalized signal | Sound treatment |
| --- | --- | --- |
| Ocean & water | `max(0, blue − red) / 255` | Sine oscillator; stronger blue-relative-to-red signal increases pitch and intensity |
| Land & vegetation | `max(0, green − blue) / 255` | Triangle oscillator; stronger green-relative-to-blue signal increases pitch and intensity |
| Ice & brightness | `(red + green + blue) / 765` | Sine oscillator; brighter pixels increase pitch and intensity, one octave above the other modes |

Signals select one of eight notes using semitone offsets `[0, 2, 4, 7, 9, 12, 14, 16]` from a 130.81 Hz base frequency. This produces a pentatonic-based sequence. Oscillator frequency and gain changes are smoothed to reduce abrupt transitions.

**Interpretation:** blue is not ocean depth, green is not a vegetation index, and brightness is not measured ice extent. These modes are creative color proxies. The displayed intensity is the normalized mapping signal, not a physical environmental quantity or a decibel reading.

## Architecture

```text
Default Earth texture / locally uploaded frame
                    │
                    ▼
          Browser sampling canvas
                    │
             Equatorial RGB pixel
                    │
                    ▼
         Pure sonification mapping
                    │
          Frequency + intensity
                    │
                    ▼
       Web Audio oscillator → gain → output

Playback position ──► Canvas sphere projection
                  └─► Image sampling position
```

The interactive experience runs in the browser. TanStack Start provides the application shell and routing; React manages the listening state. The Earth visualization uses a custom **2D canvas sphere projection**, not a Three.js or WebGL dependency. A shared playback position coordinates the visual rotation and sound sampling.

No application database, user account system, paid inference API, or server-side image/audio processing is required for the current experience. Hosting still serves the application, fonts, and default imagery; this architecture does not imply that hosting or development is free.

### Key source files

| File | Responsibility |
| --- | --- |
| `src/routes/index.tsx` | Main interface, playback state, Web Audio lifecycle, uploads, export, and settings |
| `src/components/earth-stage.tsx` | Image rasterization, 2D sphere projection, and pixel sampling |
| `src/lib/sonification.ts` | Deterministic RGB-to-frequency and intensity mapping |
| `src/components/ui/dialog.tsx` | Reusable Radix-based accessible dialogs |
| `src/styles.css` | Semantic theme tokens, layouts, and motion preferences |
| `src/routes/__root.tsx` | Shared document shell, font loading, and favicon |
| `src/test/sonification.test.ts` | Tests for sonification behavior |
| `src/test/app-routing.test.tsx` | Routing-related regression test |

## Technologies

| Technology | Role |
| --- | --- |
| **TypeScript** | Typed application and mapping logic |
| **React 19** | Interactive interface and state management |
| **TanStack Start v1 / TanStack Router** | Full-stack application framework, document rendering, and file-based routing |
| **TanStack Query** | Query client infrastructure in the shared application shell |
| **Vite** | Local development and production build tooling |
| **Tailwind CSS v4** | CSS-first theme configuration and styling utilities |
| **shadcn/ui and Radix UI** | Reusable controls and accessible dialog primitives |
| **Lucide React** | Interface icons |
| **Web Audio API** | Browser-native oscillator synthesis and gain control |
| **Canvas 2D API** | Image sampling and Earth rendering |
| **Vitest / Testing Library** | Automated test infrastructure |
| **Lovable** | AI-assisted development environment and hosting workflow |

The project’s Lovable-managed build configuration targets Cloudflare-compatible deployment. Sonification itself does not depend on server execution.

## AI assistance and transparency

The application was developed with **Lovable’s AI-assisted development workflow**, guided by Hesam Salehpour’s challenge brief and design requests. AI assistance contributed to implementation, interface refinement, documentation, and an original generated globe-and-branches logo.

**AI is a development aid, not the runtime sound engine.** The app does not send uploaded frames to an AI model or use generative music inference. Sound generation is deterministic: the same RGB input and selected mode produce the same mapped frequency and intensity.

The logo references planetary cooperation through a globe, branches, and a sound motif. It is **not the official United Nations emblem**, and neither its use nor the project’s name implies UN endorsement. AI-assisted output should be reviewed before scientific, accessibility, or production claims are made.

## Local development

### Prerequisites

- A current Node.js LTS installation.
- Bun or npm for dependency management.
- A modern browser with Canvas 2D and Web Audio support.

Clone this repository and open its directory, then run:

```sh
bun install
bun run dev
```

Alternatively:

```sh
npm install
npm run dev
```

Open the local URL printed by the development server. Press **Listen to Earth** to start audio; browser policies require a user interaction before sound begins.

### Available commands

```sh
bun run dev       # Start the development server
bun run test      # Run automated tests
bun run lint      # Run ESLint
bun run build     # Create a production build
bun run preview   # Preview the production build locally
```

No private API key is needed for the current image-to-sound functionality. Default image delivery uses the project’s hosted asset path; if running outside Lovable, confirm that the asset resolves or replace it with an appropriately attributed local texture. Local image upload offers an alternative source.

## Privacy and accessibility

Uploaded frames are accessed through browser object URLs and processed locally; they are not uploaded by the application’s frame-upload flow. Object URLs are released when replaced or when the interface is removed. JSON export downloads the current sample metadata to the user’s device.

The site loads externally hosted fonts and default imagery. Local processing does not mean the entire site is offline or that no network requests occur.

Audio begins only after an explicit user action. Pitch and relative intensity are also displayed visually. Reduced-motion preferences disable decorative animation, while playback-driven Earth updates continue. Accessibility features are implemented, but no formal WCAG certification or assistive-technology audit is claimed.

## Current limitations

- No live EIC feed, remote data ingestion, or time-series climate playback is connected.
- The default frame is static; rotation scans the image rather than showing the planet changing over time.
- Arbitrary uploaded images are resized and wrapped onto the sphere; correct geographic interpretation requires a suitable Earth texture and verified coordinate conventions.
- Only one equatorial pixel is sampled at each position, rather than a region, latitude band, or full image.
- Track labels indicate a nominal 60-second loop; timer scheduling and speed adjustments mean playback is not an exact scientific time reference.
- The waveform is a decorative playback indicator, not a measured oscilloscope or spectrum analyzer.
- There is no WAV/MP3 export, saved session history, authentication, or persistent upload library.
- Audio availability and performance depend on browser support, device capacity, and browser autoplay restrictions.

## Potential next steps

These are opportunities, **not implemented capabilities**:

- Integrate attributed EIC frame sequences with explicit timestamps and provenance.
- Add calibrated scientific variables and documented units instead of color proxies.
- Validate geographic coordinates and support selectable latitude bands or regions.
- Introduce multi-variable sonification and recorded audio export.
- Conduct usability testing with blind and low-vision participants and a formal accessibility review.

## Sources, acknowledgments, and affiliation

- **Project direction:** Hesam Salehpour.
- **Challenge inspiration:** NASA Space Apps Challenge 2026 and NASA’s Earth Information Center.
- **Default imagery:** a NASA Blue Marble-derived Earth texture distributed through the [WebGL Earth project](https://github.com/turban/webgl-earth).
- **Earth science reference:** [Earth Information Center](https://earth.gov/).
- **Development environment:** [Lovable](https://lovable.dev).

Earth Jukebox is an independent challenge prototype. It is not an official NASA or United Nations product, and no endorsement is claimed. Review upstream attribution and usage terms before redistributing imagery or other third-party assets. This README does not grant a software license; consult any repository license file and applicable asset terms before reuse.
