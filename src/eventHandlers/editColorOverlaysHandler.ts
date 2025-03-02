import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";

type TColorOverlayId = '4' | '5' | '8';

export type TColorOverlayOptions = {
    value: number;
    opacity: number;
    color1: number;
    color2: number | null;
};
type TColorOverlays = Record<TColorOverlayId, TColorOverlayOptions>;


export const editColorOverlaysHandler = (ped: number | Ped | Player | LocalPlayer, editOverlaysJSON: string) => {
    const overlays: TColorOverlays  = JSON.parse(editOverlaysJSON)

    for(const [id, overlay] of Object.entries(overlays)){
        const color2 = overlay.color2 ? overlay.color2 : overlay.color1;
        native.setPedHeadOverlay(ped, +id, overlay.value, overlay.opacity)
        native.setPedHeadOverlayTint(ped, +id, 1, overlay.color1, color2)
    }
}