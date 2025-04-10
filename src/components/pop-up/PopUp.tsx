import { IoIosClose } from "react-icons/io";

interface Props {
    setPopUp: (value: boolean) => void
}
const PopUp = ({ setPopUp }: Props) => {
    return (
        <div className="fixed top-0 left-0 z-[1000] h-full w-full flex justify-center items-center p-5 bg-[#00000080] backdrop-blur-sm">
            <div className="bg-white max-w-[800px] rounded-[10px] p-5">
                <div className="flex justify-between items-center">
                    <p className="text-2xl">Instructions</p>
                    <IoIosClose
                        className="text-3xl text-rose-600 cursor-pointer"
                        onClick={() => setPopUp(false)}
                    />
                </div>

                <div className="mt-3">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic sapiente culpa, laboriosam natus in tempore assumenda fugiat, commodi, mollitia animi laudantium provident nesciunt excepturi recusandae nemo id blanditiis itaque repellat.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopUp