import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";
import {maleHairOverlays} from "../const/hairOverlays";

type THair = {
    hair: number;
    hairColor1: number;
    hairColor2: number;
};

export const editHairHandler = (ped: number | Ped | Player | LocalPlayer, editHairJSON: string) => {
    const hair: THair  = JSON.parse(editHairJSON)

    //const overlaysCollection = editor.sex === ESex.MALE ? maleHairOverlays : femaleHairOverlays
    const overlaysCollection = maleHairOverlays
    const collection = native.getHashKey(overlaysCollection[hair.hair].collection)
    const overlay = native.getHashKey(overlaysCollection[hair.hair].overlay)
    native.addPedDecorationFromHashes(ped, collection, overlay)
    native.setPedComponentVariation(ped, 2, hair.hair, 0, 0)
    native.setPedHairTint(ped, hair.hairColor1, hair.hairColor2) // !!! native.setPedHairColor
}