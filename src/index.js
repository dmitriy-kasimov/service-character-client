import * as alt from 'alt-client';
import { showCursor, WebView } from "alt-client";
import { freezeEntityPosition } from "natives";
import { editFaceFeaturesHandler } from "./eventHandlers/editFaceFeaturesHandler";
import { editFacialHairHandler } from "./eventHandlers/editFacialHairHandler";
import { editHairHandler } from "./eventHandlers/editHairHandler";
import { editInheritanceHandler } from "./eventHandlers/editInheritanceHandler";
import { editOverlaysHandler } from "./eventHandlers/editOverlaysHandler";
import { editSexHandler } from "./eventHandlers/editSexHandler";
import { mModel } from "./const/models";
let browserCharacter = null;
alt.onServer("s:c:createCharacter", async (characterJson) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');
    browserCharacter.focus();
    showCursor(true);
    const dimension = alt.defaultDimension;
    const pos = new alt.Vector3(0, 0, 71);
    const rot = alt.Vector3.zero;
    const useStreaming = true;
    const streamingDistance = 100;
    const ped = new alt.LocalPed(mModel, dimension, pos, rot, useStreaming, streamingDistance);
    await ped.waitForSpawn(5000);
    freezeEntityPosition(ped, true);
    browserCharacter.on('f:c:editFaceFeatures', (response) => editFaceFeaturesHandler(ped, response));
    browserCharacter.on('f:c:editFacialHair', (response) => editFacialHairHandler(ped, response));
    browserCharacter.on('f:c:editHair', (response) => editHairHandler(ped, response));
    browserCharacter.on('f:c:editInheritance', (response) => editInheritanceHandler(ped, response));
    browserCharacter.on('f:c:editOverlays', (response) => editOverlaysHandler(ped, response));
    browserCharacter.on('f:c:editSex', (response) => editSexHandler(ped, response));
});
