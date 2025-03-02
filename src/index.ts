import * as alt from 'alt-client';
import * as native from 'natives';
import {Player, showCursor, WebView} from "alt-client";
import {
    freezeEntityPosition, setPlayerControl
} from "natives";

import {editFaceFeaturesHandler} from "./eventHandlers/editFaceFeaturesHandler";
import {editFacialHairHandler} from "./eventHandlers/editFacialHairHandler";
import {editHairHandler} from "./eventHandlers/editHairHandler";
import {editInheritanceHandler} from "./eventHandlers/editInheritanceHandler";
import {editOverlaysHandler} from "./eventHandlers/editOverlaysHandler";
import {editSexHandler} from "./eventHandlers/editSexHandler";
import {mModel} from "./const/models";
import {editEyesHandler} from "./eventHandlers/editEyesHandler";
import {editColorOverlaysHandler} from "./eventHandlers/editColorOverlaysHandler";

let browserCharacter: WebView = null;

alt.onServer("s:c:createCharacter", async (characterJson: string) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');

    browserCharacter.focus()
    showCursor(true)
    //freezeEntityPosition(playerid, true);

    const dimension = alt.defaultDimension; // 0 dimension
    const pos = new alt.Vector3(0, 0, 71);

    const rot = alt.Vector3.zero;
    const useStreaming = true;
    const streamingDistance = 100; // customize for your needs

    const ped = new alt.LocalPed(mModel, dimension, pos, rot, useStreaming, streamingDistance);
    await ped.waitForSpawn(5000);
    freezeEntityPosition(ped, true);
    native.setPedComponentVariation(ped, 3, 15, 0, 0); // arms
    native.setPedComponentVariation(ped, 4, 14, 0, 0); // pants
    native.setPedComponentVariation(ped, 6, 34, 0, 0); // shoes
    native.setPedComponentVariation(ped, 8, 15, 0, 0); // shirt
    native.setPedComponentVariation(ped, 11, 91, 0, 0); // torso

    browserCharacter.on('f:c:editFaceFeatures', (response: string) => editFaceFeaturesHandler(ped, response))
    browserCharacter.on('f:c:editFacialHair', (response: string) => editFacialHairHandler(ped, response))
    browserCharacter.on('f:c:editHair', (response: string) => editHairHandler(ped, response))
    browserCharacter.on('f:c:editInheritance', (response: string) => editInheritanceHandler(ped, response))
    browserCharacter.on('f:c:editOverlays', (response: string) => editOverlaysHandler(ped, response))
    browserCharacter.on('f:c:editColorOverlays', (response: string) => editColorOverlaysHandler(ped, response))
    browserCharacter.on('f:c:editSex', (response: string) => editSexHandler(ped, response))
    browserCharacter.on('f:c:editEyes', (response: string) => editEyesHandler(ped, response))
})