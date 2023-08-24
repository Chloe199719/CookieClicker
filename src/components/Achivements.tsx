import Clicker from "@/app/lib/Cliker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import { NumberFormatter } from "@/app/lib/NumberFormater";

type Props = {
  game: Clicker;
  // setState: React.Dispatch<React.SetStateAction<boolean>>;
};
function Achievements({ game }: Props) {
  const numbers = NumberFormatter;
  return (
    <Sheet>
      <SheetTrigger>
        <div className="text-lg">Achievements</div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gray-700 max-h-screen overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>Achievements</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-6 gap-2 ">
          {game.getAchievementList().map((achievement) => {
            return (
              <HoverCard key={achievement.id}>
                <HoverCardTrigger
                  className={`${
                    achievement.acquired ? "bg-green-400" : "bg-red-300"
                  } flex justify-center items-center`}
                >
                  <Image
                    src={`/placeholder.png`}
                    alt="placeholder"
                    width={60}
                    height={60}
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-6 flex-col">
                    <div className="flex justify-between">
                      {" "}
                      <span>{achievement.name}</span>{" "}
                      <span
                        className={`${
                          achievement.acquired
                            ? "text-green-400"
                            : "text-red-300"
                        }`}
                      >
                        {achievement.acquired ? "Acquired" : "Not Acquired"}
                      </span>
                    </div>
                    <span>{achievement.description}</span>
                    <span>{numbers.format(achievement.condition)}</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default Achievements;
