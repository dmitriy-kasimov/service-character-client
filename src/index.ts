import * as alt from 'alt-client';
import * as native from 'natives';
import {Player, showCursor, WebView} from "alt-client";
import {
    freezeEntityPosition, setPlayerControl
} from "natives";

import {TEditAppearance} from "./types/TEditAppearance";
import {ESex} from "./types/ESex";
const playerid = alt.Player.local
let browserCharacter: WebView = null;

alt.onServer("s:c:createCharacter", async (characterJson: string) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');

    browserCharacter.focus()
    showCursor(true)
    //freezeEntityPosition(playerid, true);

    const fModel = alt.hash('mp_f_freemode_01');
    const mModel = alt.hash(`mp_m_freemode_01`);

    const dimension = alt.defaultDimension; // 0 dimension
    const pos = new alt.Vector3(0, 0, 71);

    const rot = alt.Vector3.zero;
    const useStreaming = true;
    const streamingDistance = 100; // customize for your needs

    const ped = new alt.LocalPed(mModel, dimension, pos, rot, useStreaming, streamingDistance);

    await ped.waitForSpawn(5000);
    freezeEntityPosition(ped, true);
    freezeEntityPosition(playerid, true);
    setPlayerControl(playerid, false, undefined)

    
    browserCharacter.on("f:c:updateCharacter", (characterJson: string) => {
        const editor: TEditAppearance = JSON.parse(characterJson);
        alt.log(editor);

        native.clearPedBloodDamage(ped);
        native.clearPedDecorations(ped);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);


        const modelNeeded = editor.sex === ESex.FEMALE ? fModel : mModel;
        if(modelNeeded !== native.getEntityModel(ped)){
            alt.log('Если при смене пола тебе пришлось читать это значит ошибка');
        }

        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(
            ped,
            editor.appearance.faceFather,
            editor.appearance.faceMother,
            0,
            editor.appearance.skinFather,
            editor.appearance.skinMother,
            0,
            editor.appearance.faceMix,
            editor.appearance.skinMix,
            0,
            false
        );

        // More on that below
        //alt.Utils.assert(ped.scriptID !== 0);
        // Copying appearance, clothes etc. of player to the ped
        //native.clonePedToTarget(playerid, ped);

        // setPedHeadBlendData(ped,
        //     character.Appearance.HeadBlendData.ShapeFirstID, // face Father
        //     character.Appearance.HeadBlendData.ShapeSecondID, // face Mother
        //     0, //character.Appearance.HeadBlendData.ShapeThirdID,
        //     character.Appearance.HeadBlendData.SkinFirstID, // skin Father
        //     character.Appearance.HeadBlendData.SkinSecondID, // skin Mother
        //     0, //character.Appearance.HeadBlendData.SkinThirdID,
        //     character.Appearance.HeadBlendData.ShapeMix, // face mix
        //     character.Appearance.HeadBlendData.SkinMix, // skin mix
        //     0, //character.Appearance.HeadBlendData.ThirdMix,
        //     false
        // );
        // setHeadBlendPaletteColor(ped,
        //     character.Appearance.HeadBlendPaletteColor.r,
        //     character.Appearance.HeadBlendPaletteColor.g,
        //     character.Appearance.HeadBlendPaletteColor.b,
        //     0
        // );
        // setPedMicroMorph(ped,
        //     character.Appearance.FaceFeature.index,
        //     character.Appearance.FaceFeature.scale,
        //     );
        // setPedHeadOverlay(ped,
        //     character.Appearance.HeadOverlay.overlayID,
        //     character.Appearance.HeadOverlay.index,
        //     character.Appearance.HeadOverlay.opacity,
        //     );
        // setPedHeadOverlayTint(ped,
        //     character.Appearance.HeadOverlayColor.overlayID,
        //     character.Appearance.HeadOverlayColor.colorType,
        //     character.Appearance.HeadOverlayColor.colorIndex,
        //     character.Appearance.HeadOverlayColor.secondColorIndex,
        //     );
        // setHeadBlendEyeColor(ped, character.Appearance.EyeColor.index);
        // setPedHairTint(ped, character.Appearance.HairColor.colorID, character.Appearance.HairColor.highlightColorID);
        //
        //
        // setPedDlcClothes(ped.scriptID, 0, character.Clothes.Component,character.Clothes.Drawable,character.Clothes.Texture, character.Clothes.Palette)
        //
        // setPedDlcProp(ped.scriptID, 0, character.Props.Component, character.Props.Drawable, character.Props.Texture);
        //
        // alt.log(characterJson);
        //alt.emitServer("c:s:createCharacter", characterJson);
    })
})