export interface FormatPokemonLocal {
  name: string;
  id: number;
  height: number;
  abilities: string[];
  image_default: string;
  image_gif?: string;
  weight: number;
}

export interface FormatAbilityLocal {
  name: string;
}