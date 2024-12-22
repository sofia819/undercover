import { Player } from '../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  player: Player;
  clues: string[];
}

const InfoCard = ({ player, clues }: Props) => {
  return (
    <>
      <Card sx={{ width: '20%' }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {player.playerName}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            {clues[0] || '...'}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {clues[1] || '...'}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            {clues[2] || '...'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoCard;
