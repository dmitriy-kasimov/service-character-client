import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";
import {maleHairOverlays} from "../const/hairOverlays";
import {log} from 'alt-client';

type THair = {
    hair: number;
    hairColor1: number;
    hairColor2: number;
    eyebrows: number;
    eyebrowsColor1: number;
};

export const editHairHandler = (ped: number | Ped | Player | LocalPlayer, editHairJSON: string) => {
    const hair: THair  = JSON.parse(editHairJSON)
    log('editHairHandler was called with next data: ')
    log(hair)

    //const overlaysCollection = editor.sex === ESex.MALE ? maleHairOverlays : femaleHairOverlays
    const overlaysCollection = maleHairOverlays
    const collection = native.getHashKey(overlaysCollection[hair.hair].collection)
    const overlay = native.getHashKey(overlaysCollection[hair.hair].overlay)
    native.addPedDecorationFromHashes(ped, collection, overlay)
    native.setPedComponentVariation(ped, 2, hair.hair, 0, 0)
    native.setPedHairTint(ped, hair.hairColor1, hair.hairColor2) // !!! native.setPedHairColor

    native.setPedHeadOverlay(ped, 2, hair.eyebrows, 1);
    native.setPedHeadOverlayTint(ped, 2, 1, hair.eyebrowsColor1, hair.eyebrowsColor1);
}