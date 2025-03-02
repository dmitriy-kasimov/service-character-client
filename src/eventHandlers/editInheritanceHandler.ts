import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";

export type TInheritance = {
    faceFather: number;
    skinFather: number;
    faceMother: number;
    skinMother: number;
    faceMix: number;
    skinMix: number;
};

export const editInheritanceHandler = (ped: number | Ped | Player | LocalPlayer, editInheritanceJSON: string) => {
    const inheritance: TInheritance  = JSON.parse(editInheritanceJSON)

    native.setPedHeadBlendData(
        ped,
        inheritance.faceFather,
        inheritance.faceMother,
        0,
        inheritance.skinFather,
        inheritance.skinMother,
        0,
        inheritance.faceMix,
        inheritance.skinMix,
        0,
        false
    );
}