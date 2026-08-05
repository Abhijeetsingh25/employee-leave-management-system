import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function MonthlyLeaveChart({ monthlyLeaves }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart data={monthlyLeaves}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="_id.month" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="totalLeaves" />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default MonthlyLeaveChart;