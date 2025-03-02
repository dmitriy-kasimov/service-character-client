import {setPedMicroMorph} from 'natives';
import {LocalPlayer, Ped, Player} from "alt-client";

type TFaceFeatures = Record<number, number>

export const editFaceFeaturesHandler = (ped: number | Ped | Player | LocalPlayer, faceFeaturesJSON: string) => {
    const faceFeaturesResponse: TFaceFeatures  = JSON.parse(faceFeaturesJSON)
    const faceFeatures = Object.entries(faceFeaturesResponse)

    for(const [faceFeatureIndex, faceFeatureValue] of faceFeatures){
        setPedMicroMorph(ped, +faceFeatureIndex, faceFeatureValue)
    }
}