import { usePlayerStore } from '../stores/playerStore';
import { Howl } from 'howler';
import { useCallback, useRef } from 'react';

export function usePlayer() {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    showSubtitles,
    showTranslatedSubtitles,
    currentSubtitle,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setPlaybackRate,
    toggleSubtitles,
    toggleTranslatedSubtitles,
    setCurrentSubtitle,
    reset,
  } = usePlayerStore();

  const howlRef = useRef<Howl | null>(null);

  const loadAudio = useCallback((url: string) => {
    if (howlRef.current) {
      howlRef.current.unload();
    }

    const howl = new Howl({
      src: [url],
      html5: true,
      rate: playbackRate,
      volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onload: () => setDuration(howl.duration()),
    });

    howlRef.current = howl;
  }, [playbackRate, volume, setIsPlaying, setDuration]);

  const play = useCallback(() => {
    howlRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const seek = useCallback((time: number) => {
    howlRef.current?.seek(time);
    setCurrentTime(time);
  }, [setCurrentTime]);

  const changeVolume = useCallback((v: number) => {
    howlRef.current?.volume(v);
    setVolume(v);
  }, [setVolume]);

  const changePlaybackRate = useCallback((rate: number) => {
    howlRef.current?.rate(rate);
    setPlaybackRate(rate);
  }, [setPlaybackRate]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    showSubtitles,
    showTranslatedSubtitles,
    currentSubtitle,
    loadAudio,
    play,
    pause,
    seek,
    changeVolume,
    changePlaybackRate,
    toggleSubtitles,
    toggleTranslatedSubtitles,
    setCurrentSubtitle,
    reset,
  };
}
