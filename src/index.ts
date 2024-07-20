import * as alt from 'alt-client';
import * as native from 'natives';
import {Player, showCursor, WebView} from "alt-client";
import {freezeEntityPosition} from "natives";

let browserCharacter: WebView = null;
const playerid = Player.local;

alt.onServer("s:c:createCharacter", (characterJson: string) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');

    browserCharacter.focus()
    showCursor(true)
    freezeEntityPosition(playerid, true);

    browserCharacter.on("f:c:createCharacter", (characterJson: string) => {
        alt.log(characterJson);
        alt.emitServer("c:s:createCharacter", characterJson);
    })
})