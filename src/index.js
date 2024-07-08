import * as alt from 'alt-client';
import { WebView } from "alt-client";
let browserCharacter = null;
const playerid = alt.Player.local;
alt.onServer("ServiceCharacter:s:ServiceCharacter:c:createCharacter", (characterJson) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');
    browserCharacter.focus();
});
