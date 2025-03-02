import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";

type TFacialHair = {
    facialHair: number;
    facialHairOpacity: number;
    facialHairColor1: number;
};

export const editFacialHairHandler = (ped: number | Ped | Player | LocalPlayer, editFacialHairJSON: string) => {
    const facialHair: TFacialHair  = JSON.parse(editFacialHairJSON)

    native.setPedHeadOverlay(ped, 1, facialHair.facialHair,  facialHair.facialHairOpacity)
    native.setPedHeadOverlayTint(ped, 1, 1,  facialHair.facialHairColor1,  facialHair.facialHairColor1)// !!! setPedHeadOverlayColor

}