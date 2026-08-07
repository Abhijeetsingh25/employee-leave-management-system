import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

function UpcomingHolidays() {

  const holidays = [

    {
      title:"Independence Day",
      date:"15 Aug 2026"
    },

    {
      title:"Janmashtami",
      date:"4 Sep 2026"
    },

    {
      title:"Gandhi Jayanti",
      date:"2 Oct 2026"
    }

  ];

  return (

    <Paper
      elevation={3}
      sx={{
        p:3,
        borderRadius:4,
        height:"100%"
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Upcoming Holidays
      </Typography>

      <List>

        {holidays.map((item,index)=>(

          <ListItem
            key={index}
            divider
          >

            <ListItemText
              primary={item.title}
              secondary={item.date}
            />

            <Chip
              label="Holiday"
              color="success"
              size="small"
            />

          </ListItem>

        ))}

      </List>

    </Paper>

  );

}

export default UpcomingHolidays;