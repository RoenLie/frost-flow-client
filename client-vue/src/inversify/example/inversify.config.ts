// file inversify.config.ts

import { Container } from "inversify";
import { TYPES } from "./types";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces";
import { Ninja, Katana, Shuriken, Hammer, Berserker } from "./entities";

const myContainer = new Container();
myContainer.bind<Warrior>( TYPES.Warrior ).to( Ninja );
myContainer.bind<Weapon>( TYPES.Weapon ).to( Katana );
myContainer.bind<Weapon>( "Weapon" ).to( Katana );
myContainer.bind<Weapon>( "Weapon" ).to( Hammer );
myContainer.bind<Warrior>( "Warrior" ).to( Berserker );
myContainer.bind<ThrowableWeapon>( TYPES.ThrowableWeapon ).to( Shuriken );

export { myContainer };