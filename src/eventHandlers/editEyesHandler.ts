import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";
import {log} from 'alt-client'

type TEyes = {
    eyesColor: number;
    eyebrows: number;
    eyebrowsColor1: number;
};

export const editEyesHandler = (ped: number | Ped | Player | LocalPlayer, editEyesJSON: string) => {
    log(editEyesJSON)
    const eyes: TEyes  = JSON.parse(editEyesJSON)

    native.setHeadBlendEyeColor(ped, eyes.eyesColor);
    native.setPedHeadOverlay(ped, 2, eyes.eyebrows, 1);
    native.setPedHeadOverlayTint(ped, 2, 1, eyes.eyebrowsColor1, eyes.eyebrowsColor1);
}