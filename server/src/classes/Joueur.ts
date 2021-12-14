import { Symbole } from './Case'

export default class Joueur {
  nom; symbole: Symbole;
  constructor(nom: string, num: 0 | 1) {
    this.nom = nom;
    const symboles: Symbole[] = ["O", "\u262b"];
    this.symbole = symboles[num];
  }
}