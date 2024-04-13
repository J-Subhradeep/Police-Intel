import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { useNavigate } from 'react-router-dom';

export default function AnalyticsButton({name, path}) {
  const controls = useAnimation();

  React.useEffect(() => {
    const animateLine = async () => {
      while (true) {
        await controls.start({ pathLength: 0 });
        await controls.start({ pathLength: 1, transition: { duration: 2 } });
      }
    };

    animateLine();
  }, [controls]);

  const navigate = useNavigate();


  const handleClick = () => {
    navigate(path)
  }

  return (
    <Card sx={{ width: '300px', height: '140px' }} variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={20}>
          <SvgIcon>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >

              <line x1="1" y1="20" x2="23" y2="20" stroke="currentColor" />
              <polygon points="22.5,19.5 23,20 22.5,20.5" fill="currentColor" />


              <line x1="1" y1="1" x2="1" y2="20" stroke="currentColor" />
              <polygon points="0.5,1 1,0.5 1.5,1" fill="currentColor" />

              <motion.polyline
                points="2,18 8,12 14,16 20,8"
                fill="none"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={controls}
              />
            </motion.svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="h2">{name}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} variant="solid" size="sm">
          See Report
        </Button>
      </CardActions>
    </Card>
  );
}
