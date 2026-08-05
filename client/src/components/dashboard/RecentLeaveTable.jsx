import {

Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper

} from "@mui/material";

function RecentLeavesTable({ recentLeaves }) {

return (

<TableContainer component={Paper} sx={{ mt:4 }}>

<Table>

<TableHead>

<TableRow>

<TableCell>Name</TableCell>

<TableCell>Department</TableCell>

<TableCell>Leave</TableCell>

<TableCell>Status</TableCell>

</TableRow>

</TableHead>

<TableBody>

{recentLeaves.map((leave)=>(

<TableRow key={leave._id}>

<TableCell>

{leave.employee?.name}

</TableCell>

<TableCell>

{leave.employee?.department}

</TableCell>

<TableCell>

{leave.leaveType}

</TableCell>

<TableCell>

{leave.status}

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</TableContainer>

);

}

export default RecentLeavesTable;