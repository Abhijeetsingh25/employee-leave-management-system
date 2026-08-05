import { Grid, Card, CardContent, Typography } from "@mui/material";

function DashboardCards({ overview }) {

    const cards = [
        {
            title: "Employees",
            value: overview.totalEmployees
        },
        {
            title: "Admins",
            value: overview.totalAdmins
        },
        {
            title: "HR",
            value: overview.totalHR
        },
        {
            title: "Pending",
            value: overview.pendingLeaves
        },
        {
            title: "Approved",
            value: overview.approvedLeaves
        },
        {
            title: "Rejected",
            value: overview.rejectedLeaves
        },
        {
            title: "Attendance",
            value: overview.todayAttendance
        }
    ];

    return (
        <Grid container spacing={3}>

            {cards.map((item) => (

                <Grid item xs={12} sm={6} md={3} key={item.title}>

                    <Card elevation={4}>

                        <CardContent>

                            <Typography color="text.secondary">
                                {item.title}
                            </Typography>

                            <Typography variant="h4">
                                {item.value}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>
    );
}

export default DashboardCards;