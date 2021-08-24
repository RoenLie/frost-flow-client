// file entities.ts

import { injectable, inject, multiInject } from "inversify";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { TYPES } from "./types";

@injectable()
class Katana implements Weapon {
   public hit() {
      return "cut!";
   }
}

@injectable()
class Hammer implements Weapon {
   public hit() {
      return "Smash!";
   }
}

@injectable()
class Shuriken implements ThrowableWeapon {
   public throw() {
      return "hit!";
   }
}

@injectable()
class Ninja implements Warrior {

   private _katana: Weapon;
   private _shuriken: ThrowableWeapon;

   public constructor (
      @inject( TYPES.Weapon ) katana: Weapon,
      @inject( TYPES.ThrowableWeapon ) shuriken: ThrowableWeapon
   ) {
      this._katana = katana;
      this._shuriken = shuriken;
   }

   public fight() { return this._katana.hit(); }
   public sneak() { return this._shuriken.throw(); }

}

@injectable()
class Berserker implements Warrior {
   public Mainhand: Weapon;
   public Offhand: Weapon;
   public constructor (
      @multiInject( "Weapon" ) weapons: Weapon[]
   ) {
      this.Mainhand = weapons[ 0 ];
      this.Offhand = weapons[ 1 ];
   }
   fight(): string {
      return this.Mainhand.hit() + ' ' + this.Offhand.hit();
   }
   sneak(): string {
      return 'berserker is attempting to sneak';
   }
}

// alternative with property injectors
// @injectable()
// class Ninja implements Warrior {
//     @inject(TYPES.Weapon) private _katana: Weapon;
//     @inject(TYPES.ThrowableWeapon) private _shuriken: ThrowableWeapon;
//     public fight() { return this._katana.hit(); }
//     public sneak() { return this._shuriken.throw(); }
// }


export { Ninja, Berserker, Katana, Hammer, Shuriken };
