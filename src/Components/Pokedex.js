import React from "react";
import "./Pokedex.css";
import Entry from "./Entry";
import Title from "./Title";

const BATCH = 20; // cards to reveal per scroll step

const GEN_DATA = {
  1: { gen: "Gen1", region: "Kanto",  start: 1,   end: 152  },
  2: { gen: "Gen2", region: "Johto",  start: 152,  end: 252  },
  3: { gen: "Gen3", region: "Hoenn",  start: 252,  end: 387  },
  4: { gen: "Gen4", region: "Sinnoh", start: 387,  end: 495  },
  5: { gen: "Gen5", region: "Unova",  start: 495,  end: 650  },
  6: { gen: "Gen6", region: "Kalos",  start: 650,  end: 722  },
  7: { gen: "Gen7", region: "Alola",  start: 722,  end: 810  },
  8: { gen: "Gen8", region: "Galar",  start: 810,  end: 906  },
  9: { gen: "Gen9", region: "Paldea", start: 906,  end: 1026 },
};

function buildArray(start, end) {
  const arr = [];
  for (let i = start; i < end; i++) arr.push(i);
  return arr;
}

class Pokedex extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.sentinelRef = React.createRef();
    this.scrollObserver = null;

    this.state = {
      pokemonarray: [],
      gen: "Gen1",
      region: "Kanto",
      visibleCount: BATCH,
    };
  }

  // ── Lifecycle ──────────────────────────────────────────────

  componentDidMount() {
    const pick = Math.floor(Math.random() * 9) + 1;
    const { gen, region, start, end } = GEN_DATA[pick];
    this.setState({
      pokemonarray: buildArray(start, end),
      gen, region,
      visibleCount: BATCH,
    }, this.setupScrollObserver);
  }

  componentDidUpdate(_, prevState) {
    // Re-attach observer whenever the pokemon list or visible window changes
    if (prevState.pokemonarray !== this.state.pokemonarray) {
      this.setupScrollObserver();
    }
  }

  componentWillUnmount() {
    this.teardownScrollObserver();
  }

  // ── Infinite scroll ────────────────────────────────────────

  setupScrollObserver() {
    this.teardownScrollObserver();

    this.scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.setState(prev => {
          if (prev.visibleCount >= prev.pokemonarray.length) return null;
          return { visibleCount: Math.min(prev.visibleCount + BATCH, prev.pokemonarray.length) };
        });
      },
      { rootMargin: "400px" } // preload next batch before user hits the bottom
    );

    if (this.sentinelRef.current) {
      this.scrollObserver.observe(this.sentinelRef.current);
    }
  }

  teardownScrollObserver() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
      this.scrollObserver = null;
    }
  }

  // ── Gen switching ──────────────────────────────────────────

  handleClick(genNum) {
    const { gen, region, start, end } = GEN_DATA[genNum];
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({
      pokemonarray: buildArray(start, end),
      gen, region,
      visibleCount: BATCH,
    });
  }

  // ── Render ─────────────────────────────────────────────────

  render() {
    const { pokemonarray, visibleCount, gen, region } = this.state;
    const visible = pokemonarray.slice(0, visibleCount);
    const remaining = pokemonarray.length - visibleCount;
    const hasMore = remaining > 0;

    return (
      <div>
        <Title gen={gen} region={region} />

        <div className="Generations">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button
              key={n}
              className={`btn-gen${n}`}
              onClick={this.handleClick.bind(this, n)}
            >
              Gen {n}
            </button>
          ))}
        </div>

        <div className="row main-row">
          {visible.map(id => (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={id}>
              <Entry id={id} gen={gen} />
            </div>
          ))}
        </div>

        {/* Sentinel — observed to trigger the next batch */}
        <div ref={this.sentinelRef} className="scroll-sentinel">
          {hasMore
            ? <p className="load-indicator">↓ {remaining} more to load</p>
            : pokemonarray.length > 0 && (
                <p className="load-indicator load-complete">
                  All {pokemonarray.length} Pokémon loaded
                </p>
              )
          }
        </div>
      </div>
    );
  }
}

export default Pokedex;
