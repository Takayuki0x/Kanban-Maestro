import { useState } from "react";
import { Button } from "@nextui-org/react";
import { AcceptIcon } from "./Icons/AcceptIcon";

/**
 * Component for selecting a color for a column.
 * @param {Object} props - The component props.
 * @param {function} props.setColor - The function to set the selected color.
 * @param {string} props.defaultColor - The default color to be selected.
 * @returns {JSX.Element} - The color selector component.
 */
export default function ColumnColorSelector({ setColor, defaultColor }) {
    const [selectedColor, setSelectedColor] = useState(defaultColor ? defaultColor : "");

    /**
     * Handles the change of the selected color.
     * @param {string} color - The selected color.
     */
    const handleSelectedColorChange = (color) => {
        setSelectedColor(color);
        setColor(color);
    }

    return (
        <div className="flex flex-wrap">
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-red-400" onClick={() => handleSelectedColorChange("red")}>
                    {selectedColor === "red" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-blue-600" onClick={() => handleSelectedColorChange("blue")}>
                    {selectedColor == "blue" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-green-400" onClick={() => handleSelectedColorChange("green")}>
                    {selectedColor == "green" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-slate-400" onClick={() => handleSelectedColorChange("slate")}>
                    {selectedColor == "slate" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-orange-500" onClick={() => handleSelectedColorChange("orange")}>
                    {selectedColor == "orange" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-teal-500" onClick={() => handleSelectedColorChange("teal")}>
                    {selectedColor == "teal" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-violet-600" onClick={() => handleSelectedColorChange("violet")}>
                    {selectedColor == "violet" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-pink-500" onClick={() => handleSelectedColorChange("pink")}>
                    {selectedColor == "pink" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-cyan-400" onClick={() => handleSelectedColorChange("cyan")}>
                    {selectedColor == "cyan" ? <AcceptIcon /> : "" }
                </Button>
            </div>
            <div className="px-1">
                <Button size="sm" isIconOnly className="bg-rose-600" onClick={() => handleSelectedColorChange("rose")}>
                    {selectedColor == "rose" ? <AcceptIcon /> : "" }
                </Button>
            </div>
        </div>
    );
}
