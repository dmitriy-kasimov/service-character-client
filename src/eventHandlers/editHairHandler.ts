import {LocalPed} from "alt-client";
import native from "natives";
import {femaleHairOverlays, maleHairOverlays} from "../const/hairOverlays";
import {mModel} from "../const/models";

type THair = {
    hair: number;
    hairColor1: number;
    hairColor2: number;
};

export const editHairHandler = (ped: LocalPed, editHairJSON: string) => {
    const hair: THair  = JSON.parse(editHairJSON)

    const overlaysCollection = ped.model === mModel ? maleHairOverlays : femaleHairOverlays
    //const overlaysCollection = editor.sex === ESex.MALE ? maleHairOverlays : femaleHairOverlays
    const collection = native.getHashKey(overlaysCollection[hair.hair].collection)
    const overlay = native.getHashKey(overlaysCollection[hair.hair].overlay)
    native.addPedDecorationFromHashes(ped, collection, overlay)
    native.setPedComponentVariation(ped, 2, hair.hair, 0, 0)
    native.setPedHairTint(ped, hair.hairColor1, hair.hairColor2) // !!! native.setPedHairColor
}