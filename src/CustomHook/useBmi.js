export const useBmi=()=>{

    const ranges = [
        { limit: 16, status: "SUW (Severe Underweight)", color: "indigo", txt: "SUW" },
        { limit: 18.5, status: "MUW (Malnutrition Underweight)", color: "orange", txt: "MUW" },
        { limit: 20, status: "MST (Moderate Stature)", color: "amber", txt: "MST" },
        { limit: 22, status: "SST (Super Stature)", color: "lime", txt: "SST" },
        { limit: 24, status: "Normal (Healthy Weight)", color: "green", txt: "Normal" },
        { limit: 26, status: "SW/SAM (Slightly Overweight / Slightly Abnormal)", color: "yellow", txt: "SW/SAM" },
        { limit: 30, status: "MW/MAM (Moderate Weight / Moderate Abnormal)", color: "light-green", txt: "MW/MAM" },
        { limit: Infinity, status: "Obesity (High Risk)", color: "red", txt: "Obesity" },
    ];



    function getBMIStatus(bmi) {
        const { status, color,txt } = ranges.find(range => bmi < range.limit) || { status: "Invalid BMI range", color: "#B0BEC5" };
        return { status, color,txt };
    }



    return {ranges,getBMIStatus}

}