import { TAppearance } from './TAppearance';
import { ESex } from './ESex';
import { EPreset } from './EPreset';

export type TEditAppearance = {
    appearance: TAppearance;
    sex: ESex;
    preset: EPreset | null;
};
