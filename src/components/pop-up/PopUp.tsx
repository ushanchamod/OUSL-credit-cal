import { IoIosClose } from "react-icons/io";

interface Props {
    setPopUp: (value: boolean) => void;
}

const PopUp = ({ setPopUp }: Props) => {
    return (
        <div className="fixed top-0 left-0 z-[1000] h-full w-full flex justify-center items-center p-5 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
                <div className="relative p-6 pt-0 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white pt-4 pb-3 flex justify-between items-center border-b border-neutral-300">
                        <h2 className="text-2xl font-bold text-gray-800">System Help & Instructions</h2>
                        <IoIosClose
                            className="text-4xl text-rose-600 cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => setPopUp(false)}
                        />
                    </div>

                    {/* Content */}
                    <div className="mt-4 space-y-8 text-gray-700 text-sm leading-relaxed px-1 sm:px-2">
                        {/* Section 1 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">1. Uploading Your Data</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Click the <strong>"Upload Excel File"</strong> button to upload a <code>.xls</code> or <code>.xlsx</code> file.</li>
                                <li>
                                    You can download the Excel file from the{' '}
                                    <a
                                        href="http://myousl.ou.ac.lk/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        myousl
                                    </a> result section.
                                </li>
                                <li>
                                    <span className="text-red-600 font-medium">
                                        Do not modify the Excel file before uploading.
                                    </span> Upload it exactly as downloaded.
                                </li>
                                <li>After uploading, the system will automatically parse and display the data.</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">2. Filtering Data</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Use the <strong>Level, Credit, Category, and Progress</strong> dropdowns to filter the data as needed.</li>
                                <li>By default, all options are selected. Once you make a selection, only related records will be shown.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">3. Understanding Categories</h3>
                            <p className="mb-3">Each course is assigned a category code to help classify the data:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                                <div><strong>Engineering</strong>: X</div>
                                <div><strong>Projects</strong>: Y</div>
                                <div><strong>Mathematics</strong>: Z</div>
                                <div><strong>Industrial</strong>: I</div>
                                <div><strong>Management</strong>: M</div>
                                <div><strong>General</strong>: J</div>
                                <div><strong>Industrial Training</strong>: W</div>
                                <div><strong>Language</strong>: L</div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">4. Viewing Results</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Your filtered data will be displayed instantly based on the selected criteria.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">5. Tips for Efficient Use</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Check your file format and structure before uploading to avoid errors.</li>
                                <li>Apply filters early to keep the interface clean and responsive.</li>
                                <li>Refer to the category codes to easily group and understand course types.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">6. Need Help?</h3>
                            <p>
                                For support, contact us at{' '}
                                <a
                                    href="mailto:ushanchamodbandara@gmail.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    ushanchamodbandara@gmail.com
                                </a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
