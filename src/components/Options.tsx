import Clicker from "@/app/lib/Cliker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  game: Clicker;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
function Options({ game, setState }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="text-lg">Options</div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-700 w-96">
        <SheetHeader>
          <SheetTitle>Options</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col">
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 100 });
              setState((prevState) => !prevState);
            }}
          >
            Add 100 (dev Only)
          </button>{" "}
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 1000 });
              setState((prevState) => !prevState);
            }}
          >
            Add 1000 (dev Only){" "}
          </button>
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 10000 });
              setState((prevState) => !prevState);
            }}
          >
            Add 10000 (dev Only){" "}
          </button>
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 100000 });
              setState((prevState) => !prevState);
            }}
          >
            Add 100000 (dev Only){" "}
          </button>
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 1000000 });
              setState((prevState) => !prevState);
            }}
          >
            Add 1000000 (dev Only){" "}
          </button>
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({ cookies: 100000000 });
              setState((prevState) => !prevState);
            }}
          >
            Add 100000000 (dev Only){" "}
          </button>
          <button
            className="p2 px-3 bg-red-400 "
            onClick={() => {
              game.devModeIncreaseResource({
                cookies: 100_000_000_000_000_000,
              });
              setState((prevState) => !prevState);
            }}
          >
            Add 100000000000000 (dev Only){" "}
          </button>
          <button
            onClick={() => {
              localStorage.setItem("save", JSON.stringify(game.SaveGame()));
            }}
          >
            Save (unstable)
          </button>
          <button
            onClick={() => {
              let x = JSON.parse(localStorage.getItem("save")!);
              game.LoadGame(x);
            }}
          >
            Load (unstable)
          </button>
          <button
            onClick={() => {
              game.resetGame();
            }}
          >
            Reset game
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default Options;
