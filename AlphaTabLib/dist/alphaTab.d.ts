/**
 * Lists all types of note acceuntations
 */
declare enum AccentuationType {
    /**
     * No accentuation
     */
    None = 0,
    /**
     * Normal accentuation
     */
    Normal = 1,
    /**
     * Heavy accentuation
     */
    Heavy = 2,
    /**
     * Tenuto accentuation
     */
    Tenuto = 3
}

/**
 * Defines all possible accidentals for notes.
 */
declare enum AccidentalType {
    /**
     * No accidental
     */
    None = 0,
    /**
     * Naturalize
     */
    Natural = 1,
    /**
     * Sharp
     */
    Sharp = 2,
    /**
     * Flat
     */
    Flat = 3,
    /**
     * Natural for smear bends
     */
    NaturalQuarterNoteUp = 4,
    /**
     * Sharp for smear bends
     */
    SharpQuarterNoteUp = 5,
    /**
     * Flat for smear bends
     */
    FlatQuarterNoteUp = 6,
    /**
     * Double Sharp, indicated by an 'x'
     */
    DoubleSharp = 7,
    /**
     * Double Flat, indicated by 'bb'
     */
    DoubleFlat = 8
}

/**
 * Represents the information related to the beats actively being played now.
 */
declare class ActiveBeatsChangedEventArgs {
    /**
     * The currently active beats across all tracks and voices.
     */
    activeBeats: Beat[];
    constructor(activeBeats: Beat[]);
}

/**
 * This is the main synthesizer component which can be used to
 * play a {@link MidiFile} via a {@link ISynthOutput}.
 */
declare class AlphaSynth extends AlphaSynthBase {
    /**
     * Initializes a new instance of the {@link AlphaSynth} class.
     * @param output The output to use for playing the generated samples.
     */
    constructor(output: ISynthOutput, bufferTimeInMilliseconds: number);
    /**
     * Creates a new audio exporter, initialized with the given data.
     * @param options The export options to use.
     * The track volume and transposition pitches must lists must be filled with midi channels.
     * @param midi The midi file to use.
     * @param syncPoints The sync points to use
     * @param transpositionPitches The initial transposition pitches to apply.
     * @param transpositionPitches The initial transposition pitches to apply.
     */
    exportAudio(options: AudioExportOptions, midi: MidiFile, syncPoints: BackingTrackSyncPoint[], mainTranspositionPitches: Map<number, number>): IAlphaSynthAudioExporter;
}

/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth. It can be controlled via a JS API.
 * @target web
 */
declare class AlphaSynthAudioWorkletOutput extends AlphaSynthWebAudioOutputBase {
    private _worklet;
    private _bufferTimeInMilliseconds;
    private readonly _settings;
    constructor(settings: Settings);
    open(bufferTimeInMilliseconds: number): void;
    play(): void;
    private handleMessage;
    pause(): void;
    addSamples(f: Float32Array): void;
    resetSamples(): void;
}

/**
 * This is the base class for synthesizer components which can be used to
 * play a {@link MidiFile} via a {@link ISynthOutput}.
 */
declare class AlphaSynthBase implements IAlphaSynth {
    protected sequencer: MidiFileSequencer;
    protected synthesizer: IAudioSampleSynthesizer;
    protected isSoundFontLoaded: boolean;
    private _isMidiLoaded;
    private _tickPosition;
    private _timePosition;
    private _metronomeVolume;
    private _countInVolume;
    protected _playedEventsQueue: Queue<SynthEvent>;
    protected _midiEventsPlayedFilter: Set<MidiEventType>;
    private _notPlayedSamples;
    private _synthStopping;
    private _output;
    get output(): ISynthOutput;
    isReady: boolean;
    get isReadyForPlayback(): boolean;
    state: PlayerState;
    get logLevel(): LogLevel;
    set logLevel(value: LogLevel);
    get masterVolume(): number;
    set masterVolume(value: number);
    protected updateMasterVolume(value: number): void;
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    get countInVolume(): number;
    set countInVolume(value: number);
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    protected updatePlaybackSpeed(value: number): void;
    get tickPosition(): number;
    set tickPosition(value: number);
    get timePosition(): number;
    set timePosition(value: number);
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    get isLooping(): boolean;
    set isLooping(value: boolean);
    destroy(): void;
    /**
     * Initializes a new instance of the {@link AlphaSynthBase} class.
     * @param output The output to use for playing the generated samples.
     */
    constructor(output: ISynthOutput, synthesizer: IAudioSampleSynthesizer, bufferTimeInMilliseconds: number);
    protected onSampleRequest(): void;
    play(): boolean;
    private playInternal;
    pause(): void;
    playPause(): void;
    stop(): void;
    playOneTimeMidiFile(midi: MidiFile): void;
    resetSoundFonts(): void;
    private _loadedSoundFonts;
    loadSoundFont(data: Uint8Array, append: boolean): void;
    private checkReadyForPlayback;
    /**
     * Loads the given midi file for playback.
     * @param midi The midi file to load
     */
    loadMidiFile(midi: MidiFile): void;
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    setChannelTranspositionPitch(channel: number, semitones: number): void;
    setChannelMute(channel: number, mute: boolean): void;
    resetChannelStates(): void;
    setChannelSolo(channel: number, solo: boolean): void;
    setChannelVolume(channel: number, volume: number): void;
    private onSamplesPlayed;
    protected checkForFinish(): void;
    private stopOneTimeMidi;
    protected updateTimePosition(timePosition: number, isSeek: boolean): void;
    readonly ready: IEventEmitter;
    readonly readyForPlayback: IEventEmitter;
    readonly finished: IEventEmitter;
    readonly soundFontLoaded: IEventEmitter;
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
    /* Excluded from this release type: hasSamplesForProgram */
    /* Excluded from this release type: hasSamplesForPercussion */
    loadBackingTrack(_score: Score): void;
    updateSyncPoints(_syncPoints: BackingTrackSyncPoint[]): void;
}

/**
 * This implementation of the {@link IMidiFileHandler}
 * generates a {@link MidiFile} object which can be used in AlphaSynth for playback.
 */
declare class AlphaSynthMidiFileHandler implements IMidiFileHandler {
    private _midiFile;
    private _smf1Mode;
    /**
     * Initializes a new instance of the {@link AlphaSynthMidiFileHandler} class.
     * @param midiFile The midi file.
     * @param smf1Mode Whether to generate a SMF1 compatible midi file. This might break multi note bends.
     */
    constructor(midiFile: MidiFile, smf1Mode?: boolean);
    addTimeSignature(tick: number, timeSignatureNumerator: number, timeSignatureDenominator: number): void;
    addRest(track: number, tick: number, channel: number): void;
    addNote(track: number, start: number, length: number, key: number, velocity: number, channel: number): void;
    private static fixValue;
    addControlChange(track: number, tick: number, channel: number, controller: ControllerType, value: number): void;
    addProgramChange(track: number, tick: number, channel: number, program: number): void;
    addTempo(tick: number, tempo: number): void;
    addBend(track: number, tick: number, channel: number, value: number): void;
    addNoteBend(track: number, tick: number, channel: number, key: number, value: number): void;
    finishTrack(track: number, tick: number): void;
}

/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth using the legacy ScriptProcessor node.
 * @target web
 */
declare class AlphaSynthScriptProcessorOutput extends AlphaSynthWebAudioOutputBase {
    private _audioNode;
    private _circularBuffer;
    private _bufferCount;
    private _requestedBufferCount;
    open(bufferTimeInMilliseconds: number): void;
    play(): void;
    pause(): void;
    addSamples(f: Float32Array): void;
    resetSamples(): void;
    private requestBuffers;
    private _outputBuffer;
    private generateSound;
}

/**
 * @target web
 */
declare abstract class AlphaSynthWebAudioOutputBase implements ISynthOutput {
    protected static readonly BufferSize: number;
    protected static readonly PreferredSampleRate: number;
    protected _context: AudioContext | null;
    protected _buffer: AudioBuffer | null;
    protected _source: AudioBufferSourceNode | null;
    private _resumeHandler?;
    get sampleRate(): number;
    activate(resumedCallback?: () => void): void;
    private patchIosSampleRate;
    open(bufferTimeInMilliseconds: number): void;
    private registerResumeHandler;
    private unregisterResumeHandler;
    play(): void;
    pause(): void;
    destroy(): void;
    abstract addSamples(f: Float32Array): void;
    abstract resetSamples(): void;
    readonly ready: IEventEmitter;
    readonly samplesPlayed: IEventEmitterOfT<number>;
    readonly sampleRequest: IEventEmitter;
    protected onSamplesPlayed(numberOfSamples: number): void;
    protected onSampleRequest(): void;
    protected onReady(): void;
    enumerateOutputDevices(): Promise<ISynthOutputDevice[]>;
    setOutputDevice(device: ISynthOutputDevice | null): Promise<void>;
    getOutputDevice(): Promise<ISynthOutputDevice | null>;
}

/**
 * a WebWorker based alphaSynth which uses the given player as output.
 * @target web
 */
declare class AlphaSynthWebWorkerApi implements IAlphaSynth {
    private _synth;
    private _output;
    private _workerIsReadyForPlayback;
    private _workerIsReady;
    private _outputIsReady;
    private _state;
    private _masterVolume;
    private _metronomeVolume;
    private _countInVolume;
    private _playbackSpeed;
    private _tickPosition;
    private _timePosition;
    private _isLooping;
    private _playbackRange;
    private _midiEventsPlayedFilter;
    get output(): ISynthOutput;
    get isReady(): boolean;
    get isReadyForPlayback(): boolean;
    get state(): PlayerState;
    get logLevel(): LogLevel;
    get worker(): Worker;
    set logLevel(value: LogLevel);
    get masterVolume(): number;
    set masterVolume(value: number);
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    get countInVolume(): number;
    set countInVolume(value: number);
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    get tickPosition(): number;
    set tickPosition(value: number);
    get timePosition(): number;
    set timePosition(value: number);
    get isLooping(): boolean;
    set isLooping(value: boolean);
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    constructor(player: ISynthOutput, settings: Settings);
    destroy(): void;
    play(): boolean;
    pause(): void;
    playPause(): void;
    stop(): void;
    playOneTimeMidiFile(midi: MidiFile): void;
    loadSoundFont(data: Uint8Array, append: boolean): void;
    resetSoundFonts(): void;
    loadMidiFile(midi: MidiFile): void;
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    setChannelTranspositionPitch(channel: number, semitones: number): void;
    setChannelMute(channel: number, mute: boolean): void;
    resetChannelStates(): void;
    setChannelSolo(channel: number, solo: boolean): void;
    setChannelVolume(channel: number, volume: number): void;
    handleWorkerMessage(e: MessageEvent): void;
    private checkReady;
    private checkReadyForPlayback;
    readonly ready: IEventEmitter;
    readonly readyForPlayback: IEventEmitter;
    readonly finished: IEventEmitter;
    readonly soundFontLoaded: IEventEmitter;
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
    onOutputSampleRequest(): void;
    onOutputSamplesPlayed(samples: number): void;
    private onOutputReady;
    loadBackingTrack(_score: Score): void;
    updateSyncPoints(_syncPoints: BackingTrackSyncPoint[]): void;
}

/**
 * @target web
 */
export declare class AlphaTabApi extends AlphaTabApiBase<SettingsJson | Settings> {
    /**
     * Initializes a new instance of the {@link AlphaTabApi} class.
     * @param element The HTML element into which alphaTab should be initialized.
     * @param settings The settings to use.
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'), { display: { scale: 1.2 }});
     * ```
     */
    constructor(element: HTMLElement, options: SettingsJson | Settings);
    /**
     * @inheritdoc
     */
    tex(tex: string, tracks?: number[]): void;
    /**
     * Opens a popup window with the rendered music notation for printing.
     * @param width An optional custom width as CSS width that should be used. Best is to use a CSS width that is suitable for your preferred page size.
     * @param additionalSettings An optional parameter to specify additional setting values which should be respected during printing ({@since 1.2.0})
     * @remarks
     * Opens a popup window with the rendered music notation for printing. The default display of alphaTab in the browser is not very
     * suitable for printing. The items are lazy loaded, the width can be dynamic, and the scale might be better suitable for screens.
     * This function opens a popup window which is filled with a by-default A4 optimized view of the rendered score:
     *
     * * Lazy loading is disabled
     * * The scale is reduced to 0.8
     * * The stretch force is reduced to 0.8
     * * The width is optimized to A4. Portrait if the page-layout is used, landscape if the horizontal-layout is used.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.print();
     * api.print(undefined, { display: { barsPerRow: 5 } });
     * ```
     */
    print(width?: string, additionalSettings?: unknown): void;
    /**
     * Generates an SMF1.0 file and downloads it
     * @remarks
     * Generates a SMF1.0 compliant MIDI file of the currently loaded song and starts the download of it.
     * Please be aware that SMF1.0 does not support bends per note which might result in wrong bend effects
     * in case multiple bends are applied on the same beat (e.g. two notes bending or vibrato + bends).
     *
     * @category Methods - Core
     * @since 1.3.0
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.downloadMidi();
     * ```
     */
    downloadMidi(format?: MidiFileFormat): void;
    /**
     * @inheritdoc
     */
    changeTrackMute(tracks: Track[], mute: boolean): void;
    /**
     * @inheritdoc
     */
    changeTrackSolo(tracks: Track[], solo: boolean): void;
    /**
     * @inheritdoc
     */
    changeTrackVolume(tracks: Track[], volume: number): void;
    private trackIndexesToTracks;
    /**
     * This event is fired when the SoundFont is being loaded.
     * @remarks
     * This event is fired when the SoundFont is being loaded and reports the progress accordingly.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.soundFontLoad.on((e) => {
     *     updateProgress(e.loaded, e.total);
     * });
     * ```
     */
    soundFontLoad: IEventEmitterOfT<ProgressEventArgs>;
    /**
     * Triggers a load of the soundfont from the given URL.
     * @param url The URL from which to load the soundfont
     * @param append Whether to fully replace or append the data from the given soundfont.
     * @category Methods - Player
     * @since 0.9.4
     */
    loadSoundFontFromUrl(url: string, append: boolean): void;
}

/**
 * This class represents the public API of alphaTab and provides all logic to display
 * a music sheet in any UI using the given {@link IUiFacade}
 * @param <TSettings> The UI object holding the settings.
 * @csharp_public
 */
export declare class AlphaTabApiBase<TSettings> {
    private _startTime;
    private _trackIndexes;
    private _trackIndexLookup;
    private _isDestroyed;
    private _score;
    private _tracks;
    private _actualPlayerMode;
    private _player;
    private _renderer;
    /**
     * The actual player mode which is currently active.
     * @remarks
     * Allows determining whether a backing track or the synthesizer is active in case automatic detection is enabled.
     * @category Properties - Player
     * @since 1.6.0
     */
    get actualPlayerMode(): PlayerMode;
    /**
     * The UI facade used for interacting with the user interface (like the browser).
     * @remarks
     * The implementation depends on the platform alphaTab is running in (e.g. the web version in the browser, WPF in .net etc.)
     * @category Properties - Core
     * @since 0.9.4
     */
    readonly uiFacade: IUiFacade<TSettings>;
    /**
     * The UI container that holds the whole alphaTab control.
     * @remarks
     * Gets the UI container that represents the element on which alphaTab was initialized. Note that this is not the raw instance, but a UI framework specific wrapper for alphaTab.
     * @category Properties - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * const container = api.container;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * var container = api.Container;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * val container = api.container;
     * ```
     */
    readonly container: IContainer;
    /**
     * The score renderer used for rendering the music sheet.
     * @remarks
     * This is the low-level API responsible for the actual rendering engine.
     * Gets access to the underling {@link IScoreRenderer} that is used for the rendering.
     *
     * @category Properties - Core
     * @since 0.9.4
     */
    get renderer(): IScoreRenderer;
    /**
     * The score holding all information about the song being rendered
     * @category Properties - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * updateScoreInfo(api.score);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * UpdateScoreInfo(api.Score);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * updateScoreInfo(api.score)
     * ```
     */
    get score(): Score | null;
    /**
     * The settings that are used for rendering the music notation.
     * @remarks
     * Gets access to the underling {@link Settings} object that is currently used by alphaTab.
     *
     * @category Properties - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * showSettingsModal(api.settings);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * ShowSettingsDialog(api.Settings);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * showSettingsDialog(api.settings)
     * ```
     */
    settings: Settings;
    /**
     * The list of the tracks that are currently rendered.
     *
     * @category Properties - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * highlightCurrentTracksInTrackSelector(api.tracks);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * HighlightCurrentTracksInTrackSelector(api.Tracks);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * highlightCurrentTracksInTrackSelector(api.tracks)
     * ```
     */
    get tracks(): Track[];
    /**
     * The UI container that will hold all rendered results.
     * @since 0.9.4
     * @category Properties - Core
     */
    readonly canvasElement: IContainer;
    /**
     * Initializes a new instance of the {@link AlphaTabApiBase} class.
     * @param uiFacade The UI facade to use for interacting with the user interface.
     * @param settings The UI settings object to use for loading the settings.
     */
    constructor(uiFacade: IUiFacade<TSettings>, settings: TSettings);
    private setupPlayerWrapper;
    /**
     * Destroys the alphaTab control and restores the initial state of the UI.
     * @remarks
     * This function destroys the alphaTab control and tries to restore the initial state of the UI. This might be useful if
     * our website is quite dynamic and you need to uninitialize alphaTab from an element again. After destroying alphaTab
     * it cannot be used anymore. Any further usage leads to unexpected behavior.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.destroy();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Destroy();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.destroy()
     * ```
     */
    destroy(): void;
    /**
     * Applies any changes that were done to the settings object.
     * @remarks
     * It also informs the {@link renderer} about any new values to consider.
     * By default alphaTab will not trigger any re-rendering or settings update just if the settings object itself was changed. This method must be called
     * to trigger an update of the settings in all components. Then a re-rendering can be initiated using the {@link render} method.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.settings.display.scale = 2.0;
     * api.updateSettings();
     * api.render();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     *
     * api.Settings.Display.Scale = 2.0;
     * api.UpdateSettings();
     * api.Render()
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     *
     * api.settings.display.scale = 2.0
     * api.updateSettings()
     * api.render()
     * ```
     */
    updateSettings(): void;
    private updateRenderer;
    /**
     * Initiates a load of the score using the given data.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     * @param scoreData The data container supported by {@link IUiFacade}.  The supported types is depending on the platform:
     *
     * * A `alphaTab.model.Score` instance (all platforms)
     * * A `ArrayBuffer` or `Uint8Array` containing one of the supported file formats (all platforms, native byte array or input streams on other platforms)
     * * A url from where to download the binary data of one of the supported file formats (browser only)
     *
     * @param trackIndexes The indexes of the tracks from the song that should be rendered. If not provided, the first track of the
     * song will be shown.
     * @category Methods - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.load('/assets/MyFile.gp');
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Load(System.IO.File.OpenRead("MyFile.gp"));
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * contentResolver.openInputStream(uri).use {
     *     api.load(it)
     * }
     * ```
     */
    load(scoreData: unknown, trackIndexes?: number[]): boolean;
    /**
     * Initiates a rendering of the given score.
     * @param score The score containing the tracks to be rendered.
     * @param trackIndexes The indexes of the tracks from the song that should be rendered. If not provided, the first track of the
     * song will be shown.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.RenderScore(generateScore(),[ 2, 3 ]);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.RenderScore(GenerateScore(), new double[] { 2, 3 });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.renderScore(generateScore(), alphaTab.collections.DoubleList(2, 3));
     * ```
     */
    renderScore(score: Score, trackIndexes?: number[]): void;
    /**
     * Renders the given list of tracks.
     * @param tracks The tracks to render. They must all belong to the same score.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.renderTracks([api.score.tracks[0], api.score.tracks[1]]);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.RenderTracks(new []{
     *     api.Score.Tracks[2],
     *     api.Score.Tracks[3]
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.renderTracks(alphaTab.collections.List(
     *     api.score.tracks[2],
     *     api.score.tracks[3]
     * }
     * ```
     */
    renderTracks(tracks: Track[]): void;
    private internalRenderTracks;
    /* Excluded from this release type: triggerResize */
    private appendRenderResult;
    private updateRenderResult;
    /**
     * Tells alphaTab to render the given alphaTex.
     * @param tex The alphaTex code to render.
     * @param tracks If set, the given tracks will be rendered, otherwise the first track only will be rendered.
     * @category Methods - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.tex("\\title 'Test' . 3.3.4");
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Tex("\\title 'Test' . 3.3.4");
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.tex("\\title 'Test' . 3.3.4");
     * ```
     */
    tex(tex: string, tracks?: number[]): void;
    /**
     * Triggers a load of the soundfont from the given data.
     * @remarks
     * AlphaTab only supports SoundFont2 and SoundFont3 {@since 1.4.0} encoded soundfonts for loading. To load a soundfont the player must be enabled in advance.
     *
     * @param data The data object to decode. The supported data types is depending on the platform.
     *
     * * A `ArrayBuffer` or `Uint8Array` (all platforms, native byte array or input streams on other platforms)
     * * A url from where to download the binary data of one of the supported file formats (browser only)
     *
     * @param append Whether to fully replace or append the data from the given soundfont.
     * @returns `true` if the passed in object is a supported format and loading was initiated, otherwise `false`.
     *
     * @category Methods - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.loadSoundFont('/assets/MyFile.sf2');
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.LoadSoundFont(System.IO.File.OpenRead("MyFile.sf2"));
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * contentResolver.openInputStream(uri).use {
     *     api.loadSoundFont(it)
     * }
     * ```
     */
    loadSoundFont(data: unknown, append?: boolean): boolean;
    /**
     * Unloads all presets from previously loaded SoundFonts.
     * @remarks
     * This function resets the player internally to not have any SoundFont loaded anymore. This allows you to reduce the memory usage of the page
     * if multiple partial SoundFonts are loaded via `loadSoundFont(..., true)`. Depending on the workflow you might also just want to use `loadSoundFont(..., false)` once
     * instead of unloading the previous SoundFonts.
     *
     * @category Methods - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.loadSoundFont('/assets/guitars.sf2', true);
     * api.loadSoundFont('/assets/pianos.sf2', true);
     * // ..
     * api.resetSoundFonts();
     * api.loadSoundFont('/assets/synths.sf2', true);
     * ```
     *
     * @example
     * C#
     * ```cs
     *var api = new AlphaTabApi<MyControl>(...);
     *api.LoadSoundFont(System.IO.File.OpenRead("guitars.sf2"), true);
     *api.LoadSoundFont(System.IO.File.OpenRead("pianos.sf2"), true);
     *...
     *api.ResetSoundFonts();
     *api.LoadSoundFont(System.IO.File.OpenRead("synths.sf2"), true);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.loadSoundFont(readResource("guitars.sf2"), true)
     * api.loadSoundFont(readResource("pianos.sf2"), true)
     * ...
     * api.resetSoundFonts()
     * api.loadSoundFont(readResource("synths.sf2"), true)
     * ```
     */
    resetSoundFonts(): void;
    /**
     * Initiates a re-rendering of the current setup.
     * @remarks
     * If rendering is not yet possible, it will be deferred until the UI changes to be ready for rendering.
     *
     * @category Methods - Core
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.render();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Render();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.render()
     * ```
     */
    render(): void;
    private _tickCache;
    /**
     * The tick cache allowing lookup of midi ticks to beats.
     * @remarks
     * Gets the tick cache allowing lookup of midi ticks to beats. If the player is enabled, a midi file will be generated
     * for the loaded {@link Score} for later playback. During this generation this tick cache is filled with the
     * exact midi ticks when beats are played.
     *
     * The {@link MidiTickLookup.findBeat} method allows a lookup of the beat related to a given input midi tick.
     *
     * @category Properties - Player
     * @since 1.2.3
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * const lookupResult = api.tickCache.findBeat(new Set([0, 1]), 100);
     * const currentBeat = lookupResult?.currentBeat;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * var lookupResult = api.TickCache.FindBeat(new AlphaTab.Core.EcmaScript.Set(0, 1), 100);
     * var currentBeat = lookupResult?.CurrentBeat;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * val lookupResult = api.tickCache.findBeat(alphaTab.core.ecmaScript.Set(0, 1), 100);
     * val currentBeat = lookupResult?.CurrentBeat;
     * ```
     */
    get tickCache(): MidiTickLookup | null;
    /**
     * The tick cache allowing lookup of midi ticks to beats.
     * @remarks
     * In older versions of alphaTab you can access the `boundsLookup` via {@link IScoreRenderer.boundsLookup} on {@link renderer}.
     *
     * After the rendering completed alphaTab exposes via this lookup the location of the individual
     * notation elements. The lookup provides fast access to the bars and beats at a given location.
     * If the {@link CoreSettings.includeNoteBounds} option was activated also the location of the individual notes can be obtained.
     *
     * The property contains a `BoundsLookup` instance which follows a hierarchical structure that represents
     * the tree of rendered elements.
     *
     * The hierarchy is: `staffSystems > bars(1) > bars(2) > beats > notes`
     *
     * * `staffSystems` - Represent the bounds of the individual systems ("rows") where staves are contained.
     * * `bars(1)` - Represent the bounds of all bars for a particular master bar across all tracks.
     * * `bars(2)` - Represent the bounds of an individual bar of a track. The bounds on y-axis span the region of the staff and notes might exceed this bounds.
     * * `beats` - Represent the bounds of the individual beats within a track. The bounds on y-axis are equal to the bar bounds.
     * * `notes` - Represent the bounds of the individual note heads/numbers within a track.
     *
     * Each bounds hierarchy have a `visualBounds` and `realBounds`.
     *
     * * `visualBounds` - Represent the area covering all visually visible elements
     * * `realBounds` - Represents the actual bounds of the elements in this beat including whitespace areas.
     * * `noteHeadBounds` (only on `notes` level) - Represents the area of the note heads or number based on the staff
     *
     * You can check out the individual sizes and regions.
     * @category Properties - Core
     * @since 1.5.0
     */
    get boundsLookup(): BoundsLookup | null;
    /**
     * The alphaSynth player used for playback.
     * @remarks
     * This is the low-level API to the Midi synthesizer used for playback.
     * Gets access to the underling {@link IAlphaSynth} that is used for the audio playback.
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * setupPlayerEvents(api.settings);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * SetupPlayerEvents(api.Player);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * setupPlayerEvents(api.player)
     * ```
     */
    get player(): IAlphaSynth | null;
    /**
     * Whether the player is ready for starting the playback.
     * @remarks
     * Gets whether the synthesizer is ready for playback. The player is ready for playback when
     * all background workers are started, the audio output is initialized, a soundfont is loaded, and a song was loaded into the player as midi file.
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * if(api.isReadyForPlayback)) api.play();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * if(api.IsReadyForPlayback) api.Play();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * if (api.isReadyForPlayback) api.play()
     * ```
     */
    get isReadyForPlayback(): boolean;
    /**
     * The current player state.
     * @remarks
     * Gets the current player state, meaning whether it is paused or playing.
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * if(api.playerState != alphaTab.synth.PlayerState.Playing) api.play();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * if(api.PlayerState != PlayerState.Playing) api.Play();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * if (api.playerState != PlayerState.Playing) api.play()
     * ```
     */
    get playerState(): PlayerState;
    /**
     * The current master volume as percentage (0-1).
     * @remarks
     * Gets or sets the master volume of the overall audio being played. The volume is annotated in percentage where 1.0 would be the normal volume and 0.5 only 50%.
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.masterVolume = 0.5;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MasterVolume = 0.5;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.masterVolume = 0.5
     * ```
     */
    get masterVolume(): number;
    set masterVolume(value: number);
    /**
     * The metronome volume as percentage (0-1).
     * @remarks
     * Gets or sets the volume of the metronome. By default the metronome is disabled but can be enabled by setting the volume different.
     * @category Properties - Player
     * @defaultValue `0`
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.metronomeVolume = 0.5;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MetronomeVolume = 0.5;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.metronomeVolume = 0.5
     * ```
     */
    get metronomeVolume(): number;
    set metronomeVolume(value: number);
    /**
     * The volume of the count-in metronome ticks.
     * @remarks
     * Gets or sets the volume of the metronome during the count-in of the song. By default the count-in is disabled but can be enabled by setting the volume different.
     * @category Properties - Player
     * @since 1.1.0
     * @defaultValue `0`
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.countInVolume = 0.5;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.CountInVolume = 0.5;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.countInVolume = 0.5
     * ```
     */
    get countInVolume(): number;
    set countInVolume(value: number);
    /**
     * The midi events which will trigger the `midiEventsPlayed` event
     * @remarks
     * Gets or sets the midi events which will trigger the `midiEventsPlayed` event. With this filter set you can enable
     * that alphaTab will signal any midi events as they are played by the synthesizer. This allows reacing on various low level
     * audio playback elements like notes/rests played or metronome ticks.
     *
     * Refer to the [related guide](https://alphatab.net/docs/guides/handling-midi-events) to learn more about this feature.
     * @defaultValue `[]`
     * @category Properties - Player
     * @since 1.2.0
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.midiEventsPlayedFilter = [alphaTab.midi.MidiEventType.AlphaTabMetronome];
     * api.midiEventsPlayed.on(function(e) {
     *   for(const midi of e.events) {
     *     if(midi.isMetronome) {
     *       console.log('Metronome tick ' + midi.metronomeNumerator);
     *     }
     *   }
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MidiEventsPlayedFilter = new MidiEventType[] { AlphaTab.Midi.MidiEventType.AlphaTabMetronome };
     * api.MidiEventsPlayed.On(e =>
     * {
     *   foreach(var midi of e.events)
     *   {
     *     if(midi is AlphaTab.Midi.AlphaTabMetronomeEvent metronome)
     *     {
     *       Console.WriteLine("Metronome tick " + metronome.MetronomeNumerator);
     *     }
     *   }
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...);
     * api.midiEventsPlayedFilter = alphaTab.collections.List<alphaTab.midi.MidiEventType>( alphaTab.midi.MidiEventType.AlphaTabMetronome )
     * api.midiEventsPlayed.on { e ->
     *   for (midi in e.events) {
     *     if(midi instanceof alphaTab.midi.AlphaTabMetronomeEvent && midi.isMetronome) {
     *       println("Metronome tick " + midi.tick);
     *     }
     *   }
     * }
     * ```
     */
    get midiEventsPlayedFilter(): MidiEventType[];
    set midiEventsPlayedFilter(value: MidiEventType[]);
    /**
     * The position within the song in midi ticks.
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.tickPosition = 4000;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.TickPosition = 4000;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.tickPosition = 4000
     * ```
     */
    get tickPosition(): number;
    set tickPosition(value: number);
    /**
     * The position within the song in milliseconds
     * @category Properties - Player
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.timePosition = 4000;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.TimePosition = 4000;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.timePosition = 4000
     * ```
     */
    get timePosition(): number;
    set timePosition(value: number);
    /**
     * The range of the song that should be played.
     * @remarks
     * Gets or sets the range of the song that should be played. The range is defined in midi ticks or the whole song is played if the range is set to null
     * @category Properties - Player
     * @defaultValue `null`
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playbackRange = { startTick: 1000, endTick: 50000 };
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlaybackRange = new PlaybackRange { StartTick = 1000, EndTick = 50000 };
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playbackRange = PlaybackRange.apply {
     *     startTick = 1000
     *     endTick = 50000
     * }
     * ```
     */
    get playbackRange(): PlaybackRange | null;
    set playbackRange(value: PlaybackRange | null);
    /**
     * The current playback speed as percentage
     * @remarks
     * Controls the current playback speed as percentual value. Normal speed is 1.0 (100%) and 0.5 would be 50%.
     * @category Properties - Player
     * @defaultValue `1`
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playbackSpeed = 0.5;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlaybackSpeed = 0.5;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playbackSpeed = 0.5
     * ```
     */
    get playbackSpeed(): number;
    set playbackSpeed(value: number);
    /**
     * Whether the playback should automatically restart after it finished.
     * @remarks
     * This setting controls whether the playback should automatically restart after it finished to create a playback loop.
     * @category Properties - Player
     * @defaultValue `false`
     * @since 0.9.4
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.isLooping = true;
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.IsLooping = true;
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.isLooping = true
     * ```
     */
    get isLooping(): boolean;
    set isLooping(value: boolean);
    private destroyPlayer;
    /**
     *
     * @returns true if a new player was created, false if no player was created (includes destroy & reuse of the current one)
     */
    private setupOrDestroyPlayer;
    /**
     * Re-creates the midi for the current score and loads it.
     * @remarks
     * This will result in the player to stop playback. Some setting changes require re-genration of the midi song.
     * @category Methods - Player
     * @since 1.6.0
     */
    loadMidiForScore(): void;
    /**
     * Triggers an update of the sync points for the current score after modification within the data model
     * @category Methods - Player
     * @since 1.6.0
     */
    updateSyncPoints(): void;
    /**
     * Changes the volume of the given tracks.
     * @param tracks The tracks for which the volume should be changed.
     * @param volume The volume to set for all tracks in percent (0-1)
     *
     * @remarks
     * This will result in a volume change of the primary and secondary midi channel that the track uses for playback.
     * If the track shares the channels with another track, all related tracks will be changed as they cannot be distinguished.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.changeTrackVolume([api.score.tracks[0], api.score.tracks[1]], 1.5);
     * api.changeTrackVolume([api.score.tracks[2]], 0.5);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ChangeTrackVolume(new Track[] { api.Score.Tracks[0], api.Score.Tracks[1] }, 1.5);
     * api.ChangeTrackVolume(new Track[] { api.Score.Tracks[2] }, 0.5);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...);
     * api.changeTrackVolume(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[0], api.score.tracks[1]), 1.5);
     * api.changeTrackVolume(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[2]), 0.5);
     * ```
     */
    changeTrackVolume(tracks: Track[], volume: number): void;
    /**
     * Changes the given tracks to be played solo or not.
     * @param tracks The list of tracks to play solo or not.
     * @param solo If set to true, the tracks will be added to the solo list. If false, they are removed.
     *
     * @remarks
     * If any track is set to solo, all other tracks are muted, unless they are also flagged as solo.
     * This will result in a solo playback of the primary and secondary midi channel that the track uses for playback.
     * If the track shares the channels with another track, all related tracks will be played as they cannot be distinguished.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.changeTrackSolo([api.score.tracks[0], api.score.tracks[1]], true);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ChangeTrackSolo(new Track[] { api.Score.Tracks[0], api.Score.Tracks[1] }, true);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.changeTrackSolo(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[0], api.score.tracks[1]), true);
     * ```
     */
    changeTrackSolo(tracks: Track[], solo: boolean): void;
    /**
     * Changes the given tracks to be muted or not.
     * @param tracks The list of track to mute or unmute.
     * @param mute If set to true, the tracks will be muted. If false they are unmuted.
     *
     * @remarks
     * This will result in a muting of the primary and secondary midi channel that the track uses
     * for playback. If the track shares the channels with another track, all tracks will be muted as during playback they cannot be distinguished.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.changeTrackMute([api.score.tracks[0], api.score.tracks[1]], true);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ChangeTrackMute(new Track[] { api.Score.Tracks[0], api.Score.Tracks[1] }, true);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.changeTrackMute(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[0], api.score.tracks[1]), true);
     * ```
     */
    changeTrackMute(tracks: Track[], mute: boolean): void;
    /**
     * Changes the pitch transpose applied to the given tracks.
     * @param tracks The list of tracks to change.
     * @param semitones The number of semitones to apply as pitch offset.
     *
     * @remarks
     * These pitches are additional to the ones applied to the song via the settings and data model and allows a more live-update via a UI.
     * @category Methods - Player
     * @since 1.4.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.changeTrackTranspositionPitch([api.score.tracks[0], api.score.tracks[1]], 3);
     * api.changeTrackTranspositionPitch([api.score.tracks[2]], 2);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ChangeTrackTranspositionPitch(new Track[] { api.Score.Tracks[0], api.Score.Tracks[1] }, 3);
     * api.ChangeTrackTranspositionPitch(new Track[] { api.Score.Tracks[2] }, 3);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...);
     * api.changeTrackTranspositionPitch(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[0], api.score.tracks[1]), 3);
     * api.changeTrackTranspositionPitch(alphaTab.collections.List<alphaTab.model.Track>(api.score.tracks[2]), 2);
     * ```
     */
    changeTrackTranspositionPitch(tracks: Track[], semitones: number): void;
    /**
     * Starts the playback of the current song.
     * @returns true if the playback was started, otherwise false. Reasons for not starting can be that the player is not ready or already playing.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.play();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Play();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.play()
     * ```
     */
    play(): boolean;
    /**
     * Pauses the playback of the current song.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.pause();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Pause();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.pause();
     * ```
     */
    pause(): void;
    /**
     * Toggles between play/pause depending on the current player state.
     * @remarks
     * If the player was playing, it will pause. If it is paused, it will initiate a play.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playPause();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayPause();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playPause()
     * ```
     */
    playPause(): void;
    /**
     * Stops the playback of the current song, and moves the playback position back to the start.
     * @remarks
     * If a dedicated playback range is selected, it will move the playback position to the start of this range, not the whole song.
     * @category Methods - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.stop();
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Stop();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.stop()
     * ```
     */
    stop(): void;
    /**
     * Triggers the play of the given beat.
     * @param beat the single beat to play
     * @remarks
     * This will stop the any other current ongoing playback.
     * This method can be used in applications when individual beats need to be played for lesson or editor style purposes.
     * The player will not report any change in state or playback position during the playback of the requested beat.
     * It is a playback of audio separate to the main song playback.
     * @returns true if the playback was started, otherwise false. Reasons for not starting can be that the player is not ready or already playing.
     * @category Methods - Player
     * @since 1.1.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playBeat(api.score.tracks[0].staves[0].bars[0].voices[0].beats[0]);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayBeat(api.Score.Tracks[0].Staves[0].Bars[0].Voices[0].Beats[0]);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playBeat(api.score.tracks[0].staves[0].bars[0].voices[0].beats[0])
     * ```
     */
    playBeat(beat: Beat): void;
    /**
     * Triggers the play of the given note.
     * @param note the single note to play
     * @remarks
     * This will stop the any other current ongoing playback.
     * This method can be used in applications when individual notes need to be played for lesson or editor style purposes.
     * The player will not report any change in state or playback position during the playback of the requested note.
     * It is a playback of audio separate to the main song playback.
     * @category Methods - Player
     * @since 1.1.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playNote(api.score.tracks[0].staves[0].bars[0].voices[0].beats[0].notes[0]);
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayNote(api.Score.Tracks[0].Staves[0].Bars[0].Voices[0].Beats[0].Notes[0]);
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playNote(api.score.tracks[0].staves[0].bars[0].voices[0].beats[0].notes[0]);
     * ```
     */
    playNote(note: Note): void;
    private _cursorWrapper;
    private _barCursor;
    private _beatCursor;
    private _selectionWrapper;
    private _previousTick;
    private _currentBeat;
    private _currentBeatBounds;
    private _isInitialBeatCursorUpdate;
    private _previousStateForCursor;
    private _previousCursorCache;
    private _lastScroll;
    private destroyCursors;
    private updateCursors;
    /**
     * updates the cursors to highlight the beat at the specified tick position
     * @param tick
     * @param stop
     * @param shouldScroll whether we should scroll to the bar (if scrolling is active)
     */
    private cursorUpdateTick;
    /**
     * updates the cursors to highlight the specified beat
     */
    private cursorUpdateBeat;
    /**
     * Initiates a scroll to the cursor.
     * @since 1.2.3
     * @category Methods - Player
     */
    scrollToCursor(): void;
    private internalScrollToCursor;
    private internalCursorUpdateBeat;
    /**
     * This event is fired when the played beat changed.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playedBeatChanged.on((beat) => {
     *     updateFretboard(beat);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayedBeatChanged.On(beat =>
     * {
     *     UpdateFretboard(beat);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playedBeatChanged.on { beat ->
     *     updateFretboard(beat)
     * }
     * ```
     *
     */
    playedBeatChanged: IEventEmitterOfT<Beat>;
    private onPlayedBeatChanged;
    /**
     * This event is fired when the currently active beats across all tracks change.
     *
     * @remarks
     * Unlike the {@link playedBeatChanged} event this event contains the beats of all tracks and voices independent of them being rendered.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.3
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.activeBeatsChanged.on(args => {
     *    updateHighlights(args.activeBeats);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ActiveBeatsChanged.On(args =>
     * {
     *     UpdateHighlights(args.ActiveBeats);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.activeBeatsChanged.on { args ->
     *     updateHighlights(args.activeBeats)
     * }
     * ```
     *
     */
    activeBeatsChanged: IEventEmitterOfT<ActiveBeatsChangedEventArgs>;
    private onActiveBeatsChanged;
    private _beatMouseDown;
    private _noteMouseDown;
    private _selectionStart;
    private _selectionEnd;
    /**
     * This event is fired whenever a the user presses the mouse button on a beat.
     * @eventProperty
     * @category Events - Player
     * @since 0.9.7
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.beatMouseDown.on((beat) => {
     *     startSelectionOnBeat(beat);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.BeatMouseDown.On(beat =>
     * {
     *     StartSelectionOnBeat(args);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.beatMouseDown.on { beat ->
     *     startSelectionOnBeat(args)
     * }
     * ```
     */
    beatMouseDown: IEventEmitterOfT<Beat>;
    /**
     * This event is fired whenever the user moves the mouse over a beat after the user already pressed the button on a beat.
     * @eventProperty
     * @category Events - Player
     * @since 0.9.7
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.beatMouseMove.on((beat) => {
     *     expandSelectionToBeat(beat);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.BeatMouseMove.On(beat =>
     * {
     *     ExpandSelectionToBeat(beat);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.beatMouseMove.on { beat ->
     *     expandSelectionToBeat(beat)
     * }
     * ```
     */
    beatMouseMove: IEventEmitterOfT<Beat>;
    /**
     * This event is fired whenever the user releases the mouse after a mouse press on a beat.
     * @remarks
     * This event is fired regardless of whether the mouse was released on a beat.
     * The parameter is null if the mouse was released somewhere beside the beat.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.7
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.beatMouseUp.on((beat) => {
     *     hideSelection(beat);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.BeatMouseUp.On(beat =>
     * {
     *     HideSelection(beat);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.beatMouseUp.on { beat ->
     *     hideSelection(beat)
     * }
     * ```
     */
    beatMouseUp: IEventEmitterOfT<Beat | null>;
    /**
     * This event is fired whenever a the user presses the mouse button on a note head/number.
     * @remarks
     * This event is fired whenever a the user presses the mouse button on a note.
     * It is only fired if {@link CoreSettings.includeNoteBounds} was set to `true` because
     * only then this hit detection can be done. A click on a note is considered if the note head or the note number on tabs are clicked as documented in {@link boundsLookup}.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.3
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.noteMouseDown.on((note) => {
     *     api.playNote(note);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.NoteMouseDown.On(note =>
     * {
     *     api.PlayNote(note);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.noteMouseDown.on { note ->
     *     api.playNote(note)
     * }
     * ```
     *
     */
    noteMouseDown: IEventEmitterOfT<Note>;
    /**
     * This event is fired whenever the user moves the mouse over a note after the user already pressed the button on a note.
     * @remarks
     * This event is fired whenever the user moves the mouse over a note after the user already pressed the button on a note.
     * It is only fired if {@link CoreSettings.includeNoteBounds} was set to `true` because
     * only then this hit detection can be done. A click on a note is considered if the note head or the note number on tabs are clicked as documented in {@link boundsLookup}
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.3
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.noteMouseMove.on((note) => {
     *     changeNote(note)
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.NoteMouseMove.On(note =>
     * {
     *     ChangeNote(note);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.noteMouseMove.on { note ->
     *     changeNote(note)
     * }
     * ```
     *
     */
    noteMouseMove: IEventEmitterOfT<Note>;
    /**
     * This event is fired whenever the user releases the mouse after a mouse press on a note.
     * @remarks
     * This event is fired whenever a the user presses the mouse button on a note.
     * This event is fired regardless of whether the mouse was released on a note.
     * The parameter is null if the mouse was released somewhere beside the note.
     * It is only fired if {@link CoreSettings.includeNoteBounds} was set to `true` because
     * only then this hit detection can be done. A click on a note is considered if the note head or the note number on tabs are clicked as documented in the {@link boundsLookup}.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.3
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.noteMouseUp.on((note) => {
     *     api.playNote(note);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.NoteMouseUp.On(note =>
     * {
     *     api.PlayNote(note);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.noteMouseUp.on { note ->
     *     api.playNote(note)
     * }
     * ```
     *
     */
    noteMouseUp: IEventEmitterOfT<Note | null>;
    private get hasCursor();
    private onBeatMouseDown;
    private onNoteMouseDown;
    private onBeatMouseMove;
    private onNoteMouseMove;
    private onBeatMouseUp;
    private onNoteMouseUp;
    private updateSelectionCursor;
    private setupClickHandling;
    private cursorSelectRange;
    /**
     * This event is fired whenever a new song is loaded.
     * @remarks
     * This event is fired whenever a new song is loaded or changing due to {@link renderScore} or {@link renderTracks} calls.
     * It is fired after the transposition midi pitches from the settings were applied, but before any midi is generated or rendering is started.
     * This allows any modification of the score before further processing.
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.scoreLoaded.on((score) => {
     *     updateSongInformationInUi(score);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.ScoreLoaded.On(score =>
     * {
     *     UpdateSongInformationInUi(score);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.scoreLoaded.on { score ->
     *     updateSongInformationInUi(score)
     * }
     * ```
     *
     */
    scoreLoaded: IEventEmitterOfT<Score>;
    private onScoreLoaded;
    /**
     * This event is fired when alphaTab was resized and is about to rerender the music notation.
     * @remarks
     * This event is fired when alphaTab was resized and is about to rerender the music notation. Before the re-rendering on resize
     * the settings will be updated in the related components. This means that any changes to the layout options or other display settings are
     * considered. This allows to implement scenarios where maybe the scale or the layout mode dynamically changes along the resizing.
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.resize.on((args) => {
     *     args.settings.scale = args.newWidth > 1300
     *         ? 1.5
     *         : (args.newWidth > 800) ? 1.3 : 1;
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Resize.On(args =>
     * {
     *     args.Settings.Display.Scale = args.NewWidth > 1300
     *         ? 1.5
     *         : (args.NewWidth > 800) ? 1.3 : 1;
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.resize.on { args ->
     *     args.settings.display.scale = args.newWidth > 1300
     *         ? 1.5
     *         : (args.newWidth > 800) ? 1.3 : 1;
     * });
     * ```
     *
     */
    resize: IEventEmitterOfT<ResizeEventArgs>;
    private onResize;
    /**
     * This event is fired when the rendering of the whole music sheet is starting.
     * @remarks
     * All preparations are completed and the layout and render sequence is about to start.
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.renderStarted.on(() => {
     *     updateProgressBar("Rendering");
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.RenderStarted.On(resized =>
     * {
     *     UpdateProgressBar("Rendering");
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.renderStarted.on { resized ->
     *     updateProgressBar("Rendering");
     * }
     * ```
     *
     */
    renderStarted: IEventEmitterOfT<boolean>;
    private onRenderStarted;
    /**
     * This event is fired when the rendering of the whole music sheet is finished.
     * @remarks
     * This event is fired when the rendering of the whole music sheet is finished from the render engine side. There might be still tasks open for
     * the display component to visually display the rendered components when this event is notified (e.g. resizing of DOM elements are done).
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.renderFinished.on(() => {
     *     updateProgressBar("Finishing");
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.RenderFinished.On(() =>
     * {
     *     UpdateProgressBar("Finishing");
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.renderFinished.on {
     *     updateProgressBar("Finishing")
     * }
     * ```
     *
     */
    renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    private onRenderFinished;
    /**
     * This event is fired when the rendering of the whole music sheet is finished, and all handlers of `renderFinished` ran.
     * @remarks
     * If {@link CoreSettings.enableLazyLoading} is enabled not all partial images of the music sheet might be rendered.
     * In this case the `renderFinished` event rather represents that the whole music sheet has been layouted and arranged
     * and every partial image can be requested for rendering. If you neeed more fine-grained access
     * to the actual layouting and rendering progress, you need to look at the low-level apis {@link IScoreRenderer.partialLayoutFinished} and
     * {@link IScoreRenderer.partialRenderFinished} accessible via {@link renderer}.
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.postRenderFinished.on(() => {
     *     hideLoadingIndicator();
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PostRenderFinished.On(() =>
     * {
     *     HideLoadingIndicator();
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.postRenderFinished.on {
     *     hideLoadingIndicator();
     * }
     * ```
     *
     */
    postRenderFinished: IEventEmitter;
    private onPostRenderFinished;
    /**
     * This event is fired when an error within alphatab occurred.
     *
     * @remarks
     * This event is fired when an error within alphatab occurred. Use this event as global error handler to show errors
     * to end-users. Due to the asynchronous nature of alphaTab, no call to the API will directly throw an error if it fails.
     * Instead a signal to this error handlers will be sent.
     *
     * @eventProperty
     * @category Events - Core
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.error.on((error) {
     *     displayError(error);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.Error.On((error) =>
     * {
     *     DisplayError(error);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.error.on { error ->
     *     displayError(error)
     * }
     * ```
     *
     */
    error: IEventEmitterOfT<Error>;
    /* Excluded from this release type: onError */
    /**
     * This event is fired when all required data for playback is loaded and ready.
     * @remarks
     * This event is fired when all required data for playback is loaded and ready. The player is ready for playback when
     * all background workers are started, the audio output is initialized, a soundfont is loaded, and a song was loaded into the player as midi file.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playerReady.on(() => {
     *     enablePlayerControls();
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayerReady.On(() =>
     * {
     *     EnablePlayerControls()
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playerReady.on {
     *     enablePlayerControls()
     * }
     * ```
     */
    get playerReady(): IEventEmitter;
    private onPlayerReady;
    /**
     * This event is fired when the playback of the whole song finished.
     * @remarks
     * This event is finished regardless on whether looping is enabled or not.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playerFinished.on((args) => {
     *     // speed trainer
     *     api.playbackSpeed = Math.min(1.0, api.playbackSpeed + 0.1);
     * });
     * api.isLooping = true;
     * api.playbackSpeed = 0.5;
     * api.play()
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayerFinished.On(() =>
     * {
     *     // speed trainer
     *     api.PlaybackSpeed = Math.Min(1.0, api.PlaybackSpeed + 0.1);
     * });
     * api.IsLooping = true;
     * api.PlaybackSpeed = 0.5;
     * api.Play();
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playerFinished.on {
     *     // speed trainer
     *     api.playbackSpeed = min(1.0, api.playbackSpeed + 0.1);
     * }
     * api.isLooping = true
     * api.playbackSpeed = 0.5
     * api.play()
     * ```
     *
     */
    get playerFinished(): IEventEmitter;
    private onPlayerFinished;
    /**
     * This event is fired when the SoundFont needed for playback was loaded.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.soundFontLoaded.on(() => {
     *     hideSoundFontLoadingIndicator();
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.SoundFontLoaded.On(() =>
     * {
     *     HideSoundFontLoadingIndicator();
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...);
     * api.soundFontLoaded.on {
     *     hideSoundFontLoadingIndicator();
     * }
     * ```
     *
     */
    get soundFontLoaded(): IEventEmitter;
    private onSoundFontLoaded;
    /**
     * This event is fired when a Midi file is being loaded.
     *
     * @remarks
     * This event is fired when a Midi file for the song was generated and is being loaded
     * by the synthesizer. This event can be used to inspect or modify the midi events
     * which will be played for the song. This can be used to generate other visual representations
     * of the song.
     *
     * > [!NOTE]
     * > The generated midi file will NOT contain any metronome and count-in related events. The metronome and
     * > count-in ticks are handled within the synthesizer.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.midiLoad.on(file => {
     *     initializePianoPractice(file);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MidiLoad.On(file =>
     * {
     *     InitializePianoPractice(file);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.midiLoad.on { file ->
     *     initializePianoPractice(file)
     * }
     * ```
     *
     */
    midiLoad: IEventEmitterOfT<MidiFile>;
    private onMidiLoad;
    /**
     * This event is fired when the Midi file needed for playback was loaded.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.midiLoaded.on(e => {
     *     hideGeneratingAudioIndicator();
     *     updateSongDuration(e.endTime);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MidiLoaded.On(e =>
     * {
     *     HideGeneratingAudioIndicator();
     *     UpdateSongDuration(e.EndTime);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.midiLoaded.on { e ->
     *     hideGeneratingAudioIndicator()
     *     updateSongDuration(e.endTime)
     * }
     * ```
     *
     */
    midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    private onMidiLoaded;
    /**
     * This event is fired when the playback state changed.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playerStateChanged.on((args) => {
     *     updatePlayerControls(args.state, args.stopped);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayerStateChanged.On(args =>
     * {
     *     UpdatePlayerControls(args);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playerStateChanged.on { args ->
     *     updatePlayerControls(args)
     * }
     * ```
     *
     */
    get playerStateChanged(): IEventEmitterOfT<PlayerStateChangedEventArgs>;
    private onPlayerStateChanged;
    /**
     * This event is fired when the current playback position of the song changed.
     *
     * @eventProperty
     * @category Events - Player
     * @since 0.9.4
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playerPositionChanged.on((args) => {
     *     updatePlayerPosition(args);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlayerPositionChanged.On(args =>
     * {
     *     UpdatePlayerPosition(args);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playerPositionChanged.on { args ->
     *     updatePlayerPosition(args)
     * }
     * ```
     *
     */
    get playerPositionChanged(): IEventEmitterOfT<PositionChangedEventArgs>;
    private onPlayerPositionChanged;
    /**
     * This event is fired when the synthesizer played certain midi events.
     *
     * @remarks
     * This event is fired when the synthesizer played certain midi events. This allows reacing on various low level
     * audio playback elements like notes/rests played or metronome ticks.
     *
     * Refer to the [related guide](https://www.alphatab.net/docs/guides/handling-midi-events) to learn more about this feature.
     *
     * Also note that the provided data models changed significantly in {@version 1.3.0}. We try to provide backwards compatibility
     * until some extend but highly encourage changing to the new models in case of problems.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.midiEventsPlayedFilter = [alphaTab.midi.MidiEventType.AlphaTabMetronome];
     * api.midiEventsPlayed.on(function(e) {
     *   for(const midi of e.events) {
     *     if(midi.isMetronome) {
     *       console.log('Metronome tick ' + midi.tick);
     *     }
     *   }
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.MidiEventsPlayedFilter = new MidiEventType[] { AlphaTab.Midi.MidiEventType.AlphaTabMetronome };
     * api.MidiEventsPlayed.On(e =>
     * {
     *   foreach(var midi of e.events)
     *   {
     *     if(midi is AlphaTab.Midi.AlphaTabMetronomeEvent sysex && sysex.IsMetronome)
     *     {
     *       Console.WriteLine("Metronome tick " + midi.Tick);
     *     }
     *   }
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...);
     * api.midiEventsPlayedFilter = alphaTab.collections.List<alphaTab.midi.MidiEventType>( alphaTab.midi.MidiEventType.AlphaTabMetronome )
     * api.midiEventsPlayed.on { e ->
     *   for (midi in e.events) {
     *     if(midi instanceof alphaTab.midi.AlphaTabMetronomeEvent && midi.isMetronome) {
     *       println("Metronome tick " + midi.tick);
     *     }
     *   }
     * }
     * ```
     * @see {@link MidiEvent}
     * @see {@link TimeSignatureEvent}
     * @see {@link AlphaTabMetronomeEvent}
     * @see {@link AlphaTabRestEvent}
     * @see {@link NoteOnEvent}
     * @see {@link NoteOffEvent}
     * @see {@link ControlChangeEvent}
     * @see {@link ProgramChangeEvent}
     * @see {@link TempoChangeEvent}
     * @see {@link PitchBendEvent}
     * @see {@link NoteBendEvent}
     * @see {@link EndOfTrackEvent}
     * @see {@link MetaEvent}
     * @see {@link MetaDataEvent}
     * @see {@link MetaNumberEvent}
     * @see {@link Midi20PerNotePitchBendEvent}
     * @see {@link SystemCommonEvent}
     * @see {@link SystemExclusiveEvent}
     */
    get midiEventsPlayed(): IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    private onMidiEventsPlayed;
    /**
     * This event is fired when the playback range changed.
     *
     * @eventProperty
     * @category Events - Player
     * @since 1.2.3
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.playbackRangeChanged.on((args) => {
     *     if (args.playbackRange) {
     *         highlightRangeInProgressBar(args.playbackRange.startTick, args.playbackRange.endTick);
     *     } else {
     *         clearHighlightInProgressBar();
     *     }
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.PlaybackRangeChanged.On(args =>
     * {
     *     if (args.PlaybackRange != null)
     *     {
     *         HighlightRangeInProgressBar(args.PlaybackRange.StartTick, args.PlaybackRange.EndTick);
     *     }
     *     else
     *     {
     *         ClearHighlightInProgressBar();
     *     }
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.playbackRangeChanged.on { args ->
     *     val playbackRange = args.playbackRange
     *     if (playbackRange != null) {
     *         highlightRangeInProgressBar(playbackRange.startTick, playbackRange.endTick)
     *     } else {
     *         clearHighlightInProgressBar()
     *     }
     * }
     * ```
     *
     */
    get playbackRangeChanged(): IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
    private onPlaybackRangeChanged;
    /**
     * This event is fired when a settings update was requested.
     *
     * @eventProperty
     * @category Events - Core
     * @since 1.6.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * api.settingsUpdated.on(() => {
     *     updateSettingsUI(api.settings);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * api.SettingsUpdated.On(() =>
     * {
     *     UpdateSettingsUI(api.settings);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * val api = AlphaTabApi<MyControl>(...)
     * api.SettingsUpdated.on {
     *     updateSettingsUI(api.settings)
     * }
     * ```
     *
     */
    settingsUpdated: IEventEmitter;
    private onSettingsUpdated;
    /**
     * Loads and lists the available output devices which can be used by the player.
     * @returns the list of available devices or an empty list if there are no permissions, or the player is not enabled.
     *
     * @remarks
     * Will request permissions if needed.
     *
     * The values provided, can be passed into {@link setOutputDevice} to change dynamically the output device on which
     * the sound is played.
     *
     * In the web version this functionality relies on experimental APIs and might not yet be available in all browsers. https://caniuse.com/mdn-api_audiocontext_sinkid
     * @category Methods - Player
     * @since 1.5.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * const devices = await api.enumerateOutputDevices();
     *
     * buildDeviceSelector(devices, async selectedDevice => {
     *   await api.setOutputDevice(selectedDevice);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * var devices = await api.EnumerateOutputDevices();
     *
     * BuildDeviceSelector(devices, async selectedDevice => {
     *   await api.SetOutputDevice(selectedDevice);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * fun init() = kotlinx.coroutines.runBlocking {
     *   val api = AlphaTabApi<MyControl>(...)
     *   val devices = api.enumerateOutputDevices().await()
     *
     *   buildDeviceSelector(devices, fun (selectedDevice) {
     *     suspend {
     *       await api.setOutputDevice(selectedDevice)
     *     }
     *   });
     * }
     * ```
     */
    enumerateOutputDevices(): Promise<ISynthOutputDevice[]>;
    /**
     * Changes the output device which should be used for playing the audio (player must be enabled).
     * @param device The output device to use, or null to switch to the default device.
     *
     * @remarks
     * Use {@link enumerateOutputDevices} to load the list of available devices.
     *
     * In the web version this functionality relies on experimental APIs and might not yet be available in all browsers. https://caniuse.com/mdn-api_audiocontext_sinkid
     * @category Methods - Player
     * @since 1.5.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * const devices = await api.enumerateOutputDevices();
     *
     * buildDeviceSelector(devices, async selectedDevice => {
     *   await api.setOutputDevice(selectedDevice);
     * });
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * var devices = await api.EnumerateOutputDevices();
     *
     * BuildDeviceSelector(devices, async selectedDevice => {
     *   await api.SetOutputDevice(selectedDevice);
     * });
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * fun init() = kotlinx.coroutines.runBlocking {
     *   val api = AlphaTabApi<MyControl>(...)
     *   val devices = api.enumerateOutputDevices().await()
     *
     *   buildDeviceSelector(devices, fun (selectedDevice) {
     *     suspend {
     *       await api.setOutputDevice(selectedDevice)
     *     }
     *   });
     * }
     * ```
     */
    setOutputDevice(device: ISynthOutputDevice | null): Promise<void>;
    /**
     * The currently configured output device if changed via {@link setOutputDevice}.
     * @returns The custom configured output device which was set via {@link setOutputDevice} or `null`
     * if the default outputDevice is used.
     * The output device might change dynamically if devices are connected/disconnected (e.g. bluetooth headset).
     *
     * @remarks
     * Assumes {@link setOutputDevice} has been used.
     * In the web version this functionality relies on experimental APIs and might not yet be available in all browsers. https://caniuse.com/mdn-api_audiocontext_sinkid
     *
     * @category Methods - Player
     * @since 1.5.0
     *
     * @example
     * JavaScript
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'));
     * updateOutputDeviceUI(await api.getOutputDevice())
     * ```
     *
     * @example
     * C#
     * ```cs
     * var api = new AlphaTabApi<MyControl>(...);
     * UpdateOutputDeviceUI(await api.GetOutputDevice())
     * ```
     *
     * @example
     * Android
     * ```kotlin
     * fun init() = kotlinx.coroutines.runBlocking {
     *   val api = AlphaTabApi<MyControl>(...)
     *   updateOutputDeviceUI(api.getOutputDevice().await())
     * }
     * ```
     *
     */
    getOutputDevice(): Promise<ISynthOutputDevice | null>;
    /**
     * Starts the audio export for the currently loaded song.
     * @remarks
     * This will not export or use any backing track media but will always use the synthesizer to generate the output.
     * This method works with any PlayerMode active but changing the mode during export can lead to unexpected side effects.
     *
     * See [Audio Export](https://www.alphatab.net/docs/guides/audio-export) for further guidance how to use this feature.
     *
     * @param options The export options.
     * @category Methods - Player
     * @since 1.6.0
     * @returns An exporter instance to export the audio in a streaming fashion.
     */
    exportAudio(options: AudioExportOptions): Promise<IAudioExporter>;
}

export declare class AlphaTabError extends Error {
    type: AlphaTabErrorType;
    constructor(type: AlphaTabErrorType, message?: string | null, inner?: Error);
}

export declare enum AlphaTabErrorType {
    General = 0,
    Format = 1,
    AlphaTex = 2
}

/**
 * Represents a metronome event. This event is emitted by the synthesizer only during playback and
 * is typically not part of the midi file itself.
 */
declare class AlphaTabMetronomeEvent extends AlphaTabSysExEvent {
    /**
     * The metronome counter as per current time signature.
     */
    metronomeNumerator: number;
    /**
     * The duration of the metronome tick in MIDI ticks.
     */
    metronomeDurationInTicks: number;
    /**
     * The duration of the metronome tick in milliseconds.
     */
    metronomeDurationInMilliseconds: number;
    /**
     * Gets a value indicating whether the current event is a metronome event.
     */
    readonly isMetronome: boolean;
    constructor(track: number, tick: number, counter: number, durationInTicks: number, durationInMillis: number);
    protected writeEventData(s: IWriteable): void;
}

/**
 * Represents a REST beat being 'played'. This event supports alphaTab in placing the cursor.
 */
declare class AlphaTabRestEvent extends AlphaTabSysExEvent {
    channel: number;
    constructor(track: number, tick: number, channel: number);
    protected writeEventData(s: IWriteable): void;
}

/**
 * The base class for alphaTab specific midi events (like metronomes and rests).
 */
declare abstract class AlphaTabSysExEvent extends MidiEvent {
    static readonly AlphaTabManufacturerId = 125;
    static readonly MetronomeEventId = 0;
    static readonly RestEventId = 1;
    writeTo(s: IWriteable): void;
    protected abstract writeEventData(s: IWriteable): void;
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare enum AlphaTabSystemExclusiveEvents {
    MetronomeTick = 0,
    Rest = 1
}

/**
 * This importer can parse alphaTex markup into a score structure.
 */
declare class AlphaTexImporter extends ScoreImporter {
    private static readonly Eof;
    private _trackChannel;
    private _score;
    private _currentTrack;
    private _currentStaff;
    private _barIndex;
    private _voiceIndex;
    private _input;
    private _ch;
    private _curChPos;
    private _line;
    private _col;
    private _lastValidSpot;
    private _sy;
    private _syData;
    private _allowNegatives;
    private _allowFloat;
    private _allowTuning;
    private _currentDuration;
    private _currentDynamics;
    private _currentTuplet;
    private _lyrics;
    private _staffHasExplicitDisplayTransposition;
    private _staffHasExplicitTuning;
    private _staffTuningApplied;
    private _percussionArticulationNames;
    private _sustainPedalToBeat;
    private _slurs;
    private _articulationValueToIndex;
    private _accidentalMode;
    private _syncPoints;
    logErrors: boolean;
    get name(): string;
    initFromString(tex: string, settings: Settings): void;
    readScore(): Score;
    private syncPoints;
    private syncPoint;
    private error;
    private errorMessage;
    /**
     * Initializes the song with some required default values.
     * @returns
     */
    private createDefaultScore;
    private newTrack;
    /**
     * Converts a clef string into the clef value.
     * @param str the string to convert
     * @returns the clef value
     */
    private parseClefFromString;
    /**
     * Converts a clef tuning into the clef value.
     * @param i the tuning value to convert
     * @returns the clef value
     */
    private parseClefFromInt;
    private parseTripletFeelFromString;
    private parseTripletFeelFromInt;
    /**
     * Converts a keysignature string into the assocciated value.
     * @param str the string to convert
     * @returns the assocciated keysignature value
     */
    private parseKeySignature;
    private parseKeySignatureType;
    /**
     * Reads, saves, and returns the next character of the source stream.
     */
    private nextChar;
    /**
     * Saves the current position, line, and column.
     * All parsed data until this point is assumed to be valid.
     */
    private saveValidSpot;
    /**
     * Reads, saves, and returns the next terminal symbol.
     */
    private newSy;
    private readNumberOrName;
    /**
     * Checks if the given character is a valid letter for a name.
     * (no control characters, whitespaces, numbers or dots)
     */
    private static isNameLetter;
    private static isTerminal;
    private static isWhiteSpace;
    private isDigit;
    /**
     * Reads a string from the stream.
     * @returns the read string.
     */
    private readName;
    private metaData;
    headerFooterStyle(element: ScoreSubElement): void;
    private parseTrackNamePolicy;
    private parseTrackNameMode;
    private parseTrackNameOrientation;
    private handleStaffMeta;
    private handleAccidentalMode;
    private makeCurrentStaffPitched;
    /**
     * Encodes a given string to a shorthand text form without spaces or special characters
     */
    private static toArticulationId;
    private applyPercussionStaff;
    private chordProperties;
    private bars;
    private trackStaffMeta;
    private handleNewVoice;
    private beginStaff;
    private trackProperties;
    private staffProperties;
    private bar;
    private newBar;
    private beat;
    private beatDuration;
    private beatEffects;
    /**
     * Tries to apply a beat effect to the given beat.
     * @returns true if a effect could be applied, otherwise false
     */
    private applyBeatEffect;
    private parseBracketExtendMode;
    private parseFermataFromString;
    private parseClefOttavaFromString;
    private getChordId;
    private static applyTuplet;
    private isNoteText;
    private note;
    private noteEffects;
    private harmonicValue;
    private toFinger;
    private parseDuration;
    private parseBendStyle;
    private parseBendType;
    private barMeta;
    private parseBarLineStyle;
    private parseSimileMarkFromString;
    private handleDirections;
    private readTempoAutomation;
    private applyAlternateEnding;
    private parseWhammyType;
}

/**
 * Represents a single chunk of audio produced.
 */
declare class AudioExportChunk {
    /**
     * The generated samples for the requested chunk.
     */
    samples: Float32Array;
    /**
     * The current time position within the song in milliseconds.
     */
    currentTime: number;
    /**
     * The total length of the song in milliseconds.
     */
    endTime: number;
    /**
     * The current time position within the song in midi ticks.
     */
    currentTick: number;
    /**
     * The total length of the song in midi ticks.
     */
    endTick: number;
}

/**
 * The options controlling how to export the audio.
 */
declare class AudioExportOptions {
    /**
     * The soundfonts to load and use for generating the audio.
     * If not provided, the already loaded soundfonts of the synthesizer will be used.
     * If no existing synthesizer is initialized, the generated audio might not contain any hearable audio.
     */
    soundFonts?: Uint8Array[];
    /**
     * The output sample rate.
     * @default `44100`
     */
    sampleRate: number;
    /**
     * Whether to respect sync point information during export.
     * @default `true`
     * @remarks
     * If the song contains sync point information for synchronization with an external media,
     * this option allows controlling whether the synthesized audio is aligned with these points.
     *
     * This is useful when mixing the exported audio together with external media, keeping the same timing.
     *
     * Disable this option if you want the original/exact timing as per music sheet in the exported audio.
     */
    useSyncPoints: boolean;
    /**
     * The current master volume as percentage. (range: 0.0-3.0, default 1.0)
     */
    masterVolume: number;
    /**
     * The metronome volume. (range: 0.0-3.0, default 0.0)
     */
    metronomeVolume: number;
    /**
     * The range of the song that should be exported. Set this to null
     * to play the whole song.
     */
    playbackRange?: PlaybackRange;
    /**
     * The volume for individual tracks as percentage (range: 0.0-3.0).
     * @remarks
     * The key is the track index, and the value is the relative volume.
     * The configured volume (as per data model) still applies, this is an additional volume control.
     * If no custom value is set, 100% is used.
     * No values from the currently active synthesizer are applied.
     *
     * The meaning of the key changes when used with AlphaSynth directly, in this case the key is the midi channel .
     */
    trackVolume: Map<number, number>;
    /**
     * The additional semitone pitch transpose to apply for individual tracks.
     * @remarks
     * The key is the track index, and the value is the number of semitones to apply.
     * No values from the currently active synthesizer are applied.
     *
     * The meaning of the key changes when used with AlphaSynth directly, in this case the key is the midi channel .
     */
    trackTranspositionPitches: Map<number, number>;
}

/**
 * Automations are used to change the behaviour of a song.
 * @cloneable
 * @json
 * @json_strict
 */
declare class Automation {
    /**
     * Gets or sets whether the automation is applied linear.
     */
    isLinear: boolean;
    /**
     * Gets or sets the type of the automation.
     */
    type: AutomationType;
    /**
     * Gets or sets the target value of the automation.
     */
    value: number;
    /**
     * The sync point data in case of {@link AutomationType.SyncPoint}
     */
    syncPointValue: SyncPointData | undefined;
    /**
     * Gets or sets the relative position of of the automation.
     */
    ratioPosition: number;
    /**
     * Gets or sets the additional text of the automation.
     */
    text: string;
    static buildTempoAutomation(isLinear: boolean, ratioPosition: number, value: number, reference: number): Automation;
    static buildInstrumentAutomation(isLinear: boolean, ratioPosition: number, value: number): Automation;
}

/**
 * This public enumeration lists all types of automations.
 */
declare enum AutomationType {
    /**
     * Tempo change.
     */
    Tempo = 0,
    /**
     * Colume change.
     */
    Volume = 1,
    /**
     * Instrument change.
     */
    Instrument = 2,
    /**
     * Balance change.
     */
    Balance = 3,
    /**
     * A sync point for synchronizing the internal time axis with an external audio track.
     */
    SyncPoint = 4
}

/**
 * Holds information about the backing track which can be played instead of synthesized audio.
 * @json
 * @json_strict
 */
declare class BackingTrack {
    /**
     * The data of the raw audio file to be used for playback.
     * @json_ignore
     */
    rawAudioFile: Uint8Array | undefined;
}

/**
 * Rerpresents a point to sync the alphaTab time axis with an external backing track.
 */
declare class BackingTrackSyncPoint {
    /**
     * The index of the masterbar to which this sync point belongs to.
     * @remarks
     * This property is purely informative for external use like in editors.
     * It has no impact to the synchronization itself.
     */
    masterBarIndex: number;
    /**
     * The occurence of the masterbar to which this sync point belongs to. The occurence
     * is 0-based and increases with every repeated play of a masterbar (e.g. on repeats or jumps).
     * @remarks
     * This property is purely informative for external use like in editors.
     * It has no impact to the synchronization itself.
     */
    masterBarOccurence: number;
    /**
     * The BPM the synthesizer has at the exact tick position of this sync point.
     */
    synthBpm: number;
    /**
     * The millisecond time position of the synthesizer when this sync point is reached.
     */
    synthTime: number;
    /**
     * The midi tick position of the synthesizer when this sync point is reached.
     */
    synthTick: number;
    /**
     * The millisecond time in the external media marking the synchronization point.
     */
    syncTime: number;
    /**
     * The BPM the song will have virtually after this sync point to align the external media time axis
     * with the one from the synthesizer.
     */
    syncBpm: number;
    /**
     * Updates the synchronization BPM that will apply after this sync point.
     * @param nextSyncPointSynthTime The synthesizer time of the next sync point after this one.
     * @param nextSyncPointSyncTime The synchronization time of the next sync point after this one.
     */
    updateSyncBpm(nextSyncPointSynthTime: number, nextSyncPointSyncTime: number): void;
}

/**
 * A bar is a single block within a track, also known as Measure.
 * @json
 * @json_strict
 */
declare class Bar {
    private static _globalBarId;
    /* Excluded from this release type: resetIds */
    /**
     * Gets or sets the unique id of this bar.
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this bar within the staff.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the next bar that comes after this bar.
     * @json_ignore
     */
    nextBar: Bar | null;
    /**
     * Gets or sets the previous bar that comes before this bar.
     * @json_ignore
     */
    previousBar: Bar | null;
    /**
     * Gets or sets the clef on this bar.
     */
    clef: Clef;
    /**
     * Gets or sets the ottava applied to the clef.
     */
    clefOttava: Ottavia;
    /**
     * Gets or sets the reference to the parent staff.
     * @json_ignore
     */
    staff: Staff;
    /**
     * Gets or sets the list of voices contained in this bar.
     * @json_add addVoice
     */
    voices: Voice[];
    /**
     * Gets or sets the simile mark on this bar.
     */
    simileMark: SimileMark;
    /**
     * Gets a value indicating whether this bar contains multiple voices with notes.
     * @json_ignore
     */
    isMultiVoice: boolean;
    /**
     * A relative scale for the size of the bar when displayed. The scale is relative
     * within a single line (system). The sum of all scales in one line make the total width,
     * and then this individual scale gives the relative size.
     */
    displayScale: number;
    /**
     * An absolute width of the bar to use when displaying in single track display scenarios.
     */
    displayWidth: number;
    /**
     * The sustain pedal markers within this bar.
     */
    sustainPedals: SustainPedalMarker[];
    get masterBar(): MasterBar;
    private _isEmpty;
    private _isRestOnly;
    /**
     * Whether this bar is fully empty (not even having rests).
     */
    get isEmpty(): boolean;
    /**
     * Whether this bar has any changes applied which are not related to the voices in it.
     * (e.g. new key signatures)
     */
    get hasChanges(): boolean;
    /**
     * Whether this bar is empty or has only rests.
     */
    get isRestOnly(): boolean;
    /**
     * The bar line to draw on the left side of the bar.
     * @remarks
     * Note that the combination with {@link barLineRight} of the previous bar matters.
     * If this bar has a Regular/Automatic style but the previous bar is customized, no additional line is drawn by this bar.
     * If both bars have a custom style, both bar styles are drawn.
     */
    barLineLeft: BarLineStyle;
    /**
     * The bar line to draw on the right side of the bar.
     * @remarks
     * Note that the combination with {@link barLineLeft} of the next bar matters.
     * If this bar has a Regular/Automatic style but the next bar is customized, no additional line is drawn by this bar.
     * If both bars have a custom style, both bar styles are drawn.
     */
    barLineRight: BarLineStyle;
    /**
     * Gets or sets the key signature used on all bars.
     */
    keySignature: KeySignature;
    /**
     * Gets or sets the type of key signature (major/minor)
     */
    keySignatureType: KeySignatureType;
    /**
     * The bar line to draw on the left side of the bar with an "automatic" type resolved to the actual one.
     * @param isFirstOfSystem  Whether the bar is the first one in the system.
     */
    getActualBarLineLeft(isFirstOfSystem: boolean): BarLineStyle;
    /**
     * The bar line to draw on the right side of the bar with an "automatic" type resolved to the actual one.
     * @param isFirstOfSystem  Whether the bar is the first one in the system.
     */
    getActualBarLineRight(): BarLineStyle;
    private static automaticToActualType;
    private static actualBarLine;
    /**
     * The style customizations for this item.
     */
    style?: BarStyle;
    addVoice(voice: Voice): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    calculateDuration(): number;
}

/**
 * Represents the boundaries of a single bar.
 */
declare class BarBounds {
    /**
     * Gets or sets the reference to the related {@link MasterBarBounds}
     */
    masterBarBounds: MasterBarBounds;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning this bar.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this bar including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the bar related to this boundaries.
     */
    bar: Bar;
    /**
     * Gets or sets a list of the beats contained in this lookup.
     */
    beats: BeatBounds[];
    /**
     * Adds a new beat to this lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
    /**
     * Tries to find the beat at the given X-position.
     * @param x The X-position of the beat to find.
     * @returns The beat at the given X-position or null if none was found.
     */
    findBeatAtPos(x: number): BeatBounds | null;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(scale?: number): void;
}

declare class BarCollisionHelper {
    reservedLayoutAreasByDisplayTime: Map<number, ReservedLayoutArea>;
    restDurationsByDisplayTime: Map<number, Map<number, number>>;
    getBeatMinMaxY(): number[];
    reserveBeatSlot(beat: Beat, topY: number, bottomY: number): void;
    registerRest(beat: Beat): void;
    applyRestCollisionOffset(beat: Beat, currentY: number, linesToPixel: number): number;
}

declare class BarHelpers {
    private _renderer;
    beamHelpers: BeamingHelper[][];
    beamHelperLookup: Map<number, BeamingHelper>[];
    collisionHelper: BarCollisionHelper;
    preferredBeamDirection: BeamDirection | null;
    constructor(renderer: BarRendererBase);
    initialize(): void;
    getBeamingHelperForBeat(beat: Beat): BeamingHelper;
}

/**
 * This public class stores size information about a stave.
 * It is used by the layout engine to collect the sizes of score parts
 * to align the parts across multiple staves.
 */
declare class BarLayoutingInfo {
    private static readonly MinDuration;
    private static readonly MinDurationWidth;
    private _timeSortedSprings;
    private _minTime;
    private _onTimePositionsForce;
    private _onTimePositions;
    private _incompleteGraceRodsWidth;
    private _minDuration;
    /**
     * an internal version number that increments whenever a change was made.
     */
    version: number;
    preBeatSize: number;
    postBeatSize: number;
    minStretchForce: number;
    totalSpringConstant: number;
    private updateMinStretchForce;
    getPreBeatSize(beat: Beat): number;
    getPostBeatSize(beat: Beat): number;
    incompleteGraceRods: Map<string, Spring[]>;
    allGraceRods: Map<string, Spring[]>;
    springs: Map<number, Spring>;
    addSpring(start: number, duration: number, graceBeatWidth: number, preBeatWidth: number, postSpringSize: number): Spring;
    addBeatSpring(beat: Beat, preBeatSize: number, postBeatSize: number): void;
    finish(): void;
    private calculateSpringConstants;
    height: number;
    paint(_cx: number, _cy: number, _canvas: ICanvas): void;
    private calculateSpringConstant;
    spaceToForce(space: number): number;
    calculateVoiceWidth(force: number): number;
    private calculateWidth;
    buildOnTimePositions(force: number): Map<number, number>;
}

/**
 * Lists all bar line styles.
 */
declare enum BarLineStyle {
    /**
     * No special custom line style, automatic handling (e.g. last bar might be LightHeavy)
     */
    Automatic = 0,
    Dashed = 1,
    Dotted = 2,
    Heavy = 3,
    HeavyHeavy = 4,
    HeavyLight = 5,
    LightHeavy = 6,
    LightLight = 7,
    None = 8,
    Regular = 9,
    Short = 10,
    Tick = 11
}

/**
 * This is the base public class for creating blocks which can render bars.
 */
declare class BarRendererBase {
    protected static readonly RawLineSpacing: number;
    static readonly StemWidth: number;
    static readonly StaffLineThickness: number;
    static readonly BeamThickness: number;
    static readonly BeamSpacing: number;
    private _preBeatGlyphs;
    private _voiceContainers;
    private _postBeatGlyphs;
    private _ties;
    get nextRenderer(): BarRendererBase | null;
    get previousRenderer(): BarRendererBase | null;
    scoreRenderer: ScoreRenderer;
    staff: RenderStaff;
    layoutingInfo: BarLayoutingInfo;
    bar: Bar;
    additionalMultiRestBars: Bar[] | null;
    get lastBar(): Bar;
    x: number;
    y: number;
    width: number;
    computedWidth: number;
    height: number;
    index: number;
    topOverflow: number;
    bottomOverflow: number;
    helpers: BarHelpers;
    /**
     * Gets or sets whether this renderer is linked to the next one
     * by some glyphs like a vibrato effect
     */
    isLinkedToPrevious: boolean;
    /**
     * Gets or sets whether this renderer can wrap to the next line
     * or it needs to stay connected to the previous one.
     * (e.g. when having double bar repeats we must not separate the 2 bars)
     */
    canWrap: boolean;
    get showMultiBarRest(): boolean;
    constructor(renderer: ScoreRenderer, bar: Bar);
    registerTies(ties: Glyph[]): void;
    get middleYPosition(): number;
    registerOverflowTop(topOverflow: number): boolean;
    registerOverflowBottom(bottomOverflow: number): boolean;
    scaleToWidth(width: number): void;
    get resources(): RenderingResources;
    get settings(): Settings;
    /**
     * Gets the scale with which the bar should be displayed in case the model
     * scale should be respected.
     */
    get barDisplayScale(): number;
    /**
     * Gets the absolute width in which the bar should be displayed in case the model
     * scale should be respected.
     */
    get barDisplayWidth(): number;
    protected wasFirstOfLine: boolean;
    get isFirstOfLine(): boolean;
    get isLast(): boolean;
    registerLayoutingInfo(): void;
    private _appliedLayoutingInfo;
    applyLayoutingInfo(): boolean;
    isFinalized: boolean;
    finalizeRenderer(): boolean;
    /**
     * Gets the top padding for the main content of the renderer.
     * Can be used to specify where i.E. the score lines of the notation start.
     * @returns
     */
    topPadding: number;
    /**
     * Gets the bottom padding for the main content of the renderer.
     * Can be used to specify where i.E. the score lines of the notation end.
     */
    bottomPadding: number;
    doLayout(): void;
    protected hasVoiceContainer(voice: Voice): boolean;
    protected updateSizes(): void;
    protected addPreBeatGlyph(g: Glyph): void;
    protected addBeatGlyph(g: BeatContainerGlyph): void;
    protected getVoiceContainer(voice: Voice): VoiceContainerGlyph | undefined;
    getBeatContainer(beat: Beat): BeatContainerGlyph | undefined;
    getPreNotesGlyphForBeat(beat: Beat): BeatGlyphBase | undefined;
    getOnNotesGlyphForBeat(beat: Beat): BeatOnNoteGlyphBase | undefined;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    protected paintBackground(cx: number, cy: number, canvas: ICanvas): void;
    buildBoundingsLookup(masterBarBounds: MasterBarBounds, cx: number, cy: number): void;
    protected addPostBeatGlyph(g: Glyph): void;
    protected createPreBeatGlyphs(): void;
    protected createBeatGlyphs(): void;
    protected createVoiceGlyphs(v: Voice): void;
    protected createPostBeatGlyphs(): void;
    get beatGlyphsStart(): number;
    get postBeatGlyphsStart(): number;
    getBeatX(beat: Beat, requestedPosition?: BeatXPosition): number;
    getRatioPositionX(ticks: number): number;
    getNoteX(note: Note, requestedPosition: NoteXPosition): number;
    getNoteY(note: Note, requestedPosition: NoteYPosition): number;
    reLayout(): void;
    protected recreatePreBeatGlyphs(): void;
    protected paintSimileMark(cx: number, cy: number, canvas: ICanvas): void;
    completeBeamingHelper(helper: BeamingHelper): void;
    getBeatDirection(beat: Beat): BeamDirection;
}

/**
 * This is the base public class for creating factories providing BarRenderers
 */
declare abstract class BarRendererFactory {
    isInsideBracket: boolean;
    isRelevantForBoundsLookup: boolean;
    hideOnMultiTrack: boolean;
    hideOnPercussionTrack: boolean;
    abstract get staffId(): string;
    abstract getStaffPaddingTop(staff: RenderStaff): number;
    abstract getStaffPaddingBottom(staff: RenderStaff): number;
    canCreate(track: Track, staff: Staff): boolean;
    abstract create(renderer: ScoreRenderer, bar: Bar): BarRendererBase;
}

/**
 * Lists all beat barré types.
 */
declare enum BarreShape {
    /**
     * No Barré
     */
    None = 0,
    /**
     * Full Barré (play all strings)
     */
    Full = 1,
    /**
     * 1/2 Barré (play only half the strings)
     */
    Half = 2
}

/**
 * Defines the custom styles for bars.
 * @json
 * @json_strict
 */
declare class BarStyle extends ElementStyle<BarSubElement> {
}

/**
 * Lists all graphical sub elements within a {@link Bar} which can be styled via {@link Bar.style}
 */
declare enum BarSubElement {
    /**
     * The repeat signs on the standard notation staff.
     */
    StandardNotationRepeats = 0,
    /**
     * The repeat signs on the guitar tab staff.
     */
    GuitarTabsRepeats = 1,
    /**
     * The repeat signs on the slash staff.
     */
    SlashRepeats = 2,
    /**
     * The repeat signs on the numbered notation staff.
     */
    NumberedRepeats = 3,
    /**
     * The bar numbers on the standard notation staff.
     */
    StandardNotationBarNumber = 4,
    /**
     * The bar numbers on the guitar tab staff.
     */
    GuitarTabsBarNumber = 5,
    /**
     * The bar numbers on the slash staff.
     */
    SlashBarNumber = 6,
    /**
     * The bar numbers on the numbered notation staff.
     */
    NumberedBarNumber = 7,
    /**
     * The bar lines on the standard notation staff.
     */
    StandardNotationBarLines = 8,
    /**
     * The bar lines on the guitar tab staff.
     */
    GuitarTabsBarLines = 9,
    /**
     * The bar lines on the slash staff.
     */
    SlashBarLines = 10,
    /**
     * The bar lines on the numbered notation staff.
     */
    NumberedBarLines = 11,
    /**
     * The clefs on the standard notation staff.
     */
    StandardNotationClef = 12,
    /**
     * The clefs on the guitar tab staff.
     */
    GuitarTabsClef = 13,
    /**
     * The key signatures on the standard notation staff.
     */
    StandardNotationKeySignature = 14,
    /**
     * The key signatures on the numbered notation staff.
     */
    NumberedKeySignature = 15,
    /**
     * The time signatures on the standard notation staff.
     */
    StandardNotationTimeSignature = 16,
    /**
     * The time signatures on the guitar tab staff.
     */
    GuitarTabsTimeSignature = 17,
    /**
     * The time signatures on the slash staff.
     */
    SlashTimeSignature = 18,
    /**
     * The time signature on the numbered notation staff.
     */
    NumberedTimeSignature = 19,
    /**
     * The staff lines on the standard notation staff.
     */
    StandardNotationStaffLine = 20,
    /**
     * The staff lines on the guitar tab staff.
     */
    GuitarTabsStaffLine = 21,
    /**
     * The staff lines on the slash staff.
     */
    SlashStaffLine = 22,
    /**
     * The staff lines on the numbered notation staff.
     */
    NumberedStaffLine = 23
}

declare enum BeamDirection {
    Up = 0,
    Down = 1
}

/**
 * This public class helps drawing beams and bars for notes.
 */
declare class BeamingHelper {
    private _staff;
    private _beatLineXPositions;
    private _renderer;
    private _firstNonRestBeat;
    private _lastNonRestBeat;
    voice: Voice | null;
    beats: Beat[];
    shortestDuration: Duration;
    /**
     * an indicator whether any beat has a tuplet on it.
     */
    hasTuplet: boolean;
    slashBeats: Beat[];
    private _firstBeatLowestNoteCompareValue;
    private _firstBeatHighestNoteCompareValue;
    private _lastBeatLowestNoteCompareValue;
    private _lastBeatHighestNoteCompareValue;
    lowestNoteInHelper: Note | null;
    private _lowestNoteCompareValueInHelper;
    highestNoteInHelper: Note | null;
    private _highestNoteCompareValueInHelper;
    invertBeamDirection: boolean;
    preferredBeamDirection: BeamDirection | null;
    isGrace: boolean;
    minRestLine: number | null;
    beatOfMinRestLine: Beat | null;
    maxRestLine: number | null;
    beatOfMaxRestLine: Beat | null;
    get isRestBeamHelper(): boolean;
    hasLine(forceFlagOnSingleBeat: boolean, beat?: Beat): boolean;
    private beatHasLine;
    hasFlag(forceFlagOnSingleBeat: boolean, beat?: Beat): boolean;
    private beatHasFlag;
    constructor(staff: Staff, renderer: BarRendererBase);
    getBeatLineX(beat: Beat, direction?: BeamDirection): number;
    hasBeatLineX(beat: Beat): boolean;
    registerBeatLineX(staffId: string, beat: Beat, up: number, down: number): void;
    private getOrCreateBeatPositions;
    direction: BeamDirection;
    finish(): void;
    private calculateDirection;
    static computeLineHeightsForRest(duration: Duration): number[];
    /**
     * Registers a rest beat within the accidental helper so the rest
     * symbol is considered properly during beaming.
     * @param beat The rest beat.
     * @param line The line on which the rest symbol is placed
     */
    applyRest(beat: Beat, line: number): void;
    private invert;
    checkBeat(beat: Beat): boolean;
    private checkNote;
    private static canJoin;
    private static canJoinDuration;
    static isFullBarJoin(a: Beat, b: Beat, barIndex: number): boolean;
    get beatOfLowestNote(): Beat;
    get beatOfHighestNote(): Beat;
    /**
     * Returns whether the the position of the given beat, was registered by the staff of the given ID
     * @param staffId
     * @param beat
     * @returns
     */
    isPositionFrom(staffId: string, beat: Beat): boolean;
    drawingInfos: Map<BeamDirection, BeamingHelperDrawInfo>;
}

declare class BeamingHelperDrawInfo {
    startBeat: Beat | null;
    startX: number;
    startY: number;
    endBeat: Beat | null;
    endX: number;
    endY: number;
    /**
     * calculates the Y-position given a X-pos using the current start end point
     * @param x
     */
    calcY(x: number): number;
}

/**
 * A beat is a single block within a bar. A beat is a combination
 * of several notes played at the same time.
 * @json
 * @json_strict
 * @cloneable
 */
declare class Beat {
    private static _globalBeatId;
    /* Excluded from this release type: resetIds */
    /**
     * Gets or sets the unique id of this beat.
     * @clone_ignore
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this beat within the voice.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the previous beat within the whole song.
     * @json_ignore
     * @clone_ignore
     */
    previousBeat: Beat | null;
    /**
     * Gets or sets the next beat within the whole song.
     * @json_ignore
     * @clone_ignore
     */
    nextBeat: Beat | null;
    get isLastOfVoice(): boolean;
    /**
     * Gets or sets the reference to the parent voice this beat belongs to.
     * @json_ignore
     * @clone_ignore
     */
    voice: Voice;
    /**
     * Gets or sets the list of notes contained in this beat.
     * @json_add addNote
     * @clone_add addNote
     */
    notes: Note[];
    /**
     * Gets the lookup where the notes per string are registered.
     * If this staff contains string based notes this lookup allows fast access.
     * @json_ignore
     */
    readonly noteStringLookup: Map<number, Note>;
    /**
     * Gets the lookup where the notes per value are registered.
     * If this staff contains string based notes this lookup allows fast access.
     * @json_ignore
     */
    readonly noteValueLookup: Map<number, Note>;
    /**
     * Gets or sets a value indicating whether this beat is considered empty.
     */
    isEmpty: boolean;
    /**
     * Gets or sets which whammy bar style should be used for this bar.
     */
    whammyStyle: BendStyle;
    /**
     * Gets or sets the ottava applied to this beat.
     */
    ottava: Ottavia;
    /**
     * Gets or sets the fermata applied to this beat.
     * @clone_ignore
     * @json_ignore
     */
    fermata: Fermata | null;
    /**
     * Gets a value indicating whether this beat starts a legato slur.
     */
    isLegatoOrigin: boolean;
    get isLegatoDestination(): boolean;
    /**
     * Gets or sets the note with the lowest pitch in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    minNote: Note | null;
    /**
     * Gets or sets the note with the highest pitch in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    maxNote: Note | null;
    /**
     * Gets or sets the note with the highest string number in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    maxStringNote: Note | null;
    /**
     * Gets or sets the note with the lowest string number in this beat. Only visible notes are considered.
     * @json_ignore
     * @clone_ignore
     */
    minStringNote: Note | null;
    /**
     * Gets or sets the duration of this beat.
     */
    duration: Duration;
    get isRest(): boolean;
    /**
     * Gets a value indicating whether this beat is a full bar rest.
     */
    get isFullBarRest(): boolean;
    /**
     * Gets or sets whether any note in this beat has a let-ring applied.
     * @json_ignore
     */
    isLetRing: boolean;
    /**
     * Gets or sets whether any note in this beat has a palm-mute paplied.
     * @json_ignore
     */
    isPalmMute: boolean;
    /**
     * Gets or sets a list of all automations on this beat.
     */
    automations: Automation[];
    /**
     * Gets or sets the number of dots applied to the duration of this beat.
     */
    dots: number;
    /**
     * Gets a value indicating whether this beat is fade-in.
     * @deprecated Use `fade`
     */
    get fadeIn(): boolean;
    /**
     * Sets a value indicating whether this beat is fade-in.
     * @deprecated Use `fade`
     */
    set fadeIn(value: boolean);
    /**
     * Gets or sets a value indicating whether this beat is fade-in.
     */
    fade: FadeType;
    /**
     * Gets or sets the lyrics shown on this beat.
     */
    lyrics: string[] | null;
    /**
     * Gets or sets a value indicating whether the beat is played in rasgueado style.
     */
    get hasRasgueado(): boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a pop-style (bass).
     */
    pop: boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a slap-style (bass).
     */
    slap: boolean;
    /**
     * Gets or sets a value indicating whether the notes on this beat are played with a tap-style (bass).
     */
    tap: boolean;
    /**
     * Gets or sets the text annotation shown on this beat.
     */
    text: string | null;
    /**
     * Gets or sets whether this beat should be rendered as slashed note.
     */
    slashed: boolean;
    /**
     * Whether this beat should rendered and played as "dead slapped".
     */
    deadSlapped: boolean;
    /**
     * Gets or sets the brush type applied to the notes of this beat.
     */
    brushType: BrushType;
    /**
     * Gets or sets the duration of the brush between the notes in midi ticks.
     */
    brushDuration: number;
    /**
     * Gets or sets the tuplet denominator.
     */
    tupletDenominator: number;
    /**
     * Gets or sets the tuplet numerator.
     */
    tupletNumerator: number;
    get hasTuplet(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    tupletGroup: TupletGroup | null;
    /**
     * Gets or sets whether this beat continues a whammy effect.
     */
    isContinuedWhammy: boolean;
    /**
     * Gets or sets the whammy bar style of this beat.
     */
    whammyBarType: WhammyType;
    /**
     * Gets or sets the points defining the whammy bar usage.
     * @json_add addWhammyBarPoint
     * @clone_add addWhammyBarPoint
     */
    whammyBarPoints: BendPoint[] | null;
    /**
     * Gets or sets the highest point with for the highest whammy bar value.
     * @json_ignore
     * @clone_ignore
     */
    maxWhammyPoint: BendPoint | null;
    /**
     * Gets or sets the highest point with for the lowest whammy bar value.
     * @json_ignore
     * @clone_ignore
     */
    minWhammyPoint: BendPoint | null;
    get hasWhammyBar(): boolean;
    /**
     * Gets or sets the vibrato effect used on this beat.
     */
    vibrato: VibratoType;
    /**
     * Gets or sets the ID of the chord used on this beat.
     */
    chordId: string | null;
    get hasChord(): boolean;
    get chord(): Chord | null;
    /**
     * Gets or sets the grace style of this beat.
     */
    graceType: GraceType;
    /**
     * Gets or sets the grace group this beat belongs to.
     * If this beat is not a grace note, it holds the group which belongs to this beat.
     * @json_ignore
     * @clone_ignore
     */
    graceGroup: GraceGroup | null;
    /**
     * Gets or sets the index of this beat within the grace group if
     * this is a grace beat.
     * @json_ignore
     * @clone_ignore
     */
    graceIndex: number;
    /**
     * Gets or sets the pickstroke applied on this beat.
     */
    pickStroke: PickStroke;
    get isTremolo(): boolean;
    /**
     * Gets or sets the speed of the tremolo effect.
     */
    tremoloSpeed: Duration | null;
    /**
     * Gets or sets whether a crescendo/decrescendo is applied on this beat.
     */
    crescendo: CrescendoType;
    /**
     * The timeline position of the voice within the current bar as it is displayed. (unit: midi ticks)
     * This might differ from the actual playback time due to special grace types.
     */
    displayStart: number;
    /**
     * The calculated visual end position of this beat in midi ticks.
     */
    get displayEnd(): number;
    /**
     * The timeline position of the voice within the current bar as it is played. (unit: midi ticks)
     * This might differ from the actual playback time due to special grace types.
     */
    playbackStart: number;
    /**
     * Gets or sets the duration that is used for the display of this beat. It defines the size/width of the beat in
     * the music sheet. (unit: midi ticks).
     */
    displayDuration: number;
    /**
     * Gets or sets the duration that the note is played during the audio generation.
     */
    playbackDuration: number;
    /**
     * The duration in midi ticks to use for this beat on the {@link displayDuration}
     * controlling the visual display of the beat.
     * @remarks
     * This is used in scenarios where the bar might not have 100% exactly
     * a linear structure between the beats. e.g. in MusicXML when using `<forward />`.
     */
    overrideDisplayDuration?: number;
    /**
     * The type of golpe to play.
     */
    golpe: GolpeType;
    get absoluteDisplayStart(): number;
    get absolutePlaybackStart(): number;
    /**
     * Gets or sets the dynamics applied to this beat.
     */
    dynamics: DynamicValue;
    /**
     * Gets or sets a value indicating whether the beam direction should be inverted.
     */
    invertBeamDirection: boolean;
    /**
     * Gets or sets the preferred beam direction as specified in the input source.
     */
    preferredBeamDirection: BeamDirection | null;
    /**
     * @json_ignore
     */
    isEffectSlurOrigin: boolean;
    get isEffectSlurDestination(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurOrigin: Beat | null;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurDestination: Beat | null;
    /**
     * Gets or sets how the beaming should be done for this beat.
     */
    beamingMode: BeatBeamingMode;
    /**
     * Whether the wah pedal should be used when playing the beat.
     */
    wahPedal: WahPedal;
    /**
     * The fret of a barré being played on this beat.
     */
    barreFret: number;
    /**
     * The shape how the barre should be played on this beat.
     */
    barreShape: BarreShape;
    /**
     * Gets a value indicating whether the beat should be played as Barré
     */
    get isBarre(): boolean;
    /**
     * The Rasgueado pattern to play with this beat.
     */
    rasgueado: Rasgueado;
    /**
     * Whether to show the time when this beat is played the first time.
     * (requires that the midi for the song is generated so that times are calculated).
     * If no midi is generated the timer value might be filled from the input file (or manually).
     */
    showTimer: boolean;
    /**
     * The absolute time in milliseconds when this beat will be played the first time.
     */
    timer: number | null;
    /**
     * The style customizations for this item.
     * @clone_ignore
     */
    style?: BeatStyle;
    addWhammyBarPoint(point: BendPoint): void;
    removeWhammyBarPoint(index: number): void;
    addNote(note: Note): void;
    removeNote(note: Note): void;
    getAutomation(type: AutomationType): Automation | null;
    getNoteOnString(noteString: number): Note | null;
    private calculateDuration;
    updateDurations(): void;
    finishTuplet(): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    /**
     * Checks whether the current beat is timewise before the given beat.
     * @param beat
     * @returns
     */
    isBefore(beat: Beat): boolean;
    /**
     * Checks whether the current beat is timewise after the given beat.
     * @param beat
     * @returns
     */
    isAfter(beat: Beat): boolean;
    hasNoteOnString(noteString: number): boolean;
    getNoteWithRealValue(noteRealValue: number): Note | null;
    chain(sharedDataBag?: Map<string, unknown> | null): void;
}

/**
 * Lists the different modes on how beaming for a beat should be done.
 */
declare enum BeatBeamingMode {
    /**
     * Automatic beaming based on the timing rules.
     */
    Auto = 0,
    /**
     * Force a split to the next beat.
     */
    ForceSplitToNext = 1,
    /**
     * Force a merge with the next beat.
     */
    ForceMergeWithNext = 2,
    /**
     * Force a split to the next beat on the secondary beam.
     */
    ForceSplitOnSecondaryToNext = 3
}

/**
 * Represents the bounds of a single beat.
 */
declare class BeatBounds {
    /**
     * Gets or sets the reference to the parent {@link BarBounds}.
     */
    barBounds: BarBounds;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning this beat.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets x-position where the timely center of the notes for this beat is.
     * This is where the cursor should be at the time when this beat is played.
     */
    onNotesX: number;
    /**
     * Gets or sets the actual bounds of the elements in this beat including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the beat related to this bounds.
     */
    beat: Beat;
    /**
     * Gets or sets the individual note positions of this beat (if {@link CoreSettings.includeNoteBounds} was set to true).
     */
    notes: NoteBounds[] | null;
    /**
     * Adds a new note to this bounds.
     * @param bounds The note bounds to add.
     */
    addNote(bounds: NoteBounds): void;
    /**
     * Tries to find a note at the given position.
     * @param x The X-position of the note to find.
     * @param y The Y-position of the note to find.
     * @returns The note at the given position or null if no note was found, or the note lookup was not enabled before rendering.
     */
    findNoteAtPos(x: number, y: number): Note | null;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(scale?: number): void;
}

declare class BeatContainerGlyph extends Glyph {
    static readonly GraceBeatPadding: number;
    voiceContainer: VoiceContainerGlyph;
    beat: Beat;
    preNotes: BeatGlyphBase;
    onNotes: BeatOnNoteGlyphBase;
    ties: Glyph[];
    minWidth: number;
    get onTimeX(): number;
    constructor(beat: Beat, voiceContainer: VoiceContainerGlyph);
    addTie(tie: Glyph): void;
    protected drawBeamHelperAsFlags(helper: BeamingHelper): boolean;
    registerLayoutingInfo(layoutings: BarLayoutingInfo): void;
    applyLayoutingInfo(info: BarLayoutingInfo): void;
    doLayout(): void;
    protected updateWidth(): void;
    scaleToWidth(beatWidth: number): void;
    protected createTies(n: Note): void;
    static getGroupId(beat: Beat): string;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    buildBoundingsLookup(barBounds: BarBounds, cx: number, cy: number, isEmptyBar: boolean): void;
}

declare class BeatGlyphBase extends GlyphGroup {
    private _effectGlyphs;
    private _normalGlyphs;
    container: BeatContainerGlyph;
    computedWidth: number;
    constructor();
    doLayout(): void;
    protected noteLoop(action: (note: Note) => void): void;
    addEffect(g: Glyph): void;
    addNormal(g: Glyph): void;
    protected get effectElement(): BeatSubElement | undefined;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    private paintNormal;
    private paintEffects;
}

declare class BeatOnNoteGlyphBase extends BeatGlyphBase {
    beamingHelper: BeamingHelper;
    centerX: number;
    updateBeamingHelper(): void;
    buildBoundingsLookup(beatBounds: BeatBounds, cx: number, cy: number): void;
    getNoteX(note: Note, requestedPosition: NoteXPosition): number;
    getNoteY(note: Note, requestedPosition: NoteYPosition): number;
}

/**
 * Defines the custom styles for beats.
 * @json
 * @json_strict
 */
declare class BeatStyle extends ElementStyle<BeatSubElement> {
}

/**
 * Lists all graphical sub elements within a {@link Beat} which can be styled via {@link Beat.style}
 */
declare enum BeatSubElement {
    /**
     * The effects and annotations shown in dedicated effect bands above the staves (e.g. fermata).
     * Only applies to items which are on beat level but not any individual note level effects.
     */
    Effects = 0,
    /**
     * The stems drawn for note heads in this beat on the standard notation staff.
     */
    StandardNotationStem = 1,
    /**
     * The flags drawn for note heads in this beat on the standard notation staff.
     */
    StandardNotationFlags = 2,
    /**
     * The beams drawn between this and the next beat on the standard notation staff.
     */
    StandardNotationBeams = 3,
    /**
     * The tuplet drawn on the standard notation staff (the first beat affects the whole tuplet if grouped).
     */
    StandardNotationTuplet = 4,
    /**
     * The effects and annotations applied to this beat on the standard notation staff (e.g. brushes).
     * Only applies to items which are on beat level but not any individual note level effects.
     */
    StandardNotationEffects = 5,
    /**
     * The rest symbol on the standard notation staff.
     */
    StandardNotationRests = 6,
    /**
     * The stems drawn for note heads in this beat on the guitar tab staff.
     */
    GuitarTabStem = 7,
    /**
     * The flags drawn for note heads in this beat on the guitar tab staff.
     */
    GuitarTabFlags = 8,
    /**
     * The beams drawn between this and the next beat on the guitar tab staff.
     */
    GuitarTabBeams = 9,
    /**
     * The tuplet drawn on the guitar tab staff (the first beat affects the whole tuplet if grouped).
     */
    GuitarTabTuplet = 10,
    /**
     * The effects and annotations applied to this beat on the guitar tab staff (e.g. brushes).
     * Only applies to items which are on beat level but not any individual note level effects.
     */
    GuitarTabEffects = 11,
    /**
     * The rest symbol on the guitar tab staff.
     */
    GuitarTabRests = 12,
    /**
     * The stems drawn for note heads in this beat on the slash staff.
     */
    SlashStem = 13,
    /**
     * The flags drawn for note heads in this beat on the slash staff.
     */
    SlashFlags = 14,
    /**
     * The beams drawn between this and the next beat on the slash staff.
     */
    SlashBeams = 15,
    /**
     * The tuplet drawn on the slash staff (the first beat affects the whole tuplet if grouped).
     */
    SlashTuplet = 16,
    /**
     * The rest symbol on the slash staff.
     */
    SlashRests = 17,
    /**
     * The effects and annotations applied to this beat on the slash staff (e.g. brushes).
     * Only applies to items which are on beat level but not any individual note level effects.
     */
    SlashEffects = 18,
    /**
     * The duration lines drawn for this beat on the numbered notation staff.
     */
    NumberedDuration = 19,
    /**
     * The effects and annotations applied to this beat on the numbered notation staff (e.g. brushes).
     * Only applies to items which are on beat level but not any individual note level effects.
     */
    NumberedEffects = 20,
    /**
     * The rest (0) on the numbered notation staff.
     */
    NumberedRests = 21,
    /**
     * The tuplet drawn on the numbered notation staff (the first beat affects the whole tuplet if grouped).
     */
    NumberedTuplet = 22
}

/**
 * Represents the time period, for which one or multiple {@link Beat}s are played
 */
declare class BeatTickLookup {
    private _highlightedBeats;
    /**
     * Gets or sets the start time in midi ticks at which the given beat is played.
     */
    start: number;
    /**
     * Gets or sets the end time in midi ticks at which the given beat is played.
     */
    end: number;
    /**
     * Gets or sets a list of all beats that should be highlighted when
     * the beat of this lookup starts playing. This might not mean
     * the beats start at this position.
     */
    highlightedBeats: BeatTickLookupItem[];
    /**
     * Gets the next BeatTickLookup which comes after this one and is in the same
     * MasterBarTickLookup.
     */
    nextBeat: BeatTickLookup | null;
    /**
     * Gets the preivous BeatTickLookup which comes before this one and is in the same
     * MasterBarTickLookup.
     */
    previousBeat: BeatTickLookup | null;
    /**
     * Gets the tick duration of this lookup.
     */
    get duration(): number;
    constructor(start: number, end: number);
    /**
     * Marks the given beat as highlighed as part of this lookup.
     * @param beat The beat to add.
     */
    highlightBeat(beat: Beat, playbackStart: number): void;
    /**
     * Looks for the first visible beat which starts at this lookup so it can be used for cursor placement.
     * @param visibleTracks The visible tracks.
     * @returns The first beat which is visible according to the given tracks or null.
     */
    getVisibleBeatAtStart(visibleTracks: Set<number>): Beat | null;
}

/**
 * Represents a beat and when it is actually played according to the generated audio.
 */
declare class BeatTickLookupItem {
    /**
     * Gets the beat represented by this item.
     */
    readonly beat: Beat;
    /**
     * Gets the playback start of the beat according to the generated audio.
     */
    readonly playbackStart: number;
    constructor(beat: Beat, playbackStart: number);
}

/**
 * Lists the different position modes for {@link BarRendererBase.getBeatX}
 */
declare enum BeatXPosition {
    /**
     * Gets the pre-notes position which is located before the accidentals
     */
    PreNotes = 0,
    /**
     * Gets the on-notes position which is located after the accidentals but before the note heads.
     */
    OnNotes = 1,
    /**
     * Gets the middle-notes position which is located after in the middle the note heads.
     */
    MiddleNotes = 2,
    /**
     * Gets position of the stem for this beat
     */
    Stem = 3,
    /**
     * Get the post-notes position which is located at after the note heads.
     */
    PostNotes = 4,
    /**
     * Get the end-beat position which is located at the end of the beat. This position is almost
     * equal to the pre-notes position of the next beat.
     */
    EndBeat = 5
}

/**
 * A single point of a bending graph. Used to
 * describe WhammyBar and String Bending effects.
 * @cloneable
 * @json
 * @json_strict
 */
declare class BendPoint {
    static readonly MaxPosition: number;
    static readonly MaxValue: number;
    /**
     * Gets or sets offset of the point relative to the note duration (0-60)
     */
    offset: number;
    /**
     * Gets or sets the 1/4 note value offsets for the bend.
     */
    value: number;
    /**
     * Initializes a new instance of the {@link BendPoint} class.
     * @param offset The offset.
     * @param value The value.
     */
    constructor(offset?: number, value?: number);
}

/**
 * Lists the different bend styles
 */
declare enum BendStyle {
    /**
     * The bends are as described by the bend points
     */
    Default = 0,
    /**
     * The bends are gradual over the beat duration.
     */
    Gradual = 1,
    /**
     * The bends are done fast before the next note.
     */
    Fast = 2
}

/**
 * Lists all types of bends
 */
declare enum BendType {
    /**
     * No bend at all
     */
    None = 0,
    /**
     * Individual points define the bends in a flexible manner.
     * This system was mainly used in Guitar Pro 3-5
     */
    Custom = 1,
    /**
     * Simple Bend from an unbended string to a higher note.
     */
    Bend = 2,
    /**
     * Release of a bend that was started on an earlier note.
     */
    Release = 3,
    /**
     * A bend that starts from an unbended string,
     * and also releases the bend after some time.
     */
    BendRelease = 4,
    /**
     * Holds a bend that was started on an earlier note
     */
    Hold = 5,
    /**
     * A bend that is already started before the note is played then it is held until the end.
     */
    Prebend = 6,
    /**
     * A bend that is already started before the note is played and
     * bends even further, then it is held until the end.
     */
    PrebendBend = 7,
    /**
     * A bend that is already started before the note is played and
     * then releases the bend to a lower note where it is held until the end.
     */
    PrebendRelease = 8
}

/**
 * Represents a rectangular area within the renderer music notation.
 */
declare class Bounds {
    /**
     * Gets or sets the X-position of the rectangle within the music notation.
     */
    x: number;
    /**
     * Gets or sets the Y-position of the rectangle within the music notation.
     */
    y: number;
    /**
     * Gets or sets the width of the rectangle.
     */
    w: number;
    /**
     * Gets or sets the height of the rectangle.
     */
    h: number;
    scaleWith(scale: number): void;
}

declare class BoundsLookup {
    /**
     * @target web
     */
    toJson(): unknown;
    /**
     * @target web
     */
    static fromJson(json: unknown, score: Score): BoundsLookup;
    /**
     * @target web
     */
    private static boundsFromJson;
    /**
     * @target web
     */
    private boundsToJson;
    private _beatLookup;
    private _masterBarLookup;
    private _currentStaffSystem;
    /**
     * Gets a list of all individual staff systems contained in the rendered music notation.
     */
    staffSystems: StaffSystemBounds[];
    /**
     * Gets or sets a value indicating whether this lookup was finished already.
     */
    isFinished: boolean;
    /**
     * Finishes the lookup for optimized access.
     */
    finish(scale?: number): void;
    /**
     * Adds a new staff sytem to the lookup.
     * @param bounds The staff system bounds to add.
     */
    addStaffSystem(bounds: StaffSystemBounds): void;
    /**
     * Adds a new master bar to the lookup.
     * @param bounds The master bar bounds to add.
     */
    addMasterBar(bounds: MasterBarBounds): void;
    /**
     * Adds a new beat to the lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
    /**
     * Tries to find the master bar bounds by a given index.
     * @param index The index of the master bar to find.
     * @returns The master bar bounds if it was rendered, or null if no boundary information is available.
     */
    findMasterBarByIndex(index: number): MasterBarBounds | null;
    /**
     * Tries to find the master bar bounds by a given master bar.
     * @param bar The master bar to find.
     * @returns The master bar bounds if it was rendered, or null if no boundary information is available.
     */
    findMasterBar(bar: MasterBar): MasterBarBounds | null;
    /**
     * Tries to find the bounds of a given beat.
     * @param beat The beat to find.
     * @returns The beat bounds if it was rendered, or null if no boundary information is available.
     */
    findBeat(beat: Beat): BeatBounds | null;
    /**
     * Tries to find the bounds of a given beat.
     * @param beat The beat to find.
     * @returns The beat bounds if it was rendered, or null if no boundary information is available.
     */
    findBeats(beat: Beat): BeatBounds[] | null;
    /**
     * Tries to find a beat at the given absolute position.
     * @param x The absolute X-position of the beat to find.
     * @param y The absolute Y-position of the beat to find.
     * @returns The beat found at the given position or null if no beat could be found.
     */
    getBeatAtPos(x: number, y: number): Beat | null;
    /**
     * Tries to find the note at the given position using the given beat for fast access.
     * Use {@link findBeat} to find a beat for a given position first.
     * @param beat The beat containing the note.
     * @param x The X-position of the note.
     * @param y The Y-position of the note.
     * @returns The note at the given position within the beat.
     */
    getNoteAtPos(beat: Beat, x: number, y: number): Note | null;
}

/**
 * Lists the different modes on how the brackets/braces are drawn and extended.
 */
declare enum BracketExtendMode {
    /**
     * Do not draw brackets
     */
    NoBrackets = 0,
    /**
     * Groups staves into bracket (or braces for grand staff).
     */
    GroupStaves = 1,
    /**
     * Groups similar instruments in multi-track rendering into brackets.
     * The braces of tracks with grand-staffs break any brackets.
     * Similar instruments means actually the same "midi program". No custom grouping is currently done.
     */
    GroupSimilarInstruments = 2
}

/**
 * Lists all types of how to brush multiple notes on a beat.
 */
declare enum BrushType {
    /**
     * No brush.
     */
    None = 0,
    /**
     * Normal brush up.
     */
    BrushUp = 1,
    /**
     * Normal brush down.
     */
    BrushDown = 2,
    /**
     * Arpeggio up.
     */
    ArpeggioUp = 3,
    /**
     * Arpeggio down.
     */
    ArpeggioDown = 4
}

declare class ByteBuffer implements IWriteable, IReadable {
    private _buffer;
    length: number;
    position: number;
    get bytesWritten(): number;
    getBuffer(): Uint8Array;
    static empty(): ByteBuffer;
    static withCapacity(capacity: number): ByteBuffer;
    static fromBuffer(data: Uint8Array): ByteBuffer;
    static fromString(contents: string): ByteBuffer;
    reset(): void;
    skip(offset: number): void;
    readByte(): number;
    read(buffer: Uint8Array, offset: number, count: number): number;
    writeByte(value: number): void;
    write(buffer: Uint8Array, offset: number, count: number): void;
    private ensureCapacity;
    readAll(): Uint8Array;
    toArray(): Uint8Array;
    copyTo(destination: IWriteable): void;
}

/**
 * A chord definition.
 * @json
 * @json_strict
 */
declare class Chord {
    /**
     * Gets or sets the name of the chord
     */
    name: string;
    /**
     * Indicates the first fret of the chord diagram.
     */
    firstFret: number;
    /**
     * Gets or sets the frets played on the individual strings for this chord.
     * - The order in this list goes from the highest string to the lowest string.
     * - -1 indicates that the string is not played.
     */
    strings: number[];
    /**
     * Gets or sets a list of frets where the finger should hold a barre
     */
    barreFrets: number[];
    /**
     * Gets or sets the staff the chord belongs to.
     * @json_ignore
     */
    staff: Staff;
    /**
     * Gets or sets whether the chord name is shown above the chord diagram.
     */
    showName: boolean;
    /**
     * Gets or sets whether the chord diagram is shown.
     */
    showDiagram: boolean;
    /**
     * Gets or sets whether the fingering is shown below the chord diagram.
     */
    showFingering: boolean;
    /**
     * Gets a unique id for this chord based on its properties.
     */
    get uniqueId(): string;
}

declare class ChordDiagramContainerGlyph extends RowContainerGlyph {
    addChord(chord: Chord): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * Represents a fixed size circular sample buffer that can be written to and read from.
 * @csharp_public
 */
declare class CircularSampleBuffer {
    private _buffer;
    private _writePosition;
    private _readPosition;
    /**
     * Gets the number of samples written to the buffer.
     */
    count: number;
    /**
     * Initializes a new instance of the {@link CircularSampleBuffer} class.
     * @param size The size.
     */
    constructor(size: number);
    /**
     * Clears all samples written to this buffer.
     */
    clear(): void;
    /**
     * Writes the given samples to this buffer.
     * @param data The sample array to read from.
     * @param offset
     * @param count
     * @returns
     */
    write(data: Float32Array, offset: number, count: number): number;
    /**
     * Reads the requested amount of samples from the buffer.
     * @param data The sample array to store the read elements.
     * @param offset The offset within the destination buffer to put the items at.
     * @param count The number of items to read from this buffer.
     * @returns The number of items actually read from the buffer.
     */
    read(data: Float32Array, offset: number, count: number): number;
}

/**
 * This public enumeration lists all supported Clefs.
 */
declare enum Clef {
    /**
     * Neutral clef.
     */
    Neutral = 0,
    /**
     * C3 clef
     */
    C3 = 1,
    /**
     * C4 clef
     */
    C4 = 2,
    /**
     * F4 clef
     */
    F4 = 3,
    /**
     * G2 clef
     */
    G2 = 4
}

/**
 * @json_immutable
 */
declare class Color {
    static readonly BlackRgb: string;
    /**
     * Initializes a new instance of the {@link Color} class.
     * @param r The red component.
     * @param g The green component.
     * @param b The blue component.
     * @param a The alpha component.
     */
    constructor(r: number, g: number, b: number, a?: number);
    updateRgba(): void;
    /**
     * Gets or sets the raw RGBA value.
     */
    raw: number;
    get a(): number;
    get r(): number;
    get g(): number;
    get b(): number;
    /**
     * Gets the RGBA hex string to use in CSS areas.
     */
    rgba: string;
    static random(opacity?: number): Color;
    static fromJson(v: unknown): Color | null;
    static toJson(obj: Color | null): number | null;
}

/**
 * Describes a color for rendering.
 * If provided as string one of these formats needs to be used: #RGB, #RGBA, #RRGGBB, #RRGGBBAA, rgb(r,g,b), rgba(r,g,b,a)
 * If provided as number a raw RGBA value needs to be used.
 *
 * @target web
 */
declare type ColorJson = Color | string | number;

export declare class ConsoleLogger implements ILogger {
    static logLevel: LogLevel;
    private static format;
    debug(category: string, msg: string, ...details: unknown[]): void;
    warning(category: string, msg: string, ...details: unknown[]): void;
    info(category: string, msg: string, ...details: unknown[]): void;
    error(category: string, msg: string, ...details: unknown[]): void;
}

/**
 * Represents the change of a value on a midi controller.
 */
declare class ControlChangeEvent extends MidiEvent {
    /**
     * The channel for which the controller is changing.
     */
    channel: number;
    /**
     * The type of the controller which is changing.
     */
    controller: ControllerType;
    /**
     * The new value of the controller. The meaning is depending on the controller type.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, controller: ControllerType, value: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
    get data2(): number;
}

/**
 * Lists all midi controllers.
 */
declare enum ControllerType {
    /**
     * Bank Select. MSB
     */
    BankSelectCoarse = 0,
    /**
     * Modulation wheel or lever MSB
     */
    ModulationCoarse = 1,
    /**
     * Data entry MSB
     */
    DataEntryCoarse = 6,
    /**
     * Channel Volume MSB
     */
    VolumeCoarse = 7,
    /**
     * Pan MSB
     */
    PanCoarse = 10,
    /**
     * Expression Controller MSB
     */
    ExpressionControllerCoarse = 11,
    BankSelectFine = 32,
    /**
     * Modulation wheel or level LSB
     */
    ModulationFine = 33,
    /**
     * Data Entry LSB
     */
    DataEntryFine = 38,
    /**
     * Channel Volume LSB
     */
    VolumeFine = 39,
    /**
     * Pan LSB
     */
    PanFine = 42,
    /**
     * Expression controller LSB
     */
    ExpressionControllerFine = 43,
    /**
     * Damper pedal (sustain)
     */
    HoldPedal = 64,
    /**
     * Legato Footswitch
     */
    LegatoPedal = 68,
    /**
     * Non-Registered Parameter Number LSB
     */
    NonRegisteredParameterFine = 98,
    /**
     * Non-Registered Parameter Number MSB
     */
    NonRegisteredParameterCourse = 99,
    /**
     * Registered Parameter Number LSB
     */
    RegisteredParameterFine = 100,
    /**
     * Registered Parameter Number MSB
     */
    RegisteredParameterCourse = 101,
    AllSoundOff = 120,
    /**
     * Reset all controllers
     */
    ResetControllers = 121,
    /**
     * All notes of.
     */
    AllNotesOff = 123
}

/**
 * All main settings of alphaTab controlling rather general aspects of its behavior.
 * @json
 * @json_declaration
 */
export declare class CoreSettings {
    /**
     * The full URL to the alphaTab JavaScript file.
     * @remarks
     * AlphaTab needs to know the full URL to the script file it is contained in to launch the web workers. AlphaTab will do its best to auto-detect
     * this path but in case it fails, this setting can be used to explicitly define it. Altenatively also a global variable `ALPHATAB_ROOT` can
     * be defined before initializing. Please be aware that bundling alphaTab together with other scripts might cause errors
     * in case those scripts are not suitable for web workers. e.g. if there is a script bundled together with alphaTab that accesses the DOM,
     * this will cause an error when alphaTab starts this script as worker.
     * @defaultValue Absolute url to JavaScript file containing alphaTab. (auto detected)
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    scriptFile: string | null;
    /**
     * The full URL to the alphaTab font directory.
     * @remarks
     * AlphaTab will generate some dynamic CSS that is needed for displaying the music symbols correctly. For this it needs to know
     * where the Web Font files of [Bravura](https://github.com/steinbergmedia/bravura) are. Normally alphaTab expects
     * them to be in a `font` subfolder beside the script file. If this is not the case, this setting must be used to configure the path.
     * Alternatively also a global variable `ALPHATAB_FONT` can be set on the page before initializing alphaTab.
     *
     * Use {@link smuflFontSources} for more flexible font configuration.
     * @defaultValue `"${AlphaTabScriptFolder}/font/"`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    fontDirectory: string | null;
    /**
     * Defines the URLs from which to load the SMuFL compliant font files.
     * @remarks
     * These sources will be used to load and register the webfonts on the page so
     * they are available for rendering the music sheet. The sources can be set to any
     * CSS compatible URL which can be passed into `url()`.
     * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#url
     * @defaultValue Bravura files located at {@link fontDirectory} .
     * @category Core - JavaScript Specific
     * @target web
     * @since 1.6.0
     */
    smuflFontSources: Map<FontFileFormat, string> | null;
    /**
     * Builds the default SMuFL font sources for the usage with alphaTab in cases
     * where no custom {@link smuflFontSources} are provided.
     * @param fontDirectory The {@link CoreSettings.fontDirectory} configured.
     * @target web
     */
    static buildDefaultSmuflFontSources(fontDirectory: string | null): Map<FontFileFormat, string>;
    /**
     * The full URL to the input file to be loaded.
     * @remarks
     * AlphaTab can automatically load and render a file after initialization. This eliminates the need of manually calling
     * one of the load methods which are available. alphaTab will automatically initiate an `XMLHttpRequest` after initialization
     * to load and display the provided url of this setting. Note that this setting is only interpreted once on initialization.
     * @defaultValue `null`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    file: string | null;
    /**
     * Whether the contents of the DOM element should be loaded as alphaTex.
     * @target web
     * @remarks
     * This setting allows you to fill alphaTex code into the DOM element and make alphaTab automatically
     * load it when initializing. Note that this setting is only interpreted once on initialization.
     * @defaultValue `false`
     * @category Core - JavaScript Specific
     * @since 0.9.6
     * @example
     * JavaScript
     * ```html
     * <div id="alphaTab">\title "Simple alphaTex init" . 3.3*4</div>
     * <script>
     * const api = new alphaTab.AlphaTabApi(document.getElementById('alphaTab'), { core: { tex: true }});
     * </script>
     * ```
     */
    tex: boolean;
    /**
     * The tracks to display for the initally loaded file.
     * @json_raw
     * @remarks
     * This setting can be used in combinition with the {@link file} or {@link tex} option. It controls which of the tracks
     * of the initially loaded file should be displayed.
     * @defaultValue `null`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    tracks: number | number[] | 'all' | null;
    /**
     * Enables lazy loading of the rendered music sheet chunks.
     * @remarks
     * AlphaTab renders the music sheet in smaller sub-chunks to have fast UI feedback. Not all of those sub-chunks are immediately
     * appended to the DOM due to performance reasons. AlphaTab tries to detect which elements are visible on the screen, and only
     * appends those elements to the DOM. This reduces the load of the browser heavily but is not working for all layouts and use cases.
     * This setting set to false, ensures that all rendered items are instantly appended to the DOM.
     * The lazy rendering of partial might not be available on all platforms.
     * @defaultValue `true`
     * @category Core
     * @since 0.9.6
     */
    enableLazyLoading: boolean;
    /**
     * The engine which should be used to render the the tablature.
     * @remarks
     * AlphaTab can use various render engines to draw the music notation. The available render engines is specific to the platform. Please refer to the table below to find out which engines are available on which platform.
     * - `default`- Platform specific default engine
     * - `html5`- Uses HTML5 canvas elements to render the music notation (browser only)
     * - `svg`- Outputs SVG strings (all platforms, default for web)
     * - `skia` - Uses [Skia](https://skia.org/) for rendering (all non-browser platforms via [alphaSkia](https://github.com/CoderLine/alphaSkia), default for non-web)
     * - `gdi` - Uses [GDI+](https://docs.microsoft.com/en-us/dotnet/framework/winforms/advanced/graphics-and-drawing-in-windows-forms) for rendering (only on .net)
     * - `android` - Uses [android.graphics.Canvas](https://developer.android.com/reference/android/graphics/Canvas) for rendering (only on Android)
     * @defaultValue `"default"`
     * @category Core
     * @since 0.9.6
     */
    engine: string;
    /**
     * The log level to use within alphaTab
     * @remarks
     * AlphaTab internally does quite a bit of logging for debugging and informational purposes. The log level of alphaTab can be controlled via this setting.
     * @defaultValue `LogLevel.Info`
     * @category Core
     * @since 0.9.6
     */
    logLevel: LogLevel;
    /**
     * Whether the rendering should be done in a worker if possible.
     * @remarks
     * AlphaTab normally tries to render the music sheet asynchronously in a worker. This reduces the load on the UI side and avoids hanging. However sometimes it might be more desirable to have
     * a synchronous rendering behavior. This setting can be set to false to synchronously render the music sheet on the UI side.
     * @defaultValue `true`
     * @category Core
     * @since 0.9.6
     */
    useWorkers: boolean;
    /**
     * Whether in the {@link BoundsLookup} also the position and area of each individual note is provided.
     * @remarks
     * AlphaTab collects the position of the rendered music notation elements during the rendering process. This way some level of interactivity can be provided like the feature that seeks to the corresponding position when clicking on a beat.
     * By default the position of the individual notes is not collected due to performance reasons. If access to note position information is needed, this setting can enable it.
     * @defaultValue `false`
     * @category Core
     * @since 0.9.6
     * @example
     * JavaScript
     * ```js
     * const settings = new alphaTab.model.Settings();
     * settings.core.includeNoteBounds = true;
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'), settings);
     * api.renderFinished.on(() => {
     *     const lookup = api.renderer.boundsLookup;
     *     const x = 100;
     *     const y = 100;
     *     const beat = lookup.getBeatAtPos(x, y);
     *     const note = lookup.getNoteAtPos(beat, x, y);
     * });
     * ```
     */
    includeNoteBounds: boolean;
    /**
     * @target web
     */
    constructor();
}

/**
 * All main settings of alphaTab controlling rather general aspects of its behavior.
 * @json
 * @json_declaration
 * @target web
 */
declare interface CoreSettingsJson {
    /**
     * The full URL to the alphaTab JavaScript file.
     * @remarks
     * AlphaTab needs to know the full URL to the script file it is contained in to launch the web workers. AlphaTab will do its best to auto-detect
     * this path but in case it fails, this setting can be used to explicitly define it. Altenatively also a global variable `ALPHATAB_ROOT` can
     * be defined before initializing. Please be aware that bundling alphaTab together with other scripts might cause errors
     * in case those scripts are not suitable for web workers. e.g. if there is a script bundled together with alphaTab that accesses the DOM,
     * this will cause an error when alphaTab starts this script as worker.
     * @defaultValue Absolute url to JavaScript file containing alphaTab. (auto detected)
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    scriptFile?: string | null;
    /**
     * The full URL to the alphaTab font directory.
     * @remarks
     * AlphaTab will generate some dynamic CSS that is needed for displaying the music symbols correctly. For this it needs to know
     * where the Web Font files of [Bravura](https://github.com/steinbergmedia/bravura) are. Normally alphaTab expects
     * them to be in a `font` subfolder beside the script file. If this is not the case, this setting must be used to configure the path.
     * Alternatively also a global variable `ALPHATAB_FONT` can be set on the page before initializing alphaTab.
     *
     * Use {@link smuflFontSources} for more flexible font configuration.
     * @defaultValue `"${AlphaTabScriptFolder}/font/"`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    fontDirectory?: string | null;
    /**
     * Defines the URLs from which to load the SMuFL compliant font files.
     * @remarks
     * These sources will be used to load and register the webfonts on the page so
     * they are available for rendering the music sheet. The sources can be set to any
     * CSS compatible URL which can be passed into `url()`.
     * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#url
     * @defaultValue Bravura files located at {@link fontDirectory} .
     * @category Core - JavaScript Specific
     * @target web
     * @since 1.6.0
     */
    smuflFontSources?: Map<FontFileFormat | keyof typeof FontFileFormat | Lowercase<keyof typeof FontFileFormat>, string>;
    /**
     * The full URL to the input file to be loaded.
     * @remarks
     * AlphaTab can automatically load and render a file after initialization. This eliminates the need of manually calling
     * one of the load methods which are available. alphaTab will automatically initiate an `XMLHttpRequest` after initialization
     * to load and display the provided url of this setting. Note that this setting is only interpreted once on initialization.
     * @defaultValue `null`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    file?: string | null;
    /**
     * Whether the contents of the DOM element should be loaded as alphaTex.
     * @target web
     * @remarks
     * This setting allows you to fill alphaTex code into the DOM element and make alphaTab automatically
     * load it when initializing. Note that this setting is only interpreted once on initialization.
     * @defaultValue `false`
     * @category Core - JavaScript Specific
     * @since 0.9.6
     * @example
     * JavaScript
     * ```html
     * <div id="alphaTab">\title "Simple alphaTex init" . 3.3*4</div>
     * <script>
     * const api = new alphaTab.AlphaTabApi(document.getElementById('alphaTab'), { core: { tex: true }});
     * </script>
     * ```
     */
    tex?: boolean;
    /**
     * The tracks to display for the initally loaded file.
     * @json_raw
     * @remarks
     * This setting can be used in combinition with the {@link file} or {@link tex} option. It controls which of the tracks
     * of the initially loaded file should be displayed.
     * @defaultValue `null`
     * @category Core - JavaScript Specific
     * @target web
     * @since 0.9.6
     */
    tracks?: number | number[] | "all" | null;
    /**
     * Enables lazy loading of the rendered music sheet chunks.
     * @remarks
     * AlphaTab renders the music sheet in smaller sub-chunks to have fast UI feedback. Not all of those sub-chunks are immediately
     * appended to the DOM due to performance reasons. AlphaTab tries to detect which elements are visible on the screen, and only
     * appends those elements to the DOM. This reduces the load of the browser heavily but is not working for all layouts and use cases.
     * This setting set to false, ensures that all rendered items are instantly appended to the DOM.
     * The lazy rendering of partial might not be available on all platforms.
     * @defaultValue `true`
     * @category Core
     * @since 0.9.6
     */
    enableLazyLoading?: boolean;
    /**
     * The engine which should be used to render the the tablature.
     * @remarks
     * AlphaTab can use various render engines to draw the music notation. The available render engines is specific to the platform. Please refer to the table below to find out which engines are available on which platform.
     * - `default`- Platform specific default engine
     * - `html5`- Uses HTML5 canvas elements to render the music notation (browser only)
     * - `svg`- Outputs SVG strings (all platforms, default for web)
     * - `skia` - Uses [Skia](https://skia.org/) for rendering (all non-browser platforms via [alphaSkia](https://github.com/CoderLine/alphaSkia), default for non-web)
     * - `gdi` - Uses [GDI+](https://docs.microsoft.com/en-us/dotnet/framework/winforms/advanced/graphics-and-drawing-in-windows-forms) for rendering (only on .net)
     * - `android` - Uses [android.graphics.Canvas](https://developer.android.com/reference/android/graphics/Canvas) for rendering (only on Android)
     * @defaultValue `"default"`
     * @category Core
     * @since 0.9.6
     */
    engine?: string;
    /**
     * The log level to use within alphaTab
     * @remarks
     * AlphaTab internally does quite a bit of logging for debugging and informational purposes. The log level of alphaTab can be controlled via this setting.
     * @defaultValue `LogLevel.Info`
     * @category Core
     * @since 0.9.6
     */
    logLevel?: LogLevel | keyof typeof LogLevel | Lowercase<keyof typeof LogLevel>;
    /**
     * Whether the rendering should be done in a worker if possible.
     * @remarks
     * AlphaTab normally tries to render the music sheet asynchronously in a worker. This reduces the load on the UI side and avoids hanging. However sometimes it might be more desirable to have
     * a synchronous rendering behavior. This setting can be set to false to synchronously render the music sheet on the UI side.
     * @defaultValue `true`
     * @category Core
     * @since 0.9.6
     */
    useWorkers?: boolean;
    /**
     * Whether in the {@link BoundsLookup} also the position and area of each individual note is provided.
     * @remarks
     * AlphaTab collects the position of the rendered music notation elements during the rendering process. This way some level of interactivity can be provided like the feature that seeks to the corresponding position when clicking on a beat.
     * By default the position of the individual notes is not collected due to performance reasons. If access to note position information is needed, this setting can enable it.
     * @defaultValue `false`
     * @category Core
     * @since 0.9.6
     * @example
     * JavaScript
     * ```js
     * const settings = new alphaTab.model.Settings();
     * settings.core.includeNoteBounds = true;
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'), settings);
     * api.renderFinished.on(() => {
     *     const lookup = api.renderer.boundsLookup;
     *     const x = 100;
     *     const y = 100;
     *     const beat = lookup.getBeatAtPos(x, y);
     *     const note = lookup.getNoteAtPos(beat, x, y);
     * });
     * ```
     */
    includeNoteBounds?: boolean;
}

/**
 * Lists all Crescendo and Decrescendo types.
 */
declare enum CrescendoType {
    /**
     * No crescendo applied.
     */
    None = 0,
    /**
     * Normal crescendo applied.
     */
    Crescendo = 1,
    /**
     * Normal decrescendo applied.
     */
    Decrescendo = 2
}

/**
 * This SVG canvas renders the music symbols by adding a CSS class 'at' to all elements.
 */
declare class CssFontSvgCanvas extends SvgCanvas {
    fillMusicFontSymbol(x: number, y: number, relativeScale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    fillMusicFontSymbols(x: number, y: number, relativeScale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    private fillMusicFontSymbolText;
}

/**
 * This wrapper holds all cursor related elements.
 */
declare class Cursors {
    /**
     * Gets the element that spans across the whole music sheet and holds the other cursor elements.
     */
    readonly cursorWrapper: IContainer;
    /**
     * Gets the element that is positioned above the bar that is currently played.
     */
    readonly barCursor: IContainer;
    /**
     * Gets the element that is positioned above the beat that is currently played.
     */
    readonly beatCursor: IContainer;
    /**
     * Gets the element that spans across the whole music sheet and will hold any selection related elements.
     */
    readonly selectionWrapper: IContainer;
    /**
     * Initializes a new instance of the {@link Cursors} class.
     * @param cursorWrapper
     * @param barCursor
     * @param beatCursor
     * @param selectionWrapper
     */
    constructor(cursorWrapper: IContainer, barCursor: IContainer, beatCursor: IContainer, selectionWrapper: IContainer);
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class DeprecatedMidiEvent extends MidiEvent {
    constructor();
    writeTo(s: IWriteable): void;
}

/**
 * Lists all directions which can be applied to a masterbar.
 */
declare enum Direction {
    TargetFine = 0,
    TargetSegno = 1,
    TargetSegnoSegno = 2,
    TargetCoda = 3,
    TargetDoubleCoda = 4,
    JumpDaCapo = 5,
    JumpDaCapoAlCoda = 6,
    JumpDaCapoAlDoubleCoda = 7,
    JumpDaCapoAlFine = 8,
    JumpDalSegno = 9,
    JumpDalSegnoAlCoda = 10,
    JumpDalSegnoAlDoubleCoda = 11,
    JumpDalSegnoAlFine = 12,
    JumpDalSegnoSegno = 13,
    JumpDalSegnoSegnoAlCoda = 14,
    JumpDalSegnoSegnoAlDoubleCoda = 15,
    JumpDalSegnoSegnoAlFine = 16,
    JumpDaCoda = 17,
    JumpDaDoubleCoda = 18
}

/**
 * The display settings control how the general layout and display of alphaTab is done.
 * @json
 * @json_declaration
 */
export declare class DisplaySettings {
    /**
     * The zoom level of the rendered notation.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1.0`
     * @remarks
     * AlphaTab can scale up or down the rendered music notation for more optimized display scenarios. By default music notation is rendered at 100% scale (value 1) and can be scaled up or down by
     * percental values.
     */
    scale: number;
    /**
     * The default stretch force to use for layouting.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1`
     * @remarks
     * The stretch force is a setting that controls the spacing of the music notation. AlphaTab uses a varaint of the Gourlay algorithm for spacing which has springs and rods for
     * aligning elements. This setting controls the "strength" of the springs. The stronger the springs, the wider the spacing.
     *
     * | Force 1                                                      | Force 0.5                                             |
     * |--------------------------------------------------------------|-------------------------------------------------------|
     * | ![Default](https://alphatab.net/img/reference/property/stretchforce-default.png) | ![0.5](https://alphatab.net/img/reference/property/stretchforce-half.png) |
     */
    stretchForce: number;
    /**
     * The layouting mode used to arrange the the notation.
     * @remarks
     * AlphaTab has various layout engines that arrange the rendered bars differently. This setting controls which layout mode is used.
     *
     * @since 0.9.6
     * @category Display
     * @defaultValue `LayoutMode.Page`
     */
    layoutMode: LayoutMode;
    /**
     * The stave profile defining which staves are shown for the music sheet.
     * @since 0.9.6
     * @category Display
     * @defaultValue `StaveProfile.Default`
     * @remarks
     * AlphaTab has various stave profiles that define which staves will be shown in for the rendered tracks. Its recommended
     * to keep this on {@link StaveProfile.Default} and rather rely on the options available ob {@link Staff} level
     */
    staveProfile: StaveProfile;
    /**
     * Limit the displayed bars per system (row). (-1 for automatic mode)
     * @since 0.9.6
     * @category Display
     * @defaultValue `-1`
     * @remarks
     * This setting sets the number of bars that should be put into one row during layouting. This setting is only respected
     * when using the {@link LayoutMode.Page} where bars are aligned in systems. [Demo](https://alphatab.net/docs/showcase/layouts#page-layout-5-bars-per-row).
     */
    barsPerRow: number;
    /**
     * The bar start index to start layouting with.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1`
     * @remarks
     * This setting sets the index of the first bar that should be rendered from the overall song. This setting can be used to
     * achieve a paging system or to only show partial bars of the same file. By this a tutorial alike display can be achieved
     * that explains various parts of the song. Please note that this is the bar number as shown in the music sheet (1-based) not the array index (0-based).
     * [Demo](https://alphatab.net/docs/showcase/layouts#page-layout-bar-5-to-8)
     */
    startBar: number;
    /**
     * The total number of bars that should be rendered from the song. (-1 for all bars)
     * @since 0.9.6
     * @category Display
     * @defaultValue `-1`
     * @remarks
     * This setting sets the number of bars that should be rendered from the overall song. This setting can be used to
     * achieve a paging system or to only show partial bars of the same file. By this a tutorial alike display can be achieved
     * that explains various parts of the song. [Demo](https://alphatab.net/docs/showcase/layouts)
     */
    barCount: number;
    /**
     * The number of bars that should be placed within one partial render.
     * @since 0.9.6
     * @category Display
     * @defaultValue `10`
     * @remarks
     * AlphaTab renders the whole music sheet in smaller chunks named "partials". This is to reduce the risk of
     * encountering browser performance restrictions and it gives faster visual feedback to the user. This
     * setting controls how many bars are placed within such a partial.
     */
    barCountPerPartial: number;
    /**
     * Whether to justify also the last system in page layouts.
     * @remarks
     * Setting this option to `true` tells alphaTab to also justify the last system (row) like it
     * already does for the systems which are full.
     * | Justification Disabled                                       | Justification Enabled                                |
     * |--------------------------------------------------------------|-------------------------------------------------------|
     * | ![Disabled](https://alphatab.net/img/reference/property/justify-last-system-false.png) | ![Enabled](https://alphatab.net/img/reference/property/justify-last-system-true.png) |
     * @since 1.3.0
     * @category Display
     * @defaultValue `false`
     */
    justifyLastSystem: boolean;
    /**
     * Allows adjusting of the used fonts and colors for rendering.
     * @json_partial_names
     * @since 0.9.6
     * @category Display
     * @defaultValue `false`
     * @domWildcard
     * @remarks
     * AlphaTab allows configuring the colors and fonts used for rendering via the rendering resources settings. Please note that as of today
     * this is the primary way of changing the way how alphaTab styles elements. CSS styling in the browser cannot be guaranteed to work due to its flexibility.
     *
     *
     * Due to space reasons in the following table the common prefix of the settings are removed. Please refer to these examples to eliminate confusion on the usage:
     *
     * | Platform   | Prefix                    | Example Usage                                                      |
     * |------------|---------------------------|--------------------------------------------------------------------|
     * | JavaScript | `display.resources.`      | `settings.display.resources.wordsFont = ...`                       |
     * | JSON       | `display.resources.`      | `var settings = { display: { resources: { wordsFonts: '...'} } };` |
     * | JSON       | `resources.`              | `var settings = { resources: { wordsFonts: '...'} };`              |
     * | .net       | `Display.Resources.`      | `settings.Display.Resources.WordsFonts = ...`                      |
     * | Android    | `display.resources.`      | `settings.display.resources.wordsFonts = ...`                      |
     * ## Types
     *
     * ### Fonts
     *
     * For the JavaScript platform any font that might be installed on the client machines can be used.
     * Any additional fonts can be added via WebFonts. The rendering of the score will be delayed until it is detected that the font was loaded.
     * Simply use any CSS font property compliant string as configuration. Relative font sizes with percentual values are not supported, remaining values will be considered if supported.
     *
     * {@since 1.2.3} Multiple fonts are also supported for the Web version. alphaTab will check if any of the fonts in the list is loaded instead of all. If none is available at the time alphaTab is initialized, it will try to initiate the load of the specified fonts individual through the Browser Font APIs.
     *
     * For the .net platform any installed font on the system can be used. Simply construct the `Font` object to configure your desired fonts.
     *
     * ### Colors
     *
     * For JavaScript you can use any CSS font property compliant string. (#RGB, #RGBA, #RRGGBB, #RRGGBBAA, rgb(r,g,b), rgba(r,g,b,a) )
     *
     * On .net simply construct the `Color` object to configure your desired color.
     */
    resources: RenderingResources;
    /**
     * Adjusts the padding between the music notation and the border.
     * @remarks
     * Adjusts the padding between the music notation and the outer border of the container element.
     * The array is either:
     * * 2 elements: `[left-right, top-bottom]`
     * * 4 elements: ``[left, top, right, bottom]``
     * @since 0.9.6
     * @category Display
     * @defaultValue `[35, 35]`
     */
    padding: number[];
    /**
     * The top padding applied to first system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    firstSystemPaddingTop: number;
    /**
     * The top padding applied systems beside the first one.
     * @since 1.4.0
     * @category Display
     * @defaultValue `10`
     */
    systemPaddingTop: number;
    /**
     * The bottom padding applied to systems beside the last one.
     * @since 1.4.0
     * @category Display
     * @defaultValue `20`
     */
    systemPaddingBottom: number;
    /**
     * The bottom padding applied to the last system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    lastSystemPaddingBottom: number;
    /**
     * The padding left to the track name label of the system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    systemLabelPaddingLeft: number;
    /**
     * The padding left to the track name label of the system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `3`
     */
    systemLabelPaddingRight: number;
    /**
     * The padding between the accolade bar and the start of the bar itself.
     * @since 1.4.0
     * @category Display
     * @defaultValue `3`
     */
    accoladeBarPaddingRight: number;
    /**
     * The bottom padding applied to main notation staves (standard, tabs, numbered, slash).
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    notationStaffPaddingTop: number;
    /**
     * The bottom padding applied to main notation staves (standard, tabs, numbered, slash).
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    notationStaffPaddingBottom: number;
    /**
     * The top padding applied to effect annotation staffs.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    effectStaffPaddingTop: number;
    /**
     * The bottom padding applied to effect annotation staffs.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    effectStaffPaddingBottom: number;
    /**
     * The left padding applied between the left line and the first glyph in the first staff in a system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `6`
     */
    firstStaffPaddingLeft: number;
    /**
     * The left padding applied between the left line and the first glyph in the following staff in a system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `2`
     */
    staffPaddingLeft: number;
    /**
     * The mode used to arrange staves and systems.
     * @since 1.3.0
     * @category Display
     * @defaultValue `1`
     * @remarks
     * By default alphaTab uses an own (automatic) mode to arrange and scale the bars when
     * putting them into staves. This property allows changing this mode to change the music sheet arrangement.
     *
     * ## Supported File Formats:
     * * Guitar Pro 6-8 {@since 1.3.0}
     * If you want/need support for more file formats to respect the sizing information feel free to [open a discussion](https://github.com/CoderLine/alphaTab/discussions/new?category=ideas) on GitHub.
     *
     * ## Automatic Mode
     *
     * In the automatic mode alphaTab arranges the bars and staves using its internal mechanisms.
     *
     * For the `page` layout this means it will scale the bars according to the `stretchForce` and available width.
     * Wrapping into new systems (rows) will happen when the row is considered "full".
     *
     * For the `horizontal` layout the `stretchForce` defines the sizing and no wrapping happens at all.
     *
     * ## Model Layout mode
     *
     * File formats like Guitar Pro embed information about the layout in the file and alphaTab can read and use this information.
     * When this mode is enabled, alphaTab will also actively use this information and try to respect it.
     *
     * alphaTab holds following information in the data model and developers can change those values (e.g. by tapping into the `scoreLoaded`) event.
     *
     * **Used when single tracks are rendered:**
     *
     * * `score.tracks[index].systemsLayout` - An array of numbers describing how many bars should be placed within each system (row).
     * * `score.tracks[index].defaultSystemsLayout` - The number of bars to place in a system (row) when no value is defined in the `systemsLayout`.
     * * `score.tracks[index].staves[index].bars[index].displayScale` - The relative size of this bar in the system it is placed. Note that this is not directly a percentage value. e.g. if there are 3 bars and all define scale 1, they are sized evenly.
     * * `score.tracks[index].staves[index].bars[index].displayWidth` - The absolute size of this bar when displayed.
     *
     * **Used when multiple tracks are rendered:**
     *
     * * `score.systemsLayout` - Like the `systemsLayout` on track level.
     * * `score.defaultSystemsLayout` - Like the `defaultSystemsLayout` on track level.
     * * `score.masterBars[index].displayScale` - Like the `displayScale` on bar level.
     * * `score.masterBars[index].displayWidth` - Like the `displayWidth` on bar level.
     *
     * ### Page Layout
     *
     * The page layout uses the `systemsLayout` and `defaultSystemsLayout` to decide how many bars go into a single system (row).
     * Additionally when sizing the bars within the system the `displayScale` is used. As indicated above, the scale is rather a ratio than a percentage value but percentages work also:
     *
     * ![Page Layout](https://alphatab.net/img/reference/property/systems-layout-page-examples.png)
     *
     * The page layout does not use `displayWidth`. The use of absolute widths would break the proper alignments needed for this kind of display.
     *
     * Also note that the sizing is including any glyphs and notation elements within the bar. e.g. if there are clefs in the bar, they are still "squeezed" into the available size.
     * It is not the case that the actual notes with their lengths are sized accordingly. This fits the sizing system of Guitar Pro and when files are customized there,
     * alphaTab will match this layout quite close.
     *
     * ### Horizontal Layout
     *
     * The horizontal layout uses the `displayWidth` to scale the bars to size the bars exactly as specified. This kind of sizing and layout can be useful for usecases like:
     *
     * * Comparing files against each other (top/bottom comparison)
     * * Aligning the playback of multiple files on one screen assuming the same tempo (e.g. one file per track).
     */
    systemsLayoutMode: SystemsLayoutMode;
}

/**
 * The display settings control how the general layout and display of alphaTab is done.
 * @json
 * @json_declaration
 * @target web
 */
declare interface DisplaySettingsJson {
    /**
     * The zoom level of the rendered notation.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1.0`
     * @remarks
     * AlphaTab can scale up or down the rendered music notation for more optimized display scenarios. By default music notation is rendered at 100% scale (value 1) and can be scaled up or down by
     * percental values.
     */
    scale?: number;
    /**
     * The default stretch force to use for layouting.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1`
     * @remarks
     * The stretch force is a setting that controls the spacing of the music notation. AlphaTab uses a varaint of the Gourlay algorithm for spacing which has springs and rods for
     * aligning elements. This setting controls the "strength" of the springs. The stronger the springs, the wider the spacing.
     *
     * | Force 1                                                      | Force 0.5                                             |
     * |--------------------------------------------------------------|-------------------------------------------------------|
     * | ![Default](https://alphatab.net/img/reference/property/stretchforce-default.png) | ![0.5](https://alphatab.net/img/reference/property/stretchforce-half.png) |
     */
    stretchForce?: number;
    /**
     * The layouting mode used to arrange the the notation.
     * @remarks
     * AlphaTab has various layout engines that arrange the rendered bars differently. This setting controls which layout mode is used.
     *
     * @since 0.9.6
     * @category Display
     * @defaultValue `LayoutMode.Page`
     */
    layoutMode?: LayoutMode | keyof typeof LayoutMode | Lowercase<keyof typeof LayoutMode>;
    /**
     * The stave profile defining which staves are shown for the music sheet.
     * @since 0.9.6
     * @category Display
     * @defaultValue `StaveProfile.Default`
     * @remarks
     * AlphaTab has various stave profiles that define which staves will be shown in for the rendered tracks. Its recommended
     * to keep this on {@link StaveProfile.Default} and rather rely on the options available ob {@link Staff} level
     */
    staveProfile?: StaveProfile | keyof typeof StaveProfile | Lowercase<keyof typeof StaveProfile>;
    /**
     * Limit the displayed bars per system (row). (-1 for automatic mode)
     * @since 0.9.6
     * @category Display
     * @defaultValue `-1`
     * @remarks
     * This setting sets the number of bars that should be put into one row during layouting. This setting is only respected
     * when using the {@link LayoutMode.Page} where bars are aligned in systems. [Demo](https://alphatab.net/docs/showcase/layouts#page-layout-5-bars-per-row).
     */
    barsPerRow?: number;
    /**
     * The bar start index to start layouting with.
     * @since 0.9.6
     * @category Display
     * @defaultValue `1`
     * @remarks
     * This setting sets the index of the first bar that should be rendered from the overall song. This setting can be used to
     * achieve a paging system or to only show partial bars of the same file. By this a tutorial alike display can be achieved
     * that explains various parts of the song. Please note that this is the bar number as shown in the music sheet (1-based) not the array index (0-based).
     * [Demo](https://alphatab.net/docs/showcase/layouts#page-layout-bar-5-to-8)
     */
    startBar?: number;
    /**
     * The total number of bars that should be rendered from the song. (-1 for all bars)
     * @since 0.9.6
     * @category Display
     * @defaultValue `-1`
     * @remarks
     * This setting sets the number of bars that should be rendered from the overall song. This setting can be used to
     * achieve a paging system or to only show partial bars of the same file. By this a tutorial alike display can be achieved
     * that explains various parts of the song. [Demo](https://alphatab.net/docs/showcase/layouts)
     */
    barCount?: number;
    /**
     * The number of bars that should be placed within one partial render.
     * @since 0.9.6
     * @category Display
     * @defaultValue `10`
     * @remarks
     * AlphaTab renders the whole music sheet in smaller chunks named "partials". This is to reduce the risk of
     * encountering browser performance restrictions and it gives faster visual feedback to the user. This
     * setting controls how many bars are placed within such a partial.
     */
    barCountPerPartial?: number;
    /**
     * Whether to justify also the last system in page layouts.
     * @remarks
     * Setting this option to `true` tells alphaTab to also justify the last system (row) like it
     * already does for the systems which are full.
     * | Justification Disabled                                       | Justification Enabled                                |
     * |--------------------------------------------------------------|-------------------------------------------------------|
     * | ![Disabled](https://alphatab.net/img/reference/property/justify-last-system-false.png) | ![Enabled](https://alphatab.net/img/reference/property/justify-last-system-true.png) |
     * @since 1.3.0
     * @category Display
     * @defaultValue `false`
     */
    justifyLastSystem?: boolean;
    /**
     * Allows adjusting of the used fonts and colors for rendering.
     * @json_partial_names
     * @since 0.9.6
     * @category Display
     * @defaultValue `false`
     * @domWildcard
     * @remarks
     * AlphaTab allows configuring the colors and fonts used for rendering via the rendering resources settings. Please note that as of today
     * this is the primary way of changing the way how alphaTab styles elements. CSS styling in the browser cannot be guaranteed to work due to its flexibility.
     *
     *
     * Due to space reasons in the following table the common prefix of the settings are removed. Please refer to these examples to eliminate confusion on the usage:
     *
     * | Platform   | Prefix                    | Example Usage                                                      |
     * |------------|---------------------------|--------------------------------------------------------------------|
     * | JavaScript | `display.resources.`      | `settings.display.resources.wordsFont = ...`                       |
     * | JSON       | `display.resources.`      | `var settings = { display: { resources: { wordsFonts: '...'} } };` |
     * | JSON       | `resources.`              | `var settings = { resources: { wordsFonts: '...'} };`              |
     * | .net       | `Display.Resources.`      | `settings.Display.Resources.WordsFonts = ...`                      |
     * | Android    | `display.resources.`      | `settings.display.resources.wordsFonts = ...`                      |
     * ## Types
     *
     * ### Fonts
     *
     * For the JavaScript platform any font that might be installed on the client machines can be used.
     * Any additional fonts can be added via WebFonts. The rendering of the score will be delayed until it is detected that the font was loaded.
     * Simply use any CSS font property compliant string as configuration. Relative font sizes with percentual values are not supported, remaining values will be considered if supported.
     *
     * {@since 1.2.3} Multiple fonts are also supported for the Web version. alphaTab will check if any of the fonts in the list is loaded instead of all. If none is available at the time alphaTab is initialized, it will try to initiate the load of the specified fonts individual through the Browser Font APIs.
     *
     * For the .net platform any installed font on the system can be used. Simply construct the `Font` object to configure your desired fonts.
     *
     * ### Colors
     *
     * For JavaScript you can use any CSS font property compliant string. (#RGB, #RGBA, #RRGGBB, #RRGGBBAA, rgb(r,g,b), rgba(r,g,b,a) )
     *
     * On .net simply construct the `Color` object to configure your desired color.
     */
    resources?: RenderingResourcesJson;
    /**
     * Adjusts the padding between the music notation and the border.
     * @remarks
     * Adjusts the padding between the music notation and the outer border of the container element.
     * The array is either:
     * * 2 elements: `[left-right, top-bottom]`
     * * 4 elements: ``[left, top, right, bottom]``
     * @since 0.9.6
     * @category Display
     * @defaultValue `[35, 35]`
     */
    padding?: number[];
    /**
     * The top padding applied to first system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    firstSystemPaddingTop?: number;
    /**
     * The top padding applied systems beside the first one.
     * @since 1.4.0
     * @category Display
     * @defaultValue `10`
     */
    systemPaddingTop?: number;
    /**
     * The bottom padding applied to systems beside the last one.
     * @since 1.4.0
     * @category Display
     * @defaultValue `20`
     */
    systemPaddingBottom?: number;
    /**
     * The bottom padding applied to the last system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    lastSystemPaddingBottom?: number;
    /**
     * The padding left to the track name label of the system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    systemLabelPaddingLeft?: number;
    /**
     * The padding left to the track name label of the system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `3`
     */
    systemLabelPaddingRight?: number;
    /**
     * The padding between the accolade bar and the start of the bar itself.
     * @since 1.4.0
     * @category Display
     * @defaultValue `3`
     */
    accoladeBarPaddingRight?: number;
    /**
     * The bottom padding applied to main notation staves (standard, tabs, numbered, slash).
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    notationStaffPaddingTop?: number;
    /**
     * The bottom padding applied to main notation staves (standard, tabs, numbered, slash).
     * @since 1.4.0
     * @category Display
     * @defaultValue `5`
     */
    notationStaffPaddingBottom?: number;
    /**
     * The top padding applied to effect annotation staffs.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    effectStaffPaddingTop?: number;
    /**
     * The bottom padding applied to effect annotation staffs.
     * @since 1.4.0
     * @category Display
     * @defaultValue `0`
     */
    effectStaffPaddingBottom?: number;
    /**
     * The left padding applied between the left line and the first glyph in the first staff in a system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `6`
     */
    firstStaffPaddingLeft?: number;
    /**
     * The left padding applied between the left line and the first glyph in the following staff in a system.
     * @since 1.4.0
     * @category Display
     * @defaultValue `2`
     */
    staffPaddingLeft?: number;
    /**
     * The mode used to arrange staves and systems.
     * @since 1.3.0
     * @category Display
     * @defaultValue `1`
     * @remarks
     * By default alphaTab uses an own (automatic) mode to arrange and scale the bars when
     * putting them into staves. This property allows changing this mode to change the music sheet arrangement.
     *
     * ## Supported File Formats:
     * * Guitar Pro 6-8 {@since 1.3.0}
     * If you want/need support for more file formats to respect the sizing information feel free to [open a discussion](https://github.com/CoderLine/alphaTab/discussions/new?category=ideas) on GitHub.
     *
     * ## Automatic Mode
     *
     * In the automatic mode alphaTab arranges the bars and staves using its internal mechanisms.
     *
     * For the `page` layout this means it will scale the bars according to the `stretchForce` and available width.
     * Wrapping into new systems (rows) will happen when the row is considered "full".
     *
     * For the `horizontal` layout the `stretchForce` defines the sizing and no wrapping happens at all.
     *
     * ## Model Layout mode
     *
     * File formats like Guitar Pro embed information about the layout in the file and alphaTab can read and use this information.
     * When this mode is enabled, alphaTab will also actively use this information and try to respect it.
     *
     * alphaTab holds following information in the data model and developers can change those values (e.g. by tapping into the `scoreLoaded`) event.
     *
     * **Used when single tracks are rendered:**
     *
     * * `score.tracks[index].systemsLayout` - An array of numbers describing how many bars should be placed within each system (row).
     * * `score.tracks[index].defaultSystemsLayout` - The number of bars to place in a system (row) when no value is defined in the `systemsLayout`.
     * * `score.tracks[index].staves[index].bars[index].displayScale` - The relative size of this bar in the system it is placed. Note that this is not directly a percentage value. e.g. if there are 3 bars and all define scale 1, they are sized evenly.
     * * `score.tracks[index].staves[index].bars[index].displayWidth` - The absolute size of this bar when displayed.
     *
     * **Used when multiple tracks are rendered:**
     *
     * * `score.systemsLayout` - Like the `systemsLayout` on track level.
     * * `score.defaultSystemsLayout` - Like the `defaultSystemsLayout` on track level.
     * * `score.masterBars[index].displayScale` - Like the `displayScale` on bar level.
     * * `score.masterBars[index].displayWidth` - Like the `displayWidth` on bar level.
     *
     * ### Page Layout
     *
     * The page layout uses the `systemsLayout` and `defaultSystemsLayout` to decide how many bars go into a single system (row).
     * Additionally when sizing the bars within the system the `displayScale` is used. As indicated above, the scale is rather a ratio than a percentage value but percentages work also:
     *
     * ![Page Layout](https://alphatab.net/img/reference/property/systems-layout-page-examples.png)
     *
     * The page layout does not use `displayWidth`. The use of absolute widths would break the proper alignments needed for this kind of display.
     *
     * Also note that the sizing is including any glyphs and notation elements within the bar. e.g. if there are clefs in the bar, they are still "squeezed" into the available size.
     * It is not the case that the actual notes with their lengths are sized accordingly. This fits the sizing system of Guitar Pro and when files are customized there,
     * alphaTab will match this layout quite close.
     *
     * ### Horizontal Layout
     *
     * The horizontal layout uses the `displayWidth` to scale the bars to size the bars exactly as specified. This kind of sizing and layout can be useful for usecases like:
     *
     * * Comparing files against each other (top/bottom comparison)
     * * Aligning the playback of multiple files on one screen assuming the same tempo (e.g. one file per track).
     */
    systemsLayoutMode?: SystemsLayoutMode | keyof typeof SystemsLayoutMode | Lowercase<keyof typeof SystemsLayoutMode>;
}

/**
 * Lists all durations of a beat.
 */
declare enum Duration {
    /**
     * A quadruple whole note duration
     */
    QuadrupleWhole = -4,
    /**
     * A double whole note duration
     */
    DoubleWhole = -2,
    /**
     * A whole note duration
     */
    Whole = 1,
    /**
     * A 1/2 note duration
     */
    Half = 2,
    /**
     * A 1/4 note duration
     */
    Quarter = 4,
    /**
     * A 1/8 note duration
     */
    Eighth = 8,
    /**
     * A 1/16 note duration
     */
    Sixteenth = 16,
    /**
     * A 1/32 note duration
     */
    ThirtySecond = 32,
    /**
     * A 1/64 note duration
     */
    SixtyFourth = 64,
    /**
     * A 1/128 note duration
     */
    OneHundredTwentyEighth = 128,
    /**
     * A 1/256 note duration
     */
    TwoHundredFiftySixth = 256
}

/**
 * Lists all dynamics.
 */
declare enum DynamicValue {
    /**
     * pianississimo (very very soft)
     */
    PPP = 0,
    /**
     * pianissimo (very soft)
     */
    PP = 1,
    /**
     * piano (soft)
     */
    P = 2,
    /**
     * mezzo-piano (half soft)
     */
    MP = 3,
    /**
     * mezzo-forte (half loud)
     */
    MF = 4,
    /**
     * forte (loud)
     */
    F = 5,
    /**
     * fortissimo (very loud)
     */
    FF = 6,
    /**
     * fortississimo (very very loud)
     */
    FFF = 7,
    PPPP = 8,
    PPPPP = 9,
    PPPPPP = 10,
    FFFF = 11,
    FFFFF = 12,
    FFFFFF = 13,
    /**
     * Sforzando
     */
    SF = 14,
    /**
     * SforzandoPiano
     */
    SFP = 15,
    /**
     * SforzandoPianissimo
     */
    SFPP = 16,
    /**
     * FortePiano
     */
    FP = 17,
    /**
     * Rinforzando 1
     */
    RF = 18,
    /**
     * Rinforzando 2
     */
    RFZ = 19,
    /**
     * Sforzato
     */
    SFZ = 20,
    /**
     * SforzatoFF
     */
    SFFZ = 21,
    /**
     * Forzando
     */
    FZ = 22,
    /**
     * Niente
     */
    N = 23,
    /**
     * Poco forte
     */
    PF = 24,
    /**
     * SforzatoPiano
     */
    SFZP = 25
}

/**
 * Effect-Glyphs implementing this public interface get notified
 * as they are expanded over multiple beats.
 */
declare class EffectGlyph extends Glyph {
    /**
     * Gets or sets the beat where the glyph belongs to.
     */
    beat: Beat | null;
    /**
     * Gets or sets the next glyph of the same type in case
     * the effect glyph is expanded when using {@link EffectBarGlyphSizing.groupedOnBeat}.
     */
    nextGlyph: EffectGlyph | null;
    /**
     * Gets or sets the previous glyph of the same type in case
     * the effect glyph is expanded when using {@link EffectBarGlyphSizing.groupedOnBeat}.
     */
    previousGlyph: EffectGlyph | null;
    constructor(x?: number, y?: number);
}

/**
 * Defines the custom styles for an element in the music sheet (like bars, voices, notes etc).
 */
declare class ElementStyle<TSubElements extends number> {
    /**
     * Changes the color of the specified sub-element within the element this style container belongs to.
     * Null indicates that a certain element should use the default color from {@link RenderingResources}
     * even if some "higher level" element changes colors.
     */
    colors: Map<TSubElements, Color | null>;
}

/**
 * Represents the end of the track indicating that no more events for this track follow.
 */
declare class EndOfTrackEvent extends MidiEvent {
    constructor(track: number, tick: number);
    writeTo(s: IWriteable): void;
}

/**
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * @partial
 */
export declare class Environment {
    private static readonly StaffIdBeforeSlashAlways;
    private static readonly StaffIdBeforeScoreAlways;
    private static readonly StaffIdBeforeScoreHideable;
    private static readonly StaffIdBeforeNumberedAlways;
    private static readonly StaffIdBeforeTabAlways;
    private static readonly StaffIdBeforeTabHideable;
    private static readonly StaffIdBeforeEndAlways;
    /* Excluded from this release type: MusicFontSize */
    /* Excluded from this release type: HighDpiFactor */
    /**
     * @target web
     */
    private static _globalThis;
    /* Excluded from this release type: globalThis */
    /**
     * @target web
     */
    static readonly webPlatform: WebPlatform;
    /**
     * @target web
     */
    static readonly isWebPackBundled: boolean;
    /**
     * @target web
     */
    static readonly isViteBundled: boolean;
    /**
     * @target web
     */
    static readonly scriptFile: string | null;
    /**
     * @target web
     */
    static readonly fontDirectory: string | null;
    /**
     * @target web
     */
    static get isRunningInWorker(): boolean;
    /**
     * @target web
     */
    static get isRunningInAudioWorklet(): boolean;
    /* Excluded from this release type: createWebWorker */
    /* Excluded from this release type: createAudioWorklet */
    /**
     * @target web
     * @partial
     */
    static throttle(action: () => void, delay: number): () => void;
    /**
     * @target web
     */
    private static detectScriptFile;
    /* Excluded from this release type: ensureFullUrl */
    private static appendScriptName;
    /**
     * @target web
     */
    private static detectFontDirectory;
    /**
     * @target web
     */
    private static registerJQueryPlugin;
    static readonly renderEngines: Map<string, RenderEngineFactory>;
    /* Excluded from this release type: layoutEngines */
    /* Excluded from this release type: staveProfiles */
    static getRenderEngineFactory(engine: string): RenderEngineFactory;
    /* Excluded from this release type: getLayoutEngineFactory */
    /**
     * Gets all default ScoreImporters
     * @returns
     */
    static buildImporters(): ScoreImporter[];
    private static createDefaultRenderEngines;
    /**
     * Enables the usage of alphaSkia as rendering backend.
     * @param musicFontData The raw binary data of the music font.
     * @param alphaSkia The alphaSkia module.
     */
    static enableAlphaSkia(musicFontData: ArrayBuffer, alphaSkia: unknown): void;
    /**
     * Registers a new custom font for the usage in the alphaSkia rendering backend.
     * @param fontData The raw binary data of the font.
     * @returns The font info under which the font was registered.
     */
    static registerAlphaSkiaCustomFont(fontData: Uint8Array): Font;
    /**
     * @target web
     * @partial
     */
    private static createPlatformSpecificRenderEngines;
    private static createDefaultRenderers;
    private static createDefaultStaveProfiles;
    private static createDefaultLayoutEngines;
    /**
     * @target web
     */
    static initializeMain(createWebWorker: (settings: Settings) => Worker, createAudioWorklet: (context: AudioContext, settings: Settings) => Promise<void>): void;
    /* Excluded from this release type: alphaTabWorker */
    /* Excluded from this release type: alphaTabUrl */
    /**
     * @target web
     */
    static initializeWorker(): void;
    /**
     * @target web
     */
    static initializeAudioWorklet(): void;
    /**
     * @target web
     */
    private static detectWebPack;
    /**
     * @target web
     */
    private static detectVite;
    /**
     * @target web
     */
    private static detectWebPlatform;
    /**
     * Prints the environment information for easier troubleshooting.
     * @param force Whether to force printing.
     */
    static printEnvironmentInfo(force?: boolean): void;
    /**
     * @target web
     * @partial
     */
    private static printPlatformInfo;
    /* Excluded from this release type: prepareForPostMessage */
}

export declare namespace exporter {
    export {
        ScoreExporter,
        Gp7Exporter
    }
}

/**
 * Lists the different fade types.
 */
declare enum FadeType {
    /**
     * No fading
     */
    None = 0,
    /**
     * Fade-in the sound.
     */
    FadeIn = 1,
    /**
     * Fade-out the sound.
     */
    FadeOut = 2,
    /**
     * Fade-in and then fade-out the sound.
     */
    VolumeSwell = 3
}

/**
 * Represents a fermata.
 * @json
 * @json_strict
 */
declare class Fermata {
    /**
     * Gets or sets the type of fermata.
     */
    type: FermataType;
    /**
     * Gets or sets the actual length of the fermata.
     */
    length: number;
}

/**
 * Lists all types of fermatas
 */
declare enum FermataType {
    /**
     * A short fermata (triangle symbol)
     */
    Short = 0,
    /**
     * A medium fermata (round symbol)
     */
    Medium = 1,
    /**
     * A long fermata (rectangular symbol)
     */
    Long = 2
}

/**
 * @target web
 */
export declare class FileLoadError extends AlphaTabError {
    xhr: XMLHttpRequest;
    constructor(message: string, xhr: XMLHttpRequest);
}

/**
 * Lists all modes on how fingerings should be displayed.
 */
export declare enum FingeringMode {
    /**
     * Fingerings will be shown in the standard notation staff.
     */
    ScoreDefault = 0,
    /**
     * Fingerings will be shown in the standard notation staff. Piano finger style is enforced, where
     * fingers are rendered as 1-5 instead of p,i,m,a,c and T,1,2,3,4.
     */
    ScoreForcePiano = 1,
    /**
     * Fingerings will be shown in a effect band above the tabs in case
     * they have only a single note on the beat.
     */
    SingleNoteEffectBand = 2,
    /**
     * Fingerings will be shown in a effect band above the tabs in case
     * they have only a single note on the beat. Piano finger style is enforced, where
     * fingers are rendered as 1-5 instead of p,i,m,a,c and T,1,2,3,4.
     */
    SingleNoteEffectBandForcePiano = 3
}

/**
 * Lists all fingers.
 */
declare enum Fingers {
    /**
     * Unknown type (not documented)
     */
    Unknown = -2,
    /**
     * No finger, dead note
     */
    NoOrDead = -1,
    /**
     * The thumb
     */
    Thumb = 0,
    /**
     * The index finger
     */
    IndexFinger = 1,
    /**
     * The middle finger
     */
    MiddleFinger = 2,
    /**
     * The annular finger
     */
    AnnularFinger = 3,
    /**
     * The little finger
     */
    LittleFinger = 4
}

/**
 * A simple flat sync point for easy persistence separate to the main data model.
 * @record
 */
declare interface FlatSyncPoint {
    /**
     * Indicates index of the masterbar for which this sync point is valid.
     */
    barIndex: number;
    /**
     * Indicates relative position (0-1) of the sync point in within the masterbar.
     */
    barPosition: number;
    /**
     * Indicates for which repeat occurence this sync point is valid (e.g. 0 on the first time played, 1 on the second time played)
     */
    barOccurence: number;
    /**
     * The audio offset marking the position within the audio track in milliseconds.
     * This information is used to regularly sync (or on seeking) to match a given external audio time axis with the internal time axis.
     */
    millisecondOffset: number;
}

/**
 * @json_immutable
 */
declare class Font {
    private _css;
    private _cssScale;
    private _families;
    private _style;
    private _weight;
    private _size;
    private reset;
    /**
     * Gets the first font family name.
     * @deprecated Consider using {@link families} for multi font family support.
     */
    get family(): string;
    /**
     * Sets the font family list.
     * @deprecated Consider using {@link families} for multi font family support.
     */
    set family(value: string);
    /**
     * Gets the font family name.
     */
    get families(): string[];
    /**
     * Sets the font family name.
     */
    set families(value: string[]);
    /**
     * Gets the font size in pixels.
     */
    get size(): number;
    /**
     * Sets the font size in pixels.
     */
    set size(value: number);
    /**
     * Gets the font style.
     */
    get style(): FontStyle;
    /**
     * Sets the font style.
     */
    set style(value: FontStyle);
    /**
     * Gets the font weight.
     */
    get weight(): FontWeight;
    /**
     * Gets or sets the font weight.
     */
    set weight(value: FontWeight);
    get isBold(): boolean;
    get isItalic(): boolean;
    /**
     * Initializes a new instance of the {@link Font} class.
     * @param family The family.
     * @param size The size.
     * @param style The style.
     * @param weight The weight.
     */
    constructor(family: string, size: number, style?: FontStyle, weight?: FontWeight);
    withSize(newSize: number): Font;
    /**
     * Initializes a new instance of the {@link Font} class.
     * @param families The families.
     * @param size The size.
     * @param style The style.
     * @param weight The weight.
     */
    static withFamilyList(families: string[], size: number, style?: FontStyle, weight?: FontWeight): Font;
    toCssString(scale?: number): string;
    static fromJson(v: unknown): Font | undefined;
    static toJson(font: Font | undefined): Map<string, unknown> | undefined;
}

/**
 * Lists the known file formats for font files.
 * @target web
 */
export declare enum FontFileFormat {
    /**
     * .eot
     */
    EmbeddedOpenType = 0,
    /**
     * .woff
     */
    Woff = 1,
    /**
     * .woff2
     */
    Woff2 = 2,
    /**
     * .otf
     */
    OpenType = 3,
    /**
     * .ttf
     */
    TrueType = 4,
    /**
     * .svg
     */
    Svg = 5
}

/**
 * Describes a font to be used.
 * If specified as string, a CSS `font` shorthand property compliant value needs to be used.
 * @target web
 */
declare type FontJson = Font | string | {
    families: string[];
    size: number;
    style: FontStyle | keyof typeof FontStyle;
    weight: FontWeight | keyof typeof FontWeight;
};

/**
 * Describes the sizes of a font for measuring purposes.
 */
declare class FontSizeDefinition {
    /**
     * The widths of each character starting with the ascii code 0x20 at index 0.
     */
    characterWidths: Uint8Array;
    /**
     * A factor to translate a given font size to an actual text height.
     * This is not precise but just an estimation for reserving spaces.
     */
    fontSizeToHeight: number;
    constructor(characterWidths: Uint8Array, fontSizeToHeight: number);
}

/**
 * This public class stores text widths for several fonts and allows width calculation
 * @partial
 */
declare class FontSizes {
    static FontSizeLookupTables: Map<string, FontSizeDefinition>;
    static readonly ControlChars: number;
    /**
     * @target web
     * @partial
     */
    static generateFontLookup(family: string): void;
    static measureString(s: string, families: string[], size: number, style: FontStyle, weight: FontWeight): MeasuredText;
}

/**
 * Lists all flags for font styles.
 */
declare enum FontStyle {
    /**
     * No flags.
     */
    Plain = 0,
    /**
     * Font is italic.
     */
    Italic = 1
}

/**
 * Lists all font weight values.
 */
declare enum FontWeight {
    /**
     * Not bold
     */
    Regular = 0,
    /**
     * Font is bold
     */
    Bold = 1
}

/**
 * An invalid input format was detected (e.g. invalid setting values, file formats,...)
 */
export declare class FormatError extends AlphaTabError {
    constructor(message: string);
}

/**
 * A glyph is a single symbol which can be added to a GlyphBarRenderer for automated
 * layouting and drawing of stacked symbols.
 */
declare class Glyph {
    x: number;
    y: number;
    width: number;
    height: number;
    renderer: BarRendererBase;
    constructor(x: number, y: number);
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * This glyph allows to group several other glyphs to be
 * drawn at the same x position
 */
declare class GlyphGroup extends Glyph {
    protected glyphs: Glyph[] | null;
    get isEmpty(): boolean;
    doLayout(): void;
    addGlyph(g: Glyph): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * Lists all golpe types.
 */
declare enum GolpeType {
    /**
     * No Golpe played.
     */
    None = 0,
    /**
     * Play a golpe with the thumb.
     */
    Thumb = 1,
    /**
     * Play a golpe with a finger.
     */
    Finger = 2
}

/**
 * This ScoreExporter can write Guitar Pro 7+ (gp) files.
 */
declare class Gp7Exporter extends ScoreExporter {
    get name(): string;
    writeScore(score: Score): void;
}

/**
 * Represents a group of grace beats that belong together
 */
declare class GraceGroup {
    /**
     * All beats within this group.
     */
    beats: Beat[];
    /**
     * Gets a unique ID for this grace group.
     */
    id: string;
    /**
     * true if the grace beat are followed by a normal beat within the same
     * bar.
     */
    isComplete: boolean;
    /**
     * Adds a new beat to this group
     * @param beat The beat to add
     */
    addBeat(beat: Beat): void;
    finish(): void;
}

/**
 * Lists all types of grace notes
 */
declare enum GraceType {
    /**
     * No grace, normal beat.
     */
    None = 0,
    /**
     * The beat contains on-beat grace notes.
     */
    OnBeat = 1,
    /**
     * The beat contains before-beat grace notes.
     */
    BeforeBeat = 2,
    /**
     * The beat contains very special bend-grace notes used in SongBook style displays.
     */
    BendGrace = 3
}

/**
 * Lists all harmonic types.
 */
declare enum HarmonicType {
    /**
     * No harmonics.
     */
    None = 0,
    /**
     * Natural harmonic
     */
    Natural = 1,
    /**
     * Artificial harmonic
     */
    Artificial = 2,
    /**
     * Pinch harmonics
     */
    Pinch = 3,
    /**
     * Tap harmonics
     */
    Tap = 4,
    /**
     * Semi harmonics
     */
    Semi = 5,
    /**
     * Feedback harmonics
     */
    Feedback = 6
}

/**
 * The additional style and display information for header and footer elements.
 * @json
 * @json_strict
 */
declare class HeaderFooterStyle {
    /**
     * The template how the text should be formatted. Following placeholders exist and are filled from the song information:
     * * `%TITLE%`
     * * `%SUBTITLE%`
     * * `%ARTIST%`
     * * `%ALBUM%`
     * * `%WORDS%`
     * * `%WORDSMUSIC%`
     * * `%MUSIC%`
     * * `%TABBER%`
     * * `%COPYRIGHT%`
     */
    template: string;
    /**
     * Whether the element should be visible. Overriden by {@link NotationSettings.elements} if specified.
     */
    isVisible?: boolean;
    /**
     * The alignment of the element on the page.
     */
    textAlign: TextAlign;
    constructor(template?: string, isVisible?: boolean | undefined, textAlign?: TextAlign);
    buildText(score: Score): string;
    private static readonly PlaceholderPattern;
}

declare class Hydra {
    phdrs: HydraPhdr[];
    pbags: HydraPbag[];
    pmods: HydraPmod[];
    pgens: HydraPgen[];
    insts: HydraInst[];
    ibags: HydraIbag[];
    imods: HydraImod[];
    igens: HydraIgen[];
    sHdrs: HydraShdr[];
    sampleData: Uint8Array;
    private _sampleCache;
    decodeSamples(startByte: number, endByte: number, decompressVorbis: boolean): Float32Array;
    load(readable: IReadable): void;
}

declare class HydraGenAmount {
    wordAmount: number;
    get shortAmount(): number;
    get lowByteAmount(): number;
    get highByteAmount(): number;
    constructor(reader: IReadable);
}

declare class HydraIbag {
    static readonly SizeInFile: number;
    instGenNdx: number;
    instModNdx: number;
    constructor(reader: IReadable);
}

declare class HydraIgen {
    static readonly SizeInFile: number;
    genOper: number;
    genAmount: HydraGenAmount;
    constructor(reader: IReadable);
}

declare class HydraImod {
    static readonly SizeInFile: number;
    modSrcOper: number;
    modDestOper: number;
    modAmount: number;
    modAmtSrcOper: number;
    modTransOper: number;
    constructor(reader: IReadable);
}

declare class HydraInst {
    static readonly SizeInFile: number;
    instName: string;
    instBagNdx: number;
    constructor(reader: IReadable);
}

declare class HydraPbag {
    static readonly SizeInFile: number;
    genNdx: number;
    modNdx: number;
    constructor(reader: IReadable);
}

declare class HydraPgen {
    static readonly SizeInFile: number;
    static readonly GenInstrument: number;
    static readonly GenKeyRange: number;
    static readonly GenVelRange: number;
    static readonly GenSampleId: number;
    genOper: number;
    genAmount: HydraGenAmount;
    constructor(reader: IReadable);
}

declare class HydraPhdr {
    static readonly SizeInFile: number;
    presetName: string;
    preset: number;
    bank: number;
    presetBagNdx: number;
    library: number;
    genre: number;
    morphology: number;
    constructor(reader: IReadable);
}

declare class HydraPmod {
    static readonly SizeInFile: number;
    modSrcOper: number;
    modDestOper: number;
    modAmount: number;
    modAmtSrcOper: number;
    modTransOper: number;
    constructor(reader: IReadable);
}

declare class HydraShdr {
    static readonly SizeInFile: number;
    sampleName: string;
    start: number;
    end: number;
    startLoop: number;
    endLoop: number;
    sampleRate: number;
    originalPitch: number;
    pitchCorrection: number;
    sampleLink: number;
    sampleType: number;
    constructor(reader: IReadable);
}

/**
 * The public API interface for interacting with the synthesizer.
 */
declare interface IAlphaSynth {
    /**
     * Gets or sets whether the synthesizer is ready for interaction. (output and worker are initialized)
     */
    readonly isReady: boolean;
    /**
     * Gets or sets whether the synthesizer is ready for playback. (output, worker are initialized, soundfont and midi are loaded)
     */
    readonly isReadyForPlayback: boolean;
    /**
     * Gets the current player state.
     */
    readonly state: PlayerState;
    /**
     * Gets or sets the loging level.
     */
    logLevel: LogLevel;
    /**
     * Gets or sets the current master volume as percentage. (range: 0.0-3.0, default 1.0)
     */
    masterVolume: number;
    /**
     * Gets or sets the metronome volume. (range: 0.0-3.0, default 0.0)
     */
    metronomeVolume: number;
    /**
     * Gets or sets the current playback speed as percentage. (range: 0.125-8.0, default: 1.0)
     */
    playbackSpeed: number;
    /**
     * Gets or sets the position within the song in midi ticks.
     */
    tickPosition: number;
    /**
     * Gets or sets the position within the song in milliseconds.
     */
    timePosition: number;
    /**
     * Gets or sets the range of the song that should be played. Set this to null
     * to play the whole song.
     */
    playbackRange: PlaybackRange | null;
    /**
     * Gets or sets whether the playback should automatically restart after it finished.
     */
    isLooping: boolean;
    /**
     * Gets or sets volume of the metronome during count-in. (range: 0.0-3.0, default 0.0 - no count in)
     * @since 1.1.0
     */
    countInVolume: number;
    /**
     * Gets or sets the midi events which will trigger the `midiEventsPlayed` event.
     */
    midiEventsPlayedFilter: MidiEventType[];
    /**
     * Gets the output used by alphaSynth.
     */
    readonly output: ISynthOutput;
    /**
     * Destroys the synthesizer and all related components
     * @since 0.9.6
     */
    destroy(): void;
    /**
     * Starts the playback if possible
     * @returns true if the playback was started, otherwise false. Reasons for not starting can be that the player is not ready or already playing.
     */
    play(): boolean;
    /**
     * Pauses the playback if was running
     */
    pause(): void;
    /**
     * Starts the playback if possible, pauses the playback if was running
     */
    playPause(): void;
    /**
     * Stopps the playback
     */
    stop(): void;
    /**
     * Stops any ongoing playback and plays the given midi file instead.
     * @param midi The midi file to play
     */
    playOneTimeMidiFile(midi: MidiFile): void;
    /**
     * Loads a soundfont from the given data
     * @param data a byte array to load the data from
     * @param append Whether to fully replace or append the data from the given soundfont.
     */
    loadSoundFont(data: Uint8Array, append: boolean): void;
    /**
     * Resets all loaded soundfonts as if they were not loaded.
     */
    resetSoundFonts(): void;
    /**
     * Loads the given midi file structure.
     * @param midi
     */
    loadMidiFile(midi: MidiFile): void;
    /**
     * Loads the synchronization information from the given score (used for backing tracks and external media).
     * @param score
     */
    loadBackingTrack(score: Score): void;
    /**
     * Updates the points used to synchronize the backing track with the synthesized audio for correct cursor placement.
     * @param syncPoints
     */
    updateSyncPoints(syncPoints: BackingTrackSyncPoint[]): void;
    /**
     * Applies the given transposition pitches to be used during playback.
     * @param transpositionPitches a map defining the transposition pitches for midi channel.
     */
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    /**
     * Sets the transposition pitch of a given channel. This pitch is additionally applied beside the
     * ones applied already via {@link applyTranspositionPitches}.
     * @param channel The channel number
     * @param semitones The number of semitones to apply as pitch offset.
     */
    setChannelTranspositionPitch(channel: number, semitones: number): void;
    /**
     * Sets the mute state of a channel.
     * @param channel The channel number
     * @param mute true if the channel should be muted, otherwise false.
     */
    setChannelMute(channel: number, mute: boolean): void;
    /**
     * Resets the mute/solo state of all channels
     */
    resetChannelStates(): void;
    /**
     * Gets the solo state of a channel.
     * @param channel The channel number
     * @param solo true if the channel should be played solo, otherwise false.
     */
    setChannelSolo(channel: number, solo: boolean): void;
    /**
     * Gets or sets the current and initial volume of the given channel.
     * @param channel The channel number.
     * @param volume The volume of of the channel (0.0-1.0)
     */
    setChannelVolume(channel: number, volume: number): void;
    /**
     * This event is fired when the player is ready to be interacted with.
     */
    readonly ready: IEventEmitter;
    /**
     * This event is fired when all required data for playback is loaded and ready.
     */
    readonly readyForPlayback: IEventEmitter;
    /**
     * This event is fired when the playback of the whole song finished.
     * @eventProperty
     */
    readonly finished: IEventEmitter;
    /**
     * This event is fired when the SoundFont needed for playback was loaded.
     * @eventProperty
     */
    readonly soundFontLoaded: IEventEmitter;
    /**
     * This event is fired when the loading of the SoundFont failed.
     * @eventProperty
     */
    readonly soundFontLoadFailed: IEventEmitterOfT<Error>;
    /**
     * This event is fired when the Midi file needed for playback was loaded.
     * @eventProperty
     */
    readonly midiLoaded: IEventEmitterOfT<PositionChangedEventArgs>;
    /**
     * This event is fired when the loading of the Midi file failed.
     * @eventProperty
     */
    readonly midiLoadFailed: IEventEmitterOfT<Error>;
    /**
     * This event is fired when the playback state changed.
     * @eventProperty
     */
    readonly stateChanged: IEventEmitterOfT<PlayerStateChangedEventArgs>;
    /**
     * This event is fired when the current playback position of/ the song changed.
     * @eventProperty
     */
    readonly positionChanged: IEventEmitterOfT<PositionChangedEventArgs>;
    /**
     * The event is fired when certain midi events were sent to the audio output device for playback.
     * @eventProperty
     */
    readonly midiEventsPlayed: IEventEmitterOfT<MidiEventsPlayedEventArgs>;
    /**
     * The event is fired when the playback range within the player was updated.
     * @eventProperty
     */
    readonly playbackRangeChanged: IEventEmitterOfT<PlaybackRangeChangedEventArgs>;
}

/**
 * An audio exporter allowing streaming synthesis of audio samples with a fixed configuration.
 * This is the internal synchronous version of the public {@link IAudioExporter}.
 */
declare interface IAlphaSynthAudioExporter {
    /**
     * Renders the next chunk of audio and provides it as result.
     *
     * @param milliseconds The rough number of milliseconds that should be synthesized and exported as chunk.
     * @returns The requested chunk holding the samples and time information.
     * If the song completed playback `undefined` is returned indicating the end.
     * The provided audio might not be exactly the requested number of milliseconds as the synthesizer internally
     * uses a fixed block size of 64 samples for synthesizing audio. Depending on the sample rate
     * slightly longer audio is contained in the result.
     *
     * When the song ends, the chunk might contain less than the requested duration.
     */
    render(milliseconds: number): AudioExportChunk | undefined;
}

/**
 * A {@link IBackingTrackSynthOutput} which uses a HTMLAudioElement as playback mechanism.
 * Allows the access to the element for further custom usage.
 * @target web
 */
declare interface IAudioElementBackingTrackSynthOutput extends IBackingTrackSynthOutput {
    /**
     * The audio element used for playing the backing track.
     * @remarks
     * Direct interaction with the element might not result in correct alphaTab behavior.
     */
    readonly audioElement: HTMLAudioElement;
}

/**
 * A exporter which can be used to obtain the synthesized audio for custom processing.
 */
declare interface IAudioExporter extends Disposable {
    /**
     * Renders the next chunk of audio and provides it as result.
     *
     * @param milliseconds The rough number of milliseconds that should be synthesized and exported as chunk.
     * @returns The requested chunk holding the samples and time information.
     * If the song completed playback `undefined` is returned indicating the end.
     * The provided audio might not be exactly the requested number of milliseconds as the synthesizer internally
     * uses a fixed block size of 64 samples for synthesizing audio. Depending on the sample rate
     * slightly longer audio is contained in the result.
     *
     * When the song ends, the chunk might contain less than the requested duration.
     */
    render(milliseconds: number): Promise<AudioExportChunk | undefined>;
    destroy(): void;
}

/**
 * This is the internal worker interface implemented by IAudioExporters and consists
 * of the internal APIs needed to spawn new exporters. Its mainly used to simplify
 * the public API visible when using exporters.
 */
declare interface IAudioExporterWorker extends IAudioExporter {
    /**
     * Initializes the worker.
     * @param options The options to use
     * @param midi The midi file to load
     * @param syncPoints The sync points of the song (if any)
     * @param transpositionPitches The initial transposition pitches for the midi file.
     */
    initialize(options: AudioExportOptions, midi: MidiFile, syncPoints: BackingTrackSyncPoint[], transpositionPitches: Map<number, number>): Promise<void>;
}

/**
 * Classes implementing this interface can act as main audio synthesis engine
 * within alphaSynth.
 */
declare interface IAudioSampleSynthesizer {
    /**
     * The master volume to produce.
     */
    masterVolume: number;
    /**
     * The volume of metronome ticks.
     */
    metronomeVolume: number;
    /**
     * The output sample rate which is produced.
     */
    readonly outSampleRate: number;
    /**
     * The current tempo according to the processed midi events (used for metronome event generation)
     */
    readonly currentTempo: number;
    /**
     * The current time signature numerator according to the processed midi events  (used for metronome event generation)
     */
    readonly timeSignatureNumerator: number;
    /**
     * The current time signature denominator according to the processed midi events  (used for metronome event generation)
     */
    readonly timeSignatureDenominator: number;
    /**
     * The number of voices which are currently active in the syntheiszer and still producing audio.
     */
    readonly activeVoiceCount: number;
    /**
     * Ensures for all active notes a note-off is issued to stop playing the keys.
     * @param immediate Whether the stop should happen immediately or with sustain->release.
     */
    noteOffAll(immediate: boolean): void;
    /**
     * Stop all playing notes immediatly and reset all channel parameters but keeps user
     * defined settings
     */
    resetSoft(): void;
    /**
     * Resets all loaded presets.
     */
    resetPresets(): void;
    /**
     * Loads the presets from the given SoundFont hydra structure.
     * @param hydra  The SoundFont hydra structure.
     * @param instrumentPrograms The used instrument programs to load the samples for.
     * @param percussionKeys The instrument keys used.
     * @param append Whether the presets should be appended or whether they should replace all loaded ones.
     */
    loadPresets(hydra: Hydra, instrumentPrograms: Set<number>, percussionKeys: Set<number>, append: boolean): void;
    /**
     * Configures the channel used to generate metronome sounds.
     * @param metronomeVolume The volume for the channel.
     */
    setupMetronomeChannel(metronomeVolume: number): void;
    /**
     * Synthesizes the given number of samples without producing an output (e.g. on seeking)
     * @param sampleCount The number of samples to synthesize.
     */
    synthesizeSilent(sampleCount: number): void;
    /**
     * Processes the given synth event.
     * @param synthEvent The synth event.
     */
    dispatchEvent(synthEvent: SynthEvent): void;
    /**
     * Synthesizes the given number of samples into the provided output buffer.
     * @param buffer The buffer to fill.
     * @param bufferPos The offset in the buffer to start writing into.
     * @param sampleCount The number of samples to synthesize.
     */
    synthesize(buffer: Float32Array, bufferPos: number, sampleCount: number): SynthEvent[];
    /**
     * Applies the given transposition pitches used for general pitch changes that should be applied to the song.
     * Used for general transpositions applied to the file.
     * @param transpositionPitches A map defining for a given list of midi channels the number of semitones that should be adjusted.
     */
    applyTranspositionPitches(transpositionPitches: Map<number, number>): void;
    /**
     * Sets the transposition pitch of a given channel. This pitch is additionally applied beside the
     * ones applied already via {@link applyTranspositionPitches}.
     * @param channel The channel number
     * @param semitones The number of semitones to apply as pitch offset.
     */
    setChannelTranspositionPitch(channel: number, semitones: number): void;
    /**
     * Sets the mute state of a channel.
     * @param channel The channel number
     * @param mute true if the channel should be muted, otherwise false.
     */
    channelSetMute(channel: number, mute: boolean): void;
    /**
     * Gets the solo state of a channel.
     * @param channel The channel number
     * @param solo true if the channel should be played solo, otherwise false.
     */
    channelSetSolo(channel: number, solo: boolean): void;
    /**
     * Resets the mute/solo state of all channels
     */
    resetChannelStates(): void;
    /**
     * Gets or sets the current and initial volume of the given channel.
     * @param channel The channel number.
     * @param volume The volume of of the channel (0.0-1.0)
     */
    channelSetMixVolume(channel: number, volume: number): void;
    /**
     * Checks whether the synth has loaded the samples for a given midi program.
     * @param program The program to check.
     */
    hasSamplesForProgram(program: number): boolean;
    /**
     * Checks whether the synth has loaded the samples for a given percussion key.
     * @param key The midi key defining the percussion instrument.
     */
    hasSamplesForPercussion(key: number): boolean;
}

/**
 * A synth output for playing backing tracks.
 */
declare interface IBackingTrackSynthOutput extends ISynthOutput {
    /**
     * An event fired when the playback time changes. The time is in absolute milliseconds.
     */
    readonly timeUpdate: IEventEmitterOfT<number>;
    /**
     * The total duration of the backing track in milliseconds.
     */
    readonly backingTrackDuration: number;
    /**
     * The playback rate at which the output should playback.
     */
    playbackRate: number;
    /**
     * The volume at which the output should play (0-1)
     */
    masterVolume: number;
    /**
     * Instructs the output to seek to the given time position.
     * @param time The absolute time in milliseconds.
     */
    seekTo(time: number): void;
    /**
     * Instructs the output to load the given backing track.
     * @param backingTrack The backing track to load.
     */
    loadBackingTrack(backingTrack: BackingTrack): void;
}

/**
 * This is the base public interface for canvas implementations on different plattforms.
 */
declare interface ICanvas {
    settings: Settings;
    color: Color;
    lineWidth: number;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline;
    beginGroup(identifier: string): void;
    endGroup(): void;
    fillText(text: string, x: number, y: number): void;
    measureText(text: string): MeasuredText;
    fillMusicFontSymbol(x: number, y: number, relativeScale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    fillMusicFontSymbols(x: number, y: number, relativeScale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    beginRender(width: number, height: number): void;
    endRender(): unknown;
    onRenderFinished(): unknown;
    beginRotate(centerX: number, centerY: number, angle: number): void;
    endRotate(): void;
    beginPath(): void;
    closePath(): void;
    fill(): void;
    stroke(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    destroy(): void;
}

/**
 * This interface represents a container control in the UI layer.
 */
declare interface IContainer {
    /**
     * Gets or sets the width of the control.
     */
    width: number;
    /**
     * Gets or sets the height of the control.
     */
    height: number;
    /**
     * Gets a value indicating whether the control is visible.
     */
    readonly isVisible: boolean;
    /**
     * Gets or sets the horizontal scroll offset of this control if it is scrollable.
     */
    scrollLeft: number;
    /**
     * Gets or sets the vertical scroll offset of this control if it is scrollable.
     */
    scrollTop: number;
    /**
     * Adds the given child control to this container.
     * @param child The child control to add.
     */
    appendChild(child: IContainer): void;
    /**
     * Stops the animations of this control immediately.
     */
    stopAnimation(): void;
    /**
     * Sets the position and size of the container for efficient repositioning.
     * @param x The X-position
     * @param y The Y-position
     * @param w The width
     * @param h The height
     */
    setBounds(x: number, y: number, w: number, h: number): void;
    /**
     * Tells the control to move to the given X-position in the given time.
     * @param duration The milliseconds that should be needed to reach the new X-position
     * @param x The new X-position
     */
    transitionToX(duration: number, x: number): void;
    /**
     * Clears the container and removes all child items.
     */
    clear(): void;
    /**
     * This event occurs when the control was resized.
     */
    resize: IEventEmitter;
    /**
     * This event occurs when a mouse/finger press happened on the control.
     */
    mouseDown: IEventEmitterOfT<IMouseEventArgs>;
    /**
     * This event occurs when a mouse/finger moves on top of the control.
     */
    mouseMove: IEventEmitterOfT<IMouseEventArgs>;
    /**
     * This event occurs when a mouse/finger is released from the control.
     */
    mouseUp: IEventEmitterOfT<IMouseEventArgs>;
}

/**
 * An emitter for an event without any value passed to the listeners.
 */
export declare interface IEventEmitter {
    /**
     * Registers to the event with the given handler
     * @param value The function to call when the event occurs.
     * @returns A function which can be called to unregister the registered handler.
     * This is usedful if the original function passed to this is not stored somewhere but
     * unregistering of the event needs to be done.
     */
    on(value: () => void): () => void;
    /**
     * Unregisters the given handler from this event.
     * @param value The value originally passed into {@link on}, NOT the function returned by it.
     */
    off(value: () => void): void;
}

/**
 * An emitter for an event with a single parameter passed to the listeners.
 * @partial
 */
export declare interface IEventEmitterOfT<T> {
    /**
     * Registers to the event with the given handler
     * @param value The function to call when the event occurs.
     * @returns A function which can be called to unregister the registered handler.
     * This is usedful if the original function passed to this is not stored somewhere but
     * unregistering of the event needs to be done.
     */
    on(value: (arg: T) => void): () => void;
    /**
     * Unregisters the given handler from this event.
     * @param value The value originally passed into {@link on}, NOT the function returned by it.
     */
    off(value: (arg: T) => void): void;
}

/**
 * A custom handler for integrating alphaTab with an external media source.
 */
declare interface IExternalMediaHandler {
    /**
     * The total duration of the backing track in milliseconds.
     */
    readonly backingTrackDuration: number;
    /**
     * The playback rate at which the output should playback.
     */
    playbackRate: number;
    /**
     * The volume at which the output should play (0-1)
     */
    masterVolume: number;
    /**
     * Instructs the output to seek to the given time position.
     * @param time The absolute time in milliseconds.
     */
    seekTo(time: number): void;
    /**
     * Instructs the external media to start the playback.
     */
    play(): void;
    /**
     * Instructs the external media to pause the playback.
     */
    pause(): void;
}

/**
 * A output handling the playback via an external media.
 */
declare interface IExternalMediaSynthOutput extends IBackingTrackSynthOutput {
    /**
     * The handler to which the media control will be delegated.
     */
    handler: IExternalMediaHandler | undefined;
    /**
     * Updates the playback position from the external media source.
     * @param currentTime The current time in the external media.
     */
    updatePosition(currentTime: number): void;
}

export declare interface ILogger {
    debug(category: string, msg: string, ...details: unknown[]): void;
    warning(category: string, msg: string, ...details: unknown[]): void;
    info(category: string, msg: string, ...details: unknown[]): void;
    error(category: string, msg: string, ...details: unknown[]): void;
}

/**
 * A handler is responsible for writing midi events to a custom structure
 */
declare interface IMidiFileHandler {
    /**
     * Adds a time signature to the generated midi file
     * @param tick The midi ticks when this event should be happening.
     * @param timeSignatureNumerator The time signature numerator
     * @param timeSignatureDenominator The time signature denominator
     */
    addTimeSignature(tick: number, timeSignatureNumerator: number, timeSignatureDenominator: number): void;
    /**
     * Adds a rest to the generated midi file.
     * @param track The midi track on which the rest should be "played".
     * @param tick The midi ticks when the rest is "playing".
     * @param channel The midi channel on which the rest should be "played".
     */
    addRest(track: number, tick: number, channel: number): void;
    /**
     * Adds a note to the generated midi file
     * @param track The midi track on which the note should be played.
     * @param start The midi ticks when the note should start playing.
     * @param length The duration the note in midi ticks.
     * @param key The key of the note to play
     * @param velocity The velocity which should be applied to the note (derived from the note dynamics).
     * @param channel The midi channel on which the note should be played.
     */
    addNote(track: number, start: number, length: number, key: number, velocity: number, channel: number): void;
    /**
     * Adds a control change to the generated midi file.
     * @param track The midi track on which the controller should change.
     * @param tick The midi ticks when the controller should change.
     * @param channel The midi channel on which the controller should change.
     * @param controller The midi controller that should change.
     * @param value The value to which the midi controller should change
     */
    addControlChange(track: number, tick: number, channel: number, controller: ControllerType, value: number): void;
    /**
     * Add a program change to the generated midi file
     * @param track The midi track on which the program should change.
     * @param tick The midi ticks when the program should change.
     * @param channel The midi channel on which the program should change.
     * @param program The new program for the selected track and channel.
     */
    addProgramChange(track: number, tick: number, channel: number, program: number): void;
    /**
     * Add a tempo change to the generated midi file.
     * @param tick The midi ticks when the tempo should change change.
     * @param tempo The tempo as BPM
     */
    addTempo(tick: number, tempo: number): void;
    /**
     * Add a bend specific to a note to the generated midi file.
     * The note does not need to be started, if this event is signaled, the next time a note
     * on this channel and key is played it will be affected. The note bend is cleared on a note-off for this key.
     * @param track The midi track on which the bend should change.
     * @param tick The midi ticks when the bend should change.
     * @param channel The midi channel on which the bend should change.
     * @param channel The key of the note that should be affected by the bend.
     * @param value The new bend for the selected note.
     */
    addNoteBend(track: number, tick: number, channel: number, key: number, value: number): void;
    /**
     * Add a bend to the generated midi file.
     * @param track The midi track on which the bend should change.
     * @param tick The midi ticks when the bend should change.
     * @param channel The midi channel on which the bend should change.
     * @param value The new bend for the selected track and channel.
     */
    addBend(track: number, tick: number, channel: number, value: number): void;
    /**
     * Indicates that the track is finished on the given ticks.
     * @param track The track that was finished.
     * @param tick The end tick for this track.
     */
    finishTrack(track: number, tick: number): void;
}

/**
 * This interface represents the information about a mouse event that occured on the UI.
 */
declare interface IMouseEventArgs {
    /**
     * Gets a value indicating whether the left mouse button was pressed.
     */
    readonly isLeftMouseButton: boolean;
    /**
     * Gets the X-position of the cursor at the time of the event relative to the given UI container.
     * @param relativeTo The UI element to which the relative position should be calculated.
     * @returns The relative X-position of the cursor to the given UI container at the time the event occured.
     */
    getX(relativeTo: IContainer): number;
    /**
     * Gets the Y-position of the cursor at the time of the event relative to the given UI container.
     * @param relativeTo The UI element to which the relative position should be calculated.
     * @returns The relative Y-position of the cursor to the given UI container at the time the event occured.
     */
    getY(relativeTo: IContainer): number;
    /**
     * If called, the original mouse action is prevented and the event is flagged as handled.
     */
    preventDefault(): void;
}

export declare namespace importer {
    export {
        ScoreImporter,
        ScoreLoader,
        UnsupportedFormatError,
        AlphaTexImporter
    }
}

/**
 * All settings related to importers that decode file formats.
 * @json
 * @json_declaration
 */
export declare class ImporterSettings {
    /**
     * The text encoding to use when decoding strings.
     * @since 0.9.6
     * @defaultValue `utf-8`
     * @category Importer
     * @remarks
     * By default strings are interpreted as UTF-8 from the input files. This is sometimes not the case and leads to strong display
     * of strings in the rendered notation. Via this setting the text encoding for decoding the strings can be changed. The supported
     * encodings depend on the browser or operating system. This setting is considered for the importers
     *
     * * Guitar Pro 7
     * * Guitar Pro 6
     * * Guitar Pro 3-5
     * * MusicXML
     */
    encoding: string;
    /**
     * If part-groups should be merged into a single track (MusicXML).
     * @since 0.9.6
     * @defaultValue `false`
     * @category Importer
     * @remarks
     * This setting controls whether multiple `part-group` tags will result into a single track with multiple staves.
     */
    mergePartGroupsInMusicXml: boolean;
    /**
     * Enables detecting lyrics from beat texts
     * @since 1.2.0
     * @category Importer
     * @defaultValue `false`
     * @remarks
     *
     * On various old Guitar Pro 3-5 files tab authors often used the "beat text" feature to add lyrics to the individual tracks.
     * This was easier and quicker than using the lyrics feature.
     *
     * These texts were optimized to align correctly when viewed in Guitar Pro with the default layout but can lead to
     * disturbed display in alphaTab. When `beatTextAsLyrics` is set to true, alphaTab will try to rather parse beat text
     * values as lyrics using typical text patterns like dashes, underscores and spaces.
     *
     * The lyrics are only detected if not already proper lyrics are applied to the track.
     *
     * Enable this option for input files which suffer from this practice.
     *
     * > [!NOTE]
     * > alphaTab tries to relate the texts and chunks to the beats but this is not perfect.
     * > Errors are likely to happen with such kind of files.
     *
     * **Enabled**
     *
     * ![Enabled](https://alphatab.net/img/reference/property/beattextaslyrics-enabled.png)
     *
     * **Disabled**
     *
     * ![Disabled](https://alphatab.net/img/reference/property/beattextaslyrics-disabled.png)
     */
    beatTextAsLyrics: boolean;
}

/**
 * All settings related to importers that decode file formats.
 * @json
 * @json_declaration
 * @target web
 */
declare interface ImporterSettingsJson {
    /**
     * The text encoding to use when decoding strings.
     * @since 0.9.6
     * @defaultValue `utf-8`
     * @category Importer
     * @remarks
     * By default strings are interpreted as UTF-8 from the input files. This is sometimes not the case and leads to strong display
     * of strings in the rendered notation. Via this setting the text encoding for decoding the strings can be changed. The supported
     * encodings depend on the browser or operating system. This setting is considered for the importers
     *
     * * Guitar Pro 7
     * * Guitar Pro 6
     * * Guitar Pro 3-5
     * * MusicXML
     */
    encoding?: string;
    /**
     * If part-groups should be merged into a single track (MusicXML).
     * @since 0.9.6
     * @defaultValue `false`
     * @category Importer
     * @remarks
     * This setting controls whether multiple `part-group` tags will result into a single track with multiple staves.
     */
    mergePartGroupsInMusicXml?: boolean;
    /**
     * Enables detecting lyrics from beat texts
     * @since 1.2.0
     * @category Importer
     * @defaultValue `false`
     * @remarks
     *
     * On various old Guitar Pro 3-5 files tab authors often used the "beat text" feature to add lyrics to the individual tracks.
     * This was easier and quicker than using the lyrics feature.
     *
     * These texts were optimized to align correctly when viewed in Guitar Pro with the default layout but can lead to
     * disturbed display in alphaTab. When `beatTextAsLyrics` is set to true, alphaTab will try to rather parse beat text
     * values as lyrics using typical text patterns like dashes, underscores and spaces.
     *
     * The lyrics are only detected if not already proper lyrics are applied to the track.
     *
     * Enable this option for input files which suffer from this practice.
     *
     * > [!NOTE]
     * > alphaTab tries to relate the texts and chunks to the beats but this is not perfect.
     * > Errors are likely to happen with such kind of files.
     *
     * **Enabled**
     *
     * ![Enabled](https://alphatab.net/img/reference/property/beattextaslyrics-enabled.png)
     *
     * **Disabled**
     *
     * ![Disabled](https://alphatab.net/img/reference/property/beattextaslyrics-disabled.png)
     */
    beatTextAsLyrics?: boolean;
}

/**
 * Describes an instrument articulation which is used for percussions.
 * @json
 * @json_strict
 */
declare class InstrumentArticulation {
    /**
     * Gets or sets the type of the element for which this articulation is for.
     */
    elementType: string;
    /**
     * The line the note head should be shown for standard notation.
     *
     * @remarks
     * This value is a bit special and its semantics are adopted from Guitar Pro:
     * Staff lines are actually "steps" including lines and spaces on the staff.
     * 1 means the note is on the top line of the staff and from there its counting downwards.
     */
    staffLine: number;
    /**
     * Gets or sets the note head to display by default.
     */
    noteHeadDefault: MusicFontSymbol;
    /**
     * Gets or sets the note head to display for half duration notes.
     */
    noteHeadHalf: MusicFontSymbol;
    /**
     * Gets or sets the note head to display for whole duration notes.
     */
    noteHeadWhole: MusicFontSymbol;
    /**
     * Gets or sets which additional technique symbol should be placed for the note head.
     */
    techniqueSymbol: MusicFontSymbol;
    /**
     * Gets or sets where the technique symbol should be placed.
     */
    techniqueSymbolPlacement: TextBaseline;
    /**
     * Gets or sets which midi key to use when playing the note.
     */
    outputMidiNumber: number;
    constructor(elementType?: string, staffLine?: number, outputMidiNumber?: number, noteHeadDefault?: MusicFontSymbol, noteHeadHalf?: MusicFontSymbol, noteHeadWhole?: MusicFontSymbol, techniqueSymbol?: MusicFontSymbol, techniqueSymbolPlacement?: TextBaseline);
    getSymbol(duration: Duration): MusicFontSymbol;
}

/**
 * Lists the different modes in which the staves and systems are arranged.
 */
declare enum InternalSystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the relative scaling information stored in the score model.
     */
    FromModelWithScale = 1,
    /**
     * Use the absolute size information stored in the score model.
     */
    FromModelWithWidths = 2
}

export declare namespace io {
    export {
        IWriteable,
        IReadable,
        ByteBuffer,
        IOHelper
    }
}

declare class IOHelper {
    static readInt32BE(input: IReadable): number;
    static readFloat32BE(readable: IReadable): number;
    static readFloat64BE(readable: IReadable): number;
    static readInt32LE(input: IReadable): number;
    static readInt64LE(input: IReadable): number;
    static readUInt32LE(input: IReadable): number;
    static decodeUInt32LE(data: Uint8Array, index: number): number;
    static readUInt16LE(input: IReadable): number;
    static readInt16LE(input: IReadable): number;
    static readUInt32BE(input: IReadable): number;
    static readUInt16BE(input: IReadable): number;
    static readInt16BE(input: IReadable): number;
    static readByteArray(input: IReadable, length: number): Uint8Array;
    static read8BitChars(input: IReadable, length: number): string;
    static read8BitString(input: IReadable): string;
    static read8BitStringLength(input: IReadable, length: number): string;
    static readSInt8(input: IReadable): number;
    static readInt24(input: Uint8Array, index: number): number;
    static readInt16(input: Uint8Array, index: number): number;
    static toString(data: Uint8Array, encoding: string): string;
    private static detectEncoding;
    static stringToBytes(str: string): Uint8Array;
    static writeInt32BE(o: IWriteable, v: number): void;
    static writeInt32LE(o: IWriteable, v: number): void;
    static writeUInt16LE(o: IWriteable, v: number): void;
    static writeInt16LE(o: IWriteable, v: number): void;
    static writeInt16BE(o: IWriteable, v: number): void;
    static writeFloat32BE(o: IWriteable, v: number): void;
}

/**
 * Represents a stream of binary data that can be read from.
 */
declare interface IReadable {
    /**
     * Gets or sets the current read position relative in the stream.
     */
    position: number;
    /**
     * Gets the total number of bytes contained in the stream.
     */
    readonly length: number;
    /**
     * Resets the stream for reading the data from the beginning.
     */
    reset(): void;
    /**
     * Skip the given number of bytes.
     * @param offset The number of bytes to skip.
     */
    skip(offset: number): void;
    /**
     * Read a single byte from the data stream.
     * @returns The value of the next byte or -1 if there is no more data.
     */
    readByte(): number;
    /**
     * Reads the given number of bytes from the stream into the given buffer.
     * @param buffer The buffer to fill.
     * @param offset The offset in the buffer where to start writing.
     * @param count The number of bytes to read.
     * @returns
     */
    read(buffer: Uint8Array, offset: number, count: number): number;
    /**
     * Reads the remaining data.
     * @returns
     */
    readAll(): Uint8Array;
}

/**
 * Represents the public interface of the component that can render scores.
 */
declare interface IScoreRenderer {
    /**
     * Gets or sets the lookup which allows fast access to beats at a given position.
     */
    readonly boundsLookup: BoundsLookup | null;
    /**
     * The width of the rendered score.
     * @remarks
     * For layouts that grow from top to bottom (like `page`), it is required to specify a width for the renderer.
     * The renderer will fit then the bars into this area for rendering. The alphaTab API object uses a link to the
     * graphical user interface via a {@link IUiFacade} to get the available width for rendering. When using the low-level APIs
     * this width must be specified manually.
     *
     * For layouts that grow from left to right the width and height are usually calculated automatically based on
     * the contents.
     * @since 0.9.6
     */
    width: number;
    /**
     * Initiates a re-rendering of the current setup.
     * @since 0.9.6
     */
    render(): void;
    /**
     * Initiates a resize-optimized re-rendering of the score using the current settings.
     * @remarks
     * This method can be used if only re-fitting of the score into a new width should be done.
     * alphaTab internally keeps all the information about the music notation elements like
     * where they are placed and how they are connected. This is a rather expensive operation
     * but it is only required to be done once.
     *
     * In case the UI is resized, this method can be used to trigger a rearrangement of the existing elements
     * into the newly available space.
     * @since 0.9.6
     */
    resizeRender(): void;
    /**
     * Initiates the rendering of the specified tracks of the given score.
     * @param score The score defining the tracks.
     * @param trackIndexes The indexes of the tracks to draw.
     * @since 0.9.6
     */
    renderScore(score: Score | null, trackIndexes: number[] | null): void;
    /**
     * Requests the rendering of a chunk which was layed out before.
     * @param resultId the result ID as provided by the {@link partialLayoutFinished} event.
     * @remarks
     * This method initiates the rendering of a layed out chunk advertised through {@link partialLayoutFinished}
     * @since 1.2.3
     */
    renderResult(resultId: string): void;
    /**
     * Updates the settings to the given object.
     * @remarks
     * This method updates the settings to the given object. On some platforms like JavaScript
     * the settings object will need to be passed on to the corresponding worker to be really updated.
     * It is recommended to make this call after updating any properties of the settings object to ensure
     * it is really passed on to all components.
     *
     * This method will not trigger automatically any re-rendering.
     * @since 0.9.6
     */
    updateSettings(settings: Settings): void;
    /**
     * Destroys the renderer and all related components.
     * @remarks
     * This method destroys the full renderer and by this closes all potentially opened
     * contexts and shuts down any worker.
     *
     * If you dynamically create/destroy renderers it is recommended to always call this method
     * to ensure all resources are leaked.

     * @since 0.9.6
     */
    destroy(): void;
    /**
     * Occurs before the rendering of the tracks starts
     * @remarks
     * This event is fired when the rendering of the whole music sheet is starting. All
     * preparations are completed and the layout and render sequence is about to start.
     *
     * The provided boolean indicates the rendering is triggered from a resize
     *
     * @eventProperty
     * @since 0.9.4
     */
    readonly preRender: IEventEmitterOfT<boolean>;
    /**
     * This event is fired when the rendering of the whole music sheet is finished.
     * @remarks
     * This event is fired when the rendering of the whole music sheet is finished from the render engine side. There might be still tasks open for
     * the display component to visually display the rendered components when this event is notified.
     * @eventProperty
     * @since 0.9.4
     */
    readonly renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * Occurs whenever a part of the whole music sheet is rendered and can be displayed.
     * @remarks
     * AlphaTab does not render the whole music sheet into a single canvas but rather
     * splits it down into smaller chunks. This allows faster display of results to the user
     * and avoids issues related to browser restrictions (like maximum canvas sizes).
     *
     * This event is fired whenever one chunk of the music sheet is fully rendered.
     *
     * {@since 1.2.3} the rendering of a chunk needs to be requested via the {@link renderResult} method after
     * a chunk was advertised through the {@link partialLayoutFinished}.
     * @eventProperty
     * @since 1.2.3
     */
    readonly partialRenderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * Occurs whenever a part of the whole music sheet is layed out but not yet rendered.
     * @remarks
     * AlphaTab does not render the whole music sheet into a single canvas but rather
     * splits it down into smaller chunks. This allows faster display of results to the user
     * and avoids issues related to browser restrictions (like maximum canvas sizes).
     *
     * This event is fired whenever one chunk of the music sheet was fully layed out.
     * @eventProperty
     * @since 1.2.3
     */
    readonly partialLayoutFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    /**
     * This event is fired when the rendering of the whole music sheet is finished, and all handlers of {@link renderFinished} ran.
     * @remarks
     * This event is fired when the rendering of the whole music sheet is finished, and all handlers of {@link renderFinished} ran. When this
     * handlers are called, the whole rendering and display pipeline is completed.
     * @eventProperty
     * @since 0.9.4
     */
    readonly postRenderFinished: IEventEmitter;
    /**
     * This event is fired when an error within alphatab occurred.
     * @remarks
     * This event is fired when an error within alphatab occurred. Use this event as global error handler to show errors
     * to end-users. Due to the asynchronous nature of alphaTab, no call to the API will directly throw an error if it fails.
     * Instead a signal to this error handlers will be sent.
     * @since 0.9.4
     */
    readonly error: IEventEmitterOfT<Error>;
}

/**
 * This is the base interface for output devices which can
 * request and playback audio samples.
 * @csharp_public
 */
declare interface ISynthOutput {
    /**
     * Gets the sample rate required by the output.
     */
    readonly sampleRate: number;
    /**
     * Called when the output should be opened.
     */
    open(bufferTimeInMilliseconds: number): void;
    /**
     * Called when the output should start the playback.
     */
    play(): void;
    /**
     * Requests the output to destroy itself.
     */
    destroy(): void;
    /**
     * Called when the output should stop the playback.
     */
    pause(): void;
    /**
     * Called when samples have been synthesized and should be added to the playback buffer.
     * @param samples
     */
    addSamples(samples: Float32Array): void;
    /**
     * Called when the samples in the output buffer should be reset. This is neeed for instance when seeking to another position.
     */
    resetSamples(): void;
    /**
     * Activates the output component.
     */
    activate(): void;
    /**
     * Fired when the output has been successfully opened and is ready to play samples.
     */
    readonly ready: IEventEmitter;
    /**
     * Fired when a certain number of samples have been played.
     */
    readonly samplesPlayed: IEventEmitterOfT<number>;
    /**
     * Fired when the output needs more samples to be played.
     */
    readonly sampleRequest: IEventEmitter;
    /**
     * Loads and lists the available output devices. Will request permissions if needed.
     * @async
     */
    enumerateOutputDevices(): Promise<ISynthOutputDevice[]>;
    /**
     * Changes the output device which should be used for playing the audio.
     * @async
     * @param device The output device to use, or null to switch to the default device.
     */
    setOutputDevice(device: ISynthOutputDevice | null): Promise<void>;
    /**
     * The currently configured output device if changed via {@link setOutputDevice}.
     * @async
     * @returns The custom configured output device which was set via {@link setOutputDevice} or `null`
     * if the default outputDevice is used.
     * The output device might change dynamically if devices are connected/disconnected (e.g. bluetooth headset).
     */
    getOutputDevice(): Promise<ISynthOutputDevice | null>;
}

/**
 * Represents a output device on which the synth can send the audio to.
 */
declare interface ISynthOutputDevice {
    /**
     * The ID to uniquely identify the device.
     */
    readonly deviceId: string;
    /**
     * A string describing the device.
     */
    readonly label: string;
    /**
     * Gets a value indicating whether the device is the default output device.
     */
    readonly isDefault: boolean;
}

/**
 * This interface represents the UI abstraction between alphaTab and the corresponding UI framework being used.
 * @param <TSettings> The type of that holds the settings passed from the UI layer.
 */
declare interface IUiFacade<TSettings> {
    /**
     * Gets the root UI element that holds the whole alphaTab control.
     */
    readonly rootContainer: IContainer;
    /**
     * Gets a value indicating whether the UI framework supports worker based rendering.
     */
    readonly areWorkersSupported: boolean;
    /**
     * Gets or sets whether the UI is ready to render the music notation. On some platforms where pre-loading of assets is done asynchronously,
     * rendering might need to be deferred.
     */
    readonly canRender: boolean;
    /**
     * Gets the resize throttling in milliseconds. Then the music sheet is resized, the re-rendering is deferred until this timeout is reached.
     */
    readonly resizeThrottle: number;
    /**
     * Initializes the UI using the given alphaTab API and settings object.
     * @param api The alphaTab API wrapper responsible for UI interaction.
     * @param settings The settings object holding the settings from the UI layer.
     */
    initialize(api: AlphaTabApiBase<TSettings>, settings: TSettings): void;
    /**
     * Tells the UI layer to destroy the alphaTab controls and restore the initial state.
     */
    destroy(): void;
    /**
     * Creates the canvas element that wraps all individually rendered partials.
     * @returns The canvas element that wraps all individually rendered partials.
     */
    createCanvasElement(): IContainer;
    /**
     * Tells the UI layer to trigger an event with the given name and details.
     * @param container The element on which the event should be triggered.
     * @param eventName The event that should be triggered.
     * @param details The object holding the details about the event.
     * @param originalEvent The original event related to this custom event.
     */
    triggerEvent(container: IContainer, eventName: string, details: unknown, originalEvent?: IMouseEventArgs): void;
    /**
     * Tells the UI layer to do the initial rendering.
     */
    initialRender(): void;
    /**
     * Tells the UI layer to append the given render results to the UI. At this point
     * the partial result is not actually rendered yet, only the layouting process
     * completed.
     * @param renderResults The rendered partial that should be added to the UI. null indicates the rendering finished.
     */
    beginAppendRenderResults(renderResults: RenderFinishedEventArgs | null): void;
    /**
     * Tells the UI layer to update the given render results within the UI.
     * @param renderResults The rendered partial that should be updated within the UI.
     */
    beginUpdateRenderResults(renderResults: RenderFinishedEventArgs): void;
    /**
     * Tells the UI layer to create the worker renderer. This method is the UI layer supports worker rendering and worker rendering is not disabled via setting.
     * @returns
     */
    createWorkerRenderer(): IScoreRenderer;
    /**
     * Tells the UI layer to create a player worker for the synthesizer.
     * @returns
     */
    createWorkerPlayer(): IAlphaSynth | null;
    /**
     * Tells the UI layer to create a new audio exporter.
     * @param synth The currently active alphaSynth that might be used for synthesizing.
     * If the provided synthesizer is already an active player worker (created via {@link createWorkerPlayer}),
     * it can reuse the already initialized state.
     * @returns
     */
    createWorkerAudioExporter(synth: IAlphaSynth | null): IAudioExporterWorker;
    /**
     * Tells the UI layer to create a player which can play backing tracks.
     * @returns
     */
    createBackingTrackPlayer(): IAlphaSynth | null;
    /**
     * Creates the cursor objects that are used to highlight the currently played beats and bars.
     * @returns
     */
    createCursors(): Cursors | null;
    /**
     * Destroys the cursor objects that are used to highlight the currently played beats and bars.
     */
    destroyCursors(): void;
    /**
     * Tells the UI layer to invoke the given action.
     * @param action
     */
    beginInvoke(action: () => void): void;
    /**
     * Tells the UI layer to remove all highlights from highlighted music notation elements.
     */
    removeHighlights(): void;
    /**
     * Tells the UI layer to highlight the music notation elements with the given ID.
     * @param groupId The group id that identifies the elements to be highlighted.
     * @param masterBarIndex The index of the related masterbar of the highlighted group.
     */
    highlightElements(groupId: string, masterBarIndex: number): void;
    /**
     * Creates a new UI element that is used to display the selection rectangle.
     * @returns
     */
    createSelectionElement(): IContainer | null;
    /**
     * Gets the UI element that is used for scrolling during playback.
     * @returns
     */
    getScrollContainer(): IContainer;
    /**
     * Calculates the relative offset of a container to the scroll element.
     * @param scrollElement The parent scroll element to which the relative position is computed.
     * @param container The container element for which the relative position is calculated.
     * @returns
     */
    getOffset(scrollElement: IContainer | null, container: IContainer): Bounds;
    /**
     * Initiates a vertical scroll on the given element.
     * @param scrollElement The element on which the scrolling should happen.
     * @param offset The absolute scroll offset to which scrolling should happen.
     * @param speed How fast the scrolling from the current offset to the given one should happen in milliseconds.
     */
    scrollToY(scrollElement: IContainer, offset: number, speed: number): void;
    /**
     * Initiates a horizontal scroll on the given element.
     * @param scrollElement The element on which the scrolling should happen.
     * @param offset The absolute scroll offset to which scrolling should happen.
     * @param speed How fast the scrolling from the current offset to the given one should happen in milliseconds.
     */
    scrollToX(scrollElement: IContainer, offset: number, speed: number): void;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param data The data object to decode
     * @param success The action to call if the score was loaded
     * @param error The action to call if any error during loading ocurred.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    load(data: unknown, success: (score: Score) => void, error: (error: Error) => void): boolean;
    /**
     * Attempts a load of the score represented by the given data object.
     * @param data The data object to decode
     * @param append Whether to fully replace or append the data from the given soundfont.
     * @returns true if the data object is supported and a load was initiated, otherwise false
     */
    loadSoundFont(data: unknown, append: boolean): boolean;
    /**
     * This events is fired when the {@link canRender} property changes.
     */
    readonly canRenderChanged: IEventEmitter;
    /**
     * This event is fired when {@link rootContainer} became visible when it was invisible at the time rendering was initiated.
     */
    readonly rootContainerBecameVisible: IEventEmitter;
}

/**
 * Represents a writer where binary data can be written to.
 */
declare interface IWriteable {
    /**
     * Gets the current number of written bytes.
     */
    readonly bytesWritten: number;
    /**
     * Write a single byte to the stream.
     * @param value The value to write.
     */
    writeByte(value: number): void;
    /**
     * Write data from the given buffer.
     * @param buffer The buffer to get the data from.
     * @param offset The offset where to start reading the data.
     * @param count The number of bytes to write
     */
    write(buffer: Uint8Array, offset: number, count: number): void;
}

export declare namespace json {
    export {
        CoreSettingsJson,
        RenderingResourcesJson,
        DisplaySettingsJson,
        ImporterSettingsJson,
        NotationSettingsJson,
        VibratoPlaybackSettingsJson,
        SlidePlaybackSettingsJson,
        PlayerSettingsJson,
        FontJson,
        ColorJson,
        SettingsJson
    }
}

/**
 * This class can convert a full {@link Score} instance to a simple JavaScript object and back for further
 * JSON serialization.
 */
declare class JsonConverter {
    /**
     * @target web
     */
    private static jsonReplacer;
    /**
     * Converts the given score into a JSON encoded string.
     * @param score The score to serialize.
     * @returns A JSON encoded string.
     * @target web
     */
    static scoreToJson(score: Score): string;
    /**
     * Converts the given JSON string back to a {@link Score} object.
     * @param json The JSON string
     * @param settings The settings to use during conversion.
     * @returns The converted score object.
     * @target web
     */
    static jsonToScore(json: string, settings?: Settings): Score;
    /**
     * Converts the score into a JavaScript object without circular dependencies.
     * @param score The score object to serialize
     * @returns A serialized score object without ciruclar dependencies that can be used for further serializations.
     */
    static scoreToJsObject(score: Score): unknown;
    /**
     * Converts the given JavaScript object into a score object.
     * @param jsObject The javascript object created via {@link Score}
     * @param settings The settings to use during conversion.
     * @returns The converted score object.
     */
    static jsObjectToScore(jsObject: unknown, settings?: Settings): Score;
    /**
     * Converts the given settings into a JSON encoded string.
     * @param settings The settings to serialize.
     * @returns A JSON encoded string.
     * @target web
     */
    static settingsToJson(settings: Settings): string;
    /**
     * Converts the given JSON string back to a {@link Score} object.
     * @param json The JSON string
     * @returns The converted settings object.
     * @target web
     */
    static jsonToSettings(json: string): Settings;
    /**
     * Converts the settings object into a JavaScript object for transmission between components or saving purposes.
     * @param settings The settings object to serialize
     * @returns A serialized settings object without ciruclar dependencies that can be used for further serializations.
     */
    static settingsToJsObject(settings: Settings): Map<string, unknown> | null;
    /**
     * Converts the given JavaScript object into a settings object.
     * @param jsObject The javascript object created via {@link Settings}
     * @returns The converted Settings object.
     */
    static jsObjectToSettings(jsObject: unknown): Settings;
    /**
     * Converts the given JavaScript object into a MidiFile object.
     * @param jsObject The javascript object to deserialize.
     * @returns The converted MidiFile.
     */
    static jsObjectToMidiFile(jsObject: unknown): MidiFile;
    private static jsObjectToMidiTrack;
    /**
     * Converts the given JavaScript object into a MidiEvent object.
     * @param jsObject The javascript object to deserialize.
     * @returns The converted MidiEvent.
     */
    static jsObjectToMidiEvent(midiEvent: unknown): MidiEvent;
    /**
     * Converts the given MidiFile object into a serialized JavaScript object.
     * @param midi The midi file to convert.
     * @returns A serialized MidiFile object without ciruclar dependencies that can be used for further serializations.
     */
    static midiFileToJsObject(midi: MidiFile): Map<string, unknown>;
    private static midiTrackToJsObject;
    /**
     * Converts the given MidiEvent object into a serialized JavaScript object.
     * @param midi The midi file to convert.
     * @returns A serialized MidiEvent object without ciruclar dependencies that can be used for further serializations.
     */
    static midiEventToJsObject(midiEvent: MidiEvent): Map<string, unknown>;
}

/**
 * This public enumeration lists all available key signatures
 */
declare enum KeySignature {
    /**
     * Cb (7 flats)
     */
    Cb = -7,
    /**
     * Gb (6 flats)
     */
    Gb = -6,
    /**
     * Db (5 flats)
     */
    Db = -5,
    /**
     * Ab (4 flats)
     */
    Ab = -4,
    /**
     * Eb (3 flats)
     */
    Eb = -3,
    /**
     * Bb (2 flats)
     */
    Bb = -2,
    /**
     * F (1 flat)
     */
    F = -1,
    /**
     * C (no signs)
     */
    C = 0,
    /**
     * G (1 sharp)
     */
    G = 1,
    /**
     * D (2 sharp)
     */
    D = 2,
    /**
     * A (3 sharp)
     */
    A = 3,
    /**
     * E (4 sharp)
     */
    E = 4,
    /**
     * B (5 sharp)
     */
    B = 5,
    /**
     * F# (6 sharp)
     */
    FSharp = 6,
    /**
     * C# (7 sharp)
     */
    CSharp = 7
}

/**
 * This public enumeration lists all available types of KeySignatures
 */
declare enum KeySignatureType {
    /**
     * Major
     */
    Major = 0,
    /**
     * Minor
     */
    Minor = 1
}

/**
 * A factory for custom layout engines.
 */
declare class LayoutEngineFactory {
    /**
     * Whether the layout is considered "vertical" (affects mainly scrolling behavior).
     */
    readonly vertical: boolean;
    /**
     * Creates a new layout instance.
     */
    readonly createLayout: (renderer: ScoreRenderer) => ScoreLayout;
    constructor(vertical: boolean, createLayout: (renderer: ScoreRenderer) => ScoreLayout);
}

/**
 * Lists all layout modes that are supported.
 */
export declare enum LayoutMode {
    /**
     * The bars are aligned in an [vertically endless page-style fashion](https://alphatab.net/docs/showcase/layouts#page-layout)
     */
    Page = 0,
    /**
     * Bars are aligned horizontally in [one horizontally endless system (row)](https://alphatab.net/docs/showcase/layouts#horizontal-layout)
     */
    Horizontal = 1
}

/**
 * @target web
 */
declare class Lazy<T> {
    private _factory;
    private _value;
    constructor(factory: () => T);
    get value(): T;
}

export declare class Logger {
    static logLevel: LogLevel;
    static log: ILogger;
    private static shouldLog;
    static debug(category: string, msg: string, ...details: unknown[]): void;
    static warning(category: string, msg: string, ...details: unknown[]): void;
    static info(category: string, msg: string, ...details: unknown[]): void;
    static error(category: string, msg: string, ...details: unknown[]): void;
}

/**
 * Defines all loglevels.
 * @json
 */
export declare enum LogLevel {
    /**
     * No logging
     */
    None = 0,
    /**
     * Debug level (internal details are displayed).
     */
    Debug = 1,
    /**
     * Info level (only important details are shown)
     */
    Info = 2,
    /**
     * Warning level
     */
    Warning = 3,
    /**
     * Error level.
     */
    Error = 4
}

/**
 * Represents the lyrics of a song.
 */
declare class Lyrics {
    private static readonly CharCodeLF;
    private static readonly CharCodeTab;
    private static readonly CharCodeCR;
    private static readonly CharCodeSpace;
    private static readonly CharCodeBrackedClose;
    private static readonly CharCodeBrackedOpen;
    private static readonly CharCodeDash;
    /**
     * Gets or sets he start bar on which the lyrics should begin.
     */
    startBar: number;
    /**
     * Gets or sets the raw lyrics text in Guitar Pro format.
     * (spaces split word syllables, plus merge syllables, [..] are comments)
     */
    text: string;
    /**
     * Gets or sets the prepared chunks of the lyrics to apply to beats.
     */
    chunks: string[];
    finish(skipEmptyEntries?: boolean): void;
    private parse;
    private addChunk;
    private prepareChunk;
}

/**
 * The MasterBar stores information about a bar which affects
 * all tracks.
 * @json
 * @json_strict
 */
declare class MasterBar {
    static readonly MaxAlternateEndings: number;
    /**
     * Gets or sets the bitflag for the alternate endings. Each bit defines for which repeat counts
     * the bar is played.
     */
    alternateEndings: number;
    /**
     * Gets or sets the next masterbar in the song.
     * @json_ignore
     */
    nextMasterBar: MasterBar | null;
    /**
     * Gets or sets the next masterbar in the song.
     * @json_ignore
     */
    previousMasterBar: MasterBar | null;
    /**
     * Gets the zero based index of the masterbar.
     * @json_ignore
     */
    index: number;
    /**
     * Whether the masterbar is has any changes applied to it (e.g. tempo changes, time signature changes etc)
     * The first bar is always considered changed due to initial setup of values. It does not consider
     * elements like whether the tempo really changes to the previous bar.
     */
    get hasChanges(): boolean;
    /**
     * The key signature used on all bars.
     * @deprecated Use key signatures on bar level
     */
    get keySignature(): KeySignature;
    /**
     * The key signature used on all bars.
     * @deprecated Use key signatures on bar level
     */
    set keySignature(value: KeySignature);
    /**
     * The type of key signature (major/minor)
     * @deprecated Use key signatures on bar level
     */
    get keySignatureType(): KeySignatureType;
    /**
     * The type of key signature (major/minor)
     * @deprecated Use key signatures on bar level
     */
    set keySignatureType(value: KeySignatureType);
    /**
     * Gets or sets whether a double bar is shown for this masterbar.
     * @deprecated Use {@link Bar.barLineLeft} and {@link Bar.barLineRight}
     */
    isDoubleBar: boolean;
    /**
     * Gets or sets whether a repeat section starts on this masterbar.
     */
    isRepeatStart: boolean;
    get isRepeatEnd(): boolean;
    /**
     * Gets or sets the number of repeats for the current repeat section.
     */
    repeatCount: number;
    /**
     * Gets or sets the repeat group this bar belongs to.
     * @json_ignore
     */
    repeatGroup: RepeatGroup;
    /**
     * Gets or sets the time signature numerator.
     */
    timeSignatureNumerator: number;
    /**
     * Gets or sets the time signature denominiator.
     */
    timeSignatureDenominator: number;
    /**
     * Gets or sets whether this is bar has a common time signature.
     */
    timeSignatureCommon: boolean;
    /**
     * Gets or sets whether the bar indicates a free time playing.
     */
    isFreeTime: boolean;
    /**
     * Gets or sets the triplet feel that is valid for this bar.
     */
    tripletFeel: TripletFeel;
    /**
     * Gets or sets the new section information for this bar.
     */
    section: Section | null;
    get isSectionStart(): boolean;
    /**
     * Gets or sets the first tempo automation for this bar.
     * @deprecated Use {@link tempoAutomations}.
     */
    get tempoAutomation(): Automation | null;
    /**
     * Gets or sets all tempo automation for this bar.
     */
    tempoAutomations: Automation[];
    /**
     * The sync points for this master bar to synchronize the alphaTab time axis with the
     * external backing track audio.
     * @json_add addSyncPoint
     */
    syncPoints: Automation[] | undefined;
    /**
     * Gets or sets the reference to the score this song belongs to.
     * @json_ignore
     */
    score: Score;
    /**
     * Gets or sets the fermatas for this bar. The key is the offset of the fermata in midi ticks.
     * @json_add addFermata
     */
    fermata: Map<number, Fermata> | null;
    /**
     * The timeline position of the voice within the whole score. (unit: midi ticks)
     */
    start: number;
    /**
     * Gets or sets a value indicating whether the master bar is an anacrusis (aka. pickup bar)
     */
    isAnacrusis: boolean;
    /**
     * Gets a percentual scale for the size of the bars when displayed in a multi-track layout.
     */
    displayScale: number;
    /**
     * An absolute width of the bar to use when displaying in a multi-track layout.
     */
    displayWidth: number;
    /**
     * The directions applied to this masterbar.
     * @json_add addDirection
     */
    directions: Set<Direction> | null;
    /**
     * Calculates the time spent in this bar. (unit: midi ticks)
     */
    calculateDuration(respectAnacrusis?: boolean): number;
    /**
     * Adds a fermata to the masterbar.
     * @param offset The offset of the fermata within the bar in midi ticks.
     * @param fermata The fermata.
     */
    addFermata(offset: number, fermata: Fermata): void;
    /**
     * Adds a direction to the masterbar.
     * @param direction The direction to add.
     */
    addDirection(direction: Direction): void;
    /**
     * Gets the fermata for a given beat.
     * @param beat The beat to get the fermata for.
     * @returns
     */
    getFermata(beat: Beat): Fermata | null;
    /**
     * Adds the given sync point to the list of sync points for this bar.
     * @param syncPoint  The sync point to add.
     */
    addSyncPoint(syncPoint: Automation): void;
}

/**
 * Represents the boundaries of a list of bars related to a single master bar.
 */
declare class MasterBarBounds {
    /**
     * Gets or sets the index of this bounds relative within the parent lookup.
     */
    index: number;
    /**
     * Gets or sets a value indicating whether this bounds are the first of the line.
     */
    isFirstOfLine: boolean;
    /**
     * Gets or sets the bounds covering all visually visible elements spanning all bars of this master bar.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this master bar including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the actual bounds which are exactly aligned with the lines of the staffs.
     */
    lineAlignedBounds: Bounds;
    /**
     * Gets or sets the list of individual bars within this lookup.
     */
    bars: BarBounds[];
    /**
     * Gets or sets a reference to the parent {@link staffSystemBounds}.
     */
    staffSystemBounds: StaffSystemBounds | null;
    /**
     * Gets or sets a reference to the parent {@link staffSystemBounds}.
     * @deprecated use staffSystemBounds
     */
    get staveGroupBounds(): StaffSystemBounds | null;
    /**
     * Adds a new bar to this lookup.
     * @param bounds The bar bounds to add to this lookup.
     */
    addBar(bounds: BarBounds): void;
    /**
     * Tries to find a beat at the given location.
     * @param x The absolute X position where the beat spans across.
     * @param y The absolute Y position where the beat spans across.
     * @returns The beat that spans across the given point, or null if none of the contained bars had a beat at this position.
     */
    findBeatAtPos(x: number, y: number): Beat | null;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(scale?: number): void;
    /**
     * Adds a new beat to the lookup.
     * @param bounds The beat bounds to add.
     */
    addBeat(bounds: BeatBounds): void;
}

/**
 * This container represents a single column of bar renderers independent from any staves.
 * This container can be used to reorganize renderers into a new staves.
 */
declare class MasterBarsRenderers {
    width: number;
    isLinkedToPrevious: boolean;
    canWrap: boolean;
    masterBar: MasterBar;
    additionalMultiBarRestIndexes: number[] | null;
    get lastMasterBarIndex(): number;
    renderers: BarRendererBase[];
    layoutingInfo: BarLayoutingInfo;
}

/**
 * Represents the time period, for which all bars of a {@link MasterBar} are played.
 */
declare class MasterBarTickLookup {
    /**
     * Gets or sets the start time in midi ticks at which the MasterBar is played.
     */
    start: number;
    /**
     * Gets or sets the end time in midi ticks at which the MasterBar is played.
     */
    end: number;
    /**
     * Gets or sets the current tempo when the MasterBar is played.
     * @deprecated use {@link tempoChanges}
     */
    get tempo(): number;
    /**
     * Gets the list of tempo changes within the tick lookup.
     */
    readonly tempoChanges: MasterBarTickLookupTempoChange[];
    /**
     * Gets or sets the MasterBar which is played.
     */
    masterBar: MasterBar;
    /**
     * The first beat in the bar.
     */
    firstBeat: BeatTickLookup | null;
    /**
     * The last beat in the bar.
     */
    lastBeat: BeatTickLookup | null;
    /**
     * Inserts `newNextBeat` after `currentBeat` in the linked list of items and updates.
     * the `firstBeat` and `lastBeat` respectively too.
     * @param currentBeat The item in which to insert the new item afterwards
     * @param newBeat The new item to insert
     */
    private insertAfter;
    /**
     * Inserts `newNextBeat` before `currentBeat` in the linked list of items and updates.
     * the `firstBeat` and `lastBeat` respectively too.
     * @param currentBeat The item in which to insert the new item afterwards
     * @param newBeat The new item to insert
     */
    private insertBefore;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the next masterbar in the {@link Score}
     */
    nextMasterBar: MasterBarTickLookup | null;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the previous masterbar in the {@link Score}
     */
    previousMasterBar: MasterBarTickLookup | null;
    /**
     * Adds a new beat to this masterbar following the slicing logic required by the MidiTickLookup.
     * @param beat The beat to add to this masterbat
     * @param beatPlaybackStart The original start of this beat. This time is relevant for highlighting.
     * @param sliceStart The slice start to which this beat should be added. This time is relevant for creating new slices.
     * @param sliceDuration The slice duration to which this beat should be added. This time is relevant for creating new slices.
     * @returns The first item of the chain which was affected.
     */
    addBeat(beat: Beat, beatPlaybackStart: number, sliceStart: number, sliceDuration: number): void;
}

/**
 * Represents a single point in time defining the tempo of a {@link MasterBarTickLookup}.
 * This is typically the initial tempo of a master bar or a tempo change.
 */
declare class MasterBarTickLookupTempoChange {
    /**
     * Gets or sets the tick position within the {@link MasterBarTickLookup.start} and  {@link MasterBarTickLookup.end} range.
     */
    tick: number;
    /**
     * Gets or sets the tempo at the tick position.
     */
    tempo: number;
    constructor(tick: number, tempo: number);
}

/**
 * The MeasuredText class represents the dimensions of a piece of text in the canvas;
 */
declare class MeasuredText {
    /**
     * Returns the width of a segment of inline text in CSS pixels.
     */
    width: number;
    /**
     * Returns the height of a segment of inline text in CSS pixels.
     */
    height: number;
    constructor(width: number, height: number);
}

export declare class meta {
    static readonly version: string;
    static readonly date: string;
    static readonly commit: string;
    static print(print: (message: string) => void): void;
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class MetaDataEvent extends MetaEvent {
    data: Uint8Array;
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class MetaEvent extends DeprecatedMidiEvent {
    get metaStatus(): MetaEventType;
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare enum MetaEventType {
    SequenceNumber = 0,
    TextEvent = 1,
    CopyrightNotice = 2,
    SequenceOrTrackName = 3,
    InstrumentName = 4,
    LyricText = 5,
    MarkerText = 6,
    CuePoint = 7,
    PatchName = 8,
    PortName = 9,
    MidiChannel = 32,
    MidiPort = 33,
    EndOfTrack = 47,
    Tempo = 81,
    SmpteOffset = 84,
    TimeSignature = 88,
    KeySignature = 89,
    SequencerSpecific = 127
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class MetaNumberEvent extends MetaEvent {
    value: number;
}

export declare namespace midi {
    export {
        BeatTickLookup,
        BeatTickLookupItem,
        MasterBarTickLookup,
        MasterBarTickLookupTempoChange,
        MidiTickLookup,
        MidiTickLookupFindBeatResult,
        MidiTickLookupFindBeatResultCursorMode,
        MidiFile,
        MidiFileFormat,
        MidiTrack,
        ControllerType,
        MidiEvent,
        MidiEventType,
        TimeSignatureEvent,
        AlphaTabRestEvent,
        AlphaTabMetronomeEvent,
        NoteEvent,
        NoteOnEvent,
        NoteOffEvent,
        ControlChangeEvent,
        ProgramChangeEvent,
        TempoChangeEvent,
        PitchBendEvent,
        NoteBendEvent,
        EndOfTrackEvent,
        AlphaTabSysExEvent,
        DeprecatedMidiEvent,
        MetaEventType,
        MetaEvent,
        MetaDataEvent,
        MetaNumberEvent,
        Midi20PerNotePitchBendEvent,
        SystemCommonType,
        SystemCommonEvent,
        AlphaTabSystemExclusiveEvents,
        SystemExclusiveEvent,
        MidiFileGenerator,
        AlphaSynthMidiFileHandler,
        IMidiFileHandler
    }
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class Midi20PerNotePitchBendEvent extends DeprecatedMidiEvent {
    noteKey: number;
    pitch: number;
}

/**
 * Represents a midi event.
 */
declare abstract class MidiEvent {
    /**
     * Gets or sets the track to which the midi event belongs.
     */
    track: number;
    /**
     * Gets or sets the absolute tick of this midi event.
     */
    tick: number;
    /**
     * Gets or sets the midi command (type) of this event.
     */
    type: MidiEventType;
    /**
     * Initializes a new instance of the {@link MidiEvent} class.
     * @param track The track this event belongs to.
     * @param tick The absolute midi ticks of this event.
     * @param command The type of this event.
     */
    constructor(track: number, tick: number, command: MidiEventType);
    /**
     * @deprecated Change to `type`
     */
    get command(): MidiEventType;
    /**
     * The 32-bit encoded raw midi message. Deprecated {@since 1.3.0}. Use the properties of the subclasses instead.
     * @deprecated Use individual properties to access data.
     */
    get message(): number;
    /**
     * The first data byte. Meaning depends on midi event type. (Deprecated {@since 1.3.0}, use the specific properties of the midi event depending on type)
     * @deprecated Use individual properties to access data.
     */
    get data1(): number;
    /**
     * The second data byte Meaning depends on midi event type. (Deprecated {@since 1.3.0}, use the specific properties of the midi event depending on type)
     * @deprecated Use individual properties to access data.
     */
    get data2(): number;
    /**
     * Writes the midi event as binary into the given stream.
     * @param s The stream to write to.
     */
    abstract writeTo(s: IWriteable): void;
}

/**
 * Represents the info when the synthesizer played certain midi events.
 */
declare class MidiEventsPlayedEventArgs {
    /**
     * Gets the events which were played.
     */
    readonly events: MidiEvent[];
    /**
     * Initializes a new instance of the {@link MidiEventsPlayedEventArgs} class.
     * @param events The events which were played.
     */
    constructor(events: MidiEvent[]);
}

/**
 * Lists all midi event types. Based on the type the instance is a specific subclass.
 */
declare enum MidiEventType {
    TimeSignature = 88,// 0xFF _0x58_ in Midi 1.0
    NoteOn = 128,// Aligned with Midi 1.0
    NoteOff = 144,// Aligned with Midi 1.0
    ControlChange = 176,// Aligned with Midi 1.0
    ProgramChange = 192,// Aligned with Midi 1.0
    TempoChange = 81,// 0xFF _0x51_ in Midi 1.0
    PitchBend = 224,// Aligned with Midi 1.0
    PerNotePitchBend = 96,// Aligned with Midi 2.0
    EndOfTrack = 47,// 0xFF _0x2F_ in Midi 1.0
    AlphaTabRest = 241,// SystemExclusive + 1
    AlphaTabMetronome = 242,// SystemExclusive + 2
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    SystemExclusive = 240,// Aligned with Midi 1.0
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    SystemExclusive2 = 247,// Aligned with Midi 1.0
    /**
     * @deprecated Not used anymore internally. move to the other concrete types.
     */
    Meta = 255
}

/**
 * Represents a midi file with a single track that can be played via {@link AlphaSynth}
 */
declare class MidiFile {
    /**
     * Gets or sets the midi file format to use.
     */
    format: MidiFileFormat;
    /**
     * Gets or sets the division per quarter notes.
     */
    division: number;
    /**
     * Gets a list of midi events sorted by time.
     */
    get events(): MidiEvent[];
    /**
     * Gets a list of midi tracks.
     */
    readonly tracks: MidiTrack[];
    private ensureTracks;
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi file into a binary format.
     * @returns The binary midi file.
     */
    toBinary(): Uint8Array;
    /**
     * Writes the midi file as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
    static writeVariableInt(s: IWriteable, value: number): void;
}

/**
 * Lists the different midi file formats which are supported for export.
 */
declare enum MidiFileFormat {
    /**
     * A single track multi channel file (SMF Type 0)
     */
    SingleTrackMultiChannel = 0,
    /**
     * A multi track file (SMF Type 1)
     */
    MultiTrack = 1
}

/**
 * This generator creates a midi file using a score.
 */
declare class MidiFileGenerator {
    private static readonly DefaultDurationDead;
    private static readonly DefaultDurationPalmMute;
    private readonly _score;
    private _settings;
    private _handler;
    private _programsPerChannel;
    private _currentTime;
    private _calculatedBeatTimers;
    /**
     * Gets a lookup object which can be used to quickly find beats and bars
     * at a given midi tick position.
     */
    readonly tickLookup: MidiTickLookup;
    /**
     * Gets or sets whether transposition pitches should be applied to the individual midi events or not.
     */
    applyTranspositionPitches: boolean;
    /**
     * The computed sync points for synchronizing the midi file with an external backing track.
     */
    syncPoints: BackingTrackSyncPoint[];
    /**
     * Gets the transposition pitches for the individual midi channels.
     */
    readonly transpositionPitches: Map<number, number>;
    /**
     * Initializes a new instance of the {@link MidiFileGenerator} class.
     * @param score The score for which the midi file should be generated.
     * @param settings The settings ot use for generation.
     * @param handler The handler that should be used for generating midi events.
     */
    constructor(score: Score, settings: Settings | null, handler: IMidiFileHandler);
    /**
     * Starts the generation of the midi file.
     */
    generate(): void;
    private generateTrack;
    private addProgramChange;
    static buildTranspositionPitches(score: Score, settings: Settings): Map<number, number>;
    private generateChannel;
    /**
     * Generates the sync points for the given score without re-generating the midi itself.
     * @remarks
     * Use this method if a re-generation of the sync points after modification is required.
     * It correctly handles repeats and places sync points accoridng to their absolute midi tick when they
     * need to be considered for synchronization.
     * @param score The song for which to regenerate the sync points.
     * @param createNew Whether a new set of sync points should be generated for the sync (start, stop and tempo changes).
     * @returns The generated sync points for usage in the backing track playback.
     */
    static generateSyncPoints(score: Score, createNew?: boolean): BackingTrackSyncPoint[];
    /* Excluded from this release type: buildModifiedTempoLookup */
    private static playThroughSong;
    private static processBarTime;
    private static processBarTimeWithNewSyncPoints;
    private static processBarTimeWithSyncPoints;
    private static processBarTimeNoSyncPoints;
    private static toChannelShort;
    private generateMasterBar;
    private generateBar;
    private getPlaybackBar;
    private generateVoice;
    private _currentTripletFeel;
    private generateBeat;
    private static calculateTripletFeelInfo;
    private generateDeadSlap;
    private needsSecondaryChannel;
    private determineChannel;
    private generateNote;
    /**
     * For every note within the octave, the number of keys to go up when playing ornaments.
     * For white keys this is the next white key,
     * For black keys it is either the next black or white key depending on the distance.
     *
     * Ornaments are not really a strictly defined element, alphaTab is using shipping some default.
     */
    private static readonly OrnamentKeysUp;
    /**
     * For every note within the octave, the number of keys to go down when playing ornaments.
     * This is typically only a key down.
     *
     * Ornaments are not really a strictly defined element, alphaTab is using shipping some default.
     */
    private static readonly OrnamentKeysDown;
    private generateOrnament;
    private getNoteDuration;
    private applyStaticDuration;
    private static getNoteVelocity;
    private generateFade;
    private generateFadeSteps;
    private generateVibrato;
    vibratoResolution: number;
    private generateVibratorWithParams;
    /**
     * Maximum semitones that are supported in bends in one direction (up or down)
     * GP has 8 full tones on whammys.
     */
    private static readonly PitchBendRangeInSemitones;
    /**
     * The value on how many pitch-values are used for one semitone
     */
    private static readonly PitchValuePerSemitone;
    /**
     * The minimum number of breakpoints generated per semitone bend.
     */
    private static readonly MinBreakpointsPerSemitone;
    /**
     * How long until a new breakpoint is generated for a bend.
     */
    private static readonly MillisecondsPerBreakpoint;
    /**
     * Calculates the midi pitch wheel value for the give bend value.
     */
    static getPitchWheel(bendValue: number): number;
    private generateSlide;
    private generateBend;
    private generateSongBookWhammyOrBend;
    private generateWhammy;
    private generateWhammyOrBend;
    private generateBendValues;
    private generateRasgueado;
    private generateTrill;
    private generateTremoloPicking;
    private static readonly RasgueadoDirections;
    private static readonly RasgueadoDurations;
    private getRasgueadoInfo;
    private getBrushInfo;
    private fillBrushInfo;
    private generateNonTempoAutomation;
    prepareSingleBeat(beat: Beat): number;
    generateSingleBeat(beat: Beat): void;
    generateSingleNote(note: Note): void;
}

/**
 * This sequencer dispatches midi events to the synthesizer based on the current
 * synthesize position. The sequencer does not consider the playback speed.
 */
declare class MidiFileSequencer {
    private _synthesizer;
    private _currentState;
    private _mainState;
    private _oneTimeState;
    private _countInState;
    get isPlayingMain(): boolean;
    get isPlayingOneTimeMidi(): boolean;
    get isPlayingCountIn(): boolean;
    constructor(synthesizer: IAudioSampleSynthesizer);
    get mainPlaybackRange(): PlaybackRange | null;
    set mainPlaybackRange(value: PlaybackRange | null);
    isLooping: boolean;
    get currentTime(): number;
    /**
     * Gets the duration of the song in ticks.
     */
    get currentEndTick(): number;
    get currentEndTime(): number;
    get currentTempo(): number;
    get modifiedTempo(): number;
    get syncPointTempo(): number;
    get currentSyncPoints(): BackingTrackSyncPoint[];
    /**
     * Gets or sets the playback speed.
     */
    playbackSpeed: number;
    mainSeek(timePosition: number): void;
    private mainSilentProcess;
    loadOneTimeMidi(midiFile: MidiFile): void;
    instrumentPrograms: Set<number>;
    percussionKeys: Set<number>;
    loadMidi(midiFile: MidiFile): void;
    createStateFromFile(midiFile: MidiFile): MidiSequencerState;
    fillMidiEventQueue(): boolean;
    fillMidiEventQueueToEndTime(endTime: number): boolean;
    private fillMidiEventQueueLimited;
    mainTickPositionToTimePosition(tickPosition: number): number;
    mainUpdateSyncPoints(syncPoints: BackingTrackSyncPoint[]): void;
    currentTimePositionToTickPosition(timePosition: number): number;
    currentUpdateCurrentTempo(timePosition: number): void;
    private updateCurrentTempo;
    currentUpdateSyncPoints(timePosition: number): void;
    private updateSyncPoints;
    mainTimePositionFromBackingTrack(timePosition: number, backingTrackLength: number): number;
    mainTimePositionToBackingTrack(timePosition: number, backingTrackLength: number): number;
    private tickPositionToTimePositionWithSpeed;
    private get internalEndTime();
    get isFinished(): boolean;
    stop(): void;
    resetOneTimeMidi(): void;
    resetCountIn(): void;
    startCountIn(): void;
    generateCountInMidi(): void;
}

declare class MidiFileSequencerTempoChange {
    bpm: number;
    ticks: number;
    time: number;
    constructor(bpm: number, ticks: number, time: number);
}

declare class MidiSequencerState {
    tempoChanges: MidiFileSequencerTempoChange[];
    tempoChangeIndex: number;
    syncPoints: BackingTrackSyncPoint[];
    firstProgramEventPerChannel: Map<number, SynthEvent>;
    firstTimeSignatureNumerator: number;
    firstTimeSignatureDenominator: number;
    synthData: SynthEvent[];
    division: number;
    eventIndex: number;
    currentTime: number;
    syncPointIndex: number;
    playbackRange: PlaybackRange | null;
    playbackRangeStartTime: number;
    playbackRangeEndTime: number;
    endTick: number;
    endTime: number;
    currentTempo: number;
    syncPointTempo: number;
}

/**
 * This class holds all information about when {@link MasterBar}s and {@link Beat}s are played.
 *
 * On top level it is organized into {@link MasterBarTickLookup} objects indicating the
 * master bar start and end times. This information is used to highlight the currently played bars
 * and it gives access to the played beats in this masterbar and their times.
 *
 * The {@link BeatTickLookup} are then the slices into which the masterbar is separated by the voices and beats
 * of all tracks. An example how things are organized:
 *
 * Time (eighths):  | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
 *
 * Track 1:         |        B1         |        B2         |    B3   |    B4   |    B5   |    B6   |
 * Track 2:         |                  B7                   |         B7        | B9 | B10| B11| B12|
 * Track 3:         |                                      B13                                      |
 *
 * Lookup:          |        L1         |        L2         |    L3    |   L4   | L5 | L6 | L7 | L8 |
 * Active Beats:
 * - L1             B1,B7,B13
 * - L2                                 B2,B7,B13
 * - L3                                                      B3,B7,B13
 * - L4                                                                 B4,B7,B13
 * - L5                                                                          B5,B9,B13
 * - L6                                                                               B5,B10,B13
 * - L7                                                                                    B6,B11,B13
 * - L8                                                                                         B6,B12,B13
 *
 * Then during playback we build out of this list {@link MidiTickLookupFindBeatResult} objects which are sepcific
 * to the visible tracks displayed. This is required because if only Track 2 is displayed we cannot use the the
 * Lookup L1 alone to determine the start and end of the beat cursor. In this case we will derive a
 * MidiTickLookupFindBeatResult which holds for Time 01 the lookup L1 as start and L3 as end. This will be used
 * both for the cursor and beat highlighting.
 */
declare class MidiTickLookup {
    private _currentMasterBar;
    /* Excluded from this release type: masterBarLookup */
    /**
     * A list of all {@link MasterBarTickLookup} sorted by time.
     */
    readonly masterBars: MasterBarTickLookup[];
    /**
     * The information about which bars are displayed via multi-bar rests.
     * The key is the start bar, and the value is the additional bars in sequential order.
     * This info allows building the correct "next" beat and duration.
     */
    multiBarRestInfo: Map<number, number[]> | null;
    /**
     * Finds the currently played beat given a list of tracks and the current time.
     * @param trackLookup The tracks indices in which to search the played beat for.
     * @param tick The current time in midi ticks.
     * @param currentBeatHint Used for optimized lookup during playback. By passing in a previous result lookup of the next one can be optimized using heuristics. (optional).
     * @returns The information about the current beat or null if no beat could be found.
     */
    findBeat(trackLookup: Set<number>, tick: number, currentBeatHint?: MidiTickLookupFindBeatResult | null): MidiTickLookupFindBeatResult | null;
    private findBeatFast;
    private fillNextBeatMultiBarRest;
    private fillNextBeat;
    private fillNextBeatDefault;
    private isMultiBarRestResult;
    private internalIsMultiBarRestResult;
    private findBeatSlow;
    private firstBeatInMasterBar;
    /**
     * Finds the beat at a given tick position within the known master bar.
     * @param masterBar
     * @param currentStartLookup
     * @param tick
     * @param visibleTracks
     * @param isNextSearch
     * @returns
     */
    private findBeatInMasterBar;
    private createResult;
    private findMasterBar;
    /**
     * Gets the {@link MasterBarTickLookup} for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns A {@link MasterBarTickLookup} containing the details about the first time the {@link MasterBar} is played.
     */
    getMasterBar(bar: MasterBar): MasterBarTickLookup;
    /**
     * Gets the start time in midi ticks for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns The time in midi ticks at which the masterbar is played the first time or 0 if the masterbar is not contained
     */
    getMasterBarStart(bar: MasterBar): number;
    /**
     * Gets the start time in midi ticks for a given beat at which the masterbar is played the first time.
     * @param beat The beat to find the time period for.
     * @returns The time in midi ticks at which the beat is played the first time or 0 if the beat is not contained
     */
    getBeatStart(beat: Beat): number;
    /**
     * Adds a new {@link MasterBarTickLookup} to the lookup table.
     * @param masterBar The item to add.
     */
    addMasterBar(masterBar: MasterBarTickLookup): void;
    addBeat(beat: Beat, start: number, duration: number): void;
}

/**
 * Represents the results of searching the currently played beat.
 * @see MidiTickLookup.FindBeat
 */
declare class MidiTickLookupFindBeatResult {
    /**
     * Gets or sets the beat that is currently played and used for the start
     * position of the cursor animation.
     */
    beat: Beat;
    /**
     * Gets or sets the parent MasterBarTickLookup to which this beat lookup belongs to.
     */
    masterBar: MasterBarTickLookup;
    /**
     * Gets or sets the related beat tick lookup.
     */
    beatLookup: BeatTickLookup;
    /**
     * Gets or sets the beat that will be played next.
     */
    nextBeat: MidiTickLookupFindBeatResult | null;
    /**
     * Gets or sets the duration in midi ticks how long this lookup is valid.
     */
    tickDuration: number;
    /**
     * Gets or sets the duration in milliseconds how long this lookup is valid.
     */
    duration: number;
    /**
     * The mode how the cursor should be handled.
     */
    cursorMode: MidiTickLookupFindBeatResultCursorMode;
    get start(): number;
    get end(): number;
    constructor(masterBar: MasterBarTickLookup);
    calculateDuration(): void;
}

/**
 * Describes how a cursor should be moving.
 */
declare enum MidiTickLookupFindBeatResultCursorMode {
    /**
     * Unknown/Undetermined mode. Should not happen on user level.
     */
    Unknown = 0,
    /**
     * The cursor should animate to the next beat.
     */
    ToNextBext = 1,
    /**
     * The cursor should animate to the end of the bar (typically on repeats and jumps)
     */
    ToEndOfBar = 2
}

declare class MidiTrack {
    /**
     * Gets a list of midi events sorted by time.
     */
    readonly events: MidiEvent[];
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi track as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
}

export declare namespace model {
    export {
        AccentuationType,
        AccidentalType,
        AutomationType,
        Automation,
        SyncPointData,
        FlatSyncPoint,
        Bar,
        SustainPedalMarkerType,
        SustainPedalMarker,
        BarSubElement,
        BarStyle,
        BarLineStyle,
        BarreShape,
        Beat,
        BeatBeamingMode,
        BeatSubElement,
        BeatStyle,
        BendPoint,
        BendStyle,
        BendType,
        BrushType,
        Chord,
        Clef,
        Color,
        CrescendoType,
        Direction,
        Duration,
        DynamicValue,
        FadeType,
        FermataType,
        Fermata,
        Fingers,
        FontStyle,
        FontWeight,
        Font,
        GraceType,
        GraceGroup,
        GolpeType,
        HarmonicType,
        InstrumentArticulation,
        JsonConverter,
        KeySignature,
        KeySignatureType,
        Lyrics,
        MasterBar,
        MusicFontSymbol,
        Note,
        NoteSubElement,
        NoteStyle,
        NoteAccidentalMode,
        NoteOrnament,
        Ottavia,
        PickStroke,
        PlaybackInformation,
        Rasgueado,
        RenderStylesheet,
        BracketExtendMode,
        TrackNamePolicy,
        TrackNameMode,
        TrackNameOrientation,
        RepeatGroup,
        Score,
        ScoreSubElement,
        ScoreStyle,
        HeaderFooterStyle,
        Section,
        SimileMark,
        SlideInType,
        SlideOutType,
        Staff,
        Track,
        TrackSubElement,
        TrackStyle,
        TripletFeel,
        Tuning,
        TupletGroup,
        VibratoType,
        Voice,
        VoiceSubElement,
        VoiceStyle,
        WahPedal,
        WhammyType,
        ElementStyle,
        BackingTrack
    }
}

/**
 * Lists all music font symbols used within alphaTab. The names
 * and values are aligned with the SMuFL standard.
 */
declare enum MusicFontSymbol {
    None = -1,
    Space = 32,
    Brace = 57344,
    BracketTop = 57347,
    BracketBottom = 57348,
    SystemDivider = 57351,
    GClef = 57424,
    CClef = 57436,
    FClef = 57442,
    UnpitchedPercussionClef1 = 57449,
    SixStringTabClef = 57453,
    FourStringTabClef = 57454,
    TimeSig0 = 57472,
    TimeSig1 = 57473,
    TimeSig2 = 57474,
    TimeSig3 = 57475,
    TimeSig4 = 57476,
    TimeSig5 = 57477,
    TimeSig6 = 57478,
    TimeSig7 = 57479,
    TimeSig8 = 57480,
    TimeSig9 = 57481,
    TimeSigCommon = 57482,
    TimeSigCutCommon = 57483,
    NoteheadDoubleWholeSquare = 57505,
    NoteheadDoubleWhole = 57504,
    NoteheadWhole = 57506,
    NoteheadHalf = 57507,
    NoteheadBlack = 57508,
    NoteheadNull = 57509,
    NoteheadXOrnate = 57514,
    NoteheadPlusDoubleWhole = 57516,
    NoteheadPlusWhole = 57517,
    NoteheadPlusHalf = 57518,
    NoteheadPlusBlack = 57519,
    NoteheadSquareWhite = 57528,
    NoteheadSquareBlack = 57529,
    NoteheadTriangleUpDoubleWhole = 57530,
    NoteheadTriangleUpWhole = 57531,
    NoteheadTriangleUpHalf = 57532,
    NoteheadTriangleUpBlack = 57534,
    NoteheadTriangleRightWhite = 57537,
    NoteheadTriangleRightBlack = 57538,
    NoteheadTriangleDownDoubleWhole = 57548,
    NoteheadTriangleDownWhole = 57540,
    NoteheadTriangleDownHalf = 57541,
    NoteheadTriangleDownBlack = 57543,
    NoteheadDiamondDoubleWhole = 57559,
    NoteheadDiamondWhole = 57560,
    NoteheadDiamondHalf = 57561,
    NoteheadDiamondBlack = 57563,
    NoteheadDiamondBlackWide = 57564,
    NoteheadDiamondWhite = 57565,
    NoteheadDiamondWhiteWide = 57566,
    NoteheadCircleXDoubleWhole = 57520,
    NoteheadCircleXWhole = 57521,
    NoteheadCircleXHalf = 57522,
    NoteheadCircleX = 57523,
    NoteheadXDoubleWhole = 57510,
    NoteheadXWhole = 57511,
    NoteheadXHalf = 57512,
    NoteheadXBlack = 57513,
    NoteheadParenthesis = 57550,
    NoteheadSlashedBlack1 = 57551,
    NoteheadSlashedBlack2 = 57552,
    NoteheadSlashedHalf1 = 57553,
    NoteheadSlashedHalf2 = 57554,
    NoteheadSlashedWhole1 = 57555,
    NoteheadSlashedWhole2 = 57556,
    NoteheadSlashedDoubleWhole1 = 57557,
    NoteheadSlashedDoubleWhole2 = 57558,
    NoteheadCircledBlack = 57572,
    NoteheadCircledHalf = 57573,
    NoteheadCircledWhole = 57574,
    NoteheadCircledDoubleWhole = 57575,
    NoteheadCircleSlash = 57591,
    NoteheadHeavyX = 57592,
    NoteheadHeavyXHat = 57593,
    NoteheadSlashVerticalEnds = 57600,
    NoteheadSlashWhiteWhole = 57602,
    NoteheadSlashWhiteHalf = 57603,
    NoteheadRoundWhiteWithDot = 57621,
    NoteheadSquareBlackLarge = 57626,
    NoteheadSquareBlackWhite = 57627,
    NoteheadClusterDoubleWhole3rd = 57640,
    NoteheadClusterWhole3rd = 57641,
    NoteheadClusterHalf3rd = 57642,
    NoteheadClusterQuarter3rd = 57643,
    NoteShapeRoundWhite = 57776,
    NoteShapeRoundBlack = 57777,
    NoteShapeSquareWhite = 57778,
    NoteShapeSquareBlack = 57779,
    NoteShapeTriangleRightWhite = 57780,
    NoteShapeTriangleRightBlack = 57781,
    NoteShapeTriangleLeftWhite = 57782,
    NoteShapeTriangleLeftBlack = 57783,
    NoteShapeDiamondWhite = 57784,
    NoteShapeDiamondBlack = 57785,
    NoteShapeTriangleUpWhite = 57786,
    NoteShapeTriangleUpBlack = 57787,
    NoteShapeMoonWhite = 57788,
    NoteShapeMoonBlack = 57789,
    NoteShapeTriangleRoundWhite = 57790,
    NoteShapeTriangleRoundBlack = 57791,
    NoteQuarterUp = 57813,
    NoteEighthUp = 57815,
    TextBlackNoteLongStem = 57841,
    TextBlackNoteFrac8thLongStem = 57843,
    TextBlackNoteFrac16thLongStem = 57845,
    TextBlackNoteFrac32ndLongStem = 57846,
    TextCont8thBeamLongStem = 57848,
    TextCont16thBeamLongStem = 57850,
    TextCont32ndBeamLongStem = 57851,
    TextAugmentationDot = 57852,
    TextTupletBracketStartLongStem = 57857,
    TextTuplet3LongStem = 57858,
    TextTupletBracketEndLongStem = 57859,
    Tremolo3 = 57890,
    Tremolo2 = 57889,
    Tremolo1 = 57888,
    FlagEighthUp = 57920,
    FlagEighthDown = 57921,
    FlagSixteenthUp = 57922,
    FlagSixteenthDown = 57923,
    FlagThirtySecondUp = 57924,
    FlagThirtySecondDown = 57925,
    FlagSixtyFourthUp = 57926,
    FlagSixtyFourthDown = 57927,
    FlagOneHundredTwentyEighthUp = 57928,
    FlagOneHundredTwentyEighthDown = 57929,
    FlagTwoHundredFiftySixthUp = 57930,
    FlagTwoHundredFiftySixthDown = 57931,
    AccidentalFlat = 57952,
    AccidentalNatural = 57953,
    AccidentalSharp = 57954,
    AccidentalDoubleSharp = 57955,
    AccidentalDoubleFlat = 57956,
    AccidentalQuarterToneFlatArrowUp = 57968,
    AccidentalQuarterToneSharpArrowUp = 57972,
    AccidentalQuarterToneNaturalArrowUp = 57970,
    Segno = 57415,
    Coda = 57416,
    ArticAccentAbove = 58528,
    ArticAccentBelow = 58529,
    ArticStaccatoAbove = 58530,
    ArticStaccatoBelow = 58531,
    ArticTenutoAbove = 58532,
    ArticTenutoBelow = 58533,
    ArticMarcatoAbove = 58540,
    ArticMarcatoBelow = 58541,
    FermataAbove = 58560,
    FermataShortAbove = 58564,
    FermataLongAbove = 58566,
    RestLonga = 58593,
    RestDoubleWhole = 58594,
    RestWhole = 58595,
    RestHalf = 58596,
    RestQuarter = 58597,
    RestEighth = 58598,
    RestSixteenth = 58599,
    RestThirtySecond = 58600,
    RestSixtyFourth = 58601,
    RestOneHundredTwentyEighth = 58602,
    RestTwoHundredFiftySixth = 58603,
    RestHBarLeft = 58607,
    RestHBarMiddle = 58608,
    RestHBarRight = 58609,
    Repeat1Bar = 58624,
    Repeat2Bars = 58625,
    Ottava = 58640,
    OttavaAlta = 58641,
    OttavaBassaVb = 58652,
    Quindicesima = 58644,
    QuindicesimaAlta = 58645,
    DynamicPPPPPP = 58663,
    DynamicPPPPP = 58664,
    DynamicPPPP = 58665,
    DynamicPPP = 58666,
    DynamicPP = 58667,
    DynamicPiano = 58656,
    DynamicMP = 58668,
    DynamicMF = 58669,
    DynamicPF = 58670,
    DynamicForte = 58658,
    DynamicFF = 58671,
    DynamicFFF = 58672,
    DynamicFFFF = 58673,
    DynamicFFFFF = 58674,
    DynamicFFFFFF = 58675,
    DynamicFortePiano = 58676,
    DynamicNiente = 58662,
    DynamicSforzando1 = 58678,
    DynamicSforzandoPiano = 58679,
    DynamicSforzandoPianissimo = 58680,
    DynamicSforzato = 58681,
    DynamicSforzatoPiano = 58682,
    DynamicSforzatoFF = 58683,
    DynamicRinforzando1 = 58684,
    DynamicRinforzando2 = 58685,
    DynamicForzando = 58677,
    OrnamentTrill = 58726,
    OrnamentTurn = 58727,
    OrnamentTurnInverted = 58728,
    OrnamentShortTrill = 58732,
    OrnamentMordent = 58733,
    StringsDownBow = 58896,
    StringsUpBow = 58898,
    KeyboardPedalPed = 58960,
    KeyboardPedalUp = 58965,
    PictEdgeOfCymbal = 59177,
    GuitarString0 = 59443,
    GuitarString1 = 59444,
    GuitarString2 = 59445,
    GuitarString3 = 59446,
    GuitarString4 = 59447,
    GuitarString5 = 59448,
    GuitarString6 = 59449,
    GuitarString7 = 59450,
    GuitarString8 = 59451,
    GuitarString9 = 59452,
    GuitarOpenPedal = 59453,
    GuitarClosePedal = 59455,
    GuitarGolpe = 59458,
    GuitarFadeIn = 59459,
    GuitarFadeOut = 59460,
    GuitarVolumeSwell = 59461,
    FretboardX = 59481,
    FretboardO = 59482,
    WiggleTrill = 60068,
    WiggleVibratoMediumFast = 60126,
    OctaveBaselineM = 60565,
    OctaveBaselineB = 60563
}

/**
 * Lists all major music notation elements that are part
 * of the music sheet and can be dynamically controlled to be shown
 * or hidden.
 */
export declare enum NotationElement {
    /**
     * The score title shown at the start of the music sheet.
     */
    ScoreTitle = 0,
    /**
     * The score subtitle shown at the start of the music sheet.
     */
    ScoreSubTitle = 1,
    /**
     * The score artist shown at the start of the music sheet.
     */
    ScoreArtist = 2,
    /**
     * The score album shown at the start of the music sheet.
     */
    ScoreAlbum = 3,
    /**
     * The score words author shown at the start of the music sheet.
     */
    ScoreWords = 4,
    /**
     * The score music author shown at the start of the music sheet.
     */
    ScoreMusic = 5,
    /**
     * The score words&music author shown at the start of the music sheet.
     */
    ScoreWordsAndMusic = 6,
    /**
     * The score copyright owner shown at the start of the music sheet.
     */
    ScoreCopyright = 7,
    /**
     * The tuning information of the guitar shown
     * above the staves.
     */
    GuitarTuning = 8,
    /**
     * The track names which are shown in the accolade.
     */
    TrackNames = 9,
    /**
     * The chord diagrams for guitars. Usually shown
     * below the score info.
     */
    ChordDiagrams = 10,
    /**
     * Parenthesis that are shown for tied bends
     * if they are preceeded by bends.
     */
    ParenthesisOnTiedBends = 11,
    /**
     * The tab number for tied notes if the
     * bend of a note is increased at that point.
     */
    TabNotesOnTiedBends = 12,
    /**
     * Zero tab numbers on "dive whammys".
     */
    ZerosOnDiveWhammys = 13,
    /**
     * The alternate endings information on repeats shown above the staff.
     */
    EffectAlternateEndings = 14,
    /**
     * The information about the fret on which the capo is placed shown above the staff.
     */
    EffectCapo = 15,
    /**
     * The chord names shown above beats shown above the staff.
     */
    EffectChordNames = 16,
    /**
     * The crescendo/decrescendo angle  shown above the staff.
     */
    EffectCrescendo = 17,
    /**
     * The beat dynamics  shown above the staff.
     */
    EffectDynamics = 18,
    /**
     * The curved angle for fade in/out effects  shown above the staff.
     */
    EffectFadeIn = 19,
    /**
     * The fermata symbol shown above the staff.
     */
    EffectFermata = 20,
    /**
     * The fingering information.
     */
    EffectFingering = 21,
    /**
     * The harmonics names shown above the staff.
     * (does not represent the harmonic note heads)
     */
    EffectHarmonics = 22,
    /**
     * The let ring name and line above the staff.
     */
    EffectLetRing = 23,
    /**
     * The lyrics of the track shown above the staff.
     */
    EffectLyrics = 24,
    /**
     * The section markers shown above the staff.
     */
    EffectMarker = 25,
    /**
     * The ottava symbol and lines shown above the staff.
     */
    EffectOttavia = 26,
    /**
     * The palm mute name and line shown above the staff.
     */
    EffectPalmMute = 27,
    /**
     * The pick slide information shown above the staff.
     * (does not control the pick slide lines)
     */
    EffectPickSlide = 28,
    /**
     * The pick stroke symbols shown above the staff.
     */
    EffectPickStroke = 29,
    /**
     * The slight beat vibrato waves shown above the staff.
     */
    EffectSlightBeatVibrato = 30,
    /**
     * The slight note vibrato waves shown above the staff.
     */
    EffectSlightNoteVibrato = 31,
    /**
     * The tap/slap/pop effect names shown above the staff.
     */
    EffectTap = 32,
    /**
     * The tempo information shown above the staff.
     */
    EffectTempo = 33,
    /**
     * The additional beat text shown above the staff.
     */
    EffectText = 34,
    /**
     * The trill name and waves shown above the staff.
     */
    EffectTrill = 35,
    /**
     * The triplet feel symbol shown above the staff.
     */
    EffectTripletFeel = 36,
    /**
     * The whammy bar information shown above the staff.
     * (does not control the whammy lines shown within the staff)
     */
    EffectWhammyBar = 37,
    /**
     * The wide beat vibrato waves shown above the staff.
     */
    EffectWideBeatVibrato = 38,
    /**
     * The wide note vibrato waves shown above the staff.
     */
    EffectWideNoteVibrato = 39,
    /**
     * The left hand tap symbol shown above the staff.
     */
    EffectLeftHandTap = 40,
    /**
     * The "Free time" text shown above the staff.
     */
    EffectFreeTime = 41,
    /**
     * The Sustain pedal effect shown above the staff "Ped.____*"
     */
    EffectSustainPedal = 42,
    /**
     * The Golpe effect signs above and below the staff.
     */
    EffectGolpe = 43,
    /**
     * The Wah effect signs above and below the staff.
     */
    EffectWahPedal = 44,
    /**
     * The Beat barre effect signs above and below the staff "1/2B IV ─────┐"
     */
    EffectBeatBarre = 45,
    /**
     * The note ornaments like turns and mordents.
     */
    EffectNoteOrnament = 46,
    /**
     * The Rasgueado indicator above the staff Rasg. ----|"
     */
    EffectRasgueado = 47,
    /**
     * The directions indicators like coda and segno.
     */
    EffectDirections = 48,
    /**
     * The absolute playback time of beats.
     */
    EffectBeatTimer = 49
}

/**
 * Lists all modes on how alphaTab can handle the display and playback of music notation.
 */
export declare enum NotationMode {
    /**
     * Music elements will be displayed and played as in Guitar Pro.
     */
    GuitarPro = 0,
    /**
     * Music elements will be displayed and played as in traditional songbooks.
     * Changes:
     * 1. Bends
     *   For bends additional grace beats are introduced.
     *   Bends are categorized into gradual and fast bends.
     *   - Gradual bends are indicated by beat text "grad" or "grad.". Bend will sound along the beat duration.
     *   - Fast bends are done right before the next note. If the next note is tied even on-beat of the next note.
     * 2. Whammy Bars
     *   Dips are shown as simple annotation over the beats
     *   Whammy Bars are categorized into gradual and fast.
     *   - Gradual whammys are indicated by beat text "grad" or "grad.". Whammys will sound along the beat duration.
     *   - Fast whammys are done right the beat.
     * 3. Let Ring
     *   Tied notes with let ring are not shown in standard notation
     *   Let ring does not cause a longer playback, duration is defined via tied notes.
     */
    SongBook = 1
}

/**
 * The notation settings control how various music notation elements are shown and behaving
 * @json
 * @json_declaration
 */
export declare class NotationSettings {
    /**
     * The mode to use for display and play music notation elements.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `NotationMode.GuitarPro`
     * @remarks
     * AlphaTab provides 2 main music notation display modes `GuitarPro` and `SongBook`.
     * As the names indicate they adjust the overall music notation rendering either to be more in line how [Arobas Guitar Pro](https://www.guitar-pro.com) displays it,
     * or more like the common practice in paper song books practices the display.
     *
     * The main differences in the Songbook display mode are:
     *
     * 1. **Bends**
     * For bends additional grace beats are introduced. Bends are categorized into gradual and fast bends.
     *     * Gradual bends are indicated by beat text "grad" or "grad.". Bend will sound along the beat duration.
     *     * Fast bends are done right before the next note. If the next note is tied even on-beat of the next note.
     * 2.  **Whammy Bars**
     * Dips are shown as simple annotation over the beats. Whammy Bars are categorized into gradual and fast.
     *     * Gradual whammys are indicated by beat text "grad" or "grad.". Whammys will sound along the beat duration.
     *     * Fast whammys are done right the beat.
     *
     * 3. **Let Ring**
     * Tied notes with let ring are not shown in standard notation. Let ring does not cause a longer playback, duration is defined via tied notes.
     *
     * 4. **Settings**
     * Following default setting values are applied:
     * ```js
     * {
     *     notation: {
     *         smallGraceTabNotes: false,
     *         fingeringMode: alphaTab.FingeringMode.SingleNoteEffectBandm
     *         extendBendArrowsOnTiedNotes: false
     *     },
     *     elements: {
     *         parenthesisOnTiedBends: false,
     *         tabNotesOnTiedBends: false,
     *         zerosOnDiveWhammys: true
     *     }
     * }
     * ```
     */
    notationMode: NotationMode;
    /**
     * The fingering mode to use.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `FingeringMode.ScoreDefault`
     * @remarks
     * AlphaTab supports multiple modes on how to display fingering information in the music sheet. This setting controls how they should be displayed. The default behavior is to show the finger information
     * directly in the score along the notes. For some use cases of training courses and for beginners this notation might be hard to read. The effect band mode allows to show a single finger information above the staff.
     *
     * | Score                                                       | Effect Band                                                       |
     * |-------------------------------------------------------------|-------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/fingeringmode-score.png) | ![Disabled](https://alphatab.net/img/reference/property/fingeringmode-effectband.png) |
     */
    fingeringMode: FingeringMode;
    /**
     * Whether music notation elements are visible or not.
     * @since 0.9.8
     * @category Notation
     * @defaultValue `[[NotationElement.ZerosOnDiveWhammys, false]]`
     * @remarks
     * AlphaTab has quite a set of notation elements that are usually shown by default or only shown when using
     * the `SongBook` notation mode. This setting allows showing/hiding individual notation elements like the
     * song information or the track names.
     *
     * For each element you can configure whether it is visible or not. The setting is a Map/Dictionary where
     * the key is the element to configure and the value is a boolean value whether it should be visible or not.
     * @example
     * JavaScript
     * Internally the setting is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) where the key must be a {@link NotationElement} enumeration value.
     * For JSON input the usual enumeration serialization applies where also the names can be used. The names
     * are case insensitive.
     *
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'), {
     *     notation: {
     *         elements: {
     *             scoreTitle: false,
     *             trackNames: false
     *         }
     *     }
     * });
     * api.settings.notation.elements.set(alphaTab.NotationElement.EffectWhammyBar, false);
     * ```
     * @example
     * C#
     * ```cs
     * var settings = new AlphaTab.Settings();
     * settings.Notation.Elements[AlphaTab.NotationElement.ScoreTitle] = false;
     * settings.Notation.Elements[AlphaTab.NotationElement.TrackNames] = false;
     * ```
     * @example
     * Android
     * ```kotlin
     * val settings = AlphaTab.Settings();
     * settings.notation.elements[alphaTab.NotationElement.ScoreTitle] = false;
     * settings.notation.elements[alphaTab.NotationElement.TrackNames] = false;
     * ```
     */
    elements: Map<NotationElement, boolean>;
    /**
     * Gets the default configuration of the {@see notationElements} setting. Do not modify
     * this map as it might not result in the expected side effects.
     * If items are not listed explicitly in this list, they are considered visible.
     */
    static defaultElements: Map<NotationElement, boolean>;
    /**
     * Controls how the rhythm notation is rendered for tab staves.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `TabRhythmMode.Automatic`
     * @remarks
     * This setting enables the display of rhythm notation on tab staffs. [Demo](https://alphatab.net/docs/showcase/guitar-tabs)
     * {@since 1.4.0} its automatically detected whether rhythm notation should be shown on tabs (based on the visibility of other staves).
     */
    rhythmMode: TabRhythmMode;
    /**
     * Controls how high the ryhthm notation is rendered below the tab staff
     * @since 0.9.6
     * @category Notation
     * @defaultValue `15`
     * @remarks
     * This setting can be used in combination with the {@link rhythmMode} setting to control how high the rhythm notation should be rendered below the tab staff.
     */
    rhythmHeight: number;
    /**
     * The transposition pitch offsets for the individual tracks used for rendering and playback.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `[]`
     * @remarks
     * This setting allows transposing of tracks for display and playback.
     * The `transpositionPitches` setting allows defining an additional pitch offset per track, that is then considered when displaying the music sheet.
     */
    transpositionPitches: number[];
    /**
     * The transposition pitch offsets for the individual tracks used for rendering only.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `[]`
     * @remarks
     * For some instruments the pitch shown on the standard notation has an additional transposition. One example is the Guitar.
     * Notes are shown 1 octave higher than they are on the piano. The following image shows a C4 for a piano and a guitar, and a C5 for the piano as comparison:
     *
     * ![Display Transposition Pitches example](https://alphatab.net/img/reference/property/displaytranspositionpitches.png)
     *
     * The `DisplayTranspositionPitch` setting allows defining an additional pitch offset per track, that is then considered when displaying the music sheet.
     * This setting does not affect the playback of the instrument in any way. Despite the 2 different standard notations in the above example, they both play the same note height.
     * The transposition is defined as number of semitones and one value per track of the song can be defined.
     */
    displayTranspositionPitches: number[];
    /**
     * If set to true the guitar tabs on grace beats are rendered smaller.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `true`
     * @remarks
     * By default, grace notes are drawn smaller on the guitar tabs than the other numbers. With this setting alphaTab can be configured to show grace tab notes with normal text size.
     * | Enabled                                                            | Disabled                                                             |
     * |--------------------------------------------------------------------|----------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/smallgracetabnotes-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/smallgracetabnotes-disabled.png) |
     */
    smallGraceTabNotes: boolean;
    /**
     * If set to true bend arrows expand to the end of the last tied note of the string. Otherwise they end on the next beat.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `true`
     * @remarks
     * By default the arrows and lines on bend effects are extended to the space of tied notes. This behavior is the Guitar Pro default but some applications and songbooks practice it different.
     * There the bend only is drawn to the next beat.
     * | Enabled                                                                     | Disabled                                                                      |
     * |-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/extendbendarrowsontiednotes-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/extendbendarrowsontiednotes-disabled.png) |
     */
    extendBendArrowsOnTiedNotes: boolean;
    /**
     * If set to true, line effects like w/bar and let-ring are drawn until the end of the beat instead of the start
     * @since 0.9.6
     * @category Notation
     * @defaultValue `false`
     * @remarks
     * By default effect annotations that render a line above the staff, stop on the beat. This is the typical display of Guitar Pro. In songbooks and some other tools
     * these effects are drawn to the end of this beat.
     * | Enabled                                                                     | Disabled                                                                      |
     * |-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/extendlineeffectstobeatend-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/extendlineeffectstobeatend-disabled.png) |
     */
    extendLineEffectsToBeatEnd: boolean;
    /**
     * The height scale factor for slurs
     * @since 0.9.6
     * @category Notation
     * @defaultValue `5`
     * @remarks
     * Slurs and ties currently calculate their height based on the distance they have from start to end note. Most music notation software do some complex collision detection to avoid a slur to overlap with other elements, alphaTab
     * only has a simplified version of the slur positioning as of today. This setting allows adjusting the slur height to avoid collisions. The factor defined by this setting, is multiplied with the logarithmic distance between start and end.
     * | Slur Height Default                                                    | Slur Height 14                                               |
     * |------------------------------------------------------------------------|--------------------------------------------------------------|
     * | ![Slur Height Default](https://alphatab.net/img/reference/property/slurheight-default.png) | ![Slur Height 14](https://alphatab.net/img/reference/property/slurheight-14.png)  |
     */
    slurHeight: number;
    /**
     * Gets whether the given music notation element should be shown
     * @param element the element to check
     * @returns true if the element should be shown, otherwise false.
     */
    isNotationElementVisible(element: NotationElement): boolean;
}

/**
 * The notation settings control how various music notation elements are shown and behaving
 * @json
 * @json_declaration
 * @target web
 */
declare interface NotationSettingsJson {
    /**
     * The mode to use for display and play music notation elements.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `NotationMode.GuitarPro`
     * @remarks
     * AlphaTab provides 2 main music notation display modes `GuitarPro` and `SongBook`.
     * As the names indicate they adjust the overall music notation rendering either to be more in line how [Arobas Guitar Pro](https://www.guitar-pro.com) displays it,
     * or more like the common practice in paper song books practices the display.
     *
     * The main differences in the Songbook display mode are:
     *
     * 1. **Bends**
     * For bends additional grace beats are introduced. Bends are categorized into gradual and fast bends.
     *     * Gradual bends are indicated by beat text "grad" or "grad.". Bend will sound along the beat duration.
     *     * Fast bends are done right before the next note. If the next note is tied even on-beat of the next note.
     * 2.  **Whammy Bars**
     * Dips are shown as simple annotation over the beats. Whammy Bars are categorized into gradual and fast.
     *     * Gradual whammys are indicated by beat text "grad" or "grad.". Whammys will sound along the beat duration.
     *     * Fast whammys are done right the beat.
     *
     * 3. **Let Ring**
     * Tied notes with let ring are not shown in standard notation. Let ring does not cause a longer playback, duration is defined via tied notes.
     *
     * 4. **Settings**
     * Following default setting values are applied:
     * ```js
     * {
     *     notation: {
     *         smallGraceTabNotes: false,
     *         fingeringMode: alphaTab.FingeringMode.SingleNoteEffectBandm
     *         extendBendArrowsOnTiedNotes: false
     *     },
     *     elements: {
     *         parenthesisOnTiedBends: false,
     *         tabNotesOnTiedBends: false,
     *         zerosOnDiveWhammys: true
     *     }
     * }
     * ```
     */
    notationMode?: NotationMode | keyof typeof NotationMode | Lowercase<keyof typeof NotationMode>;
    /**
     * The fingering mode to use.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `FingeringMode.ScoreDefault`
     * @remarks
     * AlphaTab supports multiple modes on how to display fingering information in the music sheet. This setting controls how they should be displayed. The default behavior is to show the finger information
     * directly in the score along the notes. For some use cases of training courses and for beginners this notation might be hard to read. The effect band mode allows to show a single finger information above the staff.
     *
     * | Score                                                       | Effect Band                                                       |
     * |-------------------------------------------------------------|-------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/fingeringmode-score.png) | ![Disabled](https://alphatab.net/img/reference/property/fingeringmode-effectband.png) |
     */
    fingeringMode?: FingeringMode | keyof typeof FingeringMode | Lowercase<keyof typeof FingeringMode>;
    /**
     * Whether music notation elements are visible or not.
     * @since 0.9.8
     * @category Notation
     * @defaultValue `[[NotationElement.ZerosOnDiveWhammys, false]]`
     * @remarks
     * AlphaTab has quite a set of notation elements that are usually shown by default or only shown when using
     * the `SongBook` notation mode. This setting allows showing/hiding individual notation elements like the
     * song information or the track names.
     *
     * For each element you can configure whether it is visible or not. The setting is a Map/Dictionary where
     * the key is the element to configure and the value is a boolean value whether it should be visible or not.
     * @example
     * JavaScript
     * Internally the setting is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) where the key must be a {@link NotationElement} enumeration value.
     * For JSON input the usual enumeration serialization applies where also the names can be used. The names
     * are case insensitive.
     *
     * ```js
     * const api = new alphaTab.AlphaTabApi(document.querySelector('#alphaTab'), {
     *     notation: {
     *         elements: {
     *             scoreTitle: false,
     *             trackNames: false
     *         }
     *     }
     * });
     * api.settings.notation.elements.set(alphaTab.NotationElement.EffectWhammyBar, false);
     * ```
     * @example
     * C#
     * ```cs
     * var settings = new AlphaTab.Settings();
     * settings.Notation.Elements[AlphaTab.NotationElement.ScoreTitle] = false;
     * settings.Notation.Elements[AlphaTab.NotationElement.TrackNames] = false;
     * ```
     * @example
     * Android
     * ```kotlin
     * val settings = AlphaTab.Settings();
     * settings.notation.elements[alphaTab.NotationElement.ScoreTitle] = false;
     * settings.notation.elements[alphaTab.NotationElement.TrackNames] = false;
     * ```
     */
    elements?: Map<NotationElement | keyof typeof NotationElement | Lowercase<keyof typeof NotationElement>, boolean>;
    /**
     * Controls how the rhythm notation is rendered for tab staves.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `TabRhythmMode.Automatic`
     * @remarks
     * This setting enables the display of rhythm notation on tab staffs. [Demo](https://alphatab.net/docs/showcase/guitar-tabs)
     * {@since 1.4.0} its automatically detected whether rhythm notation should be shown on tabs (based on the visibility of other staves).
     */
    rhythmMode?: TabRhythmMode | keyof typeof TabRhythmMode | Lowercase<keyof typeof TabRhythmMode>;
    /**
     * Controls how high the ryhthm notation is rendered below the tab staff
     * @since 0.9.6
     * @category Notation
     * @defaultValue `15`
     * @remarks
     * This setting can be used in combination with the {@link rhythmMode} setting to control how high the rhythm notation should be rendered below the tab staff.
     */
    rhythmHeight?: number;
    /**
     * The transposition pitch offsets for the individual tracks used for rendering and playback.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `[]`
     * @remarks
     * This setting allows transposing of tracks for display and playback.
     * The `transpositionPitches` setting allows defining an additional pitch offset per track, that is then considered when displaying the music sheet.
     */
    transpositionPitches?: number[];
    /**
     * The transposition pitch offsets for the individual tracks used for rendering only.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `[]`
     * @remarks
     * For some instruments the pitch shown on the standard notation has an additional transposition. One example is the Guitar.
     * Notes are shown 1 octave higher than they are on the piano. The following image shows a C4 for a piano and a guitar, and a C5 for the piano as comparison:
     *
     * ![Display Transposition Pitches example](https://alphatab.net/img/reference/property/displaytranspositionpitches.png)
     *
     * The `DisplayTranspositionPitch` setting allows defining an additional pitch offset per track, that is then considered when displaying the music sheet.
     * This setting does not affect the playback of the instrument in any way. Despite the 2 different standard notations in the above example, they both play the same note height.
     * The transposition is defined as number of semitones and one value per track of the song can be defined.
     */
    displayTranspositionPitches?: number[];
    /**
     * If set to true the guitar tabs on grace beats are rendered smaller.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `true`
     * @remarks
     * By default, grace notes are drawn smaller on the guitar tabs than the other numbers. With this setting alphaTab can be configured to show grace tab notes with normal text size.
     * | Enabled                                                            | Disabled                                                             |
     * |--------------------------------------------------------------------|----------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/smallgracetabnotes-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/smallgracetabnotes-disabled.png) |
     */
    smallGraceTabNotes?: boolean;
    /**
     * If set to true bend arrows expand to the end of the last tied note of the string. Otherwise they end on the next beat.
     * @since 0.9.6
     * @category Notation
     * @defaultValue `true`
     * @remarks
     * By default the arrows and lines on bend effects are extended to the space of tied notes. This behavior is the Guitar Pro default but some applications and songbooks practice it different.
     * There the bend only is drawn to the next beat.
     * | Enabled                                                                     | Disabled                                                                      |
     * |-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/extendbendarrowsontiednotes-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/extendbendarrowsontiednotes-disabled.png) |
     */
    extendBendArrowsOnTiedNotes?: boolean;
    /**
     * If set to true, line effects like w/bar and let-ring are drawn until the end of the beat instead of the start
     * @since 0.9.6
     * @category Notation
     * @defaultValue `false`
     * @remarks
     * By default effect annotations that render a line above the staff, stop on the beat. This is the typical display of Guitar Pro. In songbooks and some other tools
     * these effects are drawn to the end of this beat.
     * | Enabled                                                                     | Disabled                                                                      |
     * |-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
     * | ![Enabled](https://alphatab.net/img/reference/property/extendlineeffectstobeatend-enabled.png) | ![Disabled](https://alphatab.net/img/reference/property/extendlineeffectstobeatend-disabled.png) |
     */
    extendLineEffectsToBeatEnd?: boolean;
    /**
     * The height scale factor for slurs
     * @since 0.9.6
     * @category Notation
     * @defaultValue `5`
     * @remarks
     * Slurs and ties currently calculate their height based on the distance they have from start to end note. Most music notation software do some complex collision detection to avoid a slur to overlap with other elements, alphaTab
     * only has a simplified version of the slur positioning as of today. This setting allows adjusting the slur height to avoid collisions. The factor defined by this setting, is multiplied with the logarithmic distance between start and end.
     * | Slur Height Default                                                    | Slur Height 14                                               |
     * |------------------------------------------------------------------------|--------------------------------------------------------------|
     * | ![Slur Height Default](https://alphatab.net/img/reference/property/slurheight-default.png) | ![Slur Height 14](https://alphatab.net/img/reference/property/slurheight-14.png)  |
     */
    slurHeight?: number;
}

/**
 * A note is a single played sound on a fretted instrument.
 * It consists of a fret offset and a string on which the note is played on.
 * It also can be modified by a lot of different effects.
 * @cloneable
 * @json
 * @json_strict
 */
declare class Note {
    /* Excluded from this release type: GlobalNoteId */
    /* Excluded from this release type: resetIds */
    /**
     * Gets or sets the unique id of this note.
     * @clone_ignore
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this note within the beat.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the accentuation of this note.
     */
    accentuated: AccentuationType;
    /**
     * Gets or sets the bend type for this note.
     */
    bendType: BendType;
    /**
     * Gets or sets the bend style for this note.
     */
    bendStyle: BendStyle;
    /**
     * Gets or sets the note from which this note continues the bend.
     * @clone_ignore
     * @json_ignore
     */
    bendOrigin: Note | null;
    /**
     * Gets or sets whether this note continues a bend from a previous note.
     */
    isContinuedBend: boolean;
    /**
     * Gets or sets a list of the points defining the bend behavior.
     * @clone_add addBendPoint
     * @json_add addBendPoint
     */
    bendPoints: BendPoint[] | null;
    /**
     * Gets or sets the bend point with the highest bend value.
     * @clone_ignore
     * @json_ignore
     */
    maxBendPoint: BendPoint | null;
    get hasBend(): boolean;
    get isStringed(): boolean;
    /**
     * Gets or sets the fret on which this note is played on the instrument.
     * 0 is the nut.
     */
    fret: number;
    /**
     * Gets or sets the string number where the note is placed.
     * 1 is the lowest string on the guitar and the bottom line on the tablature.
     * It then increases the the number of strings on available on the track.
     */
    string: number;
    /**
     * Gets or sets whether the string number for this note should be shown.
     */
    showStringNumber: boolean;
    get isPiano(): boolean;
    /**
     * Gets or sets the octave on which this note is played.
     */
    octave: number;
    /**
     * Gets or sets the tone of this note within the octave.
     */
    tone: number;
    get isPercussion(): boolean;
    /**
     * Gets or sets the percusson element.
     * @deprecated
     */
    get element(): number;
    /**
     * Gets or sets the variation of this note.
     * @deprecated
     */
    get variation(): number;
    /**
     * Gets or sets the index of percussion articulation in the related `track.percussionArticulations`.
     * If the articulation is not listed in `track.percussionArticulations` the following list based on GP7 applies:
     * - 029 Ride (choke)
     * - 030 Cymbal (hit)
     * - 031 Snare (side stick)
     * - 033 Snare (side stick)
     * - 034 Snare (hit)
     * - 035 Kick (hit)
     * - 036 Kick (hit)
     * - 037 Snare (side stick)
     * - 038 Snare (hit)
     * - 039 Hand Clap (hit)
     * - 040 Snare (hit)
     * - 041 Low Floor Tom (hit)
     * - 042 Hi-Hat (closed)
     * - 043 Very Low Tom (hit)
     * - 044 Pedal Hi-Hat (hit)
     * - 045 Low Tom (hit)
     * - 046 Hi-Hat (open)
     * - 047 Mid Tom (hit)
     * - 048 High Tom (hit)
     * - 049 Crash high (hit)
     * - 050 High Floor Tom (hit)
     * - 051 Ride (middle)
     * - 052 China (hit)
     * - 053 Ride (bell)
     * - 054 Tambourine (hit)
     * - 055 Splash (hit)
     * - 056 Cowbell medium (hit)
     * - 057 Crash medium (hit)
     * - 058 Vibraslap (hit)
     * - 059 Ride (edge)
     * - 060 Hand (hit)
     * - 061 Hand (hit)
     * - 062 Conga high (mute)
     * - 063 Conga high (hit)
     * - 064 Conga low (hit)
     * - 065 Timbale high (hit)
     * - 066 Timbale low (hit)
     * - 067 Agogo high (hit)
     * - 068 Agogo tow (hit)
     * - 069 Cabasa (hit)
     * - 070 Left Maraca (hit)
     * - 071 Whistle high (hit)
     * - 072 Whistle low (hit)
     * - 073 Guiro (hit)
     * - 074 Guiro (scrap-return)
     * - 075 Claves (hit)
     * - 076 Woodblock high (hit)
     * - 077 Woodblock low (hit)
     * - 078 Cuica (mute)
     * - 079 Cuica (open)
     * - 080 Triangle (rnute)
     * - 081 Triangle (hit)
     * - 082 Shaker (hit)
     * - 083 Tinkle Bell (hat)
     * - 083 Jingle Bell (hit)
     * - 084 Bell Tree (hit)
     * - 085 Castanets (hit)
     * - 086 Surdo (hit)
     * - 087 Surdo (mute)
     * - 091 Snare (rim shot)
     * - 092 Hi-Hat (half)
     * - 093 Ride (edge)
     * - 094 Ride (choke)
     * - 095 Splash (choke)
     * - 096 China (choke)
     * - 097 Crash high (choke)
     * - 098 Crash medium (choke)
     * - 099 Cowbell low (hit)
     * - 100 Cowbell low (tip)
     * - 101 Cowbell medium (tip)
     * - 102 Cowbell high (hit)
     * - 103 Cowbell high (tip)
     * - 104 Hand (mute)
     * - 105 Hand (slap)
     * - 106 Hand (mute)
     * - 107 Hand (slap)
     * - 108 Conga low (slap)
     * - 109 Conga low (mute)
     * - 110 Conga high (slap)
     * - 111 Tambourine (return)
     * - 112 Tambourine (roll)
     * - 113 Tambourine (hand)
     * - 114 Grancassa (hit)
     * - 115 Piatti (hat)
     * - 116 Piatti (hand)
     * - 117 Cabasa (return)
     * - 118 Left Maraca (return)
     * - 119 Right Maraca (hit)
     * - 120 Right Maraca (return)
     * - 122 Shaker (return)
     * - 123 Bell Tee (return)
     * - 124 Golpe (thumb)
     * - 125 Golpe (finger)
     * - 126 Ride (middle)
     * - 127 Ride (bell)
     */
    percussionArticulation: number;
    /**
     * Gets or sets whether this note is visible on the music sheet.
     */
    isVisible: boolean;
    /**
     * Gets a value indicating whether the note is left hand tapped.
     */
    isLeftHandTapped: boolean;
    /**
     * Gets or sets whether this note starts a hammeron or pulloff.
     */
    isHammerPullOrigin: boolean;
    get isHammerPullDestination(): boolean;
    /**
     * Gets the origin of the hammeron/pulloff of this note.
     * @clone_ignore
     * @json_ignore
     */
    hammerPullOrigin: Note | null;
    /**
     * Gets the destination for the hammeron/pullof started by this note.
     * @clone_ignore
     * @json_ignore
     */
    hammerPullDestination: Note | null;
    get isSlurOrigin(): boolean;
    /**
     * Gets or sets whether this note finishes a slur.
     */
    isSlurDestination: boolean;
    /**
     * Gets or sets the note where the slur of this note starts.
     * @clone_ignore
     * @json_ignore
     */
    slurOrigin: Note | null;
    /**
     * Gets or sets the note where the slur of this note ends.
     * @clone_ignore
     * @json_ignore
     */
    slurDestination: Note | null;
    get isHarmonic(): boolean;
    /**
     * Gets or sets the harmonic type applied to this note.
     */
    harmonicType: HarmonicType;
    /**
     * Gets or sets the value defining the harmonic pitch.
     */
    harmonicValue: number;
    /**
     * Gets or sets whether the note is a ghost note and shown in parenthesis. Also this will make the note a bit more silent.
     */
    isGhost: boolean;
    /**
     * Gets or sets whether this note has a let-ring effect.
     */
    isLetRing: boolean;
    /**
     * Gets or sets the destination note for the let-ring effect.
     * @clone_ignore
     * @json_ignore
     */
    letRingDestination: Note | null;
    /**
     * Gets or sets whether this note has a palm-mute effect.
     */
    isPalmMute: boolean;
    /**
     * Gets or sets the destination note for the palm-mute effect.
     * @clone_ignore
     * @json_ignore
     */
    palmMuteDestination: Note | null;
    /**
     * Gets or sets whether the note is shown and played as dead note.
     */
    isDead: boolean;
    /**
     * Gets or sets whether the note is played as staccato.
     */
    isStaccato: boolean;
    /**
     * Gets or sets the slide-in type this note is played with.
     */
    slideInType: SlideInType;
    /**
     * Gets or sets the slide-out type this note is played with.
     */
    slideOutType: SlideOutType;
    /**
     * Gets or sets the target note for several slide types.
     * @clone_ignore
     * @json_ignore
     */
    slideTarget: Note | null;
    /**
     * Gets or sets the source note for several slide types.
     * @clone_ignore
     * @json_ignore
     */
    slideOrigin: Note | null;
    /**
     * Gets or sets whether a vibrato is played on the note.
     */
    vibrato: VibratoType;
    /**
     * Gets the origin of the tied if this note is tied.
     * @clone_ignore
     * @json_ignore
     */
    tieOrigin: Note | null;
    /**
     * Gets the desination of the tie.
     * @clone_ignore
     * @json_ignore
     */
    tieDestination: Note | null;
    /**
     * Gets or sets whether this note is ends a tied note.
     */
    isTieDestination: boolean;
    get isTieOrigin(): boolean;
    /**
     * Gets or sets the fingers used for this note on the left hand.
     */
    leftHandFinger: Fingers;
    /**
     * Gets or sets the fingers used for this note on the right hand.
     */
    rightHandFinger: Fingers;
    /**
     * Gets or sets whether this note has fingering defined.
     */
    get isFingering(): boolean;
    /**
     * Gets or sets the target note value for the trill effect.
     */
    trillValue: number;
    get trillFret(): number;
    get isTrill(): boolean;
    /**
     * Gets or sets the speed of the trill effect.
     */
    trillSpeed: Duration;
    /**
     * Gets or sets the percentual duration of the note relative to the overall beat duration.
     */
    durationPercent: number;
    /**
     * Gets or sets how accidetnals for this note should  be handled.
     */
    accidentalMode: NoteAccidentalMode;
    /**
     * Gets or sets the reference to the parent beat to which this note belongs to.
     * @clone_ignore
     * @json_ignore
     */
    beat: Beat;
    /**
     * Gets or sets the dynamics for this note.
     */
    dynamics: DynamicValue;
    /**
     * @clone_ignore
     * @json_ignore
     */
    isEffectSlurOrigin: boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    hasEffectSlur: boolean;
    get isEffectSlurDestination(): boolean;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurOrigin: Note | null;
    /**
     * @clone_ignore
     * @json_ignore
     */
    effectSlurDestination: Note | null;
    /**
     * The ornament applied on the note.
     */
    ornament: NoteOrnament;
    /**
     * The style customizations for this item.
     * @clone_ignore
     */
    style?: NoteStyle;
    get stringTuning(): number;
    static getStringTuning(staff: Staff, noteString: number): number;
    get realValue(): number;
    get realValueWithoutHarmonic(): number;
    /**
     * Calculates the real note value of this note as midi key respecting the given options.
     * @param applyTranspositionPitch Whether or not to apply the transposition pitch of the current staff.
     * @param applyHarmonic Whether or not to apply harmonic pitches to the note.
     * @returns The calculated note value as midi key.
     */
    calculateRealValue(applyTranspositionPitch: boolean, applyHarmonic: boolean): number;
    get harmonicPitch(): number;
    get initialBendValue(): number;
    get displayValue(): number;
    get displayValueWithoutBend(): number;
    get hasQuarterToneOffset(): boolean;
    addBendPoint(point: BendPoint): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    private static readonly MaxOffsetForSameLineSearch;
    static nextNoteOnSameLine(note: Note): Note | null;
    static findHammerPullDestination(note: Note): Note | null;
    static findTieOrigin(note: Note): Note | null;
    private static NoteIdLookupKey;
    private _noteIdBag;
    chain(sharedDataBag?: Map<string, unknown> | null): void;
    /* Excluded from this release type: toJson */
    /* Excluded from this release type: setProperty */
}

/**
 * Lists the modes how accidentals are handled for notes
 */
declare enum NoteAccidentalMode {
    /**
     * Accidentals are calculated automatically.
     */
    Default = 0,
    /**
     * This will try to ensure that no accidental is shown.
     */
    ForceNone = 1,
    /**
     * This will move the note one line down and applies a Naturalize.
     */
    ForceNatural = 2,
    /**
     * This will move the note one line down and applies a Sharp.
     */
    ForceSharp = 3,
    /**
     * This will move the note to be shown 2 half-notes deeper with a double sharp symbol
     */
    ForceDoubleSharp = 4,
    /**
     * This will move the note one line up and applies a Flat.
     */
    ForceFlat = 5,
    /**
     * This will move the note two half notes up with a double flag symbol.
     */
    ForceDoubleFlat = 6
}

/**
 * Represents a single note pitch bend change.
 */
declare class NoteBendEvent extends MidiEvent {
    /**
     * The channel on which the note is played for which the pitch changes.
     */
    channel: number;
    /**
     * The key of the note for which the pitch changes.
     */
    noteKey: number;
    /**
     * The value to which the pitch changes. This value is according to the MIDI specification.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, noteKey: number, value: number);
    writeTo(s: IWriteable): void;
}

/**
 * Represents the bounds of a single note
 */
declare class NoteBounds {
    /**
     * Gets or sets the reference to the beat boudns this note relates to.
     */
    beatBounds: BeatBounds;
    /**
     * Gets or sets the bounds of the individual note head.
     */
    noteHeadBounds: Bounds;
    /**
     * Gets or sets the note related to this instance.
     */
    note: Note;
    /**
     * Finishes the lookup object and optimizes itself for fast access.
     */
    finish(scale?: number): void;
}

/**
 * The base class for note related events.
 */
declare abstract class NoteEvent extends MidiEvent {
    /**
     * The channel on which the note is played.
     */
    channel: number;
    /**
     * The key of the note being played (aka. the note height).
     */
    noteKey: number;
    /**
     * The velocity in which the 'key' of the note is pressed (aka. the loudness/intensity of the note).
     */
    noteVelocity: number;
    constructor(track: number, tick: number, type: MidiEventType, channel: number, noteKey: number, noteVelocity: number);
    get data1(): number;
    get data2(): number;
}

/**
 * Represents a note stop being played.
 */
declare class NoteOffEvent extends NoteEvent {
    constructor(track: number, tick: number, channel: number, noteKey: number, noteVelocity: number);
    writeTo(s: IWriteable): void;
}

/**
 * Represents a note being played
 */
declare class NoteOnEvent extends NoteEvent {
    constructor(track: number, tick: number, channel: number, noteKey: number, noteVelocity: number);
    writeTo(s: IWriteable): void;
}

/**
 * Lists all note ornaments.
 */
declare enum NoteOrnament {
    None = 0,
    InvertedTurn = 1,
    Turn = 2,
    UpperMordent = 3,
    LowerMordent = 4
}

/**
 * Defines the custom styles for notes.
 * @json
 * @json_strict
 */
declare class NoteStyle extends ElementStyle<NoteSubElement> {
    /**
     * The symbol that should be used as note head.
     */
    noteHead?: MusicFontSymbol;
    /**
     * Whether the note head symbol should be centered on the stem (e.g. for arrow notes)
     */
    noteHeadCenterOnStem?: boolean;
}

/**
 * Lists all graphical sub elements within a {@link Note} which can be styled via {@link Note.style}
 */
declare enum NoteSubElement {
    /**
     * The effects and annotations shown in dedicated effect bands above the staves (e.g. vibrato).
     * The style of the first note with the effect wins.
     */
    Effects = 0,
    /**
     * The note head on the standard notation staff.
     */
    StandardNotationNoteHead = 1,
    /**
     * The accidentals on the standard notation staff.
     */
    StandardNotationAccidentals = 2,
    /**
     * The effects and annotations applied to this note on the standard notation staff (e.g. bends).
     * If effects on beats result in individual note elements shown, this color will apply.
     */
    StandardNotationEffects = 3,
    /**
     * The fret number on the guitar tab staff.
     */
    GuitarTabFretNumber = 4,
    /**
     * The effects and annotations applied to this note on the guitar tab staff (e.g. bends).
     * If effects on beats result in individual note elements shown, this color will apply.
     */
    GuitarTabEffects = 5,
    /**
     * The note head on the slash notation staff.
     */
    SlashNoteHead = 6,
    /**
     * The effects and annotations applied to this note on the slash notation staff (e.g. dots).
     * If effects on beats result in individual note elements shown, this color will apply.
     */
    SlashEffects = 7,
    /**
     * The note number on the numbered notation staff.
     */
    NumberedNumber = 8,
    /**
     * The accidentals on the numbered notation staff.
     */
    NumberedAccidentals = 9,
    /**
     * The effects and annotations applied to this note on the number notation staff (e.g. dots).
     * If effects on beats result in individual note elements shown, this color will apply.
     */
    NumberedEffects = 10
}

/**
 * Lists the different position modes for {@link BarRendererBase.getNoteX}
 */
declare enum NoteXPosition {
    /**
     * Gets the note x-position on left of the note head or tab number.
     */
    Left = 0,
    /**
     * Gets the note x-position on the center of the note head or tab number.
     */
    Center = 1,
    /**
     * Gets the note x-position on the right of the note head or tab number.
     */
    Right = 2
}

/**
 * Lists the different position modes for {@link BarRendererBase.getNoteY}
 */
declare enum NoteYPosition {
    /**
     * Gets the note y-position on top of the note stem or tab number.
     */
    TopWithStem = 0,
    /**
     * Gets the note y-position on top of the note head or tab number.
     */
    Top = 1,
    /**
     * Gets the note y-position on the center of the note head or tab number.
     */
    Center = 2,
    /**
     * Gets the note y-position on the bottom of the note head or tab number.
     */
    Bottom = 3,
    /**
     * Gets the note y-position on the bottom of the note stem or tab number.
     */
    BottomWithStem = 4
}

/**
 * Lists all ottavia.
 */
declare enum Ottavia {
    /**
     * 2 octaves higher
     */
    _15ma = 0,
    /**
     * 1 octave higher
     */
    _8va = 1,
    /**
     * Normal
     */
    Regular = 2,
    /**
     * 1 octave lower
     */
    _8vb = 3,
    /**
     * 2 octaves lower.
     */
    _15mb = 4
}

/**
 * Lists all types of pick strokes.
 */
declare enum PickStroke {
    /**
     * No pickstroke used.
     */
    None = 0,
    /**
     * Pickstroke up.
     */
    Up = 1,
    /**
     * Pickstroke down
     */
    Down = 2
}

/**
 * Represents a change of the pitch bend (aka. pitch wheel) on a specific channel.
 */
declare class PitchBendEvent extends MidiEvent {
    /**
     * The channel for which the pitch bend changes.
     */
    channel: number;
    /**
     * The value to which the pitch changes. This value is according to the MIDI specification.
     */
    value: number;
    constructor(track: number, tick: number, channel: number, value: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
    get data2(): number;
}

export declare namespace platform {
    export {
        Cursors,
        ICanvas,
        TextAlign,
        TextBaseline,
        MeasuredText,
        IContainer,
        IMouseEventArgs,
        IUiFacade,
        CssFontSvgCanvas,
        FontSizes,
        FontSizeDefinition,
        SvgCanvas
    }
}

/**
 * This public class stores the midi specific information of a track needed
 * for playback.
 * @json
 * @json_strict
 */
declare class PlaybackInformation {
    /**
     * Gets or sets the volume (0-16)
     */
    volume: number;
    /**
     * Gets or sets the balance (0-16; 8=center)
     */
    balance: number;
    /**
     * Gets or sets the midi port to use.
     */
    port: number;
    /**
     * Gets or sets the midi program to use.
     */
    program: number;
    /**
     * Gets or sets the primary channel for all normal midi events.
     */
    primaryChannel: number;
    /**
     * Gets or sets the secondary channel for special midi events.
     */
    secondaryChannel: number;
    /**
     * Gets or sets whether the track is muted.
     */
    isMute: boolean;
    /**
     * Gets or sets whether the track is playing alone.
     */
    isSolo: boolean;
}

/**
 * Represents a range of the song that should be played.
 */
declare class PlaybackRange {
    /**
     * The position in midi ticks from where the song should start.
     */
    startTick: number;
    /**
     * The position in midi ticks to where the song should be played.
     */
    endTick: number;
}

/**
 * Represents the info when the playback range changed.
 */
declare class PlaybackRangeChangedEventArgs {
    /**
     * The new playback range.
     */
    readonly playbackRange: PlaybackRange | null;
    /**
     * Initializes a new instance of the {@link PlaybackRangeChangedEventArgs} class.
     * @param range The range.
     */
    constructor(playbackRange: PlaybackRange | null);
}

/**
 * Lists the different modes how the internal alphaTab player (and related cursor behavior) is working.
 */
export declare enum PlayerMode {
    /**
     * The player functionality is fully disabled.
     */
    Disabled = 0,
    /**
     * The player functionality is enabled.
     * If the loaded file provides a backing track, it is used for playback.
     * If no backing track is provided, the midi synthesizer is used.
     */
    EnabledAutomatic = 1,
    /**
     * The player functionality is enabled and the synthesizer is used (even if a backing track is embedded in the file).
     */
    EnabledSynthesizer = 2,
    /**
     * The player functionality is enabled. If the input data model has no backing track configured, the player might not work as expected (as playback completes instantly).
     */
    EnabledBackingTrack = 3,
    /**
     * The player functionality is enabled and an external audio/video source is used as time axis.
     * The related player APIs need to be used to update the current position of the external audio source within alphaTab.
     */
    EnabledExternalMedia = 4
}

/**
 * Lists the different modes how alphaTab will play the generated audio.
 * @target web
 */
export declare enum PlayerOutputMode {
    /**
     * If audio worklets are available in the browser, they will be used for playing the audio.
     * It will fallback to the ScriptProcessor output if unavailable.
     */
    WebAudioAudioWorklets = 0,
    /**
     * Uses the legacy ScriptProcessor output which might perform worse.
     */
    WebAudioScriptProcessor = 1
}

/**
 * The player settings control how the audio playback and UI is behaving.
 * @json
 * @json_declaration
 */
export declare class PlayerSettings {
    /**
     * The sound font file to load for the player.
     * @target web
     * @since 0.9.6
     * @defaultValue `null`
     * @category Player - JavaScript Specific
     * @remarks
     * When the player is enabled the soundfont from this URL will be loaded automatically after the player is ready.
     */
    soundFont: string | null;
    /**
     * The element to apply the scrolling on.
     * @target web
     * @json_read_only
     * @json_raw
     * @since 0.9.6
     * @defaultValue `html,body`
     * @category Player - JavaScript Specific
     * @remarks
     * When the player is active, it by default automatically scrolls the browser window to the currently played bar. This setting
     * defines which elements should be scrolled to bring the played bar into the view port. By default scrolling happens on the `html,body`
     * selector.
     */
    scrollElement: string | HTMLElement;
    /**
     * The mode used for playing audio samples
     * @target web
     * @since 1.3.0
     * @defaultValue `PlayerOutputMode.WebAudioAudioWorklets`
     * @category Player - JavaScript Specific
     * @remarks
     * Controls how alphaTab will play the audio samples in the browser.
     */
    outputMode: PlayerOutputMode;
    /**
     * Whether the player should be enabled.
     * @since 0.9.6
     * @defaultValue `false`
     * @category Player
     * @deprecated Use {@link playerMode} instead.
     * @remarks
     * This setting configures whether the player feature is enabled or not. Depending on the platform enabling the player needs some additional actions of the developer.
     * For the JavaScript version the [player.soundFont](/docs/reference/settings/player/soundfont) property must be set to the URL of the sound font that should be used or it must be loaded manually via API.
     * For .net manually the soundfont must be loaded.
     *
     * AlphaTab does not ship a default UI for the player. The API must be hooked up to some UI controls to allow the user to interact with the player.
     */
    enablePlayer: boolean;
    /**
     * Whether the player should be enabled and which mode it should use.
     * @since 1.6.0
     * @defaultValue `PlayerMode.Disabled`
     * @category Player
     * @remarks
     * This setting configures whether the player feature is enabled or not. Depending on the platform enabling the player needs some additional actions of the developer.
     *
     * **Synthesizer**
     *
     * If the synthesizer is used (via {@link PlayerMode.EnabledAutomatic} or {@link PlayerMode.EnabledSynthesizer}) a sound font is needed so that the midi synthesizer can produce the audio samples.
     *
     * For the JavaScript version the [player.soundFont](/docs/reference/settings/player/soundfont) property must be set to the URL of the sound font that should be used or it must be loaded manually via API.
     * For .net manually the soundfont must be loaded.
     *
     * **Backing Track**
     *
     * For a built-in backing track of the input file no additional data needs to be loaded (assuming everything is filled via the input file).
     * Otherwise the `score.backingTrack` needs to be filled before loading and the related sync points need to be configured.
     *
     * **External Media**
     *
     * For synchronizing alphaTab with an external media no data needs to be loaded into alphaTab. The configured sync points on the MasterBars are used
     * as reference to synchronize the external media with the internal time axis. Then the related APIs on the AlphaTabApi object need to be used
     * to update the playback state and exterrnal audio position during playback.
     *
     * **User Interface**
     *
     * AlphaTab does not ship a default UI for the player. The API must be hooked up to some UI controls to allow the user to interact with the player.
     */
    playerMode: PlayerMode;
    /**
     * Whether playback cursors should be displayed.
     * @since 0.9.6
     * @defaultValue `true` (if player is not disabled)
     * @category Player
     * @remarks
     * This setting configures whether the playback cursors are shown or not. In case a developer decides to built an own cursor system the default one can be disabled with this setting. Enabling the cursor also requires the player to be active.
     */
    enableCursor: boolean;
    /**
     * Whether the beat cursor should be animated or just ticking.
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the beat cursor is animated smoothly or whether it is ticking from beat to beat.
     * The animation of the cursor might not be available on all targets so it might not have any effect.
     */
    enableAnimatedBeatCursor: boolean;
    /**
     * Whether the notation elements of the currently played beat should be highlighted.
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the note elements are highlighted during playback.
     * The highlighting of elements might not be available on all targets and render engine, so it might not have any effect.
     */
    enableElementHighlighting: boolean;
    /**
     * Whether the default user interaction behavior should be active or not.
     * @since 0.9.7
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether alphaTab provides the default user interaction features like selection of the playback range and "seek on click".
     * By default users can select the desired playback range with the mouse and also jump to individual beats by click. This behavior can be contolled with this setting.
     */
    enableUserInteraction: boolean;
    /**
     * The X-offset to add when scrolling.
     * @since 0.9.6
     * @defaultValue `0`
     * @category Player
     * @remarks
     * When alphaTab does an auto-scrolling to the displayed bar, it will try to align the view port to the displayed bar. If due to
     * some layout specifics or for aesthetics a small padding is needed, this setting allows an additional X-offset that is added to the
     * scroll position.
     */
    scrollOffsetX: number;
    /**
     * The Y-offset to add when scrolling.
     * @since 0.9.6
     * @defaultValue `0`
     * @category Player
     * @remarks
     * When alphaTab does an auto-scrolling to the displayed bar, it will try to align the view port to the displayed bar. If due to
     * some layout specifics or for aesthetics a small padding is needed, this setting allows an additional Y-offset that is added to the
     * scroll position.
     */
    scrollOffsetY: number;
    /**
     * The mode how to scroll.
     * @since 0.9.6
     * @defaultValue `ScrollMode.Continuous`
     * @category Player
     * @remarks
     * This setting controls how alphaTab behaves for scrolling.
     */
    scrollMode: ScrollMode;
    /**
     * How fast the scrolling to the new position should happen.
     * @since 0.9.6
     * @defaultValue `300`
     * @category Player
     * @remarks
     * If possible from the platform, alphaTab will try to do a smooth scrolling to the played bar.
     * This setting defines the speed of scrolling in milliseconds.
     * Note that {@link nativeBrowserSmoothScroll} must be set to `false` for this to have an effect.
     */
    scrollSpeed: number;
    /**
     * Whether the native browser smooth scroll mechanism should be used over a custom animation.
     * @target web
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the [native browser feature](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)
     * for smooth scrolling should be used over a custom animation.
     * If this setting is enabled, options like {@link scrollSpeed} will not have an effect anymore.
     */
    nativeBrowserSmoothScroll: boolean;
    /**
     * The bend duration in milliseconds for songbook bends.
     * @since 0.9.6
     * @defaultValue `75`
     * @category Player
     * @remarks
     * If the display mode `songbook` is enabled, this has an effect on the way bends are played. For songbook bends the bend is done very quickly at the end or start of the beat.
     * This setting defines the play duration for those bends in milliseconds. This duration is in milliseconds unlike some other settings which are in midi ticks. The reason is that on songbook bends,
     * the bends should always be played in the same speed, regardless of the song tempo. Midi ticks are tempo dependent.
     */
    songBookBendDuration: number;
    /**
     * The duration of whammy dips in milliseconds for songbook whammys.
     * @since 0.9.6
     * @defaultValue `150`
     * @category Player
     * @remarks
     * If the display mode `songbook` is enabled, this has an effect on the way whammy dips are played. For songbook dips the whammy is pressed very quickly at the start of the beat.
     * This setting defines the play duration for those whammy bars in milliseconds. This duration is in milliseconds unlike some other settings which are in midi ticks. The reason is that on songbook dips,
     * the whammy should always be pressed in the same speed, regardless of the song tempo. Midi ticks are tempo dependent.
     */
    songBookDipDuration: number;
    /**
     * The Vibrato settings allow control how the different vibrato types are generated for audio.
     * @json_partial_names
     * @since 0.9.6
     * @category Player
     * @remarks
     * AlphaTab supports 4 types of vibratos, for each vibrato the amplitude and the wavelength can be configured. The amplitude controls how many semitones
     * the vibrato changes the pitch up and down while playback. The wavelength controls how many midi ticks it will take to complete one up and down vibrato.
     * The 4 vibrato types are:
     *
     * 1. Beat Slight - A fast vibrato on the whole beat. This vibrato is usually done with the whammy bar.
     * 2. Beat Wide - A slow vibrato on the whole beat. This vibrato is usually done with the whammy bar.
     * 3. Note Slight - A fast vibrato on a single note. This vibrato is usually done with the finger on the fretboard.
     * 4. Note Wide - A slow vibrato on a single note. This vibrato is usually done with the finger on the fretboard.
     */
    readonly vibrato: VibratoPlaybackSettings;
    /**
     * The slide settings allow control how the different slide types are generated for audio.
     * @json_partial_names
     * @since 0.9.6
     * @domWildcard
     * @category Player
     * @remarks
     * AlphaTab supports various types of slides which can be grouped into 3 types:
     *
     * * Shift Slides
     * * Legato Slides
     *
     *
     * * Slide into from below
     * * Slide into from above
     * * Slide out to below
     * * Slide out to above
     *
     *
     * * Pick Slide out to above
     * * Pick Slide out to below
     *
     * For the first 2 groups the audio generation can be adapted. For the pick slide the audio generation cannot be adapted
     * as there is no mechanism yet in alphaTab to play pick slides to make them sound real.
     *
     * For the first group only the duration or start point of the slide can be configured while for the second group
     * the duration/start-point and the pitch offset can be configured.
     */
    readonly slide: SlidePlaybackSettings;
    /**
     * Whether the triplet feel should be played or only displayed.
     * @since 0.9.6
     * @defaultValue `true`
     * @category Player
     * @remarks
     * If this setting is enabled alphaTab will play the triplet feels accordingly, if it is disabled the triplet feel is only displayed but not played.
     */
    playTripletFeel: boolean;
    /**
     * The number of milliseconds the player should buffer.
     * @since 1.2.3
     * @defaultValue `500`
     * @category Player
     * @remarks
     * Gets or sets how many milliseconds of audio samples should be buffered in total.
     *
     * * Larger buffers cause a delay from when audio settings like volumes will be applied.
     * * Smaller buffers can cause audio crackling due to constant buffering that is happening.
     *
     * This buffer size can be changed whenever needed.
     */
    bufferTimeInMilliseconds: number;
}

/**
 * The player settings control how the audio playback and UI is behaving.
 * @json
 * @json_declaration
 * @target web
 */
declare interface PlayerSettingsJson {
    /**
     * The sound font file to load for the player.
     * @target web
     * @since 0.9.6
     * @defaultValue `null`
     * @category Player - JavaScript Specific
     * @remarks
     * When the player is enabled the soundfont from this URL will be loaded automatically after the player is ready.
     */
    soundFont?: string | null;
    /**
     * The element to apply the scrolling on.
     * @target web
     * @json_read_only
     * @json_raw
     * @since 0.9.6
     * @defaultValue `html,body`
     * @category Player - JavaScript Specific
     * @remarks
     * When the player is active, it by default automatically scrolls the browser window to the currently played bar. This setting
     * defines which elements should be scrolled to bring the played bar into the view port. By default scrolling happens on the `html,body`
     * selector.
     */
    scrollElement?: string | HTMLElement;
    /**
     * The mode used for playing audio samples
     * @target web
     * @since 1.3.0
     * @defaultValue `PlayerOutputMode.WebAudioAudioWorklets`
     * @category Player - JavaScript Specific
     * @remarks
     * Controls how alphaTab will play the audio samples in the browser.
     */
    outputMode?: PlayerOutputMode | keyof typeof PlayerOutputMode | Lowercase<keyof typeof PlayerOutputMode>;
    /**
     * Whether the player should be enabled.
     * @since 0.9.6
     * @defaultValue `false`
     * @category Player
     * @deprecated Use {@link playerMode} instead.
     * @remarks
     * This setting configures whether the player feature is enabled or not. Depending on the platform enabling the player needs some additional actions of the developer.
     * For the JavaScript version the [player.soundFont](/docs/reference/settings/player/soundfont) property must be set to the URL of the sound font that should be used or it must be loaded manually via API.
     * For .net manually the soundfont must be loaded.
     *
     * AlphaTab does not ship a default UI for the player. The API must be hooked up to some UI controls to allow the user to interact with the player.
     */
    enablePlayer?: boolean;
    /**
     * Whether the player should be enabled and which mode it should use.
     * @since 1.6.0
     * @defaultValue `PlayerMode.Disabled`
     * @category Player
     * @remarks
     * This setting configures whether the player feature is enabled or not. Depending on the platform enabling the player needs some additional actions of the developer.
     *
     * **Synthesizer**
     *
     * If the synthesizer is used (via {@link PlayerMode.EnabledAutomatic} or {@link PlayerMode.EnabledSynthesizer}) a sound font is needed so that the midi synthesizer can produce the audio samples.
     *
     * For the JavaScript version the [player.soundFont](/docs/reference/settings/player/soundfont) property must be set to the URL of the sound font that should be used or it must be loaded manually via API.
     * For .net manually the soundfont must be loaded.
     *
     * **Backing Track**
     *
     * For a built-in backing track of the input file no additional data needs to be loaded (assuming everything is filled via the input file).
     * Otherwise the `score.backingTrack` needs to be filled before loading and the related sync points need to be configured.
     *
     * **External Media**
     *
     * For synchronizing alphaTab with an external media no data needs to be loaded into alphaTab. The configured sync points on the MasterBars are used
     * as reference to synchronize the external media with the internal time axis. Then the related APIs on the AlphaTabApi object need to be used
     * to update the playback state and exterrnal audio position during playback.
     *
     * **User Interface**
     *
     * AlphaTab does not ship a default UI for the player. The API must be hooked up to some UI controls to allow the user to interact with the player.
     */
    playerMode?: PlayerMode | keyof typeof PlayerMode | Lowercase<keyof typeof PlayerMode>;
    /**
     * Whether playback cursors should be displayed.
     * @since 0.9.6
     * @defaultValue `true` (if player is not disabled)
     * @category Player
     * @remarks
     * This setting configures whether the playback cursors are shown or not. In case a developer decides to built an own cursor system the default one can be disabled with this setting. Enabling the cursor also requires the player to be active.
     */
    enableCursor?: boolean;
    /**
     * Whether the beat cursor should be animated or just ticking.
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the beat cursor is animated smoothly or whether it is ticking from beat to beat.
     * The animation of the cursor might not be available on all targets so it might not have any effect.
     */
    enableAnimatedBeatCursor?: boolean;
    /**
     * Whether the notation elements of the currently played beat should be highlighted.
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the note elements are highlighted during playback.
     * The highlighting of elements might not be available on all targets and render engine, so it might not have any effect.
     */
    enableElementHighlighting?: boolean;
    /**
     * Whether the default user interaction behavior should be active or not.
     * @since 0.9.7
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether alphaTab provides the default user interaction features like selection of the playback range and "seek on click".
     * By default users can select the desired playback range with the mouse and also jump to individual beats by click. This behavior can be contolled with this setting.
     */
    enableUserInteraction?: boolean;
    /**
     * The X-offset to add when scrolling.
     * @since 0.9.6
     * @defaultValue `0`
     * @category Player
     * @remarks
     * When alphaTab does an auto-scrolling to the displayed bar, it will try to align the view port to the displayed bar. If due to
     * some layout specifics or for aesthetics a small padding is needed, this setting allows an additional X-offset that is added to the
     * scroll position.
     */
    scrollOffsetX?: number;
    /**
     * The Y-offset to add when scrolling.
     * @since 0.9.6
     * @defaultValue `0`
     * @category Player
     * @remarks
     * When alphaTab does an auto-scrolling to the displayed bar, it will try to align the view port to the displayed bar. If due to
     * some layout specifics or for aesthetics a small padding is needed, this setting allows an additional Y-offset that is added to the
     * scroll position.
     */
    scrollOffsetY?: number;
    /**
     * The mode how to scroll.
     * @since 0.9.6
     * @defaultValue `ScrollMode.Continuous`
     * @category Player
     * @remarks
     * This setting controls how alphaTab behaves for scrolling.
     */
    scrollMode?: ScrollMode | keyof typeof ScrollMode | Lowercase<keyof typeof ScrollMode>;
    /**
     * How fast the scrolling to the new position should happen.
     * @since 0.9.6
     * @defaultValue `300`
     * @category Player
     * @remarks
     * If possible from the platform, alphaTab will try to do a smooth scrolling to the played bar.
     * This setting defines the speed of scrolling in milliseconds.
     * Note that {@link nativeBrowserSmoothScroll} must be set to `false` for this to have an effect.
     */
    scrollSpeed?: number;
    /**
     * Whether the native browser smooth scroll mechanism should be used over a custom animation.
     * @target web
     * @since 1.2.3
     * @defaultValue `true`
     * @category Player
     * @remarks
     * This setting configures whether the [native browser feature](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)
     * for smooth scrolling should be used over a custom animation.
     * If this setting is enabled, options like {@link scrollSpeed} will not have an effect anymore.
     */
    nativeBrowserSmoothScroll?: boolean;
    /**
     * The bend duration in milliseconds for songbook bends.
     * @since 0.9.6
     * @defaultValue `75`
     * @category Player
     * @remarks
     * If the display mode `songbook` is enabled, this has an effect on the way bends are played. For songbook bends the bend is done very quickly at the end or start of the beat.
     * This setting defines the play duration for those bends in milliseconds. This duration is in milliseconds unlike some other settings which are in midi ticks. The reason is that on songbook bends,
     * the bends should always be played in the same speed, regardless of the song tempo. Midi ticks are tempo dependent.
     */
    songBookBendDuration?: number;
    /**
     * The duration of whammy dips in milliseconds for songbook whammys.
     * @since 0.9.6
     * @defaultValue `150`
     * @category Player
     * @remarks
     * If the display mode `songbook` is enabled, this has an effect on the way whammy dips are played. For songbook dips the whammy is pressed very quickly at the start of the beat.
     * This setting defines the play duration for those whammy bars in milliseconds. This duration is in milliseconds unlike some other settings which are in midi ticks. The reason is that on songbook dips,
     * the whammy should always be pressed in the same speed, regardless of the song tempo. Midi ticks are tempo dependent.
     */
    songBookDipDuration?: number;
    /**
     * The Vibrato settings allow control how the different vibrato types are generated for audio.
     * @json_partial_names
     * @since 0.9.6
     * @category Player
     * @remarks
     * AlphaTab supports 4 types of vibratos, for each vibrato the amplitude and the wavelength can be configured. The amplitude controls how many semitones
     * the vibrato changes the pitch up and down while playback. The wavelength controls how many midi ticks it will take to complete one up and down vibrato.
     * The 4 vibrato types are:
     *
     * 1. Beat Slight - A fast vibrato on the whole beat. This vibrato is usually done with the whammy bar.
     * 2. Beat Wide - A slow vibrato on the whole beat. This vibrato is usually done with the whammy bar.
     * 3. Note Slight - A fast vibrato on a single note. This vibrato is usually done with the finger on the fretboard.
     * 4. Note Wide - A slow vibrato on a single note. This vibrato is usually done with the finger on the fretboard.
     */
    vibrato?: VibratoPlaybackSettingsJson;
    /**
     * The slide settings allow control how the different slide types are generated for audio.
     * @json_partial_names
     * @since 0.9.6
     * @domWildcard
     * @category Player
     * @remarks
     * AlphaTab supports various types of slides which can be grouped into 3 types:
     *
     * * Shift Slides
     * * Legato Slides
     *
     *
     * * Slide into from below
     * * Slide into from above
     * * Slide out to below
     * * Slide out to above
     *
     *
     * * Pick Slide out to above
     * * Pick Slide out to below
     *
     * For the first 2 groups the audio generation can be adapted. For the pick slide the audio generation cannot be adapted
     * as there is no mechanism yet in alphaTab to play pick slides to make them sound real.
     *
     * For the first group only the duration or start point of the slide can be configured while for the second group
     * the duration/start-point and the pitch offset can be configured.
     */
    slide?: SlidePlaybackSettingsJson;
    /**
     * Whether the triplet feel should be played or only displayed.
     * @since 0.9.6
     * @defaultValue `true`
     * @category Player
     * @remarks
     * If this setting is enabled alphaTab will play the triplet feels accordingly, if it is disabled the triplet feel is only displayed but not played.
     */
    playTripletFeel?: boolean;
    /**
     * The number of milliseconds the player should buffer.
     * @since 1.2.3
     * @defaultValue `500`
     * @category Player
     * @remarks
     * Gets or sets how many milliseconds of audio samples should be buffered in total.
     *
     * * Larger buffers cause a delay from when audio settings like volumes will be applied.
     * * Smaller buffers can cause audio crackling due to constant buffering that is happening.
     *
     * This buffer size can be changed whenever needed.
     */
    bufferTimeInMilliseconds?: number;
}

/**
 * Lists the different states of the player
 */
declare enum PlayerState {
    /**
     * Player is paused
     */
    Paused = 0,
    /**
     * Player is playing
     */
    Playing = 1
}

/**
 * Represents the info when the player state changes.
 */
declare class PlayerStateChangedEventArgs {
    /**
     * The new state of the player.
     */
    readonly state: PlayerState;
    /**
     * Gets a value indicating whether the playback was stopped or only paused.
     * @returns true if the playback was stopped, false if the playback was started or paused
     */
    readonly stopped: boolean;
    /**
     * Initializes a new instance of the {@link PlayerStateChangedEventArgs} class.
     * @param state The state.
     */
    constructor(state: PlayerState, stopped: boolean);
}

/**
 * Represents the info when the time in the synthesizer changes.
 */
declare class PositionChangedEventArgs {
    /**
     * The current time position within the song in milliseconds.
     */
    readonly currentTime: number;
    /**
     * The total length of the song in milliseconds.
     */
    readonly endTime: number;
    /**
     * The current time position within the song in midi ticks.
     */
    readonly currentTick: number;
    /**
     * The total length of the song in midi ticks.
     */
    readonly endTick: number;
    /**
     * Whether the position changed because of time seeking.
     * @since 1.2.0
     */
    isSeek: boolean;
    /**
     * The original tempo in which alphaTab internally would be playing right now.
     */
    originalTempo: number;
    /**
     * The modified tempo in which the actual playback is happening (e.g. due to playback speed or external audio synchronization)
     */
    modifiedTempo: number;
    /**
     * Initializes a new instance of the {@link PositionChangedEventArgs} class.
     * @param currentTime The current time.
     * @param endTime The end time.
     * @param currentTick The current tick.
     * @param endTick The end tick.
     * @param isSeek Whether the time was seeked.
     */
    constructor(currentTime: number, endTime: number, currentTick: number, endTick: number, isSeek: boolean, originalTempo: number, modifiedTempo: number);
}

/**
 * Represents the change of the midi program on a channel.
 */
declare class ProgramChangeEvent extends MidiEvent {
    /**
     * The midi channel for which the program changes.
     */
    channel: number;
    /**
     * The numeric value of the program indicating the instrument bank to choose.
     */
    program: number;
    constructor(track: number, tick: number, channel: number, program: number);
    writeTo(s: IWriteable): void;
    get data1(): number;
}

/**
 * Represents the progress of any data being loaded.
 */
export declare class ProgressEventArgs {
    /**
     * Gets the currently loaded bytes.
     */
    readonly loaded: number;
    /**
     * Gets the total number of bytes to load.
     */
    readonly total: number;
    /**
     * Initializes a new instance of the {@link ProgressEventArgs} class.
     * @param loaded
     * @param total
     */
    constructor(loaded: number, total: number);
}

declare class Queue<T> {
    private _head?;
    private _tail?;
    get isEmpty(): boolean;
    clear(): void;
    enqueue(item: T): void;
    peek(): T | undefined;
    dequeue(): T | undefined;
}

/**
 * Lists all Rasgueado types.
 */
declare enum Rasgueado {
    None = 0,
    Ii = 1,
    Mi = 2,
    MiiTriplet = 3,
    MiiAnapaest = 4,
    PmpTriplet = 5,
    PmpAnapaest = 6,
    PeiTriplet = 7,
    PeiAnapaest = 8,
    PaiTriplet = 9,
    PaiAnapaest = 10,
    AmiTriplet = 11,
    AmiAnapaest = 12,
    Ppp = 13,
    Amii = 14,
    Amip = 15,
    Eami = 16,
    Eamii = 17,
    Peami = 18
}

/**
 * A factory for custom render engines.
 * Note for Web: To use a custom engine in workers you have to ensure the engine and registration to the environment are
 * also done in the background worker files (e.g. when bundling)
 */
export declare class RenderEngineFactory {
    /**
     * Whether the layout supports background workers.
     */
    readonly supportsWorkers: boolean;
    readonly createCanvas: () => ICanvas;
    constructor(supportsWorkers: boolean, canvas: () => ICanvas);
}

/**
 * This eventargs define the details about the rendering and layouting process and are
 * provided whenever a part of of the music sheet is rendered.
 */
declare class RenderFinishedEventArgs {
    /**
     * Gets or sets the unique id of this event args.
     */
    id: string;
    /**
     * Gets or sets the x position of the current rendering result.
     */
    x: number;
    /**
     * Gets or sets the y position of the current rendering result.
     */
    y: number;
    /**
     * Gets or sets the width of the current rendering result.
     */
    width: number;
    /**
     * Gets or sets the height of the current rendering result.
     */
    height: number;
    /**
     * Gets or sets the currently known total width of the final music sheet.
     */
    totalWidth: number;
    /**
     * Gets or sets the currently known total height of the final music sheet.
     */
    totalHeight: number;
    /**
     * Gets or sets the index of the first masterbar that was rendered in this result.
     */
    firstMasterBarIndex: number;
    /**
     * Gets or sets the index of the last masterbar that was rendered in this result.
     */
    lastMasterBarIndex: number;
    /**
     * Gets or sets the render engine specific result object which contains the rendered music sheet.
     */
    renderResult: unknown;
}

export declare namespace rendering {
    export {
        RenderFinishedEventArgs,
        IScoreRenderer,
        ScoreRenderer,
        BarBounds,
        BeatBounds,
        Bounds,
        BoundsLookup,
        MasterBarBounds,
        NoteBounds,
        StaffSystemBounds,
        BeamDirection
    }
}

/**
 * This public class contains central definitions for controlling the visual appearance.
 * @json
 * @json_declaration
 */
export declare class RenderingResources {
    private static sansFont;
    private static serifFont;
    /* Excluded from this release type: smuflFont */
    /**
     * The font to use for displaying the songs copyright information in the header of the music sheet.
     * @defaultValue `bold 12px Arial, sans-serif`
     * @since 0.9.6
     */
    copyrightFont: Font;
    /**
     * The font to use for displaying the songs title in the header of the music sheet.
     * @defaultValue `32px Georgia, serif`
     * @since 0.9.6
     */
    titleFont: Font;
    /**
     * The font to use for displaying the songs subtitle in the header of the music sheet.
     * @defaultValue `20px Georgia, serif`
     * @since 0.9.6
     */
    subTitleFont: Font;
    /**
     * The font to use for displaying the lyrics information in the header of the music sheet.
     * @defaultValue `15px Arial, sans-serif`
     * @since 0.9.6
     */
    wordsFont: Font;
    /**
     * The font to use for displaying certain effect related elements in the music sheet.
     * @defaultValue `italic 12px Georgia, serif`
     * @since 0.9.6
     */
    effectFont: Font;
    /**
     * The font to use for displaying beat time information in the music sheet.
     * @defaultValue `12px Georgia, serif`
     * @since 1.4.0
     */
    timerFont: Font;
    /**
     * The font to use for displaying the directions texts.
     * @defaultValue `14px Georgia, serif`
     * @since 1.4.0
     */
    directionsFont: Font;
    /**
     * The font to use for displaying the fretboard numbers in chord diagrams.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    fretboardNumberFont: Font;
    /**
     * The font to use for displaying the numbered music notation in the music sheet.
     * @defaultValue `14px Arial, sans-serif`
     * @since 1.4.0
     */
    numberedNotationFont: Font;
    /**
     * The font to use for displaying the grace notes in numbered music notation in the music sheet.
     * @defaultValue `16px Arial, sans-serif`
     * @since 1.4.0
     */
    numberedNotationGraceFont: Font;
    /**
     * The font to use for displaying the guitar tablature numbers in the music sheet.
     * @defaultValue `13px Arial, sans-serif`
     * @since 0.9.6
     */
    tablatureFont: Font;
    /**
     * The font to use for grace notation related texts in the music sheet.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    graceFont: Font;
    /**
     * The color to use for rendering the lines of staves.
     * @defaultValue `rgb(165, 165, 165)`
     * @since 0.9.6
     */
    staffLineColor: Color;
    /**
     * The color to use for rendering bar separators, the accolade and repeat signs.
     * @defaultValue `rgb(34, 34, 17)`
     * @since 0.9.6
     */
    barSeparatorColor: Color;
    /**
     * The font to use for displaying the bar numbers above the music sheet.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    barNumberFont: Font;
    /**
     * The color to use for displaying the bar numbers above the music sheet.
     * @defaultValue `rgb(200, 0, 0)`
     * @since 0.9.6
     */
    barNumberColor: Color;
    /**
     * The font to use for displaying finger information in the music sheet.
     * @defaultValue `14px Georgia, serif`
     * @since 0.9.6
     */
    fingeringFont: Font;
    /**
     * The font to use for displaying finger information when inline into the music sheet.
     * @defaultValue `12px Georgia, serif`
     * @since 1.4.0
     */
    inlineFingeringFont: Font;
    /**
     * The font to use for section marker labels shown above the music sheet.
     * @defaultValue `bold 14px Georgia, serif`
     * @since 0.9.6
     */
    markerFont: Font;
    /**
     * The color to use for music notation elements of the primary voice.
     * @defaultValue `rgb(0, 0, 0)`
     * @since 0.9.6
     */
    mainGlyphColor: Color;
    /**
     * The color to use for music notation elements of the secondary voices.
     * @defaultValue `rgb(0,0,0,0.4)`
     * @since 0.9.6
     */
    secondaryGlyphColor: Color;
    /**
     * The color to use for displaying the song information above the music sheets.
     * @defaultValue `rgb(0, 0, 0)`
     * @since 0.9.6
     */
    scoreInfoColor: Color;
    /* Excluded from this release type: getFontForElement */
}

/**
 * This public class contains central definitions for controlling the visual appearance.
 * @json
 * @json_declaration
 * @target web
 */
declare interface RenderingResourcesJson {
    /* Excluded from this release type: smuflFont */
    /**
     * The font to use for displaying the songs copyright information in the header of the music sheet.
     * @defaultValue `bold 12px Arial, sans-serif`
     * @since 0.9.6
     */
    copyrightFont?: FontJson;
    /**
     * The font to use for displaying the songs title in the header of the music sheet.
     * @defaultValue `32px Georgia, serif`
     * @since 0.9.6
     */
    titleFont?: FontJson;
    /**
     * The font to use for displaying the songs subtitle in the header of the music sheet.
     * @defaultValue `20px Georgia, serif`
     * @since 0.9.6
     */
    subTitleFont?: FontJson;
    /**
     * The font to use for displaying the lyrics information in the header of the music sheet.
     * @defaultValue `15px Arial, sans-serif`
     * @since 0.9.6
     */
    wordsFont?: FontJson;
    /**
     * The font to use for displaying certain effect related elements in the music sheet.
     * @defaultValue `italic 12px Georgia, serif`
     * @since 0.9.6
     */
    effectFont?: FontJson;
    /**
     * The font to use for displaying beat time information in the music sheet.
     * @defaultValue `12px Georgia, serif`
     * @since 1.4.0
     */
    timerFont?: FontJson;
    /**
     * The font to use for displaying the directions texts.
     * @defaultValue `14px Georgia, serif`
     * @since 1.4.0
     */
    directionsFont?: FontJson;
    /**
     * The font to use for displaying the fretboard numbers in chord diagrams.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    fretboardNumberFont?: FontJson;
    /**
     * The font to use for displaying the numbered music notation in the music sheet.
     * @defaultValue `14px Arial, sans-serif`
     * @since 1.4.0
     */
    numberedNotationFont?: FontJson;
    /**
     * The font to use for displaying the grace notes in numbered music notation in the music sheet.
     * @defaultValue `16px Arial, sans-serif`
     * @since 1.4.0
     */
    numberedNotationGraceFont?: FontJson;
    /**
     * The font to use for displaying the guitar tablature numbers in the music sheet.
     * @defaultValue `13px Arial, sans-serif`
     * @since 0.9.6
     */
    tablatureFont?: FontJson;
    /**
     * The font to use for grace notation related texts in the music sheet.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    graceFont?: FontJson;
    /**
     * The color to use for rendering the lines of staves.
     * @defaultValue `rgb(165, 165, 165)`
     * @since 0.9.6
     */
    staffLineColor?: ColorJson;
    /**
     * The color to use for rendering bar separators, the accolade and repeat signs.
     * @defaultValue `rgb(34, 34, 17)`
     * @since 0.9.6
     */
    barSeparatorColor?: ColorJson;
    /**
     * The font to use for displaying the bar numbers above the music sheet.
     * @defaultValue `11px Arial, sans-serif`
     * @since 0.9.6
     */
    barNumberFont?: FontJson;
    /**
     * The color to use for displaying the bar numbers above the music sheet.
     * @defaultValue `rgb(200, 0, 0)`
     * @since 0.9.6
     */
    barNumberColor?: ColorJson;
    /**
     * The font to use for displaying finger information in the music sheet.
     * @defaultValue `14px Georgia, serif`
     * @since 0.9.6
     */
    fingeringFont?: FontJson;
    /**
     * The font to use for displaying finger information when inline into the music sheet.
     * @defaultValue `12px Georgia, serif`
     * @since 1.4.0
     */
    inlineFingeringFont?: FontJson;
    /**
     * The font to use for section marker labels shown above the music sheet.
     * @defaultValue `bold 14px Georgia, serif`
     * @since 0.9.6
     */
    markerFont?: FontJson;
    /**
     * The color to use for music notation elements of the primary voice.
     * @defaultValue `rgb(0, 0, 0)`
     * @since 0.9.6
     */
    mainGlyphColor?: ColorJson;
    /**
     * The color to use for music notation elements of the secondary voices.
     * @defaultValue `rgb(0,0,0,0.4)`
     * @since 0.9.6
     */
    secondaryGlyphColor?: ColorJson;
    /**
     * The color to use for displaying the song information above the music sheets.
     * @defaultValue `rgb(0, 0, 0)`
     * @since 0.9.6
     */
    scoreInfoColor?: ColorJson;
}

/**
 * A Staff represents a single line within a StaffSystem.
 * It stores BarRenderer instances created from a given factory.
 */
declare class RenderStaff {
    private _factory;
    private _sharedLayoutData;
    staffTrackGroup: StaffTrackGroup;
    system: StaffSystem;
    barRenderers: BarRendererBase[];
    x: number;
    y: number;
    height: number;
    index: number;
    staffIndex: number;
    isFirstInSystem: boolean;
    /**
     * This is the index of the track being rendered. This is not the index of the track within the model,
     * but the n-th track being rendered. It is the index of the {@link ScoreRenderer.tracks} array defining
     * which tracks should be rendered.
     * For single-track rendering this will always be zero.
     */
    trackIndex: number;
    modelStaff: Staff;
    get staffId(): string;
    /**
     * This is the visual offset from top where the
     * Staff contents actually start. Used for grouping
     * using a accolade
     */
    staveTop: number;
    topSpacing: number;
    bottomSpacing: number;
    /**
     * This is the visual offset from top where the
     * Staff contents actually ends. Used for grouping
     * using a accolade
     */
    staveBottom: number;
    get contentTop(): number;
    get contentBottom(): number;
    constructor(trackIndex: number, staff: Staff, factory: BarRendererFactory);
    getSharedLayoutData<T>(key: string, def: T): T;
    setSharedLayoutData<T>(key: string, def: T): void;
    get isInsideBracket(): boolean;
    get isRelevantForBoundsLookup(): boolean;
    registerStaffTop(offset: number): void;
    registerStaffBottom(offset: number): void;
    addBarRenderer(renderer: BarRendererBase): void;
    addBar(bar: Bar, layoutingInfo: BarLayoutingInfo, additionalMultiBarsRestBars: Bar[] | null): void;
    revertLastBar(): BarRendererBase;
    scaleToWidth(width: number): void;
    get topOverflow(): number;
    get bottomOverflow(): number;
    /**
     * Performs an early calculation of the expected staff height for the size calculation in the
     * accolade (e.g. for braces). This typically happens after the first bar renderers were created
     * and we can do an early placement of the render staffs.
     */
    calculateHeightForAccolade(): void;
    finalizeStaff(): void;
    paint(cx: number, cy: number, canvas: ICanvas, startIndex: number, count: number): void;
}

/**
 * This class represents the rendering stylesheet.
 * It contains settings which control the display of the score when rendered.
 * @json
 * @json_strict
 */
declare class RenderStylesheet {
    /**
     * Whether dynamics are hidden.
     */
    hideDynamics: boolean;
    /**
     * The mode in which brackets and braces are drawn.
     */
    bracketExtendMode: BracketExtendMode;
    /**
     * Whether to draw the // sign to separate systems.
     */
    useSystemSignSeparator: boolean;
    /**
     * Whether to show the tuning.
     */
    globalDisplayTuning: boolean;
    /**
     * Whether to show the tuning.(per-track)
     */
    perTrackDisplayTuning: Map<number, boolean> | null;
    /**
     * Whether to show the chord diagrams on top.
     */
    globalDisplayChordDiagramsOnTop: boolean;
    /**
     * Whether to show the chord diagrams on top. (per-track)
     */
    perTrackChordDiagramsOnTop: Map<number, boolean> | null;
    /**
     * The policy where to show track names when a single track is rendered.
     */
    singleTrackTrackNamePolicy: TrackNamePolicy;
    /**
     * The policy where to show track names when a multiple tracks are rendered.
     */
    multiTrackTrackNamePolicy: TrackNamePolicy;
    /**
     * The mode what text to display for the track name on the first system
     */
    firstSystemTrackNameMode: TrackNameMode;
    /**
     * The mode what text to display for the track name on the first system
     */
    otherSystemsTrackNameMode: TrackNameMode;
    /**
     * The orientation of the the track names on the first system
     */
    firstSystemTrackNameOrientation: TrackNameOrientation;
    /**
     * The orientation of the the track names on other systems
     */
    otherSystemsTrackNameOrientation: TrackNameOrientation;
    /**
     * If multi track: Whether to render multiple subsequent empty (or rest-only) bars together as multi-bar rest.
     */
    multiTrackMultiBarRest: boolean;
    /**
     * If single track: Whether to render multiple subsequent empty (or rest-only) bars together as multi-bar rest.
     */
    perTrackMultiBarRest: Set<number> | null;
}

/**
 * This public class can store the information about a group of measures which are repeated
 */
declare class RepeatGroup {
    /**
     * All masterbars repeated within this group
     */
    masterBars: MasterBar[];
    /**
     * the masterbars which opens the group.
     */
    opening: MasterBar | null;
    /**
     * a list of masterbars which open the group.
     * @deprecated There can only be one opening, use the opening property instead
     */
    get openings(): MasterBar[];
    /**
     * a list of masterbars which close the group.
     */
    closings: MasterBar[];
    /**
     * Gets whether this repeat group is really opened as a repeat.
     */
    get isOpened(): boolean;
    /**
     * true if the repeat group was closed well
     */
    isClosed: boolean;
    addMasterBar(masterBar: MasterBar): void;
}

declare class ReservedLayoutArea {
    beat: Beat;
    topY: number;
    bottomY: number;
    slots: ReservedLayoutAreaSlot[];
    constructor(beat: Beat);
    addSlot(topY: number, bottomY: number): void;
}

declare class ReservedLayoutAreaSlot {
    topY: number;
    bottomY: number;
    constructor(topY: number, bottomY: number);
}

/**
 * Represents the information related to a resize event.
 */
export declare class ResizeEventArgs {
    /**
     * Gets the size before the resizing happened.
     */
    oldWidth: number;
    /**
     * Gets the size after the resize was complete.
     */
    newWidth: number;
    /**
     * Gets the settings currently used for rendering.
     */
    settings: Settings | null;
    core(): CoreSettings;
    private causeIssue;
}

declare class RowContainerGlyph extends GlyphGroup {
    private static readonly Padding;
    private _rows;
    private _align;
    constructor(x: number, y: number, align?: TextAlign);
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * The score is the root node of the complete
 * model. It stores the basic information of
 * a song and stores the sub components.
 * @json
 * @json_strict
 */
declare class Score {
    private _currentRepeatGroup;
    private _openedRepeatGroups;
    private _properlyOpenedRepeatGroups;
    /**
     * Resets all internal ID generators.
     */
    static resetIds(): void;
    /**
     * The album of this song.
     */
    album: string;
    /**
     * The artist who performs this song.
     */
    artist: string;
    /**
     * The owner of the copyright of this song.
     */
    copyright: string;
    /**
     * Additional instructions
     */
    instructions: string;
    /**
     * The author of the music.
     */
    music: string;
    /**
     * Some additional notes about the song.
     */
    notices: string;
    /**
     * The subtitle of the song.
     */
    subTitle: string;
    /**
     * The title of the song.
     */
    title: string;
    /**
     * The author of the song lyrics
     */
    words: string;
    /**
     * The author of this tablature.
     */
    tab: string;
    /**
     * Gets or sets the global tempo of the song in BPM. The tempo might change via {@link MasterBar.tempoAutomations}.
     */
    tempo: number;
    /**
     * Gets or sets the name/label of the tempo.
     */
    tempoLabel: string;
    /**
     * Gets or sets a list of all masterbars contained in this song.
     * @json_add addMasterBar
     */
    masterBars: MasterBar[];
    /**
     * Gets or sets a list of all tracks contained in this song.
     * @json_add addTrack
     */
    tracks: Track[];
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * multiple tracks unless a value is set in the systemsLayout.
     */
    defaultSystemsLayout: number;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * multiple tracks.
     */
    systemsLayout: number[];
    /**
     * Gets or sets the rendering stylesheet for this song.
     */
    stylesheet: RenderStylesheet;
    /**
     * Information about the backing track that can be used instead of the synthesized audio.
     */
    backingTrack: BackingTrack | undefined;
    /**
     * The style customizations for this item.
     */
    style?: ScoreStyle;
    rebuildRepeatGroups(): void;
    addMasterBar(bar: MasterBar): void;
    /**
     * Adds the given bar correctly into the current repeat group setup.
     * @param bar
     */
    private addMasterBarToRepeatGroups;
    addTrack(track: Track): void;
    finish(settings: Settings): void;
    /**
     * Applies the given list of {@link FlatSyncPoint} to this song.
     * @param syncPoints The list of sync points to apply.
     * @since 1.6.0
     */
    applyFlatSyncPoints(syncPoints: FlatSyncPoint[]): void;
    /**
     * Exports all sync points in this song to a {@link FlatSyncPoint} list.
     * @since 1.6.0
     */
    exportFlatSyncPoints(): FlatSyncPoint[];
}

/**
 * This is the base class for creating new song exporters which
 * enable writing scores to a binary datasink.
 */
declare abstract class ScoreExporter {
    protected data: IWriteable;
    protected settings: Settings;
    /**
     * Initializes the importer with the given data and settings.
     */
    init(data: IWriteable, settings: Settings): void;
    /**
     * Exports the given score to a binary buffer.
     * @param score The score to serialize
     * @param settings  The settings to use during serialization
     * @returns A byte buffer with the serialized score.
     */
    export(score: Score, settings?: Settings | null): Uint8Array;
    abstract get name(): string;
    /**
     * Writes the given score into the data sink.
     * @returns The score to write.
     */
    abstract writeScore(score: Score): void;
}

/**
 * This is the base public class for creating new song importers which
 * enable reading scores from any binary datasource
 */
declare abstract class ScoreImporter {
    protected data: IReadable;
    protected settings: Settings;
    /**
     * Initializes the importer with the given data and settings.
     */
    init(data: IReadable, settings: Settings): void;
    abstract get name(): string;
    /**
     * Reads the {@link Score} contained in the data.
     * @returns The score that was contained in the data.
     */
    abstract readScore(): Score;
}

/**
 * This is the base class for creating new layouting engines for the score renderer.
 */
declare abstract class ScoreLayout {
    private _barRendererLookup;
    protected pagePadding: number[] | null;
    abstract get name(): string;
    renderer: ScoreRenderer;
    width: number;
    height: number;
    multiBarRestInfo: Map<number, number[]> | null;
    get scaledWidth(): number;
    protected headerGlyphs: Map<ScoreSubElement, TextGlyph>;
    protected footerGlyphs: Map<ScoreSubElement, TextGlyph>;
    protected chordDiagrams: ChordDiagramContainerGlyph | null;
    protected tuningGlyph: TuningContainerGlyph | null;
    systemsLayoutMode: InternalSystemsLayoutMode;
    constructor(renderer: ScoreRenderer);
    abstract get firstBarX(): number;
    abstract get supportsResize(): boolean;
    resize(): void;
    abstract doResize(): void;
    layoutAndRender(): void;
    private _lazyPartials;
    protected registerPartial(args: RenderFinishedEventArgs, callback: (canvas: ICanvas) => void): void;
    private internalRenderLazyPartial;
    renderLazyPartial(resultId: string): void;
    protected abstract doLayoutAndRender(): void;
    protected static HeaderElements: Lazy<Map<ScoreSubElement, NotationElement | undefined>>;
    protected static FooterElements: Lazy<Map<ScoreSubElement, NotationElement | undefined>>;
    private createHeaderFooterGlyph;
    private createScoreInfoGlyphs;
    firstBarIndex: number;
    lastBarIndex: number;
    protected createEmptyStaffSystem(): StaffSystem;
    registerBarRenderer(key: string, renderer: BarRendererBase): void;
    unregisterBarRenderer(key: string, renderer: BarRendererBase): void;
    getRendererForBar(key: string, bar: Bar): BarRendererBase | null;
    protected layoutAndRenderBottomScoreInfo(y: number): number;
    protected alignScoreInfoGlyph(glyph: TextGlyph): void;
    layoutAndRenderAnnotation(y: number): number;
}

/**
 * The ScoreLoader enables you easy loading of Scores using all
 * available importers
 */
declare class ScoreLoader {
    /**
     * Loads the given alphaTex string.
     * @param tex The alphaTex string.
     * @param settings The settings to use for parsing.
     * @returns The parsed {@see Score}.
     */
    static loadAlphaTex(tex: string, settings?: Settings): Score;
    /**
     * Loads a score asynchronously from the given datasource
     * @param path the source path to load the binary file from
     * @param success this function is called if the Score was successfully loaded from the datasource
     * @param error this function is called if any error during the loading occured.
     * @param settings settings for the score import
     * @target web
     */
    static loadScoreAsync(path: string, success: (score: Score) => void, error: (error: any) => void, settings?: Settings): void;
    /**
     * Loads the score from the given binary data.
     * @param data The binary data containing a score in any known file format.
     * @param settings The settings to use during importing.
     * @returns The loaded score.
     */
    static loadScoreFromBytes(data: Uint8Array, settings?: Settings): Score;
}

/**
 * This is the main wrapper of the rendering engine which
 * can render a single track of a score object into a notation sheet.
 */
declare class ScoreRenderer implements IScoreRenderer {
    private _currentLayoutMode;
    private _currentRenderEngine;
    private _renderedTracks;
    canvas: ICanvas | null;
    score: Score | null;
    tracks: Track[] | null;
    /* Excluded from this release type: layout */
    settings: Settings;
    boundsLookup: BoundsLookup | null;
    width: number;
    /**
     * Initializes a new instance of the {@link ScoreRenderer} class.
     * @param settings The settings to use for rendering.
     */
    constructor(settings: Settings);
    destroy(): void;
    private recreateCanvas;
    private recreateLayout;
    renderScore(score: Score | null, trackIndexes: number[] | null): void;
    /**
     * Initiates rendering fof the given tracks.
     * @param tracks The tracks to render.
     */
    renderTracks(tracks: Track[]): void;
    updateSettings(settings: Settings): void;
    renderResult(resultId: string): void;
    render(): void;
    resizeRender(): void;
    private layoutAndRender;
    readonly preRender: IEventEmitterOfT<boolean>;
    readonly renderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly partialRenderFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly partialLayoutFinished: IEventEmitterOfT<RenderFinishedEventArgs>;
    readonly postRenderFinished: IEventEmitter;
    readonly error: IEventEmitterOfT<Error>;
    private onRenderFinished;
}

/**
 * Defines the custom styles for Scores.
 * @json
 * @json_strict
 */
declare class ScoreStyle extends ElementStyle<ScoreSubElement> {
    /**
     * Changes additional style aspects fo the of the specified sub-element.
     */
    headerAndFooter: Map<ScoreSubElement, HeaderFooterStyle>;
    /**
     * The default styles applied to headers and footers if not specified
     */
    static readonly defaultHeaderAndFooter: Map<ScoreSubElement, HeaderFooterStyle>;
}

/**
 * Lists all graphical sub elements within a {@link Score} which can be styled via {@link Score.style}
 */
declare enum ScoreSubElement {
    /**
     * The title of the song
     */
    Title = 0,
    /**
     * The subtitle of the song
     */
    SubTitle = 1,
    /**
     * The artist of the song
     */
    Artist = 2,
    /**
     * The album of the song
     */
    Album = 3,
    /**
     * The word author of the song
     */
    Words = 4,
    /**
     * The Music author of the song
     */
    Music = 5,
    /**
     * The Words&Music author of the song
     */
    WordsAndMusic = 6,
    /**
     * The transcriber of the music sheet
     */
    Transcriber = 7,
    /**
     * The copyright holder of the song
     */
    Copyright = 8,
    /**
     * The second copyright line (typically something like 'All Rights Reserved')
     */
    CopyrightSecondLine = 9,
    /**
     * The chord diagram list shown on top of the score.
     */
    ChordDiagramList = 10
}

/**
 * Lists all modes how alphaTab can scroll the container during playback.
 */
export declare enum ScrollMode {
    /**
     * Do not scroll automatically
     */
    Off = 0,
    /**
     * Scrolling happens as soon the offsets of the cursors change.
     */
    Continuous = 1,
    /**
     * Scrolling happens as soon the cursors exceed the displayed range.
     */
    OffScreen = 2
}

/**
 * This public class is used to describe the beginning of a
 * section within a song. It acts like a marker.
 * @json
 * @json_strict
 */
declare class Section {
    /**
     * Gets or sets the marker ID for this section.
     */
    marker: string;
    /**
     * Gets or sets the descriptional text of this section.
     */
    text: string;
}

/**
 * This public class contains instance specific settings for alphaTab
 * @json
 * @json_declaration
 * @public_api
 */
export declare class Settings {
    /**
     * The core settings control the general behavior of alphatab like
     * what modules are active.
     * @json_on_parent
     * @json_partial_names
     */
    readonly core: CoreSettings;
    /**
     * The display settings control how the general layout and display of alphaTab is done.
     * @json_on_parent
     * @json_partial_names
     */
    readonly display: DisplaySettings;
    /**
     * The notation settings control how various music notation elements are shown and behaving.
     * @json_partial_names
     */
    readonly notation: NotationSettings;
    /**
     * All settings related to importers that decode file formats.
     * @json_partial_names
     */
    readonly importer: ImporterSettings;
    /**
     * Contains all player related settings
     * @json_partial_names
     */
    readonly player: PlayerSettings;
    setSongBookModeSettings(): void;
    static get songBook(): Settings;
    /**
     * @target web
     */
    fillFromJson(json: SettingsJson): void;
}

/**
 * This public class contains instance specific settings for alphaTab
 * @json
 * @json_declaration
 * @public_api
 * @target web
 */
declare interface SettingsJson {
    /**
     * The core settings control the general behavior of alphatab like
     * what modules are active.
     * @json_on_parent
     * @json_partial_names
     */
    core?: CoreSettingsJson;
    /**
     * The display settings control how the general layout and display of alphaTab is done.
     * @json_on_parent
     * @json_partial_names
     */
    display?: DisplaySettingsJson;
    /**
     * The notation settings control how various music notation elements are shown and behaving.
     * @json_partial_names
     */
    notation?: NotationSettingsJson;
    /**
     * All settings related to importers that decode file formats.
     * @json_partial_names
     */
    importer?: ImporterSettingsJson;
    /**
     * Contains all player related settings
     * @json_partial_names
     */
    player?: PlayerSettingsJson;
}

/**
 * Lists all simile mark types as they are assigned to bars.
 */
declare enum SimileMark {
    /**
     * No simile mark is applied
     */
    None = 0,
    /**
     * A simple simile mark. The previous bar is repeated.
     */
    Simple = 1,
    /**
     * A double simile mark. This value is assigned to the first
     * bar of the 2 repeat bars.
     */
    FirstOfDouble = 2,
    /**
     * A double simile mark. This value is assigned to the second
     * bar of the 2 repeat bars.
     */
    SecondOfDouble = 3
}

/**
 * This public enum lists all different types of finger slide-ins on a string.
 */
declare enum SlideInType {
    /**
     * No slide.
     */
    None = 0,
    /**
     * Slide into the note from below on the same string.
     */
    IntoFromBelow = 1,
    /**
     * Slide into the note from above on the same string.
     */
    IntoFromAbove = 2
}

/**
 * This public enum lists all different types of finger slide-outs on a string.
 */
declare enum SlideOutType {
    /**
     * No slide.
     */
    None = 0,
    /**
     * Shift slide to next note on same string
     */
    Shift = 1,
    /**
     * Legato slide to next note on same string.
     */
    Legato = 2,
    /**
     * Slide out from the note from upwards on the same string.
     */
    OutUp = 3,
    /**
     * Slide out from the note from downwards on the same string.
     */
    OutDown = 4,
    /**
     * Pickslide down on this note
     */
    PickSlideDown = 5,
    /**
     * Pickslide up on this note
     */
    PickSlideUp = 6
}

/**
 * This object defines the details on how to generate the slide effects.
 * @json
 * @json_declaration
 */
export declare class SlidePlaybackSettings {
    /**
     * Gets or sets 1/4 tones (bend value) offset that
     * simple slides like slide-out-below or slide-in-above use.
     * @defaultValue `6`
     */
    simpleSlidePitchOffset: number;
    /**
     * The percentage which the simple slides should take up
     * from the whole note. for "slide into" effects the slide will take place
     * from time 0 where the note is plucked to 25% of the overall note duration.
     * For "slide out" effects the slide will start 75% and finish at 100% of the overall
     * note duration.
     * @defaultValue `0.25`
     */
    simpleSlideDurationRatio: number;
    /**
     * The percentage which the legato and shift slides should take up
     * from the whole note. For a value 0.5 the sliding will start at 50% of the overall note duration
     * and finish at 100%
     * @defaultValue `0.5`
     */
    shiftSlideDurationRatio: number;
}

/**
 * This object defines the details on how to generate the slide effects.
 * @json
 * @json_declaration
 * @target web
 */
declare interface SlidePlaybackSettingsJson {
    /**
     * Gets or sets 1/4 tones (bend value) offset that
     * simple slides like slide-out-below or slide-in-above use.
     * @defaultValue `6`
     */
    simpleSlidePitchOffset?: number;
    /**
     * The percentage which the simple slides should take up
     * from the whole note. for "slide into" effects the slide will take place
     * from time 0 where the note is plucked to 25% of the overall note duration.
     * For "slide out" effects the slide will start 75% and finish at 100% of the overall
     * note duration.
     * @defaultValue `0.25`
     */
    simpleSlideDurationRatio?: number;
    /**
     * The percentage which the legato and shift slides should take up
     * from the whole note. For a value 0.5 the sliding will start at 50% of the overall note duration
     * and finish at 100%
     * @defaultValue `0.5`
     */
    shiftSlideDurationRatio?: number;
}

declare class Spring {
    timePosition: number;
    longestDuration: number;
    smallestDuration: number;
    force: number;
    springConstant: number;
    get springWidth(): number;
    preBeatWidth: number;
    graceBeatWidth: number;
    postSpringWidth: number;
    get preSpringWidth(): number;
    allDurations: Set<number>;
}

/**
 * This class describes a single staff within a track. There are instruments like pianos
 * where a single track can contain multiple staves.
 * @json
 * @json_strict
 */
declare class Staff {
    static readonly DefaultStandardNotationLineCount = 5;
    /**
     * Gets or sets the zero-based index of this staff within the track.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference to the track this staff belongs to.
     * @json_ignore
     */
    track: Track;
    /**
     * Gets or sets a list of all bars contained in this staff.
     * @json_add addBar
     */
    bars: Bar[];
    /**
     * Gets or sets a list of all chords defined for this staff. {@link Beat.chordId} refers to entries in this lookup.
     * @json_add addChord
     */
    chords: Map<string, Chord> | null;
    /**
     * Gets or sets the fret on which a capo is set.
     */
    capo: number;
    /**
     * Gets or sets the number of semitones this track should be
     * transposed. This applies to rendering and playback.
     */
    transpositionPitch: number;
    /**
     * Gets or sets the number of semitones this track should be
     * transposed. This applies only to rendering.
     */
    displayTranspositionPitch: number;
    /**
     * Get or set the guitar tuning of the guitar. This tuning also indicates the number of strings shown in the
     * guitar tablature. Unlike the {@link Note.string} property this array directly represents
     * the order of the tracks shown in the tablature. The first item is the most top tablature line.
     */
    stringTuning: Tuning;
    /**
     * Get or set the values of the related guitar tuning.
     */
    get tuning(): number[];
    /**
     * Gets or sets the name of the tuning.
     */
    get tuningName(): string;
    get isStringed(): boolean;
    /**
     * Gets or sets whether the slash notation is shown.
     */
    showSlash: boolean;
    /**
     * Gets or sets whether the numbered notation is shown.
     */
    showNumbered: boolean;
    /**
     * Gets or sets whether the tabs are shown.
     */
    showTablature: boolean;
    /**
     * Gets or sets whether the standard notation is shown.
     */
    showStandardNotation: boolean;
    /**
     * Gets or sets whether the staff contains percussion notation
     */
    isPercussion: boolean;
    /**
     * The number of lines shown for the standard notation.
     * For some percussion instruments this number might vary.
     */
    standardNotationLineCount: number;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    addChord(chordId: string, chord: Chord): void;
    hasChord(chordId: string): boolean;
    getChord(chordId: string): Chord | null;
    addBar(bar: Bar): void;
}

/**
 * A StaffSystem consists of a list of different staves and groups
 * them using an accolade.
 */
declare class StaffSystem {
    private _allStaves;
    private _firstStaffInBrackets;
    private _lastStaffInBrackets;
    private _accoladeSpacingCalculated;
    private _brackets;
    private _hasSystemSeparator;
    x: number;
    y: number;
    index: number;
    /**
     * The width of the whole accolade inclusive text and bar.
     */
    accoladeWidth: number;
    /**
     * Indicates whether this line is full or not. If the line is full the
     * bars can be aligned to the maximum width. If the line is not full
     * the bars will not get stretched.
     */
    isFull: boolean;
    /**
     * The width that the content bars actually need
     */
    width: number;
    computedWidth: number;
    totalBarDisplayScale: number;
    isLast: boolean;
    masterBarsRenderers: MasterBarsRenderers[];
    staves: StaffTrackGroup[];
    layout: ScoreLayout;
    topPadding: number;
    bottomPadding: number;
    constructor(layout: ScoreLayout);
    get firstBarIndex(): number;
    get lastBarIndex(): number;
    addMasterBarRenderers(tracks: Track[], renderers: MasterBarsRenderers): MasterBarsRenderers | null;
    addBars(tracks: Track[], barIndex: number, additionalMultiBarRestIndexes: number[] | null): MasterBarsRenderers;
    revertLastBar(): MasterBarsRenderers | null;
    private updateWidthFromLastBar;
    private calculateAccoladeSpacing;
    private getStaffTrackGroup;
    addStaff(track: Track, staff: RenderStaff): void;
    get height(): number;
    scaleToWidth(width: number): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
    paintPartial(cx: number, cy: number, canvas: ICanvas, startIndex: number, count: number): void;
    private static readonly SystemSignSeparatorHeight;
    private static readonly SystemSignSeparatorPadding;
    private static readonly SystemSignSeparatorWidth;
    finalizeSystem(): void;
    buildBoundingsLookup(cx: number, cy: number): void;
    getBarX(index: number): number;
}

/**
 * Represents the bounds of a staff system.
 */
declare class StaffSystemBounds {
    /**
     * Gets or sets the index of the bounds within the parent lookup.
     * This allows fast access of the next/previous system.
     */
    index: number;
    /**
     * Gets or sets the bounds covering all visually visible elements of this staff system.
     */
    visualBounds: Bounds;
    /**
     * Gets or sets the actual bounds of the elements in this staff system including whitespace areas.
     */
    realBounds: Bounds;
    /**
     * Gets or sets the list of master bar bounds related to this staff system.
     */
    bars: MasterBarBounds[];
    /**
     * Gets or sets a reference to the parent bounds lookup.
     */
    boundsLookup: BoundsLookup;
    /**
     * Finished the lookup for optimized access.
     */
    finish(scale?: number): void;
    /**
     * Adds a new master bar to this lookup.
     * @param bounds The master bar bounds to add.
     */
    addBar(bounds: MasterBarBounds): void;
    /**
     * Tries to find the master bar bounds that are located at the given X-position.
     * @param x The X-position to find a master bar.
     * @returns The master bounds at the given X-position.
     */
    findBarAtPos(x: number): MasterBarBounds | null;
}

/**
 * Represents the group of rendered staves belonging to an individual track.
 * This includes staves like effects, notation representations (numbered, tabs,..) and multiple
 * staffs (grand staff).
 */
declare class StaffTrackGroup {
    track: Track;
    staffSystem: StaffSystem;
    staves: RenderStaff[];
    stavesRelevantForBoundsLookup: RenderStaff[];
    firstStaffInBracket: RenderStaff | null;
    lastStaffInBracket: RenderStaff | null;
    bracket: SystemBracket | null;
    constructor(staffSystem: StaffSystem, track: Track);
    addStaff(staff: RenderStaff): void;
}

/**
 * Lists all stave profiles controlling which staves are shown.
 */
export declare enum StaveProfile {
    /**
     * The profile is auto detected by the track configurations.
     */
    Default = 0,
    /**
     * Standard music notation and guitar tablature are rendered.
     */
    ScoreTab = 1,
    /**
     * Only standard music notation is rendered.
     */
    Score = 2,
    /**
     * Only guitar tablature is rendered.
     */
    Tab = 3,
    /**
     * Only guitar tablature is rendered, but also rests and time signatures are not shown.
     * This profile is typically used in multi-track scenarios.
     */
    TabMixed = 4
}

/**
 * A marker on whether a sustain pedal starts or ends.
 * @json
 * @json_strict
 */
declare class SustainPedalMarker {
    /**
     * The relative position of pedal markers within the bar.
     */
    ratioPosition: number;
    /**
     * Whether what should be done with the pedal at this point
     */
    pedalType: SustainPedalMarkerType;
    /**
     * THe bar to which this marker belongs to.
     * @json_ignore
     */
    bar: Bar;
    /**
     * The next pedal marker for linking the related markers together to a "down -> hold -> up" or "down -> up" sequence.
     * Always null for "up" markers.
     * @json_ignore
     */
    nextPedalMarker: SustainPedalMarker | null;
    /**
     * The previous pedal marker for linking the related markers together to a "down -> hold -> up" or "down -> up" sequence.
     * Always null for "down" markers.
     * @json_ignore
     */
    previousPedalMarker: SustainPedalMarker | null;
}

/**
 * The different pedal marker types.
 */
declare enum SustainPedalMarkerType {
    /**
     * Indicates that the pedal should be pressed from this time on.
     */
    Down = 0,
    /**
     * Indicates that the pedal should be held on this marker (used when the pedal is held for the whole bar)
     */
    Hold = 1,
    /**
     * indicates that the pedal should be lifted up at this time.
     */
    Up = 2
}

/**
 * A canvas implementation storing SVG data
 */
declare abstract class SvgCanvas implements ICanvas {
    protected buffer: string;
    private _currentPath;
    private _currentPathIsEmpty;
    scale: number;
    color: Color;
    lineWidth: number;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline;
    settings: Settings;
    destroy(): void;
    beginRender(width: number, height: number): void;
    beginGroup(identifier: string): void;
    endGroup(): void;
    endRender(): unknown;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    fill(): void;
    stroke(): void;
    fillText(text: string, x: number, y: number): void;
    private static escapeText;
    protected getSvgTextAlignment(textAlign: TextAlign): string;
    protected getSvgBaseLine(): string;
    measureText(text: string): MeasuredText;
    abstract fillMusicFontSymbol(x: number, y: number, relativeScale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    abstract fillMusicFontSymbols(x: number, y: number, relativeScale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    onRenderFinished(): unknown;
    beginRotate(centerX: number, centerY: number, angle: number): void;
    endRotate(): void;
}

/**
 * Represents the data of a sync point for synchronizing the internal time axis with
 * an external audio file.
 * @cloneable
 * @json
 * @json_strict
 */
declare class SyncPointData {
    /**
     * Indicates for which repeat occurence this sync point is valid (e.g. 0 on the first time played, 1 on the second time played)
     */
    barOccurence: number;
    /**
     * The audio offset marking the position within the audio track in milliseconds.
     * This information is used to regularly sync (or on seeking) to match a given external audio time axis with the internal time axis.
     */
    millisecondOffset: number;
}

export declare namespace synth {
    export {
        AlphaSynthBase,
        AlphaSynth,
        IAlphaSynthAudioExporter,
        CircularSampleBuffer,
        PlaybackRange,
        ISynthOutput,
        ISynthOutputDevice,
        IBackingTrackSynthOutput,
        IAlphaSynth,
        BackingTrackSyncPoint,
        PlayerState,
        PlayerStateChangedEventArgs,
        PlaybackRangeChangedEventArgs,
        PositionChangedEventArgs,
        MidiEventsPlayedEventArgs,
        ActiveBeatsChangedEventArgs,
        AlphaSynthWebWorkerApi,
        AlphaSynthWebAudioOutputBase,
        AlphaSynthScriptProcessorOutput,
        AlphaSynthAudioWorkletOutput,
        IAudioElementBackingTrackSynthOutput,
        IExternalMediaHandler,
        IExternalMediaSynthOutput,
        IAudioExporter,
        IAudioExporterWorker,
        AudioExportChunk,
        AudioExportOptions
    }
}

declare class SynthEvent {
    eventIndex: number;
    event: MidiEvent;
    readonly isMetronome: boolean;
    time: number;
    constructor(eventIndex: number, e: MidiEvent);
    static newMetronomeEvent(eventIndex: number, tick: number, counter: number, durationInTicks: number, durationInMillis: number): SynthEvent;
}

declare abstract class SystemBracket {
    firstStaffInBracket: RenderStaff | null;
    lastStaffInBracket: RenderStaff | null;
    drawAsBrace: boolean;
    braceScale: number;
    width: number;
    index: number;
    abstract includesStaff(s: RenderStaff): boolean;
    finalizeBracket(): void;
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class SystemCommonEvent extends DeprecatedMidiEvent {
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare enum SystemCommonType {
    SystemExclusive = 240,
    MtcQuarterFrame = 241,
    SongPosition = 242,
    SongSelect = 243,
    TuneRequest = 246,
    SystemExclusive2 = 247
}

/**
 * @deprecated Move to the new concrete Midi Event Types.
 */
declare class SystemExclusiveEvent extends SystemCommonEvent {
    static readonly AlphaTabManufacturerId = 125;
    data: Uint8Array;
    get isMetronome(): boolean;
    get metronomeNumerator(): number;
    get metronomeDurationInTicks(): number;
    get metronomeDurationInMilliseconds(): number;
    get isRest(): boolean;
    get manufacturerId(): number;
}

/**
 * Lists the different modes in which the staves and systems are arranged.
 */
export declare enum SystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the systems layout and sizing information stored from the score model.
     */
    UseModelLayout = 1
}

/**
 * Lists the different modes on how rhythm notation is shown on the tab staff.
 */
export declare enum TabRhythmMode {
    /**
     * Rhythm notation is hidden.
     */
    Hidden = 0,
    /**
     * Rhythm notation is shown with individual beams per beat.
     */
    ShowWithBeams = 1,
    /**
     * Rhythm notation is shown and behaves like normal score notation with connected bars.
     */
    ShowWithBars = 2,
    /**
     * Automatic detection whether the tabs should show rhythm based on hidden standard notation.
     * @since 1.4.0
     */
    Automatic = 3
}

/**
 * Represents a change of the tempo in the song.
 */
declare class TempoChangeEvent extends MidiEvent {
    /**
     * The tempo in microseconds per quarter note (aka USQ). A time format typically for midi.
     */
    get microSecondsPerQuarterNote(): number;
    /**
     * The tempo in microseconds per quarter note (aka USQ). A time format typically for midi.
     */
    set microSecondsPerQuarterNote(value: number);
    /**
     * The tempo in beats per minute
     */
    beatsPerMinute: number;
    constructor(tick: number, microSecondsPerQuarterNote: number);
    writeTo(s: IWriteable): void;
}

/**
 * This public enum lists all different text alignments
 */
declare enum TextAlign {
    /**
     * Text is left aligned.
     */
    Left = 0,
    /**
     * Text is centered.
     */ Center = 1,
    /**
     * Text is right aligned.
     */ Right = 2
}

/**
 * This public enum lists all base line modes
 */
declare enum TextBaseline {
    /**
     * Text is aligned on top.
     */
    Top = 0,
    /**
     * Text is aligned middle
     */
    Middle = 1,
    /**
     * Text is aligend on the bottom.
     */
    Bottom = 2
}

declare class TextGlyph extends EffectGlyph {
    private _lines;
    private _lineHeights;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline | null;
    colorOverride?: Color;
    constructor(x: number, y: number, text: string, font: Font, textAlign?: TextAlign, testBaseline?: TextBaseline | null, color?: Color);
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * Represents a time signature change event.
 */
declare class TimeSignatureEvent extends MidiEvent {
    /**
     * The time signature numerator.
     */
    numerator: number;
    /**
     * The denominator index is a negative power of two: 2 represents a quarter-note, 3 represents an eighth-note, etc.
     * Denominator = 2^(index)
     */
    denominatorIndex: number;
    /**
     * The number of MIDI clocks in a metronome click
     */
    midiClocksPerMetronomeClick: number;
    /**
     * The number of notated 32nd-notes in what MIDI thinks of as a quarter-note (24 MIDI Clocks).
     */
    thirtySecondNodesInQuarter: number;
    constructor(track: number, tick: number, numerator: number, denominatorIndex: number, midiClocksPerMetronomeClick: number, thirtySecondNodesInQuarter: number);
    writeTo(s: IWriteable): void;
}

/**
 * This public class describes a single track or instrument of score.
 * It is primarily a list of staves containing individual music notation kinds.
 * @json
 * @json_strict
 */
declare class Track {
    private static readonly ShortNameMaxLength;
    /**
     * Gets or sets the zero-based index of this track.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference this track belongs to.
     * @json_ignore
     */
    score: Score;
    /**
     * Gets or sets the list of staves that are defined for this track.
     * @json_add addStaff
     */
    staves: Staff[];
    /**
     * Gets or sets the playback information for this track.
     */
    playbackInfo: PlaybackInformation;
    /**
     * Gets or sets the display color defined for this track.
     */
    color: Color;
    /**
     * Gets or sets the long name of this track.
     */
    name: string;
    /**
     * Gets or sets whether this track should be visible in the UI.
     * This information is purely informational and might not be provided by all input formats.
     * In formats like Guitar Pro this flag indicates whether on the default "multi-track" layout
     * tracks should be visible or not.
     */
    isVisibleOnMultiTrack: boolean;
    /**
     * Gets or sets the short name of this track.
     */
    shortName: string;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * the track unless a value is set in the systemsLayout.
     */
    defaultSystemsLayout: number;
    /**
     * Defines how many bars are placed into the systems (rows) when displaying
     * the track.
     */
    systemsLayout: number[];
    /**
     * Defines on which bars specifically a line break is forced.
     * @json_add addLineBreaks
     */
    lineBreaks?: Set<number>;
    /**
     * Adds a new line break.
     * @param index  The index of the bar before which a line break should happen.
     */
    addLineBreaks(index: number): void;
    /**
     * Gets or sets a mapping on which staff lines particular percussion instruments
     * should be shown.
     */
    percussionArticulations: InstrumentArticulation[];
    /**
     * The style customizations for this item.
     */
    style?: TrackStyle;
    ensureStaveCount(staveCount: number): void;
    addStaff(staff: Staff): void;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    applyLyrics(lyrics: Lyrics[]): void;
}

/**
 * Lists the different modes what text to display for track names.
 */
declare enum TrackNameMode {
    /**
     * Full track names are displayed {@link Track.name}
     */
    FullName = 0,
    /**
     * Short Track names (abbreviations) are displayed {@link Track.shortName}
     */
    ShortName = 1
}

/**
 * Lists the different orientations modes how to render the track names.
 */
declare enum TrackNameOrientation {
    /**
     * Text is shown horizontally (left-to-right)
     */
    Horizontal = 0,
    /**
     * Vertically rotated (bottom-to-top)
     */
    Vertical = 1
}

/**
 * Lists the different policies on how to display the track names.
 */
declare enum TrackNamePolicy {
    /**
     * Track names are hidden everywhere.
     */
    Hidden = 0,
    /**
     * Track names are displayed on the first system.
     */
    FirstSystem = 1,
    /**
     * Track names are displayed on all systems.
     */
    AllSystems = 2
}

/**
 * Defines the custom styles for tracks.
 * @json
 * @json_strict
 */
declare class TrackStyle extends ElementStyle<TrackSubElement> {
}

/**
 * Lists all graphical sub elements within a {@link Track} which can be styled via {@link Track.style}
 */
declare enum TrackSubElement {
    /**
     * The track names shown before the staves.
     */
    TrackName = 0,
    /**
     * The braces and brackets grouping the staves.
     * If a bracket spans multiple tracks, the color of the first track counts.
     */
    BracesAndBrackets = 1,
    /**
     * The system separator.
     */
    SystemSeparator = 2,
    /**
     * The tuning of the strings.
     */
    StringTuning = 3
}

/**
 * This public enumeration lists all feels of triplets.
 */
declare enum TripletFeel {
    /**
     * No triplet feel
     */
    NoTripletFeel = 0,
    /**
     * Triplet 16th
     */
    Triplet16th = 1,
    /**
     * Triplet 8th
     */
    Triplet8th = 2,
    /**
     * Dotted 16th
     */
    Dotted16th = 3,
    /**
     * Dotted 8th
     */
    Dotted8th = 4,
    /**
     * Scottish 16th
     */
    Scottish16th = 5,
    /**
     * Scottish 8th
     */
    Scottish8th = 6
}

/**
 * This public class represents a predefined string tuning.
 * @json
 * @json_strict
 */
declare class Tuning {
    private static _sevenStrings;
    private static _sixStrings;
    private static _fiveStrings;
    private static _fourStrings;
    private static _defaultTunings;
    static readonly defaultAccidentals: string[];
    static readonly defaultSteps: string[];
    static getTextForTuning(tuning: number, includeOctave: boolean): string;
    static getTextPartsForTuning(tuning: number, octaveShift?: number): string[];
    /**
     * Gets the default tuning for the given string count.
     * @param stringCount The string count.
     * @returns The tuning for the given string count or null if the string count is not defined.
     */
    static getDefaultTuningFor(stringCount: number): Tuning | null;
    /**
     * Gets a list of all tuning presets for a given stirng count.
     * @param stringCount The string count.
     * @returns The list of known tunings for the given string count or an empty list if the string count is not defined.
     */
    static getPresetsFor(stringCount: number): Tuning[];
    static initialize(): void;
    /**
     * Tries to find a known tuning by a given list of tuning values.
     * @param strings The values defining the tuning.
     * @returns The known tuning.
     */
    static findTuning(strings: number[]): Tuning | null;
    /**
     * Gets or sets whether this is the standard tuning for this number of strings.
     */
    isStandard: boolean;
    /**
     * Gets or sets the name of the tuning.
     */
    name: string;
    /**
     * Gets or sets the values for each string of the instrument.
     */
    tunings: number[];
    /**
     * Initializes a new instance of the {@link Tuning} class.
     * @param name The name.
     * @param tuning The tuning.
     * @param isStandard if set to`true`[is standard].
     */
    constructor(name?: string, tuning?: number[] | null, isStandard?: boolean);
    /**
     * Tries to detect the name and standard flag of the tuning from a known tuning list based
     * on the string values.
     */
    finish(): void;
}

declare class TuningContainerGlyph extends RowContainerGlyph {
    constructor(x: number, y: number);
}

/**
 * Represents a list of beats that are grouped within the same tuplet.
 */
declare class TupletGroup {
    private static readonly HalfTicks;
    private static readonly QuarterTicks;
    private static readonly EighthTicks;
    private static readonly SixteenthTicks;
    private static readonly ThirtySecondTicks;
    private static readonly SixtyFourthTicks;
    private static readonly OneHundredTwentyEighthTicks;
    private static readonly TwoHundredFiftySixthTicks;
    private static AllTicks;
    private _isEqualLengthTuplet;
    totalDuration: number;
    /**
     * Gets or sets the list of beats contained in this group.
     */
    beats: Beat[];
    /**
     * Gets or sets the voice this group belongs to.
     */
    voice: Voice;
    /**
     * Gets a value indicating whether the tuplet group is fully filled.
     */
    isFull: boolean;
    /**
     * Initializes a new instance of the {@link TupletGroup} class.
     * @param voice The voice this group belongs to.
     */
    constructor(voice: Voice);
    check(beat: Beat): boolean;
}

/**
 * The exception thrown by a {@link ScoreImporter} in case the
 * binary data does not contain a reader compatible structure.
 */
declare class UnsupportedFormatError extends AlphaTabError {
    constructor(message?: string | null, inner?: Error);
}

/**
 * This object defines the details on how to generate the vibrato effects.
 * @json
 * @json_declaration
 */
export declare class VibratoPlaybackSettings {
    /**
     * The wavelength of the note-wide vibrato in midi ticks.
     * @defaultValue `240`
     */
    noteWideLength: number;
    /**
     * The amplitude for the note-wide vibrato in semitones.
     * @defaultValue `1`
     */
    noteWideAmplitude: number;
    /**
     * The wavelength of the note-slight vibrato in midi ticks.
     * @defaultValue `360`
     */
    noteSlightLength: number;
    /**
     * The amplitude for the note-slight vibrato in semitones.
     * @defaultValue `0.5`
     */
    noteSlightAmplitude: number;
    /**
     * The wavelength of the beat-wide vibrato in midi ticks.
     * @defaultValue `480`
     */
    beatWideLength: number;
    /**
     * The amplitude for the beat-wide vibrato in semitones.
     * @defaultValue `2`
     */
    beatWideAmplitude: number;
    /**
     * The wavelength of the beat-slight vibrato in midi ticks.
     * @defaultValue `480`
     */
    beatSlightLength: number;
    /**
     * The amplitude for the beat-slight vibrato in semitones.
     * @defaultValue `2`
     */
    beatSlightAmplitude: number;
}

/**
 * This object defines the details on how to generate the vibrato effects.
 * @json
 * @json_declaration
 * @target web
 */
declare interface VibratoPlaybackSettingsJson {
    /**
     * The wavelength of the note-wide vibrato in midi ticks.
     * @defaultValue `240`
     */
    noteWideLength?: number;
    /**
     * The amplitude for the note-wide vibrato in semitones.
     * @defaultValue `1`
     */
    noteWideAmplitude?: number;
    /**
     * The wavelength of the note-slight vibrato in midi ticks.
     * @defaultValue `360`
     */
    noteSlightLength?: number;
    /**
     * The amplitude for the note-slight vibrato in semitones.
     * @defaultValue `0.5`
     */
    noteSlightAmplitude?: number;
    /**
     * The wavelength of the beat-wide vibrato in midi ticks.
     * @defaultValue `480`
     */
    beatWideLength?: number;
    /**
     * The amplitude for the beat-wide vibrato in semitones.
     * @defaultValue `2`
     */
    beatWideAmplitude?: number;
    /**
     * The wavelength of the beat-slight vibrato in midi ticks.
     * @defaultValue `480`
     */
    beatSlightLength?: number;
    /**
     * The amplitude for the beat-slight vibrato in semitones.
     * @defaultValue `2`
     */
    beatSlightAmplitude?: number;
}

/**
 * This public enum lists all vibrato types that can be performed.
 */
declare enum VibratoType {
    /**
     * No vibrato.
     */
    None = 0,
    /**
     * A slight vibrato.
     */
    Slight = 1,
    /**
     * A wide vibrato.
     */
    Wide = 2
}

/**
 * A voice represents a group of beats
 * that can be played during a bar.
 * @json
 * @json_strict
 */
declare class Voice {
    private _beatLookup;
    private _isEmpty;
    private _isRestOnly;
    private static _globalVoiceId;
    /* Excluded from this release type: resetIds */
    /**
     * Gets or sets the unique id of this bar.
     */
    id: number;
    /**
     * Gets or sets the zero-based index of this voice within the bar.
     * @json_ignore
     */
    index: number;
    /**
     * Gets or sets the reference to the bar this voice belongs to.
     * @json_ignore
     */
    bar: Bar;
    /**
     * Gets or sets the list of beats contained in this voice.
     * @json_add addBeat
     */
    beats: Beat[];
    /**
     * Gets or sets a value indicating whether this voice is empty.
     */
    get isEmpty(): boolean;
    /**
     * The style customizations for this item.
     */
    style?: VoiceStyle;
    /* Excluded from this release type: forceNonEmpty */
    /**
     * Gets or sets a value indicating whether this voice is empty.
     */
    get isRestOnly(): boolean;
    insertBeat(after: Beat, newBeat: Beat): void;
    addBeat(beat: Beat): void;
    private chain;
    addGraceBeat(beat: Beat): void;
    getBeatAtPlaybackStart(playbackStart: number): Beat | null;
    finish(settings: Settings, sharedDataBag?: Map<string, unknown> | null): void;
    calculateDuration(): number;
}

/**
 * This glyph acts as container for handling
 * multiple voice rendering
 */
declare class VoiceContainerGlyph extends GlyphGroup {
    static readonly KeySizeBeat: string;
    beatGlyphs: BeatContainerGlyph[];
    voice: Voice;
    tupletGroups: TupletGroup[];
    constructor(x: number, y: number, voice: Voice);
    scaleToWidth(width: number): void;
    private scaleToForce;
    registerLayoutingInfo(info: BarLayoutingInfo): void;
    applyLayoutingInfo(info: BarLayoutingInfo): void;
    addGlyph(g: Glyph): void;
    doLayout(): void;
    paint(cx: number, cy: number, canvas: ICanvas): void;
}

/**
 * Defines the custom styles for voices.
 * @json
 * @json_strict
 */
declare class VoiceStyle extends ElementStyle<VoiceSubElement> {
}

/**
 * Lists all graphical sub elements within a {@link Voice} which can be styled via {@link Voice.style}
 */
declare enum VoiceSubElement {
    /**
     * All general glyphs (like notes heads and rests).
     */
    Glyphs = 0
}

/**
 * Lists all wah pedal modes.
 */
declare enum WahPedal {
    None = 0,
    Open = 1,
    Closed = 2
}

/**
 * Lists all web specific platforms alphaTab might run in
 * like browser, nodejs.
 */
export declare enum WebPlatform {
    Browser = 0,
    NodeJs = 1,
    BrowserModule = 2
}

/**
 * Lists all types of whammy bars
 */
declare enum WhammyType {
    /**
     * No whammy at all
     */
    None = 0,
    /**
     * Individual points define the whammy in a flexible manner.
     * This system was mainly used in Guitar Pro 3-5
     */
    Custom = 1,
    /**
     * Simple dive to a lower or higher note.
     */
    Dive = 2,
    /**
     * A dive to a lower or higher note and releasing it back to normal.
     */
    Dip = 3,
    /**
     * Continue to hold the whammy at the position from a previous whammy.
     */
    Hold = 4,
    /**
     * Dive to a lower or higher note before playing it.
     */
    Predive = 5,
    /**
     * Dive to a lower or higher note before playing it, then change to another
     * note.
     */
    PrediveDive = 6
}

export { }
