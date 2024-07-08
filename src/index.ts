import * as alt from 'alt-client';
import * as native from 'natives';
import {WebView} from "alt-client";

let browserCharacter: WebView = null;
const playerid = alt.Player.local;

alt.onServer("ServiceCharacter:s:ServiceCharacter:c:createCharacter", (characterJson: string) => {
    browserCharacter = new WebView('http://resource/frontend/index.html');
    browserCharacter.focus()

})