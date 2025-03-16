import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function EventCard({event}) {
    console.log(event)
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={"https://picsum.photos/200/300?random=" + event.eventId}
          alt={event.eventName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {event.eventName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Aproximate Attendees: {event.approxAttendees}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Sustainability Factor: {event.sustainabilityFactor}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}