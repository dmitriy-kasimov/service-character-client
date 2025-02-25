import * as alt from 'alt-client';
import * as native from 'natives';
import { showCursor, WebView } from "alt-client";
import { freezeEntityPosition, setPlayerControl } from "natives";
import { ESex } from "./types/ESex";
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
        native.clearPedBloodDamage(ped);
        native.clearPedDecorations(ped);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        const modelNeeded = editor.sex === ESex.FEMALE ? fModel : mModel;
        if (modelNeeded !== native.getEntityModel(ped)) {
            alt.log('Если при смене пола тебе пришлось читать это значит ошибка');
        }
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(ped, editor.appearance.faceFather, editor.appearance.faceMother, 0, editor.appearance.skinFather, editor.appearance.skinMother, 0, editor.appearance.faceMix, editor.appearance.skinMix, 0, false);
        alt.log(editor.appearance.faceFeatures);
        for (let i = 0; i < editor.appearance.faceFeatures.length; i++) {
            const value = editor.appearance.faceFeatures[i];
            native.setPedMicroMorph(ped, i, value);
        }
    });
});
