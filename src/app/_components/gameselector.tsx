import { useAppContext } from "@/store/context";
import { useCallback, useEffect, useState } from "react";

export interface MenuProps {
  onSelectGame: (param: number) => void;
}

const baseStyle =
  "inline-block transform text-[0.9rem] -skew-x-12 px-3 py-2 mt-1 w-17 overflow-hidden font-bold border-2 focus:border-4 disabled:border-gray-600 disabled:text-gray-600 disabled:cursor-not-allowed";

export function GamePickerButtons({ onSelectGame: onSelectMatch }: MenuProps) {
  const { state } = useAppContext();
  const { scrim } = state.menu;
  const { games } = state.draft;

  const [currentMatch, setCurrentMatch] = useState(0);

  useEffect(() => {
    const latestMatch = games.findIndex((game) => game.winner === null);
    if (latestMatch >= 0) setCurrentMatch(latestMatch);
  }, [games]);

  const watchForSeriesWinner = useCallback(() => {
    const blueWins = games.filter(
      (game) => game.winner === "blue"
    ).length;
    const redWins = games.filter(
      (game) => game.winner === "red"
    ).length;

    if (
      (scrim &&
        blueWins > redWins &&
        blueWins >= Math.ceil(games.length / 2)) ||
      (redWins > blueWins && redWins >= Math.ceil(games.length / 2))
    ) {
      return games.filter((match) => match.winner !== null);
    } else return games;
  }, [scrim, games]);

  let pickerMatches = watchForSeriesWinner();
  
  return (
    <div className="flex gap-3 relative">
      {pickerMatches.map((game, index) => {
        const { game: gameIndex } = game
        const isDisabled = !scrim && index > currentMatch;

        const winnerStyle = () => {
          let styles;
          if (game.winner === "blue") {
            styles = `${baseStyle} border-blue-600 text-blue-600`;
          }
          if (game.winner === "red") {
            styles = `${baseStyle} border-red-600 text-red-600`;
          }
          if (game.winner === null) {
            styles = `${baseStyle} border-white text-white`;
          }
          return styles;
        };

        return (
          <button
            key={index}
            className={baseStyle + winnerStyle()}
            onClick={() => onSelectMatch(gameIndex)
            }
            autoFocus={index === 0}
            disabled={isDisabled}
          >
            {scrim ? "Game" : "Draft"} {game.game}
          </button>
        );
      })}
    </div>
  );
}

