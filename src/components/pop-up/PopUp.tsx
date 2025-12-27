"use client";
import {
  LucideX,
  FileSpreadsheet,
  Filter,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BookOpen,
} from "lucide-react";

interface Props {
  setPopUp: (value: boolean) => void;
}

const PopUp = ({ setPopUp }: Props) => {
  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setPopUp(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setPopUp(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-dialog-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white pt-2 pb-4 flex justify-between items-center border-b border-gray-200 -mx-6 px-6">
            <div>
              <h2
                id="help-dialog-title"
                className="text-3xl font-bold text-gray-900"
              >
                OUSL Credit Calculator
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Complete Documentation & User Guide
              </p>
            </div>
            <button
              onClick={() => setPopUp(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <LucideX className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-8 text-gray-700 leading-relaxed">
            {/* Section 1: Getting Started */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-[#D06718]" />
                Getting Started: Upload Your Results
              </h3>
              <div className="space-y-4 pl-9">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Step 1: Download Your Results
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                      Visit{" "}
                      <a
                        href="http://myousl.ou.ac.lk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        myousl.ou.ac.lk
                      </a>{" "}
                      and log in to your student account
                    </li>
                    <li>Navigate to the Results section</li>
                    <li>Download the Excel file (.xls or .xlsx format)</li>
                    <li className="text-red-600 font-semibold">
                      Important: Do NOT modify the Excel file - upload it
                      exactly as downloaded
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Step 2: Upload to the System
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                      Click the "Upload Excel File" button or drag and drop your
                      file into the upload area
                    </li>
                    <li>
                      The system will automatically parse your results and
                      extract all course information
                    </li>
                    <li>
                      After successful upload, the file input will disappear and
                      your results will be displayed
                    </li>
                    <li>
                      All your data is processed locally in your browser -
                      nothing is sent to external servers
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Data Filtering */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <Filter className="w-6 h-6 text-[#D06718]" />
                Advanced Filtering System
              </h3>
              <div className="space-y-4 pl-9">
                <p className="text-gray-700">
                  Use the powerful filtering tools to analyze your academic
                  progress from different perspectives:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Level Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by academic level: 3, 4, 5, or 6. Level 3 and 4
                      courses are for the Certificate, while Level 5 and 6 are
                      for the BSE Honours degree.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Credit Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by credit value: 2, 3, 4, or 6 credits. Helps you
                      identify high-value courses and plan credit completion.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Category Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by subject category (Engineering, Mathematics,
                      Projects, Management, etc.). See category codes below.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Obligated Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by course type: Compulsory (must pass) or Optional
                      (can choose alternatives).
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Progress Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by completion status: Completed, In Progress,
                      Failed, or Not Attempted courses.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Year of Offer Filter
                    </h4>
                    <p className="text-sm text-gray-700">
                      Filter by the academic year when the course was offered.
                      Useful for tracking year-by-year progress.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Category Codes */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#D06718]" />
                Category Code Reference
              </h3>
              <div className="pl-9">
                <p className="mb-4 text-gray-700">
                  Each course is assigned a category code to help classify and
                  organize subjects by discipline:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">X</strong>
                    <p className="text-sm text-gray-600 mt-1">Engineering</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">Y</strong>
                    <p className="text-sm text-gray-600 mt-1">Projects</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">Z</strong>
                    <p className="text-sm text-gray-600 mt-1">Mathematics</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">I</strong>
                    <p className="text-sm text-gray-600 mt-1">Industrial</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">M</strong>
                    <p className="text-sm text-gray-600 mt-1">Management</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">J</strong>
                    <p className="text-sm text-gray-600 mt-1">General</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">W</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Industrial Training
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <strong className="text-[#D06718] text-lg">L</strong>
                    <p className="text-sm text-gray-600 mt-1">Language</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: GPA Analysis */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-[#D06718]" />
                Advanced GPA Analysis System
              </h3>
              <div className="space-y-4 pl-9">
                <p className="text-gray-700">
                  The GPA Analysis page provides comprehensive insights into
                  your academic performance and degree progression:
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Current GPA & Classification
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                      View your current GPA calculated based on ALL courses from
                      Levels 3, 4, 5, and 6
                    </li>
                    <li>
                      Continuing Education courses (FDE3023, LTE34SE, MHZ2250)
                      are excluded from GPA calculation
                    </li>
                    <li>
                      See your degree classification: First Class, Second Class
                      Upper, Second Class Lower, or Pass
                    </li>
                    <li>
                      Visual progress bar showing how close you are to the next
                      classification level
                    </li>
                    <li>
                      GPA is calculated as: (Sum of Grade Points × Credits) ÷
                      Total Credits
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Courses Used in GPA Calculation
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                      Complete list of all courses included in your GPA
                      calculation
                    </li>
                    <li>
                      Each course shows: Code, Name, Level, Credits, Grade, GPV
                      (Grade Point Value), and Weighted Points
                    </li>
                    <li>
                      Color-coded grades for easy identification of performance
                      levels
                    </li>
                    <li>
                      Excluded courses (like Continuing Education) are listed
                      separately with explanations
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Failed Courses & Compulsory Requirements
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                      All failed or incomplete courses are clearly identified
                    </li>
                    <li>
                      <strong>Compulsory courses</strong> (marked as "Must
                      Retake"): These MUST be passed to graduate, regardless of
                      other credits
                    </li>
                    <li>
                      <strong>Optional courses</strong> (marked as "May
                      Ignore"): Can be skipped if you meet the required credits
                      in that category
                    </li>
                    <li>
                      System intelligently calculates which optional failed
                      courses can be ignored based on your credit progress
                    </li>
                    <li>
                      Action items show exactly what you need to do for each
                      failed course
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Category Credit Analysis
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                      Breakdown of credits by category (Engineering,
                      Mathematics, Projects, etc.)
                    </li>
                    <li>
                      Progress bars showing completion percentage for each
                      category
                    </li>
                    <li>
                      Required credits vs. earned credits for graduation
                      requirements
                    </li>
                    <li>
                      Identifies which categories need more courses to meet
                      minimum requirements
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Understanding Compulsory vs Optional Courses
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      <strong className="text-blue-900">
                        Compulsory Courses:
                      </strong>{" "}
                      These are mandatory courses defined in the BSE Honours
                      degree guidebook. Every student MUST pass all compulsory
                      courses to graduate, even if you have enough total
                      credits.
                    </p>
                    <p>
                      <strong className="text-blue-900">
                        Optional Courses:
                      </strong>{" "}
                      These are elective courses. If you fail an optional
                      course, you can choose to retake it OR take a different
                      optional course from the same category. If you already
                      have sufficient credits in that category, you may ignore
                      the failed optional course entirely.
                    </p>
                    <p className="bg-white p-3 rounded border border-blue-300">
                      <strong>Example:</strong> If you fail EEX4333 (optional)
                      but have already earned 30+ credits in Engineering
                      category, the system will mark it as "May Ignore if Credit
                      Requirements Met" since you've satisfied the category
                      requirements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Graduation Requirements */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-[#D06718]" />
                BSE Honours Degree Graduation Requirements
              </h3>
              <div className="space-y-4 pl-9">
                <div className="bg-gradient-to-br from-[#D06718]/10 to-[#D06718]/5 border border-[#D06718]/30 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Credit Requirements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900 mb-2">
                        Total Credits Required:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Level 3 & 4: Foundation courses</li>
                        <li>Level 5 & 6: Advanced courses for BSE Honours</li>
                        <li>
                          <strong>Total: 125 credits minimum for degree</strong>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">
                        GPA Calculation:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>
                          <strong>All Level 3, 4, 5, and 6 courses</strong>{" "}
                          count toward GPA
                        </li>
                        <li>
                          Continuing Education courses are excluded from GPA
                        </li>
                        <li>Minimum GPA: 2.00 (Pass)</li>
                        <li>First Class: GPA ≥ 3.70</li>
                        <li>Second Upper: 3.30 ≤ GPA &lt; 3.70</li>
                        <li>Second Lower: 3.00 ≤ GPA &lt; 3.30</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    Important Notes
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                      All compulsory courses must be passed regardless of total
                      credit count
                    </li>
                    <li>
                      Continuing Education courses (FDE3023, LTE34SE, MHZ2250)
                      do NOT count toward GPA or degree credits
                    </li>
                    <li>
                      All other passed courses from Levels 3, 4, 5, and 6 count
                      toward both GPA and degree credits
                    </li>
                    <li>
                      Industrial Training courses count toward credits but have
                      special assessment rules
                    </li>
                    <li>
                      You must complete the Final Year Project successfully to
                      graduate
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: Tips & Best Practices */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#D06718]" />
                Tips for Efficient Use
              </h3>
              <div className="pl-9">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </span>
                    <span>
                      Always upload the unmodified Excel file from myOUSL to
                      ensure accurate data parsing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </span>
                    <span>
                      Use filters to focus on specific levels or categories when
                      planning your course selection
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </span>
                    <span>
                      Regularly check the GPA Analysis page to track your
                      progress toward your target classification
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      4
                    </span>
                    <span>
                      Pay close attention to failed compulsory courses - these
                      must be retaken and passed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      5
                    </span>
                    <span>
                      Use the category credit analysis to ensure you meet all
                      graduation requirements across different subject areas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D06718] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      6
                    </span>
                    <span>
                      The system works entirely in your browser - your data is
                      secure and never sent to external servers
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7: Contact */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Need Help or Have Feedback?
              </h3>
              <p className="text-gray-700 mb-2">
                For technical support, feature requests, or to report issues,
                please contact:
              </p>
              <a
                href="mailto:ushanchamodbandara@gmail.com"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                ushanchamodbandara@gmail.com
              </a>
              <p className="text-sm text-gray-600 mt-3">
                This tool is designed to help OUSL BSE students track their
                academic progress. All calculations are based on the official
                BSE Honours Degree Guidebook 2025-2026.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
