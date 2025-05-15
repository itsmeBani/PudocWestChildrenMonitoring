export const useBmi = () => {
    const ranges = [
        { min: 0, max: 15.99, status: "SUW (Severe Underweight)", color: "indigo", txt: "SUW" },
        { min: 16, max: 17.99, status: "MUW (Malnutrition Underweight)", color: "orange", txt: "MUW" },
        { min: 18, max: 18.99, status: "MST (Moderate Stature)", color: "amber", txt: "MST" },
        { min: 19, max: 19.99, status: "SST (Super Stature)", color: "lime", txt: "SST" },
        { min: 20, max: 24.99, status: "Normal (Healthy Weight)", color: "green", txt: "Normal" },
        { min: 25, max: 29.99, status: "SW/SAM (Slightly Overweight)", color: "yellow", txt: "SW/SAM" },
        { min: 30, max: 34.99, status: "MW/MAM (Moderate Weight / Moderate Abnormal)", color: "light-green", txt: "MW/MAM" },
        { min: 35, max: Infinity, status: "Obesity (High Risk)", color: "red", txt: "Obesity" },
    ];

    function getBMIStatus(bmi) {
        const result = ranges.find(range => bmi >= range.min && bmi <= range.max);
        if (!result) return { status: "Invalid BMI range", color: "#B0BEC5", txt: "Unknown" };
        const { status, color, txt } = result;
        return { status, color, txt };
    }

    return { ranges, getBMIStatus };
};

