import * as alt from 'alt-client';
import * as native from 'natives';
import { showCursor, WebView } from "alt-client";
import { freezeEntityPosition, setPlayerControl } from "natives";
import { ESex } from "./types/ESex";
import { femaleHairOverlays, maleHairOverlays } from "./const/hairOverlays";
const playerid = alt.Player.local;
let browserCharacter = null;
alt.onServer("s:c:createCharacter", async (characterJson) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');
    browserCharacter.focus();
    showCursor(true);
    const fModel = alt.hash('mp_f_freemode_01');
    const mModel = alt.hash(`mp_m_freemode_01`);
    const dimension = alt.defaultDimension;
    const pos = new alt.Vector3(0, 0, 71);
    const rot = alt.Vector3.zero;
    const useStreaming = true;
    const streamingDistance = 100;
    const ped = new alt.LocalPed(mModel, dimension, pos, rot, useStreaming, streamingDistance);
    await ped.waitForSpawn(5000);
    freezeEntityPosition(ped, true);
    freezeEntityPosition(playerid, true);
    setPlayerControl(playerid, false, undefined);
    browserCharacter.on("f:c:updateCharacter", (characterJson) => {
        const editor = JSON.parse(characterJson);
        alt.log(characterJson);
        native.clearPedBloodDamage(ped);
        native.clearPedDecorations(ped);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        const modelNeeded = editor.sex === ESex.FEMALE ? fModel : mModel;
        if (modelNeeded !== native.getEntityModel(ped)) {
            alt.log('Если при смене пола тебе пришлось читать это значит ошибка');
        }
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(ped, editor.appearance.faceFather, editor.appearance.faceMother, 0, editor.appearance.skinFather, editor.appearance.skinMother, 0, editor.appearance.faceMix, editor.appearance.skinMix, 0, false);
        for (let i = 0; i < editor.appearance.faceFeatures.length; i++) {
            const value = editor.appearance.faceFeatures[i];
            native.setPedMicroMorph(ped, i, value);
        }
        for (const [id, overlay] of Object.entries(editor.appearance.opacityOverlays)) {
            native.setPedHeadOverlay(ped, +id, overlay.value, overlay.opacity);
        }
        const overlaysCollection = editor.sex === ESex.MALE ? maleHairOverlays : femaleHairOverlays;
        const collection = native.getHashKey(overlaysCollection[editor.appearance.hair].collection);
        const overlay = native.getHashKey(overlaysCollection[editor.appearance.hair].overlay);
        native.addPedDecorationFromHashes(ped, collection, overlay);
        native.setPedComponentVariation(ped, 2, editor.appearance.hair, 0, 0);
        native.setPedHairTint(ped, editor.appearance.hairColor1, editor.appearance.hairColor2);
        native.setPedHeadOverlay(ped, 1, editor.appearance.facialHair, editor.appearance.facialHairOpacity);
        native.setPedHeadOverlayTint(ped, 1, 1, editor.appearance.facialHairColor1, editor.appearance.facialHairColor1);
        native.setPedHeadOverlay(ped, 2, editor.appearance.eyebrows, 1);
        native.setPedHeadOverlayTint(ped, 2, 1, editor.appearance.eyebrowsColor1, editor.appearance.eyebrowsColor1);
    });
});
