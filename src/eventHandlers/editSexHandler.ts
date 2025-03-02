import { LocalPed, log} from "alt-client";
import native from "natives";
import alt from "alt-client";
import {fModel, mModel} from "../const/models";

export enum ESex {
    FEMALE,
    MALE,
}


export const editSexHandler = (ped: LocalPed, editSexJSON: string) => {
    const sex: ESex  = JSON.parse(editSexJSON)

    if(sex === ESex.FEMALE){
        ped.model = fModel
        native.setPedComponentVariation(ped, 3, 15, 0, 0); // arms
        native.setPedComponentVariation(ped, 4, 14, 0, 0); // pants
        native.setPedComponentVariation(ped, 6, 35, 0, 0); // shoes
        native.setPedComponentVariation(ped, 8, 15, 0, 0); // shirt
        native.setPedComponentVariation(ped, 11, 15, 0, 0); // torso
    } else {
        ped.model = mModel
        native.setPedComponentVariation(ped, 3, 15, 0, 0); // arms
        native.setPedComponentVariation(ped, 4, 14, 0, 0); // pants
        native.setPedComponentVariation(ped, 6, 34, 0, 0); // shoes
        native.setPedComponentVariation(ped, 8, 15, 0, 0); // shirt
        native.setPedComponentVariation(ped, 11, 91, 0, 0); // torso
    }
}