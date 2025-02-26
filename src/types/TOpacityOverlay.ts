export type TOpacityOverlayId = '0' | '3' | '6' | '7' | '9' | '11';
export type TOpacityOverlayOptions = { value: number; opacity: number };

export type TEditorOpacityOverlay = Record<
    TOpacityOverlayId,
    TOpacityOverlayOptions
>;
