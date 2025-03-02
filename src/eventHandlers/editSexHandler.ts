import {LocalPlayer, Ped, Player} from "alt-client";
import native from "natives";
import alt from "alt-client";
import {fModel, mModel} from "../const/models";

export enum ESex {
    FEMALE,
    MALE,
}

type TSex = {
    sex: ESex;
}
export const editSexHandler = (ped: number | Ped | Player | LocalPlayer, editSexJSON: string) => {
    const sex: TSex  = JSON.parse(editSexJSON)

    const modelNeeded = sex.sex === ESex.FEMALE ? fModel : mModel;
    if(modelNeeded !== native.getEntityModel(ped)){
        alt.log('Если при смене пола тебе пришлось читать это значит ошибка');
    }
}