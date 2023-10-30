import { useAppContext } from "@/store/context";
import { type Game } from "@/store/types";

export interface MenuProps {
  games: Game[];
  onSelectMatch: (param: number) => void;
}

const baseStyle =
  "inline-block transform text-[0.9rem] -skew-x-12 px-3 py-2 mt-1 w-17 overflow-hidden font-bold disabled:border-gray-600 disabled:text-gray-600 disabled:cursor-not-allowed";

export function GamePickerButtons({ games, onSelectMatch }: MenuProps) {
  const { state } = useAppContext();
  const { scrim, game: menuGame } = state.menu;
  const stage = !scrim;

  return (
    <div className="relative flex gap-3">
      {games.map((game, index) => {
        const { game: gameIndex } = game;
        const isDisabled =
          stage && index > 0 && games[index - 1]!.winner === "none";
        const isCurrentGame = () => {
          let styles;
          if (game.game === menuGame) {
            styles = "border-4";
          } else {
            styles = "border-[1px]";
          }
          return styles;
        };

        const winnerStyle = () => {
          let styles;
          if (game.winner === "blue") {
            styles = `${baseStyle} border-blue-600 text-blue-600`;
          }
          if (game.winner === "red") {
            styles = `${baseStyle} border-red-600 text-red-600`;
          }
          if (game.winner === "none") {
            styles = `${baseStyle} border-white text-white`;
          }
          return styles;
        };

        return (
          <button
            key={index}
            className={`${baseStyle}
               ${winnerStyle()}
               ${isCurrentGame()}
              `}
            onClick={() => onSelectMatch(gameIndex)}
            autoFocus={index === 0}
            disabled={isDisabled}
            id={`game-${gameIndex}-selector`}
          >
            {scrim ? "Game" : "Draft"} {game.game}
          </button>
        );
      })}
    </div>
  );
}
