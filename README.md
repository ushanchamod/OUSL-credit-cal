# OUSL Credit Calculator

A modern web application designed to help Open University of Sri Lanka (OUSL) students efficiently calculate and analyze their earned credits from academic results. This tool significantly reduces the time required for manual credit calculations from 15+ minutes to just 1-5 minutes.

## 🚀 Features

### Core Functionality

- **Excel File Processing**: Upload and parse official MyOUSL Excel result sheets (.xls/.xlsx)
- **Smart Data Filtering**: Filter results by multiple criteria:
  - **Level**: Course level (3, 4, 5, 6)
  - **Credit**: Credit values (1, 2, 3, 4, 5, 6)
  - **Category**: Course categories (X-Engineering, Y-Projects, Z-Mathematics, I-Industrial, M-Management, J-General, W-Industrial Training, L-Language)
  - **Progress Status**: Pass, Pending, Resit, Repeat, Eligible
  - **Year of Offer**: Last offered year
  - **Obligation Type**: Compulsory, Optional, or Both
- **Real-time Statistics**: Instant calculation of credit statistics
- **Duplicate Removal**: Automatically removes duplicate entries, keeping the most recent
- **Compulsory/Optional Classification**: Pre-configured subject classification for BSE program

### User Interface

- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Interactive Data Table**: Sortable and filterable course data display
- **Real-time Updates**: Instant filtering and statistics updates
- **Help System**: Comprehensive help popup with usage instructions
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## 📊 Data Processing

The application processes academic data with the following structure:

```typescript
interface InputResultType {
  isCompulsory: string; // "compulsory" | "optional"
  level: number; // Course level (3-6)
  attempt: number; // Number of attempts
  code: string; // Course code
  credit: number; // Credit value
  category: string; // Course category
  el: number; // Eligibility left
  grade: number; // Grade achieved
  loy: number; // Last offered year
  name: string; // Course name
  progress: string; // Progress status
}
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **UI Components**: Material-UI (MUI)
- **File Processing**: XLSX library
- **Icons**: React Icons
- **Linting**: ESLint with TypeScript support

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ushanchamod/ousl-credit-cal.git
   cd ousl-credit-cal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🚀 Usage

### Getting Started

1. **Download Your Results**

   - Log into [MyOUSL](http://myousl.ou.ac.lk/)
   - Navigate to the results section
   - Download your academic results as an Excel file (.xls or .xlsx)

2. **Upload Your File**

   - Click the "Upload Excel File" button
   - Select your downloaded Excel file
   - The system will automatically parse and display your data

3. **Filter and Analyze**
   - Use the filter options to narrow down your results
   - View real-time statistics and credit calculations
   - Export or analyze specific course categories

### Filter Options

- **Level Filter**: Select specific course levels (3-6)
- **Credit Filter**: Filter by credit values
- **Category Filter**: Filter by course categories
- **Progress Filter**: Show only specific progress statuses
- **Year Filter**: Filter by last offered year
- **Obligation Filter**: Show compulsory, optional, or both types

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── data-table/      # Data display components
│   ├── footer/          # Footer component
│   ├── global-config/   # Filter configuration
│   ├── input/           # File upload component
│   ├── pop-up/          # Help popup
│   ├── result/          # Statistics display
│   ├── top-bar/         # Navigation header
│   └── ui/              # Reusable UI components
├── store/               # Zustand state management
├── utility/             # Utility functions
│   ├── dataClean.ts     # Data processing logic
│   ├── subject.ts       # Subject classifications
│   └── common.ts        # Common utilities
└── App.tsx              # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📈 Statistics Calculation

The application calculates various credit statistics:

- **Total Credits**: Sum of all course credits
- **Pass Credits**: Credits from passed courses
- **Pending Credits**: Credits from pending courses
- **Eligible Credits**: Credits from eligible courses
- **Compulsory Credits**: Credits from compulsory courses
- **Optional Credits**: Credits from optional courses
- **Resit Credits**: Credits from resit courses
- **Repeat Credits**: Credits from repeat courses

## 📞 Support

For technical support or questions:

- **Email**: ushanchamodbandara@gmail.com
- **Help System**: Click the "Help" button in the application

---

**Note**: This tool is designed specifically for OUSL students and works with the official MyOUSL result format. Please ensure you upload the Excel file exactly as downloaded from the MyOUSL platform without any modifications.
