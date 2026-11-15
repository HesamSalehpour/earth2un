import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, AudioLines, Check, ChevronRight, CircleHelp, Globe2, Headphones, Leaf, Pause, Play, RotateCcw, Settings2, Snowflake, Upload, Volume2, Waves, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EarthStage } from '@/components/earth-stage';
import { mapPixel, type SoundMode } from '@/lib/sonification';
import earthAsset from '@/assets/earth-blue-marble.jpg.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Earth Jukebox — Listen to our planet' }, { name: 'description', content: 'Explore Earth through image-driven, real-time sonification. An accessible Earth Jukebox prototype for NASA Space Apps.' }, { property: 'og:title', content: 'Earth Jukebox — Listen to our planet' }, { property: 'og:description', content: 'An Earth science listening experience, turning visual frames into sound.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Index,
});

const tracks = [
  { id: 'ocean' as const, number: '01', title: 'The blue planet', category: 'OCEAN & WATER', icon: Waves, description: 'Follow the rhythm of Earth’s oceans.', mapping: 'Blue relative to red → pitch', color: 'ocean', duration: '01:00' },
  { id: 'land' as const, number: '02', title: 'A living Earth', category: 'LAND & VEGETATION', icon: Leaf, description: 'Listen to the green pulse of our planet.', mapping: 'Green relative to blue → pitch', color: 'land', duration: '01:00' },
  { id: 'ice' as const, number: '03', title: 'Frozen harmonies', category: 'ICE & BRIGHTNESS', icon: Snowflake, description: 'Discover the delicate tones of brighter regions.', mapping: 'Pixel brightness → pitch', color: 'ice', duration: '01:00' },
] as const;

function Index() {
  const [mode, setMode] = useState<SoundMode>('ocean');
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(55);
  const [speed, setSpeed] = useState(1);
  const [imageUrl, setImageUrl] = useState(earthAsset.url);
  const [fileName, setFileName] = useState('NASA Blue Marble');
  const [modal, setModal] = useState<'about' | 'settings' | null>(null);
  const [error, setError] = useState('');
  const [sample, setSample] = useState({ frequency: 130.81, intensity: 0, brightness: 0 });
  const audio = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gain = useRef<GainNode | null>(null);
  const upload = useRef<HTMLInputElement>(null);
  const track = tracks.find(t => t.id === mode) ?? tracks[0];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPosition(p => (p + .5 * speed) % 100), 300);
    return () => window.clearInterval(timer);
  }, [playing, speed]);
  useEffect(() => {
    if (audio.current && oscillator.current && gain.current) {
      oscillator.current.type = mode === 'land' ? 'triangle' : 'sine';
      oscillator.current.frequency.setTargetAtTime(sample.frequency, audio.current.currentTime, .12);
      gain.current.gain.setTargetAtTime(playing ? volume / 100 * (.035 + sample.intensity * .07) : 0, audio.current.currentTime, .08);
    }
  }, [sample, playing, volume, mode]);
  useEffect(() => () => { void audio.current?.close(); }, []);
  useEffect(() => () => { if (imageUrl.startsWith('blob:')) URL.revokeObjectURL(imageUrl); }, [imageUrl]);

  async function togglePlayback() {
    try {
      if (!audio.current) {
        const context = new AudioContext();
        const osc = context.createOscillator();
        const node = context.createGain();
        node.gain.value = 0; osc.connect(node); node.connect(context.destination); osc.start();
        audio.current = context; oscillator.current = osc; gain.current = node;
      }
      await audio.current.resume();
      setPlaying(p => !p); setError('');
    } catch { setError('Sound is unavailable in this browser. Try Chrome, Firefox, or Safari.'); }
  }
  function exportMapping() {
    const blob = new Blob([JSON.stringify({ source: fileName, method: track.mapping, mode, sampledLongitude: position * 3.6 - 180, frequencyHz: sample.frequency, intensity: sample.intensity, note: 'Image color sonification, not calibrated scientific measurements.' }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'earth-jukebox-sample.json'; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="app-shell">
    <header className="site-header"><a className="brand" href="/" aria-label="Earth Jukebox home"><span className="brand-symbol"><Globe2 /></span> earth<span className="brand-light">jukebox</span><span className="brand-dot" /></a><div className="header-right"><span className="challenge-label">NASA SPACE APPS <span>2026</span></span><Button variant="ghost" onClick={() => setModal('about')}>About the project <ArrowUpRight /></Button></div></header>
    <main>
      <section className="intro"><div><div className="eyebrow"><span className="status-dot" /> A DIFFERENT WAY TO EXPERIENCE EARTH</div><h1>Our planet. <span>A new frequency.</span></h1><p>Earth has a story to tell. Let’s listen.</p></div><div className="headphone-note"><Headphones size={19} /><span>Made for your ears.<br /><strong>Best with headphones.</strong></span></div></section>
      <section className="listening-room" aria-label="Earth listening player">
        <div className="visual-panel"><div className="panel-topline"><span><span className="status-dot" /> {playing ? 'SONIFICATION LIVE' : 'READY TO LISTEN'}</span><span className="frame-label">FRAME / {String(Math.floor(position) + 1).padStart(3, '0')}</span></div><EarthStage imageUrl={imageUrl} position={position} mode={mode} onSample={(r, g, b) => setSample(mapPixel(r, g, b, mode))} /><div className="visual-bottom"><div><Globe2 size={14} /> {fileName}</div><span>IMAGE-DRIVEN SONIFICATION</span></div></div>
        <div className="player-panel"><div className="player-heading"><span className="eyebrow">NOW EXPLORING</span><Button variant="ghost" size="icon" aria-label="Sound settings" title="Sound settings" onClick={() => setModal('settings')}><Settings2 /></Button></div><div className={`track-category tone-${mode}`}><track.icon size={15} /> {track.category}</div><h2>{track.title}</h2><p className="track-description">{track.description}</p><div className={`waveform ${playing ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({ length: 52 }, (_, i) => <span key={i} className={`wave-bar bar-${i % 13}`} />)}</div><div className="time-label"><span>{`00:${String(Math.floor(position * .6)).padStart(2, '0')}`}</span><span>01:00</span></div><input className="timeline" type="range" min="0" max="99.9" step=".1" value={position} aria-label="Playback position" onChange={e => setPosition(Number(e.target.value))} /><div className="transport"><Button variant="ghost" size="icon" aria-label="Restart track" title="Restart track" onClick={() => setPosition(0)}><RotateCcw /></Button><Button className="play-button" size="lg" onClick={togglePlayback}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}{playing ? 'Pause Earth' : 'Listen to Earth'}</Button><Button variant="ghost" size="icon" aria-label="Export sample mapping" title="Export sample mapping" onClick={exportMapping}><ArrowDownToLine /></Button></div><div className="volume-control"><Volume2 size={17} /><input type="range" min="0" max="100" value={volume} aria-label="Volume" onChange={e => setVolume(Number(e.target.value))} /><span>{volume}%</span></div><div className="mapping-box"><div><AudioLines size={17} /><span>THE SOUND OF THE DATA</span></div><p>{track.mapping}</p><div className="sample-values"><span>{Math.round(sample.frequency)} <small>Hz</small></span><span>{Math.round(sample.intensity * 100)}<small>% intensity</small></span></div></div>{error && <p role="alert" className="error-message">{error}</p>}<div className="player-footnote"><span className="status-dot" /> Generated in your browser. No recordings.</div></div>
      </section>
      <section className="collection"><div className="section-heading"><div><span className="eyebrow">THE EARTH COLLECTION</span><h3>Three perspectives. One planet.</h3></div><span className="collection-count">03 EXPERIENCES</span></div><div className="track-grid">{tracks.map(t => <Button key={t.id} variant="ghost" className={`track-card track-${t.color} ${mode === t.id ? 'selected' : ''}`} onClick={() => { setMode(t.id); setPosition(0); }} aria-pressed={mode === t.id}><div className="track-art"><img src={earthAsset.url} alt="" /><div className="art-overlay" /><t.icon className="art-icon" size={26} /><span className="art-number">{t.number}</span>{mode === t.id && <span className="selected-label"><Check size={12} /> SELECTED</span>}</div><div className="card-content"><span className={`card-category tone-${t.id}`}>{t.category}</span><div><h4>{t.title}</h4><ChevronRight size={19} /></div><p>{t.description}</p><span className="card-duration"><AudioLines size={13} /> {t.duration} · REAL-TIME</span></div></Button>)}</div></section>
      <section className="own-frame"><div className="upload-symbol"><Upload size={23} /></div><div><h3>Your frame. Your frequency.</h3><p>Bring an Earth Information Center image into the mix.</p></div><Button variant="outline" onClick={() => upload.current?.click()}><Upload /> Upload a frame</Button><input ref={upload} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Upload Earth frame" onChange={e => { const file = e.target.files?.[0]; if (!file) return; if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setError('Please choose a PNG, JPEG, or WebP image.'); return; } if (file.size > 15 * 1024 * 1024) { setError('Please choose an image smaller than 15 MB.'); return; } setImageUrl(URL.createObjectURL(file)); setFileName(file.name); setPosition(0); setError(''); }} /></section>
    </main><footer><div className="footer-brand"><Globe2 size={16} /> A little closer to our home planet.</div><div><span>NASA imagery · Independent challenge prototype</span><Button variant="ghost" size="icon" aria-label="Sources and accessibility" title="Sources and accessibility" onClick={() => setModal('about')}><CircleHelp size={17} /></Button></div></footer>
    {modal && <div className="modal-backdrop" onClick={() => setModal(null)}><section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><Button className="modal-close" variant="ghost" size="icon" aria-label="Close dialog" onClick={() => setModal(null)}><X /></Button><span className="eyebrow">EARTH JUKEBOX</span><h2 id="modal-title">{modal === 'about' ? 'Science, with a soundtrack.' : 'Your listening session'}</h2>{modal === 'about' ? <><p>An independent prototype for the NASA Space Apps challenge. The starting frame is a NASA Blue Marble-derived texture, distributed by the WebGL Earth project.</p><h4>What you are hearing</h4><p>The equatorial pixel at the current longitude is sampled in real time. Its color sets the pitch on a pentatonic scale and controls volume. These are image-color proxies, not measured ocean depth, vegetation indices, ice extent, or changing climate data.</p><h4>Bring the EIC into the mix</h4><p>Upload a PNG, JPEG, or WebP frame from the Earth Information Center. Frames stay on your device. The globe preview wraps the image; sound samples the original frame. No live EIC feed is connected.</p><div className="source-links"><a href="https://earth.gov/" target="_blank" rel="noreferrer">Earth Information Center <ArrowUpRight size={14} /></a><a href="https://github.com/turban/webgl-earth" target="_blank" rel="noreferrer">Image source <ArrowUpRight size={14} /></a></div><p className="small-note">Keyboard-accessible controls, visible pitch and intensity, and reduced-motion support. Sound only starts when you press Play.</p></> : <><label className="settings-label" htmlFor="speed">Playback speed <strong>{speed}×</strong></label><input id="speed" type="range" min=".5" max="2" step=".5" value={speed} onChange={e => setSpeed(Number(e.target.value))} /><p>Slower playback gives each region more time to resonate.</p><Button variant="outline" onClick={() => { setImageUrl(earthAsset.url); setFileName('NASA Blue Marble'); setPosition(0); }}>Restore NASA frame <RotateCcw /></Button></>}</section></div>}
  </div>;
}
