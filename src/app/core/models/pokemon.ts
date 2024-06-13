
export interface Stats {
    hp:number;
    attack:number;
    defense:number;
    sp_attack:number;
    sp_defense:number;
    speed:number;
}

export interface Pokemon{
    id:string;
    name:string;
    pknum:number,
    weight:string;
    height:string;
    image_url:string
    category:string,
    abilities:string[]
    types:string[]
    stats:Stats
}

export interface ResponsePokemons{
    status:number;
    body: {
        pokemons: Pokemon[];
    };
}
export interface ResponsePokemon{
    status:number;
    body:Pokemon;
}

export  interface PokemonsStatic{

    number:string,
    name:string
    
}