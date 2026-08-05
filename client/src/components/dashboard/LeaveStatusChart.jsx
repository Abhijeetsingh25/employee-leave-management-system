import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#ff9800",
    "#4caf50",
    "#f44336"
];

function LeaveStatusChart({ overview }) {

    const data = [
        {
            name: "Pending",
            value: overview.pendingLeaves
        },
        {
            name: "Approved",
            value: overview.approvedLeaves
        },
        {
            name: "Rejected",
            value: overview.rejectedLeaves
        }
    ];

    return (

        <PieChart
            width={420}
            height={300}
        >

            <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
            >

                {data.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />

                ))}

            </Pie>

            <Tooltip />

            <Legend />

        </PieChart>

    );
}

export default LeaveStatusChart;