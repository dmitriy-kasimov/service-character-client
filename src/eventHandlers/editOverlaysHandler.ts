import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";

type TOverlayId = '0' | '3' | '6' | '7' | '9' | '11';

type TOverlayOptions = { value: number; opacity: number };
type TOverlays = Record<TOverlayId, TOverlayOptions>;


export const editOverlaysHandler = (ped: number | Ped | Player | LocalPlayer, editOverlaysJSON: string) => {
    const overlays: TOverlays  = JSON.parse(editOverlaysJSON)

    for(const [id, overlay] of Object.entries(overlays)){
        native.setPedHeadOverlay(ped, +id, overlay.value, overlay.opacity)
    }
}