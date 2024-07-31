import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { Link } from "react-router-dom";
import { color } from '../../../../GlobalConfig/config';

export default function AnalyticsButton({ name, path }) {
  return (
    <Card sx={{ width: '350px', height: '140px', bgcolor: color.green1 }} variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress sx={{ color: 'white' }} size="lg" determinate value={0}>
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
                animate={{ pathLength: 1, transition: { duration: 2, repeat: Infinity, repeatDelay: 1, repeatType: 'reverse' } }}
              />
            </motion.svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography sx={{ color: 'white' }} level="h2">
            {name}
          </Typography>
        </CardContent>
      </CardContent>

      <Link
        to={`${path}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardActions>
          <Button
            variant="solid"
            size="sm"
            sx={{
              backgroundColor: 'white',
              color: (theme) => "#2196f3",
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            See Report
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
}
