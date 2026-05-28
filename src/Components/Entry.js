import React from "react";
import "./Entry.css";
import pokeball from "./pkball.png";

const TYPE_COLORS = {
  normal: "#A8A878",  fire: "#f08030",   fighting: "#c03028",
  water: "#6890f0",   flying: "#a890f0", grass: "#78c850",
  poison: "#a040a0",  electric: "#f8d030", ground: "#e0c068",
  psychic: "#f85888", rock: "#b8a038",   ice: "#98D8D8",
  bug: "#A8B820",     dragon: "#7038F8", ghost: "#705898",
  dark: "#705848",    steel: "#b8b8d0",  fairy: "#ee99ac",
};

// Persist across every mount/unmount — switching gens never re-fetches
const pokemonCache = new Map();
const speciesCache = new Map();

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this.observer = null;
    this.state = {
      name: "",
      // Show the sprite immediately from the CDN — no API call required
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`,
      type1: "", type2: "",
      type1Color: { background: "#1a2a4a" },
      type2Color: { background: "#1a2a4a" },
      flavor_text: "",
      weight: 0, height: 0,
      stat_hp: 0, stat_atk: 0, stat_def: 0,
      stat_sp_atk: 0, stat_sp_def: 0, stat_spd: 0,
      abilities: [],
      flipped: false,
      speciesLoaded: false,
    };
    this.toggleFlip = this.toggleFlip.bind(this);
  }

  componentDidMount() {
    // If already cached, apply immediately — no observer needed
    if (pokemonCache.has(this.props.id)) {
      this.applyPokemonData(pokemonCache.get(this.props.id));
      return;
    }
    // Otherwise defer the fetch until the card enters the viewport
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.loadPokemonData();
          this.observer.disconnect();
          this.observer = null;
        }
      },
      { rootMargin: "300px" } // start loading 300px before visible
    );
    if (this.cardRef.current) this.observer.observe(this.cardRef.current);
  }

  componentWillUnmount() {
    if (this.observer) { this.observer.disconnect(); this.observer = null; }
  }

  loadPokemonData() {
    const { id } = this.props;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(r => r.json())
      .then(data => { pokemonCache.set(id, data); this.applyPokemonData(data); })
      .catch(() => {});
  }

  applyPokemonData(data) {
    const t1 = data.types[0].type.name;
    const t2 = data.types[1]?.type.name ?? "";
    this.setState({
      name:        data.name,
      sprite:      data.sprites.front_default || this.state.sprite,
      type1: t1,   type2: t2,
      weight:      data.weight,
      height:      data.height,
      stat_hp:     data.stats[0].base_stat,
      stat_atk:    data.stats[1].base_stat,
      stat_def:    data.stats[2].base_stat,
      stat_sp_atk: data.stats[3].base_stat,
      stat_sp_def: data.stats[4].base_stat,
      stat_spd:    data.stats[5].base_stat,
      abilities:   data.abilities.map(a => ({
        name: a.ability.name.replace(/-/g, " "),
        isHidden: a.is_hidden,
      })),
      type1Color: { background: TYPE_COLORS[t1] ?? "#334466" },
      type2Color: { background: TYPE_COLORS[t2] ?? "#334466" },
    });
  }

  loadSpeciesData() {
    const { id } = this.props;
    if (speciesCache.has(id)) { this.applySpeciesData(speciesCache.get(id)); return; }
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(r => r.json())
      .then(data => { speciesCache.set(id, data); this.applySpeciesData(data); })
      .catch(() => {});
  }

  applySpeciesData(data) {
    const entry = data.flavor_text_entries.find(e => e.language.name === "en");
    if (entry) this.setState({
      flavor_text: entry.flavor_text.replace(/[\f\n]/g, " "),
      speciesLoaded: true,
    });
  }

  toggleFlip() {
    if (window.getSelection().toString()) return;
    // Fetch species data the first time the card is flipped
    if (!this.state.flipped && !this.state.speciesLoaded) this.loadSpeciesData();
    this.setState(prev => ({ flipped: !prev.flipped }));
  }

  // Level 100, 252 EVs, 31 IVs, neutral nature
  calcStat(base, isHp = false) {
    if (!base) return "—";
    return isHp ? 2 * base + 204 : 2 * base + 99;
  }

  render() {
    const {
      name, sprite, type1, type2, type1Color, type2Color,
      weight, height, flavor_text, abilities, flipped,
      stat_hp, stat_atk, stat_def, stat_sp_atk, stat_sp_def, stat_spd,
    } = this.state;
    const bst = stat_hp + stat_atk + stat_def + stat_sp_atk + stat_sp_def + stat_spd;

    return (
      <div
        className="my-container"
        data-gen={this.props.gen}
        ref={this.cardRef}
        onClick={this.toggleFlip}
      >
        <div className={`flip-inner${flipped ? " flipped" : ""}`}>

          {/* ── FRONT ── */}
          <div className="flip-front">
            <img className="portrait" src={sprite} alt={name} />
            <p className="id">#{this.props.id}</p>
            <p className="Name" id={this.props.gen}>{name}</p>

            <span className="types">
              <p className="type12" style={type1Color}>{type1}</p>
              {type2 && <p className="type12" style={type2Color}>{type2}</p>}
            </span>

            <span className="height-weight">
              {weight ? <p id="weight">⚖ {(weight / 10).toFixed(1)} kg</p> : null}
              {height ? <p id="height">↕ {(height / 10).toFixed(1)} m</p> : null}
            </span>

            <div className="moreStats">
              <p className="val"><span>HP</span>{stat_hp || "—"}</p>
              <p className="val"><span>ATK</span>{stat_atk || "—"}</p>
              <p className="val"><span>DEF</span>{stat_def || "—"}</p>
              <p className="val"><span>SP.ATK</span>{stat_sp_atk || "—"}</p>
              <p className="val"><span>SP.DEF</span>{stat_sp_def || "—"}</p>
              <p className="val"><span>SPD</span>{stat_spd || "—"}</p>
            </div>

            <p className="flip-hint">Tap to flip ▸</p>
          </div>

          {/* ── BACK ── */}
          <div className="flip-back">
            <div className="back-content">
              <p className="Name back-name" id={this.props.gen}>{name}</p>

              <p className="back-label">Pokédex Entry</p>
              <p className="back-flavor">{flavor_text || "Loading…"}</p>

              <p className="back-label">Abilities</p>
              <div className="abilities-list">
                {abilities.map(a => (
                  <span key={a.name} className={`ability-badge${a.isHidden ? " hidden-ability" : ""}`}>
                    {a.name}{a.isHidden ? " ✦" : ""}
                  </span>
                ))}
              </div>

              <p className="back-label">Level 100 · Max EVs · 31 IVs</p>
              <div className="l100-grid">
                <div className="l100-row"><span className="l100-label">HP</span><span className="l100-val">{this.calcStat(stat_hp, true)}</span></div>
                <div className="l100-row"><span className="l100-label">ATK</span><span className="l100-val">{this.calcStat(stat_atk)}</span></div>
                <div className="l100-row"><span className="l100-label">DEF</span><span className="l100-val">{this.calcStat(stat_def)}</span></div>
                <div className="l100-row"><span className="l100-label">SP. ATK</span><span className="l100-val">{this.calcStat(stat_sp_atk)}</span></div>
                <div className="l100-row"><span className="l100-label">SP. DEF</span><span className="l100-val">{this.calcStat(stat_sp_def)}</span></div>
                <div className="l100-row"><span className="l100-label">SPD</span><span className="l100-val">{this.calcStat(stat_spd)}</span></div>
                <div className="l100-row bst-row"><span className="l100-label">BST</span><span className="l100-val">{bst || "—"}</span></div>
              </div>

              <a
                href={"https://pokemondb.net/pokedex/" + name}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <img className="tinyPK" src={pokeball} alt="pokeball" />
              </a>
              <p className="flip-hint">◂ Tap to flip back</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Entry;
