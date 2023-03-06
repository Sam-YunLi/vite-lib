import * as React from 'react';
import { Box, LinearProgress, Button, styled, linearProgressClasses } from '@mui/material';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

import DesktopContext from '../d-provider/d-provider';

import { listData } from '../../moca_data';
import { wsData } from '../../moca_data';

// onRowClick={(params) => {
//   console.log(params.id)
//   setPageNavData({ title: ['Workshops', 'One-workshop'], data: wsData});
//   setPageNow('workshopPage');
// }}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const rows = listData;

const columns = [
  { key: 'id', name: 'ID', width: 60 },
  { key: 'Workshop', name: 'Workshop', width: 200 },
  { key: 'Date', name: 'Date', width: 200, },
  { key: 'Participants', name: 'Participants', width: 160, },
  { key: 'Progress', name: 'Progress', width: 160,
    formatter: (props) => {
      const progress = props.row.Progress
      return (
        <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', width: '100%'}}>
          <BorderLinearProgress 
            variant="determinate" 
            value={parseFloat(progress * 100)} 
            sx={{width:"60%", height:"15px", borderRadius: "6px"}}
          />
          {progress * 100}%
        </Box>
      )
    }
  },
  { key: 'Type', name: 'Type', width: 100,
    formatter: (props) => {
      const type = props.row.Type
      switch (type) {
        case '2.5':
          return (<Button component="button" variant="outlined" color="primary" size='small' style={{width:'20px', fontSize:'11px'}}>2.5</Button>)
        case 'In-house':
          return (<Button component="button" variant="outlined" color="info" size='small' style={{width:'20px', fontSize:'11px'}}>In-house</Button>)
        case 'Archived':
          return (<Button component="button" variant="outlined" color="error" size='small' style={{width:'20px', fontSize:'11px'}}>Archived</Button>)
        case 'Custom':
          return <Button component="button" variant="outlined" color='success' size='small' style={{width:'20px', fontSize:'11px'}}>Custom</Button>
      }
    }
  },
  ]

const DWLView = () => {

  const { setPageNavData, setPageNow } = React.useContext(DesktopContext)

  return (
    <Box sx={{ height: '100px', width: '100%', display:'flex', justifyContent:'center'}}>
      <DataGrid
        columns={columns}
        rows={rows}

        headerHeight={45}
        rowHeight={45}

        onCellClick={(params)=>{
          console.log(params)
          setPageNavData({ title: ['Workshops', 'One-workshop'], data: wsData});
          setPageNow('workshopPage');
        }}
      />
    </Box>
  );
}

export default DWLView